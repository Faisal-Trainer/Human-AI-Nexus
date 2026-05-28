#include <iostream>
#include <vector>
#include <string>
#include <filesystem>
#include <fstream>
#include <regex>
#include <map>
#include <chrono>

namespace fs = std::filesystem;

struct KnowledgeNode {
    std::string path;
    std::string filename;
    std::string keyword;
};

std::string escape_regex(const std::string& str) {
    std::string result;
    for (char c : str) {
        if (std::string(".^$|()*+?{}[]\\").find(c) != std::string::npos) {
            result += "\\";
        }
        result += c;
    }
    return result;
}

std::string get_relative_path(const fs::path& from, const fs::path& to) {
    fs::path rel = fs::relative(to.parent_path(), from.parent_path());
    fs::path result = rel / to.filename();
    std::string s = result.string();
    std::replace(s.begin(), s.end(), '\\', '/');
    return s;
}

int main(int argc, char* argv[]) {
    if (argc < 2) {
        std::cerr << "Usage: fast_linker <knowledge_path>" << std::endl;
        return 1;
    }

    std::string knowledgePath = argv[1];
    auto start = std::chrono::high_resolution_clock::now();

    std::vector<KnowledgeNode> nodes;
    std::vector<std::string> keywords;

    // 1. Scan for keywords
    for (const auto& entry : fs::recursive_directory_iterator(knowledgePath)) {
        if (entry.is_regular_file() && entry.path().extension() == ".md") {
            std::string filename = entry.path().filename().string();
            if (filename.find("NEXUS_") == 0) {
                std::string keyword = filename.substr(6, filename.length() - 9); // Remove NEXUS_ and .md
                for (auto & c: keyword) c = std::tolower(c);
                if (keyword.length() > 3) {
                    nodes.push_back({entry.path().string(), filename, keyword});
                    keywords.push_back(keyword);
                }
            }
        }
    }

    // Sort keywords by length descending for greedy matching
    std::sort(keywords.begin(), keywords.end(), [](const std::string& a, const std::string& b) {
        return a.length() > b.length();
    });

    int totalModified = 0;

    // 2. Cross-link
    for (const auto& node : nodes) {
        std::ifstream fileIn(node.path);
        std::string content((std::istreambuf_iterator<char>(fileIn)), std::istreambuf_iterator<char>());
        fileIn.close();

        bool modified = false;
        for (const auto& kw : keywords) {
            // Find target node for this keyword
            auto it = std::find_if(nodes.begin(), nodes.end(), [&](const KnowledgeNode& n) {
                return n.keyword == kw;
            });
            if (it == nodes.end() || it->path == node.path) continue;

            // Escape regex special characters in keyword
            std::string escapedKw = escape_regex(kw);
            
            // Standard C++ regex doesn't support lookbehinds like (?<!\[), so we check manually.
            std::regex linkRegex("\\b" + escapedKw + "\\b", std::regex_constants::icase);
            
            std::sregex_iterator next(content.begin(), content.end(), linkRegex);
            std::sregex_iterator end;
            bool localModified = false;
            
            std::string newContent = "";
            size_t lastPos = 0;

            while (next != end) {
                std::smatch match = *next;
                size_t pos = match.position();
                
                // Manually check if it's already inside a link (e.g. preceded by '[' or followed by ']')
                bool insideLink = false;
                if (pos > 0 && content[pos - 1] == '[') insideLink = true;
                if (pos + match.length() < content.length() && content[pos + match.length()] == ']') insideLink = true;

                if (!insideLink) {
                    std::string relPath = get_relative_path(fs::path(node.path), fs::path(it->path));
                    newContent += content.substr(lastPos, pos - lastPos);
                    newContent += "[" + match.str() + "](" + relPath + ")";
                    lastPos = pos + match.length();
                    localModified = true;
                } else {
                    newContent += content.substr(lastPos, pos + match.length() - lastPos);
                    lastPos = pos + match.length();
                }
                next++;
            }
            if (localModified) {
                newContent += content.substr(lastPos);
                content = newContent;
                modified = true;
            }
        }

        if (modified) {
            std::ofstream fileOut(node.path);
            fileOut << content;
            fileOut.close();
            totalModified++;
        }
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> diff = end - start;

    std::cout << "Nexus Fast Linker (Native Clang)" << std::endl;
    std::cout << "-------------------------------" << std::endl;
    std::cout << "Processed: " << nodes.size() << " nodes" << std::endl;
    std::cout << "Modified: " << totalModified << " files" << std::endl;
    std::cout << "Time taken: " << diff.count() << " seconds" << std::endl;

    return 0;
}

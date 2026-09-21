#include <iostream>
#include <vector>
#include <string>
#include <filesystem>
#include <fstream>
#include <chrono>
#include <thread>
#include <future>

namespace fs = std::filesystem;

// Directories to skip during copy (large deps that are junction-linked by JS fallback)
static const std::vector<std::string> SKIP_DIRS = {"nexus", "node_modules", "vendor"};

bool should_skip(const fs::path& entry, const fs::path& source_root) {
    fs::path rel = fs::relative(entry, source_root);
    if (rel.empty()) return false;
    std::string first_component = rel.begin()->string();
    for (const auto& skip : SKIP_DIRS) {
        if (first_component == skip) return true;
    }
    return false;
}

bool fast_copy(const fs::path& source, const fs::path& target) {
    try {
        fs::create_directories(target);

        for (const auto& entry : fs::recursive_directory_iterator(
                 source, fs::directory_options::skip_permission_denied)) {

            if (should_skip(entry.path(), source)) continue;

            fs::path dest = target / fs::relative(entry.path(), source);

            if (entry.is_directory()) {
                fs::create_directories(dest);
            } else {
                fs::create_directories(dest.parent_path());
                fs::copy_file(entry.path(), dest, fs::copy_options::overwrite_existing);
            }
        }
        return true;
    } catch (const std::exception& e) {
        std::cerr << "   ❌ Copy error: " << e.what() << std::endl;
        return false;
    }
}

bool patch_env(const fs::path& target, const std::string& app_name) {
    fs::path env_path = target / ".env";
    if (!fs::exists(env_path)) return false;

    std::ifstream file_in(env_path);
    std::string content((std::istreambuf_iterator<char>(file_in)), std::istreambuf_iterator<char>());
    file_in.close();

    // Replace APP_NAME (handle both LF and CRLF line endings)
    size_t pos = content.find("APP_NAME=");
    if (pos != std::string::npos) {
        size_t end = content.find('\n', pos);
        if (end == std::string::npos) end = content.size();  // Handle missing trailing newline
        // Trim \r if present (CRLF)
        size_t replace_end = end;
        if (replace_end > pos && content[replace_end - 1] == '\r') {
            replace_end--;
        }
        content.replace(pos, replace_end - pos, "APP_NAME=" + app_name);
    }

    std::ofstream file_out(env_path);
    file_out << content;
    file_out.close();
    return true;
}

int main(int argc, char* argv[]) {
    if (argc < 4) {
        std::cout << "Usage: sandbox_orchestrator <command> <source_template> <target_dir> <app_name>" << std::endl;
        return 1;
    }

    std::string command = argv[1];
    fs::path source = argv[2];
    fs::path target = argv[3];
    std::string app_name = (argc > 4) ? argv[4] : "Nexus-Sandbox";

    auto start = std::chrono::high_resolution_clock::now();

    if (command == "setup") {
        std::cout << "🚀 Native Setup: " << app_name << std::endl;
        
        if (fast_copy(source, target)) {
            std::cout << "   ✅ Template cloned to: " << target << std::endl;
            if (patch_env(target, app_name)) {
                std::cout << "   ✅ .env patched." << std::endl;
            }
        } else {
            return 1;
        }
    }

    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> diff = end - start;
    std::cout << "⏱  Time taken: " << diff.count() << " seconds" << std::endl;

    return 0;
}

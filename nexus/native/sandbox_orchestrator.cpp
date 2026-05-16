#include <iostream>
#include <vector>
#include <string>
#include <filesystem>
#include <fstream>
#include <chrono>
#include <thread>
#include <future>

namespace fs = std::filesystem;

/**
 * Nexus Sandbox Orchestrator (Native C++)
 * Optimized for High-Speed SSD I/O and Windows Environments.
 */

bool fast_copy(const fs::path& source, const fs::path& target) {
    try {
        fs::copy(source, target, fs::copy_options::recursive | fs::copy_options::overwrite_existing);
        // Remove unwanted folders immediately
        fs::remove_all(target / "nexus");
        fs::remove_all(target / "node_modules");
        fs::remove_all(target / "vendor");
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

    // Replace APP_NAME
    size_t pos = content.find("APP_NAME=");
    if (pos != std::string::npos) {
        size_t end = content.find("\n", pos);
        content.replace(pos, end - pos, "APP_NAME=" + app_name);
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

#include <iostream>
#include <vector>
#include <chrono>

bool is_prime(int n) {
    if (n <= 1) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

int main() {
    auto start = std::chrono::high_resolution_clock::now();
    
    int count = 0;
    int limit = 500000;
    for (int i = 1; i <= limit; i++) {
        if (is_prime(i)) {
            count++;
        }
    }
    
    auto end = std::chrono::high_resolution_clock::now();
    std::chrono::duration<double> diff = end - start;
    
    std::cout << "Nexus Native Benchmark (Clang)" << std::endl;
    std::cout << "-------------------------------" << std::endl;
    std::cout << "Primes found up to " << limit << ": " << count << std::endl;
    std::cout << "Time taken: " << diff.count() << " seconds" << std::endl;
    
    return 0;
}

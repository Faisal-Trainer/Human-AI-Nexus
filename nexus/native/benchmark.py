import time

def is_prime(n):
    if n <= 1: return False
    i = 2
    while i * i <= n:
        if n % i == 0: return False
        i += 1
    return True

def main():
    start = time.time()
    count = 0
    limit = 500000
    for i in range(1, limit + 1):
        if is_prime(i):
            count += 1
    end = time.time()
    
    print("Nexus Python Benchmark")
    print("-----------------------")
    print(f"Primes found up to {limit}: {count}")
    print(f"Time taken: {end - start:.6f} seconds")

if __name__ == "__main__":
    main()

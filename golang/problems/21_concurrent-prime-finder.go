package main

import (
	"fmt"
	"sync"
)

// Check if a number is prime
func isPrime(num int) bool {
	if num < 2 {
		return false
	}
	for i := 2; i*i <= num; i++ {
		if num%i == 0 {
			return false
		}
	}
	return true
}

// Goroutine for odd numbers
func funcPrimeOdd(message chan int, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 1; i < 100; i += 2 {
		if isPrime(i) {
			message <- i
		}
	}
}

// Goroutine for even numbers
func funcPrimeEven(message chan int, wg *sync.WaitGroup) {
	defer wg.Done()
	for i := 2; i < 100; i += 2 {
		if isPrime(i) {
			message <- i
		}
	}
}

func main() {
	var wg sync.WaitGroup
	message := make(chan int, 100)

	fmt.Println("Concurrent Prime Finder")

	// Start goroutines
	wg.Add(2)
	go funcPrimeOdd(message, &wg)
	go funcPrimeEven(message, &wg)

	// Close channel when goroutines finish
	go func() {
		wg.Wait()
		close(message)
	}()

	// Receive from channel and print primes
	for prime := range message {
		fmt.Println("Prime number:", prime)
	}
}

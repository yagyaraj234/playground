package main

import "fmt"

func Fibonacci(n int) int {

	if n <= 1 {
		return n
	}
	return Fibonacci(n-2) + Fibonacci(n-1)
}

func FibonacciIterative(n int) int {

	if n <= 1 {
		return n
	}

	a, b := 0, 1
	for i := 2; i <= n; i++ {
		a, b = b, a+b
	}
	return b
}

func main() {
	n := 10

	for i := 0; i < n; i++ {

		fmt.Print(Fibonacci(i), " ")

	}

	fmt.Println()
	for i := 0; i < n; i++ {

		fmt.Print(FibonacciIterative(i), " ")

	}

}

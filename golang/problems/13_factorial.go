package main

import "fmt"

func factorial(n int) int {

	if n == 1 {
		return n
	}

	n *= factorial(n - 1)

	return n

}

func main() {

	fmt.Println(factorial((4)))
	fmt.Println(factorial((73)))
	fmt.Println(factorial((1)))
	fmt.Println(factorial((3)))
	fmt.Println(factorial((5)))
}

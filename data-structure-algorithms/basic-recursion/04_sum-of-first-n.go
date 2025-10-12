package main

import "fmt"

func SumOfFirstN(n int) int {

	if n < 0 {
		return 0
	}

	return n + SumOfFirstN(n-1)

}

func main() {
	fmt.Println(SumOfFirstN(100))
}

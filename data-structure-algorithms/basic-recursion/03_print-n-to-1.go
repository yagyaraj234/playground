package main

import "fmt"

func PrintNTo1(n int) {

	if n < 1 {
		return
	}
	fmt.Println(n)
	PrintNTo1(n - 1)

}

func main() {
	PrintNTo1(20)

}

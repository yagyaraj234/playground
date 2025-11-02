package main

import "fmt"

func PrintName(n int) {
	if n == 0 {
		return
	}
	PrintName(n - 1)
	fmt.Println("Raj")
}

func main() {

	PrintName(5)

}

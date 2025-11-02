package main

import "fmt"

func Print1ToN(n int) {
	if n < 1 {
		return
	}
	Print1ToN(n - 1)
	fmt.Println(n)
}

func main() {

	Print1ToN(20)

}

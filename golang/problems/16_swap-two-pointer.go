package main

import "fmt"

func swapPointers(a, b *int) {

	*a, *b = *b, *a

}

func main() {
	x, y := 5, 10
	swapPointers(&x, &y)
	fmt.Println(x, y)
}

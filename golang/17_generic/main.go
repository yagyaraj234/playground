package main

import "fmt"

// generic

// without generic
func printSlice(items ...int) {

	for _, item := range items {
		fmt.Println(item)
	}
}

// with generic

func printItems[T any](items ...T) {
	for _, item := range items {
		fmt.Println(item)
	}
}

// [T string | int | bool]
// [T comparable]

//  for all types we can use comparable [T comparable]

func main() {

	printSlice(1, 3, 4)

	printItems(1, 43, 4, 5)

	printItems("string", "item")

}

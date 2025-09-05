package main

import "fmt"

func makeCounter() func() int {
	count := 9

	return func() int {
		count++
		return count + 1
	}
}

func main() {
	counter := makeCounter()
	fmt.Println(counter())
	fmt.Println(counter())
	fmt.Println(counter())
	fmt.Println(counter())
	fmt.Println(counter())
	fmt.Println(counter())

}

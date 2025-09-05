package main

import "fmt"

func main() {
	num1 := 32
	num2 := 43

	// fmt.Println(num1, num2)

	// temp := num1
	// num1 = num2
	// num2 = temp

	num1, num2 = num2, num1
	fmt.Println(num1, num2)

}

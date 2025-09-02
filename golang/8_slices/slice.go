package main

import "fmt"

// slices -> dynamic array
// most used contruct in go
// + useful methods
func main(){

	// un-initilised is nil
	var nums[]int

	fmt.Println(nums)
	fmt.Println(nums ==nil)
	fmt.Println(len(nums))

	//  if we want array should be initilised use make method

	var numbers = make([]int,2,100)  // 2 is a initial size of slice
	// make has 3 param (initiali,intial lenght, initial capacity)
	fmt.Println(numbers)
	numbers[0]=11
	fmt.Println(numbers)


	// cap -> maximum capacity of numbers
	fmt.Println(cap(numbers))


	// method to append the element in slice

	numbers = append(numbers, 4)
	fmt.Println(numbers)
}

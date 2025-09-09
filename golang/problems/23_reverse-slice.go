package main

import "fmt"

// Topic: Slices & Pointers

// Write a function Reverse(slice []int) that reverses a slice in place using pointers.

// Example: [1, 2, 3, 4] → [4, 3, 2, 1]


func Reverse(slice *[]int) {

	s := *slice
	n := len(s)
	for i := 0; i < n/2; i++ {
		// Swap elements using pointers
		s[i], s[n-1-i] = s[n-1-i], s[i]
	}

}
func main(){

	arr:= []int{1,2,3,4,5}

	fmt.Println(arr)
Reverse(&arr)
	fmt.Println(arr)


}
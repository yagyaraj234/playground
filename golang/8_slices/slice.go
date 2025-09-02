package main

import (
	"fmt"
	"slices"
)

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


	// copy func to copy array

	numbers[0]=12

	var copy_arr[]int
	copy(numbers,copy_arr)

	fmt.Println(copy_arr,numbers)


	//  slice operator


	var slice_nums=[]int{1,2,3}

	fmt.Println(slice_nums[0:1])  // start point to end point except end index
	fmt.Println(slice_nums[:2]) 
	fmt.Println(slice_nums[1:]) 


	// slice in-built package

	var nums1=[]int{1,2}
	var nums2=[]int{1,2}

	fmt.Println(slices.Equal(nums1,nums2)) // compare and return boolean
}

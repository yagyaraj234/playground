package main

import "fmt"

func main() {

	nums := []int{1, 3, 434}

	fmt.Println(nums[1])
	fmt.Printf("Array elemengt : %v  \n", nums)

	//  accesing elements O(1)
	fmt.Println("element at index 1: \n", nums[0])

	// modifying elements O(1)

	nums[0] = 1

	fmt.Println("element at index 1: \n", nums[0])

	nums = append(nums, 4)
	fmt.Println("appending new element %v", nums)

	//  inserting element at some posution O(N)

	index := 2
	value := 34

	nums = append(nums[:index], append([]int{value}, nums[index:]...)...)

	fmt.Println("updated array ", nums)

	// Delete element at position O(N)

	index = 3
	nums = append(nums[:index], nums[index+1:]...)

	fmt.Println("after deleteting", nums)
}

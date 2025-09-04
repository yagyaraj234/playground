package main

import "fmt"

func reverseArray(arr []int) []int {
	temp_arr := make([]int, len(arr))
	for i := 0; i < len(arr); i++ {
		temp_arr[i] = arr[len(arr)-1-i]
	}
	return temp_arr
}

func main() {
	arr := []int{1, 2, 3, 4, 5, 6, 7, 8, 90, 0}

	fmt.Println("Original:", arr)
	fmt.Println("Reversed:", reverseArray(arr))
}

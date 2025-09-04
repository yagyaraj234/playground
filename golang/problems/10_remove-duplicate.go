package main

import "fmt"

func contains(nums []int, num int) bool {

	for _, it := range nums {
		if it == num {

			return true
		}
	}
	return false

}

func removeDuplicates(nums []int) []int {

	tempArr := make([]int, len(nums))
	index := 0

	for _, num := range nums {
		if !contains(tempArr, num) {
			tempArr[index] = num
			index++
		}
	}

	return tempArr
}

func removeDuplicates2(nums []int) []int {
	seen := make(map[int]bool)
	result := []int{}

	for _, num := range nums {
		if !seen[num] {
			seen[num] = true
			result = append(result, num)
		}
	}

	return result
}

func main() {
	arr := []int{1, 2, 4, 5, 3, 23, 5, 1, 2, 5, 6, 2}

	fmt.Println(removeDuplicates(arr))
	fmt.Println(removeDuplicates2(arr))
}

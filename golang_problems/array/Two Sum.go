package main

import "fmt"

func TwoSum(nums []int, target int) []int {

	// Brite force

	var item []int

	for index, value := range nums {

		found := false

		for newIndex := index + 1; newIndex < len(nums); newIndex++ {
			if value+nums[newIndex] == target {
				item = append(item, index)
				item = append(item, newIndex)

				found = true
				break
			}
		}
		if found {
			return item
		}
	}

	return item

}

func main() {

	item := []int{2, 7, 11, 15}

	answer := TwoSum(item, 9)

	fmt.Println("The indecises are: ", answer)

}

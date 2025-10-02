package main

import "fmt"

// Input: nums = [1,2,3,4]
// Output: [24,12,8,6]

func productExceptSelf(nums []int) []int {
	n := len(nums)
	result := make([]int, n)

	for i := range result {
		result[i] = 1
	}

	prefix := 1

	for i := 0; i < n; i++ {
		result[i] = prefix
		prefix = prefix * nums[i]
	}

	postfix := 1
	for i := n-1; i >= 0; i-- {
		result[i] = result[i] * postfix
		postfix = nums[i] * postfix

	}

	return result

}

func main() {

	arr := []int{1, 2, 3, 4}

	fmt.Println(productExceptSelf(arr))

}

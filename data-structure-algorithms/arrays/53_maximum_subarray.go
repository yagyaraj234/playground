package main

import "math"

func maxSubArray(nums []int) int {

	maxi := 0
	max := math.MinInt

	for i := 0; i < len(nums); i++ {
		maxi += nums[i]

		if maxi > max {
			max = maxi
		}
		if maxi < 0 {
			maxi = 0
		}
	}
	return max
}

func main() {

	nums := []int{-2, 1, -3, 4, -1, 2, 1, -5, 4}
	result := maxSubArray(nums)

	println(result)
}

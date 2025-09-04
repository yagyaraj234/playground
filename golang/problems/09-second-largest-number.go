package main

import "fmt"

func findSecondLargestNum(arr []int) int {

	if len(arr) < 2 {
		panic("Array must have at least 2 elements")
	}

	bigNum := -1 << 31
	secondBigNum := -1 << 31

	for _, num := range arr {

		if num > bigNum {
			secondBigNum = bigNum
			bigNum = num
		} else if num > secondBigNum && num != bigNum {
			secondBigNum = num
		}

	}

	return secondBigNum

}

func main() {
	arr :=
		[]int{-1, -2, -43, -64, -2, -255, -53, 2}

	fmt.Println(findSecondLargestNum(arr))
}

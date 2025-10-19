package main

import (
	"fmt"
	"math/rand"
	"time"
)

func BubbleSortRecursive(arr []int, size int) {

	if size == 1 {
		return
	}

	for j := 0; j <= size-2; j++ {
		if arr[j] > arr[j+1] {
			arr[j+1], arr[j] = arr[j], arr[j+1]
		}
	}

	//Range reduced after recursion:
	BubbleSortRecursive(arr, size-1)

}

func main() {

	arr := make([]int, 10)
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)

	for index, _ := range arr {
		arr[index] = r.Intn(50)
	}

	fmt.Println("Unsorted Arr")

	for _, it := range arr {
		fmt.Print(it, " ")
	}
	fmt.Println()

	BubbleSortRecursive(arr, 10)

	fmt.Println("Sorted Arr")

	for _, it := range arr {
		fmt.Print(it, " ")
	}
	fmt.Println()

}

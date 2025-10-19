package main

import (
	"fmt"
	"math/rand"
	"time"
)

func RecursiveInsertionSort(arr []int, size int) {

	if size <= 1 {
		return
	}

	RecursiveInsertionSort(arr, size-1)
	key := arr[size-1]
	i := size - 2
	for i >= 0 && arr[i] > key {
		arr[i+1] = arr[i]
		i--
	}
	arr[i+1] = key

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

	RecursiveInsertionSort(arr, 10)

	fmt.Println("Sorted Arr")

	for _, it := range arr {
		fmt.Print(it, " ")
	}
	fmt.Println()

}

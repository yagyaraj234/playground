package main

import (
	"fmt"
	"math/rand"
	"time"
)

func BubbleSort(arr []int) {

	for i, _ := range arr {

		swapped := false

		for j := i + 1; j < len(arr)-i-1; j++ {
			if arr[j] > arr[j+1] {
				arr[i], arr[j+1] = arr[j+1], arr[i]
				swapped = true
			}
		}
		if !swapped {
			return
		}
	}

}

func main() {

	arr := make([]int, 5)
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)

	for idx, _ := range arr {
		// Generate a random integer between 0 and 99 (exclusive of 100)
		random := r.Intn(100)
		arr[idx] = random
	}
	for _, it := range arr {
		fmt.Print(it, " ")
	}

	fmt.Println()

	BubbleSort(arr)

	for _, it := range arr {
		fmt.Print(it, " ")
	}

}

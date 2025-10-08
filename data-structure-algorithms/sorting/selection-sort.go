package main

import (
	"fmt"
	"math/rand"
	"time"
)

func SelectionSort(a []int) {

	for i := 0; i < len(a); i++ {

		currentIndex := i

		for j := i + 1; j < len(a); j++ {
			if a[currentIndex] > a[j] {
				temp := a[currentIndex]
				a[currentIndex] = a[j]
				a[j] = temp
			}
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

	SelectionSort(arr)

	for _, it := range arr {
		fmt.Println(it, " ")
	}

}

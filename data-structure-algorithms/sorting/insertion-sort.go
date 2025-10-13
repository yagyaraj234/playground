package main

import (
	"fmt"
	"math/rand"
	"time"
)

func InsertionSort(a []int) {

	n := len(a)

	for i := 1; i < n; i++ {
		key := a[i]
		j := i - 1
		for j >= 0 && a[j] > key {
			a[j+1] = a[j]
			j--
		}
		a[j+1] = key
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
	InsertionSort(arr)

	for _, it := range arr {
		fmt.Print(it, " ")
	}
}

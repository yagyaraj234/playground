// main.go
package main

import (
	"fmt"
	"math/rand"
	"time"
)

// partition implements Hoare-style partition.
// It uses arr[low] as pivot, moves i from left and j from right,
// swaps until i >= j, then places pivot at its correct position and returns j.
// Note: We treat 'high' as the last valid index (like your C++ code).
func partition(arr []int, low, high int) int {
	pivot := arr[low]
	i := low
	j := high

	for i < j {
		// Move i right while arr[i] <= pivot
		for i <= high && arr[i] <= pivot {
			i++
		}
		// Move j left while arr[j] > pivot
		for j >= low && arr[j] > pivot {
			j--
		}
		// Swap when pointers haven't crossed
		if i < j {
			arr[i], arr[j] = arr[j], arr[i]
		}
	}
	// Place pivot at its final position
	arr[low], arr[j] = arr[j], arr[low]
	return j
}

// quickSort sorts arr in-place between indices [low, high] inclusive.
func quickSort(arr []int, low, high int) {
	if low < high {
		p := partition(arr, low, high)
		quickSort(arr, low, p)
		quickSort(arr, p+1, high)
	}
}

func main() {
	source := rand.NewSource(time.Now().UnixNano())
	r := rand.New(source)

	n := 20
	arr := make([]int, n)

	fmt.Println("Unsorted Array")
	for i := 0; i < n; i++ {
		val := r.Intn(100)
		arr[i] = val
		fmt.Print(val, " ")
	}
	fmt.Println()

	fmt.Println("Sorted Array")
	// In your C++ code you called quickSort(arr, 0, n); with high as n,
	// but your implementation expects 'high' to be the last valid index.
	// So in Go we pass n-1 (this matches correct bounds and the logic above).
	quickSort(arr, 0, n-1)

	for i := 0; i < n; i++ {
		fmt.Print(arr[i], " ")
	}
	fmt.Println()
}

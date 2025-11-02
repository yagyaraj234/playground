package main

import (
	"fmt"
	"math/rand"
	"time"
)

func merge(a, b []int) []int {

	var temp []int

	i := 0
	j := 0

	for i < len(a) && j < len(b) {
		if a[i] < b[j] {
			temp = append(temp, a[i])
			i++
		} else {
			temp = append(temp, b[j])
			j++
		}
	}

	for i < len(a) {
		temp = append(temp, a[i])
		i++
	}
	for j < len(b) {
		temp = append(temp, b[j])
		j++
	}

	return temp

}

func MergeSort(a []int) []int {

	n := len(a)
	mid := n / 2

	if n <= 1 {
		return a
	}

	leftArr := MergeSort(a[:mid])
	rightArr := MergeSort(a[mid:])

	return merge(leftArr, rightArr)

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

	result := MergeSort(arr)

	for _, it := range result {
		fmt.Println(it, " ")
	}
}

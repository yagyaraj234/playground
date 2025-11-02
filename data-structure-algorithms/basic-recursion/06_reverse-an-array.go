package main

import (
	"fmt"
	"math/rand"
)

func ReverseArr(arr *[]int) {
	n := len(*arr)

	if n == 0 || n == 1 {
		return
	}

	(*arr)[0], (*arr)[n-1] = (*arr)[n-1], (*arr)[0]

	// var newArr []int
	sub := (*arr)[1 : n-1]

	ReverseArr(&sub)

}

func main() {

	arr := make([]int, 6)

	for index, _ := range arr {
		random := rand.Intn(100)
		arr[index] = random
	}

	fmt.Println(arr)

	ReverseArr(&arr)

	fmt.Println(arr)

}

package main

import "fmt"

func doubleArray(arr *[5]int) {

	// for index, num := range arr {
	// 	arr[index] = num * 2
	// }

	for index, _ := range arr {
		(*arr)[index] *= 2
	}

}

func main() {
	arr := [5]int{1, 2, 3, 4, 5}
	doubleArray(&arr)
	// arr = [2,4,6,8,10]

	fmt.Println(arr)

}

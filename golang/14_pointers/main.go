package main

import "fmt"

// pointer store memory address of the vaiable

func changeNum(num *int){
	*num=5

	fmt.Println("In changed num:",*num)
}
func main(){
	num:=2

	fmt.Println("Memory Address: ",&num)

	changeNum(&num)

	fmt.Println("After changing in changeNum: ",num)
}
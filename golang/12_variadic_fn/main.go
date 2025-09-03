package main

import "fmt"


func sum(nums ...int) int{
	total:=0

	for _,num:= range nums{
		total+=num
	}

	return total
}

func main(){
 fmt.Println(sum(1,2,3,4,52,2))

 arrnum:=[]int{1,2,54,6,5,3,43}

 fmt.Println(sum(arrnum...))
}
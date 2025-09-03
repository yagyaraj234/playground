package main

import "fmt"


func counter()func() int{
	count:=0

	return func()int{
		for i:=0;i<10;i++{
			count++
		}
		return count
	}
}

func main(){
	increment:=counter()

	fmt.Println(increment())
	fmt.Println(increment())
	fmt.Println(increment())
}
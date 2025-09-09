package main

import (
	"errors"
	"fmt"
)

// Problem 5: Custom Error Handling

// Topic: Errors

// Create a function Divide(a, b float64) (float64, error) that divides a by b.

// If b is 0, return a custom error using errors.New("cannot divide by zero").

// Test this function with a slice of numbers as divisors and handle errors gracefully.

func Divide(a,b float64)(float64,error){
	if(b==0){
		return 0,errors.New("cannot divide by 0")
	}

	return a/b,nil
}

func main(){

	ans,error:=Divide(1,0)

	if(error != nil){
		fmt.Println(error)
	}else{
		fmt.Println(ans)
	}


}
package main

import "fmt"


func main(){
	var nums[5]int;

	// get the length of an array
	fmt.Println(len(nums))

	//  add element in arrays
	nums[0]=1

	// get the specific index values
	fmt.Println(nums[0])

	var name[5]string
	fmt.Println(name)


	name[2]="testing index"
	fmt.Println(name)



	// adding elements while declaring

	var username=[3]string{"yagya","raj","lodhi"}

	fmt.Println(username)
	fmt.Println(len(username))


	//  2-D array

	var matrix=[2][2]int{{1,2},{3,4}}
	fmt.Println(matrix)


	// if fixed size is there you can use array 
	// memory optimization & constant time access
	// otherwise use  slices
}

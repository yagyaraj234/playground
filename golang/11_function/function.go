package main

import "fmt"


func addTwoNums(a int,b int)int{
	return a+b
}

//  function with multiple return values
func addSubsTwoNums(a,b int) (int, int){
	return a+b, a-b
}


// accepting as a fn
func getCalTwoNums(fn func(a,b int) int){
	result:=fn(5,6)
	fmt.Println("result form fn",result)
}

// return a fun

func returnFn()(func(a,b int) int){
	return addTwoNums
}

func main(){

	fmt.Println(addTwoNums(3,4))

	
	// in go one function can return multiple values
	num1,num2:=addSubsTwoNums(9,4)

	fmt.Println(num1,num2)

	getCalTwoNums(addTwoNums)


	fn:=returnFn()

	fmt.Println("With return Fn ",fn(3,4))


}

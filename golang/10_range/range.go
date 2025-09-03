package main

import "fmt"

// iterating over data structure
func main(){

	nums:=[]int {1,2,4}

	//  with for loop
	for i:=0;i<len(nums);i++{
		fmt.Println(nums[i])
	}

	sum:=0
	// with range
	for index,num:=range nums{
		sum+=num
		fmt.Println(index,": ",num )
	}

	fmt.Println("sum of nums: ",sum)

	// iterate thorugh map

	m:=map[string]int{"iphone":79990,"oneplus":44990,"samsung":69990}

	for key,value:= range m{
		fmt.Println(key,": ",value)
	}


	// using range in string

	str:="this is string"

	for idx,char:=range str{
		//idx -> starting byte of rune
		//char -> unicode code point rune
		fmt.Println(idx,":",char) // this will return the unicode
		fmt.Println(string(char)) // return character
	
	}
}

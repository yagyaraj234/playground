package main

import (
	"fmt"
	"maps"
)

// maps -> hash, object, dictionary
func main(){
	m:=make(map[string]string)



	//  setting elements
	m["name"]="Golang Course"
	m["duration"]="3hrs"

	// get
	
	// if key value doesn't exist in the map it will return zero value
	fmt.Println(m["name"],m["duration"],m["test"])



	fmt.Println("------------------------------")

	nums:=make(map[string]int)

	nums["iphone"]=79900

	fmt.Println(nums["iphone"],nums["nokia"],len(nums))

	//  deleting element form maps
	fmt.Println(nums)
	delete(nums,"iphone")

	fmt.Println(nums)

	//  to clear all the values
	clear(nums)

	// how to create map without make method


	new_map:=map[string]int{"price":45000,"quantity":4}
	fmt.Println(new_map["price"],new_map["quantity"])


	//  check is key is available or not

	value,ok:=new_map["price"]

	if ok{
		fmt.Println("It's ok and price is: ",value)
	}else{
		fmt.Println("It's not ok")
	}

	// to check equal or not
	new_map2:=map[string]int{"price":45000,"quantity":4}
	fmt.Println(maps.Equal(new_map,new_map2))
}
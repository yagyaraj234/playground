package main

import "fmt"


func main(){
	var celsius float32=43.2
	var farenheit float32=0



	farenheit = (celsius * 1.8) + 32; 

	fmt.Println(farenheit)
}
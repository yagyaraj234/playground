package main

import (
	"fmt"
	"time"
)


func main(){

	i:=3
	// simplem switch
	switch i {
		case 1:
			fmt.Println("This is one")
		case 2:
			fmt.Println("this si two")
		case 3:
			fmt.Println("This is 3")
		default:
			fmt.Println("this is other")
	
	}

	// multiple condition switch

	switch time.Now().Weekday(){
		case time.Saturday, time.Sunday:
			fmt.Println("It's weekend")
		default:
			fmt.Println("This is working day")

	}


	// type switch

	whoAMI:= func(i interface{}){
		switch t:=i.(type){
			case int:
				fmt.Println("It's an integer")
			case string:
				fmt.Println("It's string")
			
			case bool:
				fmt.Println("This is bool")
			default:
				fmt.Println("Other",t)

		}
	}

	whoAMI(5.423)

}
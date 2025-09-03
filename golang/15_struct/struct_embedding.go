package main

import "fmt"

type customer struct{
	name string
	email string
}


type order struct{
	id int
	status string
	amount float32
	customer
}

func main(){

 myOrder:= order{
	id:3,
	amount: 34,
	status:"received",
 }



 fmt.Println(myOrder)

//   adding customer detial

newCustomer:= customer{
	name:"yagyaraj",
	email:"hey@yagyaraj.com",
}

yagyarajOrder:= order{
	id:5,
	amount: 33,
	status: "delivered",
	customer:newCustomer,

}


fmt.Println(yagyarajOrder)

//  another way

yagyarajOrder2:= order{
	id:45,
	amount: 432,
	customer:customer{
		name:"yagyaraj",
	},
}

fmt.Println(yagyarajOrder2)


// updating valus

yagyarajOrder2.customer.email="yagyaraj@gmail.com"

fmt.Println(yagyarajOrder2)

}
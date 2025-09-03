package main

import (
	"fmt"
	"time"
)

// struct order
type order struct{
	order_name string
	amount float32
	status string
	address string
	order_id int
	created_At time.Time
	updated_At time.Time
}


// creating a constructor

func newOrder(order_id int,address,status,order_name string, amount float32) *order{
	// intial setup 
	myorder:= order{
		order_id: order_id,
		amount: amount,
		address: address,
		status: status,
		order_name: order_name,
		updated_At: time.Now(),
		created_At: time.Now() ,
	}

	return &myorder
}



//  method in struct

// receiver type
func (o *order) updateStatus(status string){
	o.status=status
	
}

func (o *order) getOrderAmount()float32{
	return o.amount
}


func main(){

var yagyaraj_order = order{
	order_id: 1,
	amount: 50.3,
	updated_At: time.Now(),
	status: "pending",
	created_At: time.Now(),
	address: "Hyderabad",
	order_name:"laptop",
}
//  update value
yagyaraj_order.status="Delivered"
//  get value
fmt.Println("Address",yagyaraj_order.address)

fmt.Println(yagyaraj_order)

yagyaraj_order2:= order{
	order_id:2,
	order_name: "mouse",
	amount:100,
}

// yagyaraj_order2.status="Deliverd"
yagyaraj_order2.updateStatus("Received")

fmt.Println(yagyaraj_order2.status)
fmt.Println(yagyaraj_order2.getOrderAmount())


//  using constructor

 yagyaraj_order3:= newOrder(3,"M.P","Delivered","Iphone",49990)

 fmt.Println(yagyaraj_order3)


//   without name of struct


language:= struct{
	name string
	rating float32
}{"hindi",4.9}

fmt.Println(language)

}
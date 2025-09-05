package main

import "fmt"

type OrderStatus string

const (
	Received  OrderStatus = "Received"
	Shipped               = "Shipped"
	Delivered             = "Delivered"
)

func ChangeOrderStatus(status OrderStatus) {

	fmt.Printf("Your order Status is %s\n", status)

}

// enumaterated types
func main() {

	ChangeOrderStatus(Received)
	ChangeOrderStatus(Delivered)

}

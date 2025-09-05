package main

import "fmt"

// how to create interface

type Paymenter interface {
	pay(amount float32)
}

//  interfaces

type Payment struct {
	gateway Paymenter
}

func (p *Payment) makePayment(amount float32) {

	// RajorpayPayment := Rajorpay{}
	// RajorpayPayment.pay(amount)

	// StripePayment := Stripe{}
	// StripePayment.pay(amount)
	p.gateway.pay(amount)

}

type Rajorpay struct {
}

func (r Rajorpay) pay(amount float32) {
	// logic to make payment
	fmt.Println("Making payment for razorpay of amount ", amount)
}

type Stripe struct {
}

func (r Stripe) pay(amount float32) {
	// logic to make payment
	fmt.Println("Making payment for stripe of amount ", amount)
}

func main() {

	// for razorpay

	RajorpayPayment := Rajorpay{}
	// RajorpayPayment.pay(amount)

	//for stipe
	// StripePayment := Stripe{}

	NewPayment := Payment{
		gateway: RajorpayPayment,
	}
	NewPayment.makePayment(399.00)

}

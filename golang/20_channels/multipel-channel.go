package main

import "fmt"

func main() {

	chan1 := make(chan int)
	chan2 := make(chan string)

	go func() {
		chan1 <- 10
	}()

	go func() {
		chan2 <- "pong"
	}()

	for i := 0; i < 2; i++ {
		select {
		case chan1Val := <-chan1:
			fmt.Println("Data received from chan 1", chan1Val)
		case chan2Val := <-chan2:
			fmt.Println("Data received from chan 2", chan2Val)

		}
	}
}

func getChannel(name chan string, done chan bool)

// no typesafety here we can send receive with channels

func getChannel1(name <-chan string, done chan<- bool)

// adding more type safety in channels

// <-chan // this will restrict only for receiving the message thorugh channel
// chan<- // only allow to send

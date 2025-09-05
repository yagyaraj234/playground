package main

import (
	"fmt"
	"time"
)

func emailSender(email chan string, done chan bool) {
	defer func() { done <- true }()
	for em := range email {
		fmt.Println("Sending Email to", em)
		time.Sleep(time.Second) // actual 1-minute delay per email
	}
}

func main() {
	email := make(chan string, 200) // buffered channel
	done := make(chan bool)

	// start ONE worker
	go emailSender(email, done)

	// send 5 emails
	for i := 0; i < 5; i++ {
		email <- fmt.Sprintf("hey%d@gmail.com", i)
	}
	close(email) // signal no more emails

	<-done // wait until worker finishes
}

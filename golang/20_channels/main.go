package main

import (
	"fmt"
	"math/rand"
	"time"
)

// communication beween goroutines are called " channels"

func processNum(NumChannel chan int) {

	// fmt.Println("Recieving", <-NumChannel)

	for num := range NumChannel {
		fmt.Println("Recieving", num)
		time.Sleep(time.Second)
	}
}

func main() {
	// MessageChannel := make(chan string)

	// MessageChannel <- "Ping" // channels are blocking util second side is not ready to received

	// msg := <-MessageChannel

	// fmt.Println(msg)

	NumChannel := make(chan int)

	go processNum(NumChannel)
	// NumChannel <- 5
	for {
		NumChannel <- rand.Intn(100)
	}

	// time.Sleep(time.Microsecond)
}

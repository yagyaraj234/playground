package main

import (
	"fmt"
	"time"
)

func task(id int) {
	fmt.Println("Doing task", id)
}

func main() {

	for i := 0; i < 10; i++ {
		go task(i)
	}

	time.Sleep(time.Second)

}

// go routines are kind of promise all to run in another thread and call and run

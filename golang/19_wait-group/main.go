package main

import (
	"fmt"
	"sync"
)

func task(id int, w *sync.WaitGroup) {
	fmt.Println("Doing task", id)
	defer w.Done()
}

func main() {

	//  creating a wait group
	var wg sync.WaitGroup

	for i := 0; i < 10; i++ {
		wg.Add(1)
		go task(i, &wg)
	}

	wg.Wait()

}

// go routines are kind of promise all to run in another thread and call and run

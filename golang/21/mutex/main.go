package main

import (
	"fmt"
	"sync"
)

// mutex -> mutual exclusion -> race condition  -> multi threading
// to overcome with race condition we use mutex
type Post struct {
	views int
	mu    sync.Mutex
}

func (p *Post) inc(wg *sync.WaitGroup) {
	defer func() {
		wg.Done()
		p.mu.Unlock()
	}()
	p.mu.Lock()
	p.views += 1
}

func main() {
	var wg sync.WaitGroup
	MyPost := Post{views: 0}

	for i := 0; i < 10000; i++ {
		wg.Add(1)
		go MyPost.inc(&wg)

	}

	wg.Wait()
	fmt.Println(MyPost.views)

}

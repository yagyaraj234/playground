package main

import "fmt"

type Player interface {
	Play()
	Pause()
	Stop()
	Next()
}

type Songs struct{}
type Podcast struct{}

func (s Songs) Play() {
	fmt.Println("Playing music")
}
func (s Songs) Pause() {

}
func (s Songs) Stop() {

}
func (s Songs) Next() {

}

func (p Podcast) Play() {
	fmt.Println("Playing podcast")
}
func (p Podcast) Pause() {

}
func (p Podcast) Stop() {

}
func (p Podcast) Next() {

}

func main() {
	Music := Songs{}
	Podcasts := Podcast{}

	Music.Play()
	Podcasts.Play()
}

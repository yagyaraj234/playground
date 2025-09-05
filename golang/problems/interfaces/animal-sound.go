package main

import "fmt"

type Animal interface {
	Speak() string
}

type Cat struct{}

func (c Cat) Speak() string {
	return "Meow"
}

type Dog struct{}

func (d Dog) Speak() string {
	return "Woof"
}

type Cow struct{}

func (c Cow) Speak() string {
	return "Moo"
}

func PrintSound(a Animal) {
	fmt.Println(a.Speak())
}

func main() {
	Animals := []Animal{
		Dog{},
		Cat{},
		Cow{},
	}

	for _, animal := range Animals {
		PrintSound(animal)
	}
}

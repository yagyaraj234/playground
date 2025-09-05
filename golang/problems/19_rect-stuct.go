package main

import "fmt"

type Rectangle struct {
	Width  float64
	Height float64
}

func (r *Rectangle) Area() float64 {
	return r.Width * r.Height
}
func (r *Rectangle) Perimeter() float64 {
	return 2 * (r.Height + r.Width)
}

func main() {
	rect1 := Rectangle{
		Width:  10,
		Height: 5,
	}

	fmt.Println(rect1.Area())
	fmt.Println(rect1.Perimeter())

}

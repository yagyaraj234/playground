package main

import "fmt"

// 🧩 Problem 1: Shape Area Calculator

// Description:
// You need to create an interface called Shape with a method Area() float64.

// Implement two structs: Rectangle (with width and height) and Circle (with radius).

// Both should implement the Area() method.

// Write a function PrintArea(s Shape) that prints the area of any shape passed.

// Test it by creating a rectangle and a circle.

// Hint: Think about how the formula for area changes but the rule (Area()) stays the same.

type Shape interface {
	Area()
}

type Shapes struct {
	ShapeType Shape
}

type Rectangle struct {
	height float32
	width  float32
}

func (r Rectangle) Area() {
	area := r.height * r.width
	fmt.Println("Area of Rectangle is", area)
}

type Circle struct {
	radius float32
}

func (c Circle) Area() {
	area := 22 / 7 * (c.radius * c.radius)
	fmt.Println("Area of Circle is", area)
}

func main() {

	// circle
	circle := Circle{radius: 4}
	circle.Area()

	// rectangle
	rectangle := Rectangle{height: 40.4, width: 12.5}
	rectangle.Area()

}

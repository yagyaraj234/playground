package main

import "fmt"

type Student struct {
	Name  string
	Age   int
	Grade string
}

func (s *Student) updateGrade(newGrade string) {
	s.Grade = newGrade
}

func main() {
	yagyaraj := Student{Name: "Yagyaraj",
		Age:   24,
		Grade: "C",
	}

	fmt.Println(yagyaraj)

	yagyaraj.updateGrade("B")

	fmt.Println(yagyaraj)
}

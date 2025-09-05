package main

import "fmt"

type Person struct {
	Name string
	Age  int
}

type Employee struct {
	Person
	Role string
}

func (e Employee) Details() string {
	return fmt.Sprintf("%s (%d) - %s", e.Name, e.Age, e.Role)
}

func main() {
	emp := Employee{Person{"Bob", 30}, "Developer"}
	fmt.Println(emp.Details()) // "Bob (30) - Developer"

}

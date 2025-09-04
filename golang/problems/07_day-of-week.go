package main

import "fmt"

func checkDayOfWeek(day int) string {

	switch day {
	case 0:
		return "Sunday"
	case 1:
		return "Monday"
	case 2:
		return "Tuesday"
	case 3:
		return "Wednesday"
	case 4:
		return "Thursday"
	case 5:
		return "Friday"
	case 6:
		return "Saturday"
	default:
		return "Sunday"
	}
}

func main() {

	fmt.Println(checkDayOfWeek(4))
	fmt.Println(checkDayOfWeek(1))
	fmt.Println(checkDayOfWeek(0))

}

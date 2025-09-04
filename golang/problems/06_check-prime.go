package main

import "fmt"

func isPrime(num int) bool {

	isPrime := true

	if num <= 1 {
		return false
	} else if num == 2 {
		return true
	} else if num%2 == 0 {
		return false
	}

	for i := 3; i*i <= num; i += 2 {
		if num%i == 0 {
			isPrime = false
			break
		}
	}

	return isPrime

}

func main() {
	fmt.Println(isPrime(94993))
	fmt.Println(isPrime(9))
	fmt.Println(isPrime(3))
	fmt.Println(isPrime(13))
}

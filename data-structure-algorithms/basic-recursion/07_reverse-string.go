package main

import "fmt"

// Recursive helper that works on a slice of runes.
func reverseRunes(runes []rune, start, end int) {
	if start >= end {
		return
	}

	// Swap characters
	runes[start], runes[end] = runes[end], runes[start]

	// Recurse inward
	reverseRunes(runes, start+1, end-1)
}

// Wrapper function for string
func ReverseString(str *string) {
	runes := []rune(*str) // convert to mutable runes
	reverseRunes(runes, 0, len(runes)-1)
	*str = string(runes) // update the original string
}

func main() {
	str := "Hello World 🌍"
	fmt.Println("Before:", str)
	ReverseString(&str)
	fmt.Println("After: ", str)
}

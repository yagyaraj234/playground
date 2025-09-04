package main

import (
	"fmt"
	"strings"
)

func wordFrequency(text string) map[string]int {
	words := strings.Split(text, " ")
	freq := make(map[string]int)

	for _, char := range words {
		freq[char]++
	}

	return freq
}

func main() {

	str := "this is golang series lets learn golang"

	fmt.Println(wordFrequency(str))

}

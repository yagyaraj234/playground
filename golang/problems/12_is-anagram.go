package main

import (
	"fmt"
	"sort"
	"strings"
)

func sortString(s string) string {
	runes := []rune(strings.ToLower(s))
	sort.Slice(runes, func(i, j int) bool { return runes[i] < runes[j] })
	return string(runes)
}

func isAnagram(s1, s2 string) bool {
	if len(s1) != len(s2) {
		return false
	}
	return sortString(s1) == sortString(s2)
}

func main() {
	fmt.Println(isAnagram("listen", "silent"))     // true
	fmt.Println(isAnagram("triangle", "integral")) // true
	fmt.Println(isAnagram("hello", "world"))       // false
}

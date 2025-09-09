package main

import "fmt"

func MergeMaps(map1, map2 map[string]int) map[string]int {
	newMap := make(map[string]int)

	// Add values from map1
	for key, val := range map1 {
		newMap[key] = val
	}

	// Add values from map2, summing if key exists
	for key, val := range map2 {
		if existing, ok := newMap[key]; ok {
			newMap[key] = existing + val
		} else {
			newMap[key] = val
		}
	}

	return newMap
}

func main() {
	result := MergeMaps(
		map[string]int{"a": 1, "b": 2},
		map[string]int{"b": 3, "c": 4},
	)
	fmt.Println(result)
}

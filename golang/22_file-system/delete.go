package main

import "os"

func main() {
	err := os.Remove("example2.txt")
	if err != nil {
		panic("File delted successfully")
	}

	println("file deleted successfully")
}

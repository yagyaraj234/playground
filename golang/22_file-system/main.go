package main

import (
	"fmt"
	"os"
	"strings"
)

func main() {

	file, error := os.Open("example.txt")

	if error != nil {
		//log the error
		panic(error)
	}

	fileInfo, error := file.Stat()

	if error != nil {
		panic(error)
	}
	// fmt.Println("File: ", fileInfo.Name())
	// fmt.Println("Is Directory ", fileInfo.IsDir())
	fmt.Println("Size ", fileInfo.Size())
	// fmt.Println("Mode/Permission of file", fileInfo.Mode())

	// fmt.Println("File modified at: ", fileInfo.ModTime())

	// how to read file

	defer file.Close()

	buffer := make([]byte, fileInfo.Size())

	d, err := file.Read(buffer)

	if err != nil {
		panic(err)
	}

	fmt.Println("Data ", d, buffer)

	for i := 0; i < len(buffer); i++ {
		println(string(buffer[i]))
	}

	f, err := os.ReadFile("example.txt")

	if err != nil {
		panic(err)
	}

	fmt.Println(string(f))

	// read folder

	dir, err := os.Open(".")

	if err != nil {
		panic(err)
	}
	defer dir.Close()
	DirInfo, err := dir.ReadDir(200)

	if err != nil {
		panic(err)
	}

	for _, item := range DirInfo {
		println(item.Name())
	}

	//  creating file

	newFile, err := os.Create("create.txt")
	if err != nil {
		panic(err)
	}

	defer newFile.Close()

	newFile.WriteString("Hi from go")

	newFile.WriteString("\nNice LAnguage")

	// read file and replace
	data, err := os.ReadFile("create.txt")

	if err != nil {
		panic(err)
	}

	content := strings.ReplaceAll(string(data), "LAnguage", "Language")

	fmt.Println(content)

	// Write updated content back
	err = os.WriteFile("create.txt", []byte(content), 0644)
	if err != nil {
		panic(err)
	}

	fmt.Println("File updated (text replaced) successfully!")

}

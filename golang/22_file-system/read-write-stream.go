package main

import (
	"bufio"
	"io"
	"os"
)

func ThrowError(err error) {
	if err != nil {
		panic(err)
	}
}

func main() {
	sourceFile, err := os.Open("create.txt")

	ThrowError(err)

	defer sourceFile.Close()

	destFile, err := os.Create("example2.txt")

	ThrowError(err)

	defer destFile.Close()

	reader := bufio.NewReader(sourceFile)
	writer := bufio.NewWriter(destFile)

	for {
		b, err := reader.ReadByte()

		if err == io.EOF {
			break
		}
		ThrowError(err)

		writeError := writer.WriteByte(b)

		ThrowError(writeError)

	}

	writer.Flush()

	println("Print line written to another file successfully.")

}

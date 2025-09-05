package main

import "fmt"

type Logger interface {
	Log(message string)
}

type ConsoleLogger struct{}

func (c ConsoleLogger) Log(message string) {
	fmt.Println("Logging into console")
}

type FileLogger struct{}

func (f FileLogger) Log(message string) {
	fmt.Println("Logging into file called logs.txt")
}

func ProcessLog(l Logger, message string) {
	l.Log(message)
}

func main() {

	// Console Logger
	console := ConsoleLogger{}
	ProcessLog(console, "This is a console log message")

	// File Logger
	fileLogger := FileLogger{}
	ProcessLog(fileLogger, "This is a file log message")
	ProcessLog(fileLogger, "Another file log entry")

	fmt.Println("Check log.txt for file logs.")

}

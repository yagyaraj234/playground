package main

import (
	"fmt"

	"github.com/fatih/color"
	"github.com/yagyaraj234/app/auth"
	"github.com/yagyaraj234/app/user"
)

func main() {
	auth.LoginWithCredentials("yagyaraj234", "Yagyaraj Lodhi")

	token := auth.GetSession()
	fmt.Println(token)
	user := user.User{
		Name:     "Yagyaraj Lodhi",
		Email:    "Yagyaraj@gmail.com",
		Password: "1234",
	}

	// println(user.Name, user.Email)

	color.Cyan(user.Email)
	color.Cyan(user.Password)

}

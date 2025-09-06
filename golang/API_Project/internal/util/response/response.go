package response

import (
	"encoding/json"
	"fmt"
	"net/http"
	"strings"

	"github.com/go-playground/validator/v10"
)

type Response struct {
	Status string `json:"status"`
	Error  string `json:"error"`
	Data   interface{}
}

const (
	StatusOk    = "OK"
	StatusError = "ERROR"
)

func WriteJson(w http.ResponseWriter, status int, data interface{}) error {

	w.Header().Set("Content-Type", "application/json")

	w.WriteHeader(status)

	return json.NewEncoder(w).Encode(data)

}

func GeneralError(err error) Response {

	return Response{
		Status: StatusError,
		Error:  err.Error(),
	}

}

func ValidationError(errs validator.ValidationErrors) Response {

	var errorMsg []string

	for _, err := range errs {
		switch err.ActualTag() {

		case "required":
			errorMsg = append(errorMsg, fmt.Sprintf("%s field is required", err.Field()))
		default:
			errorMsg = append(errorMsg, fmt.Sprintf("%s is invalid field", err.Field()))

		}
	}

	return Response{
		Status: StatusError,
		Error:  strings.Join(errorMsg, ", "),
	}

}

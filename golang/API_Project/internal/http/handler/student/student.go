package student

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"log/slog"
	"net/http"
	"strconv"

	"github.com/go-playground/validator/v10"
	"github.com/yagyaraj234/playground/internal/storage"
	"github.com/yagyaraj234/playground/internal/types"
	"github.com/yagyaraj234/playground/internal/util/response"
)

func New(storage storage.Storage) http.HandlerFunc {

	return func(w http.ResponseWriter, r *http.Request) {

		var student types.Student

		err := json.NewDecoder(r.Body).Decode(&student)

		if errors.Is(err, io.EOF) {
			// response.WriteJson(w, http.StatusBadRequest, response.GeneralError(err))

			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(fmt.Errorf("form body is empty")))

			return
		}

		if err != nil {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(err))
		}

		slog.Info("Validating user input")

		if err := validator.New().Struct(student); err != nil {
			Errors := err.(validator.ValidationErrors)
			response.WriteJson(w, http.StatusBadRequest, response.ValidationError(Errors))
			return
		}

		slog.Info("adding to the database")

		lastId, err := storage.CreateStudent(student.Name, student.Email, student.Password, student.Age)

		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
			return
		}

		response.WriteJson(w, http.StatusCreated, map[string]int64{"id": lastId})
	}

}

func GetById(storage storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		id := r.PathValue("id")

		slog.Info("getting a student by id", slog.String("id", id))

		intId, err := strconv.ParseInt(id, 10, 64)
		if err != nil {
			response.WriteJson(w, http.StatusBadRequest, response.GeneralError(err))
			return
		}

		student, error := storage.GetStudentById(intId)

		if error != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(error))
			return
		}

		response.WriteJson(w, http.StatusOK, student)

	}
}

func GetListOfUsers(storage storage.Storage) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {

		slog.Info("Query all the list of students")

		students, err := storage.GetStudentList()

		if err != nil {
			response.WriteJson(w, http.StatusInternalServerError, response.GeneralError(err))
		}

		response.WriteJson(w, http.StatusOK, students)
	}
}

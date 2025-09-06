package storage

import "github.com/yagyaraj234/playground/internal/types"

type Storage interface {
	CreateStudent(name, email, password string, age int) (int64, error)
	GetStudentById(id int64) (types.Student, error)
	GetStudentList() ([]types.Student, error)
}

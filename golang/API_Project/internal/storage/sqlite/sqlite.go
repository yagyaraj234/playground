package sqlite

import (
	"database/sql"
	"fmt"

	_ "github.com/mattn/go-sqlite3"
	"github.com/yagyaraj234/playground/internal/config"
	"github.com/yagyaraj234/playground/internal/types"
)

type Sqlite struct {
	Db *sql.DB
}

func (s *Sqlite) CreateStudent(name, email, password string, age int) (int64, error) {

	// get the storage and prepare the query
	statement, err := s.Db.Prepare("INSERT INTO students (name,email,password,age) values (?,?,?,?)")

	if err != nil {
		return 0, err
	}

	defer statement.Close()

	data, error := statement.Exec(name, email, password, age)

	if error != nil {
		return 0, error
	}
	id, errorId := data.LastInsertId()
	if errorId != nil {
		return 0, errorId

	}

	return id, nil

}

func (s *Sqlite) GetStudentById(id int64) (types.Student, error) {
	statement, err := s.Db.Prepare("SELECT id, name, email, age FROM students WHERE id= ? LIMIT 1")
	if err != nil {
		return types.Student{}, err
	}

	defer statement.Close()

	var student types.Student

	err = statement.QueryRow(id).Scan(&student.Id, &student.Name, &student.Email, &student.Age)

	if err != nil {
		if err == sql.ErrNoRows {
			return types.Student{}, fmt.Errorf("No user found  id: %s", fmt.Sprint(id))
		}

		return types.Student{}, fmt.Errorf("query error: %w", err)
	}

	return student, nil

}

func (s *Sqlite) GetStudentList() ([]types.Student, error) {
	statement, err := s.Db.Prepare("SELECT id, name, email, age FROM students LIMIT 20")
	if err != nil {
		return []types.Student{}, err
	}

	defer statement.Close()

	rows, error := statement.Query()

	if error != nil {
		return nil, error
	}

	defer rows.Close()

	var students []types.Student

	for rows.Next() {
		var student = types.Student{}
		err := rows.Scan(&student.Id, &student.Name, &student.Email, &student.Age)

		if err != nil {
			return nil, err
		}

		students = append(students, student)
	}

	return students, nil

}

func New(cfg *config.Config) (*Sqlite, error) {

	db, err := sql.Open("sqlite3", cfg.StoragePath)
	if err != nil {
		return nil, err
	}

	_, err = db.Exec(`CREATE TABLE IF NOT EXISTS students (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
	name TEXT,
	email TEXT,
	password TEXT,
	age Text
	)`)

	if err != nil {
		return nil, err
	}

	return &Sqlite{
		Db: db,
	}, nil

}

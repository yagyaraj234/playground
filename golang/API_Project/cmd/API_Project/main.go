package main

import (
	"context"
	"fmt"
	"log"
	"log/slog"
	"net/http"
	"os"
	"os/signal"
	"syscall"
	"time"

	"github.com/yagyaraj234/playground/internal/config"
	"github.com/yagyaraj234/playground/internal/http/handler/student"
	"github.com/yagyaraj234/playground/internal/storage/sqlite"
)

func main() {
	fmt.Println("Welcome to API Project")
	// load configuration
	cfg := config.MustLoad()

	// database setups

	db, error := sqlite.New(cfg)

	if error != nil {
		log.Fatal(error)
	}

	slog.Info("Storage Initilised", slog.String("env", cfg.Env))

	// router setup
	router := http.NewServeMux()

	router.HandleFunc("POST /api/students/new", student.New(db))
	router.HandleFunc("GET /api/students/{id}", student.GetById(db))
	router.HandleFunc("GET /api/students", student.GetListOfUsers(db))

	// server setup

	server := http.Server{
		Addr:    cfg.Addr,
		Handler: router,
	}

	done := make(chan os.Signal, 1)

	signal.Notify(done, os.Interrupt, syscall.SIGINT, syscall.SIGTERM)

	go func() {
		err := server.ListenAndServe()

		if err != nil {
			log.Fatal("Server not able to start")
		}
	}()

	<-done

	slog.Info("Shutting Down the server")

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	err := server.Shutdown(ctx)
	if err != nil {
		slog.Error("Failed to shutdown the server", slog.String("error", err.Error()))
	}

	slog.Info("Server shutdown server Successfully")

}

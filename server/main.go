package main

import (
	"fmt"
	"time"
	"context"
	"net/http"
	"path"
	"strings"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

func getPath(p string) (head, tail string) {
	p = path.Clean("/" + p)
	i := strings.Index(p[1:], "/") + 1
	if i <= 0 {
		return p[1:], "/"
	}
	return p[1:i], p[i:]
}

func main() {
	// http.Handle("/", http.FileServer(http.Dir("../public")))
	http.HandleFunc("/latest", func(w http.ResponseWriter, r *http.Request) {
		 w.Header().Set("Access-Control-Allow-Origin", "*")
    if (r.Method == "OPTIONS") {
        w.Header().Set("Access-Control-Allow-Headers", "Authorization")
    } else {
			user := strings.Join(r.URL.Query()["username"], "")
			ctx := context.Background()
			tc := oauth2.NewClient(ctx, nil)
			client := github.NewClient(tc)
			repos, _, err := client.Repositories.List(ctx, user, &github.RepositoryListOptions{Type:"owner", Sort:"updated"})
			if err != nil {
				fmt.Printf("couldn't gather clients repositories failed with %s", err)
				return
			}
			res := time.Duration.String(time.Now().Local().Sub(repos[0].GetUpdatedAt().Local()))
			fmt.Println(res)
			w.Write([]byte(res))
    }
	})
	fmt.Println(http.ListenAndServe(":8080", nil))
}

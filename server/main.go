package main

import (
	"fmt"
	"time"
	"context"
	"net/http"
	"strings"
	"math"

	"github.com/google/go-github/github"
	"golang.org/x/oauth2"
)

func main() {
	http.HandleFunc("/latest", func(w http.ResponseWriter, r *http.Request) {
		user, ctx := strings.Join(r.URL.Query()["username"], ""), context.Background()
		tc := oauth2.NewClient(ctx, nil)
		client := github.NewClient(tc)

		repos, _, err := client.Repositories.List(ctx, user, &github.RepositoryListOptions{Type:"owner", Sort:"updated"})
		if err != nil {
			fmt.Printf("couldn't gather clients repositories failed with %s", err)
			return
		}

		diff := time.Duration.Hours(time.Now().Local().Sub(repos[0].GetUpdatedAt().Local()))
		if diff < 1 {
			w.Write([]byte("Less than an hour ago"))
		} else {
			suff := "hours"
			if diff > 24 {
				diff /= 24
				suff = "days"
			}
			res := fmt.Sprint(math.Round(diff))
			w.Write([]byte(res + " " + suff + " ago"))
		}
	})

	fmt.Println(http.ListenAndServe(":8080", nil))
}

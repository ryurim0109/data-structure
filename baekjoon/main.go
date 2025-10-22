package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

// https://www.acmicpc.net/problem/11758
// CCW

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)

	defer writer.Flush()

	var p1, p2, p3 []int

	for i := 0; i < 3; i++ {
		line, _ := reader.ReadString('\n')
		fields := strings.Fields(line)

		numList := make([]int, len(fields))
		for j, field := range fields {
			numList[j], _ = strconv.Atoi(field)
		}

		switch i {
		case 0:
			p1 = numList
		case 1:
			p2 = numList
		case 2:
			p3 = numList
		}
	}

	fmt.Println(p1, p2, p3)
}

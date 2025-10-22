package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func CCW(p1, p2, p3 []int) int {
	x1, y1, x2, y2, x3, y3 := p1[0], p1[1], p2[0], p2[1], p3[0], p3[1]
	value := (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1)
	return value
}

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

	value := CCW(p1, p2, p3)

	if value > 0 {
		fmt.Print("1")
	}
	if value < 0 {
		fmt.Print("-1")
	}
	if value == 0 {
		fmt.Print("0")
	}
}

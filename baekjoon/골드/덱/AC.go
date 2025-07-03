package main

import (
	"bufio"
	"fmt"
	"os"
	"strconv"
	"strings"
)

func listWithComma(list []int, left int, right int, isReverse bool) string {
	strs := make([]string, 0, right-left)

	if isReverse {
		for i := right - 1; i >= left; i-- {
			strs = append(strs, strconv.Itoa(list[i]))
		}
	} else {
		for i := left; i < right; i++ {
			strs = append(strs, strconv.Itoa(list[i]))
		}
	}

	return "[" + strings.Join(strs, ",") + "]"
}

var result []string

func solution(fn string, count int, elements []int) {
	isReverse := false
	isError := false

	left := 0
	right := count

	for _, r := range fn {
		switch r {
		case 'R':
			isReverse = !isReverse
		case 'D':
			if left >= right {
				isError = true
				break
			}
			if isReverse {
				right--
			} else {
				left++
			}
		}
	}

	if isError {
		result = append(result, "error")
	} else {
		result = append(result, listWithComma(elements, left, right, isReverse))
	}
}

func main() {
	reader := bufio.NewReader(os.Stdin)
	writer := bufio.NewWriter(os.Stdout)

	defer writer.Flush()

	var T int
	fmt.Fscanln(reader, &T)

	for i := 0; i < T; i++ {
		var fn string
		var count int
		var elementsStr string

		fmt.Fscanln(reader, &fn)
		fmt.Fscanln(reader, &count)
		fmt.Fscanln(reader, &elementsStr)

		elementsStr = strings.Trim(elementsStr, "[]")

		elementsSlice := strings.Split(elementsStr, ",")

		elements := make([]int, 0)

		if elementsStr != "" {
			for _, str := range elementsSlice {
				element, _ := strconv.Atoi(str)
				elements = append(elements, element)
			}
		}
		solution(fn, count, elements)
	}

	for _, res := range result {
		fmt.Println(res)
	}
}

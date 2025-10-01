package main

func maxProfit(prices []int) int {

	profit := 0
	MinimumBuyPrice := prices[0]

	for _, val := range prices {
		if val < MinimumBuyPrice {
			MinimumBuyPrice = val
		} else {
			newProfit := val - MinimumBuyPrice

			if newProfit > profit {
				profit = newProfit
			}
		}

	}

	return profit

}

func main() {

	prices := []int{7, 1, 5, 3, 6, 4}

	maxProfit(prices)
}

// // Solution 1: (BRUTE FORCE) O(n*n)
// iterate each element using two loop i, j
// and campare the profit with i index to all left item in the index and return the profit value
// ->

// // using single iterator O(N)
// -> create on MinimumBuyPrice store first index
// -> now compare with all the index and update profit value
// by subtracting with mimum but prices
// as well update the minimum buy price if you find another min price

self.onmessage = (e) => {
  const data = e.data

  if (data.problemSize) {
    const minAbsSum = new MinAbsSum(parseInt(data.problemSize))
    const result = minAbsSum.solve()
    postMessage({ result: result })
  }
}

class MinAbsSum {
  constructor(arraySize) {
    this.A = new Array(arraySize)

    this.fillArrayWithRandomValues(-100, 100)
  }

  fillArrayWithRandomValues(min, max) {
    this.A.fill(0)
    this.A.forEach((value, index) => {
      this.A[index] = getRandomInt(min, max)
    })
  }

  solve() {
    this.A.forEach((value, index, array) => {
      array[index] = Math.abs(value)
    })
    const maxValue = Math.max(...this.A)

    const sameValuesCount = new Array(maxValue + 1)
    sameValuesCount.fill(0)
    this.A.forEach((value) => {
      ++sameValuesCount[value]
    })

    postMessage({ sameValuesCount: sameValuesCount })

    const maxSum = sameValuesCount.reduce((previousValue, currentValue, currentIndex) => {
      console.log(previousValue, currentValue, currentIndex)
      return previousValue + currentValue * currentIndex
    }, 0)

    postMessage({ maxSum: maxSum })

    const dp = new Array(maxSum + 1)
    dp.fill(-1)
    dp[0] = 0

    sameValuesCount.forEach((countValue, countIndex) => {
      if (countValue > 0) {
        dp.forEach((dpValue, dpIndex, dpArray) => {
          if (dpValue >= 0) {
            dpArray[dpIndex] = countValue
          } else if (dpIndex >= countIndex && dpArray[dpIndex - countIndex] > 0) {
            dpArray[dpIndex] = dpArray[dpIndex - countIndex] - 1
          }
        })
      }
      const currentProgress = Math.ceil(countIndex / sameValuesCount.length * 100) + "%"
      postMessage({ progress: currentProgress })
    })

    let minSum = maxSum
    for (let i = Math.floor(maxSum / 2); i >= 0; --i) {
      if (dp[i] >= 0) {
        minSum = Math.min(minSum, maxSum - 2 * i)
        break
      }
    }

    return minSum
  }
}

function getRandomInt(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

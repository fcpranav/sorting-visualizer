// Each sorting algorithm should push animations to an animationList

// QuickSort with pivot always being low
export const quickSort = (list, low, high, animationList) => {
    if (low < high) {
        let i = low;
        let j = high;
        let pivot = low;

        while (i < j) {
            while (list[i] <= list[pivot]) {
                i = i + 1;
            }

            while (list[j] > list[pivot]) {
                j = j -1;
            }

            if (i < j) {
                swap(list, i, j, animationList);
            }
        }

        
        swap(list, pivot, j, animationList);
        animationList.push(["color", j, "#009f75"]);

        quickSort(list, low, j - 1, animationList);
        quickSort(list, j + 1, high, animationList);
    }

    if (low === high) {
        animationList.push(["color", low, "#009f75"]);
    }
}

export const bubbleSort = (list, animationList) => {
    var endIndex = list.length - 1;
    var atleastOneSwap = true;

    while (atleastOneSwap) {
        let currentIndex = 0;
        atleastOneSwap = false;
        while (currentIndex < endIndex) {
            if (list[currentIndex] > list[currentIndex + 1]) {
                swap(list, currentIndex, currentIndex + 1, animationList)
                atleastOneSwap = true;
            }
            currentIndex = currentIndex + 1;
        }
        animationList.push(["color", endIndex, "#009f75"]);
        endIndex = endIndex - 1;
    }
}

const swap = (list, swapOne, swapTwo, animationList) => {
    let temp = list[swapOne];
    list[swapOne] = list[swapTwo];
    list[swapTwo] = temp;

    // Highlight bars that are being swapped
    animationList.push(["color", swapOne, "#ef4444"]);
    animationList.push(["color", swapTwo, "#ef4444"]);

    // Swap the bars
    animationList.push(["swap", swapOne, swapTwo]);

    // Revert colors
    animationList.push(["color", swapOne, "#818182"]);
    animationList.push(["color", swapTwo, "#818182"]);
}
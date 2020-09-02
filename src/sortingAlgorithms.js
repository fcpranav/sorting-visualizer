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

        quickSort(list, low, j - 1, animationList);
        quickSort(list, j + 1, high, animationList);
    }
}

const swap = (list, swapOne, swapTwo, animationList) => {
    let temp = list[swapOne];
    list[swapOne] = list[swapTwo];
    list[swapTwo] = temp;

    // Highlight bars that are being swapped
    animationList.push(["color", swapOne, "#c97806"]);
    animationList.push(["color", swapTwo, "#c97806"]);

    // Swap the bars
    animationList.push(["swap", swapOne, swapTwo]);

    // Revert colors
    animationList.push(["color", swapOne, "#2406c9"]);
    animationList.push(["color", swapTwo, "#2406c9"]);
}
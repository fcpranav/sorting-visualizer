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

    animationList.push(["swap", swapOne, swapTwo]);
}
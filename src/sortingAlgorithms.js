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
        animationList.push({ type: "color", targetBar: j, colorHex: "#009f75" });

        quickSort(list, low, j - 1, animationList);
        quickSort(list, j + 1, high, animationList);
    }

    if (low === high) {
        animationList.push({ type: "color", targetBar: low, colorHex: "#009f75" });
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
        animationList.push({ type: "color", targetBar: endIndex, colorHex: "#009f75" });
        endIndex = endIndex - 1;
    }
}

export const mergeSort = (list, low, high, animationList) => {
    if (low < high) {
        const mid = Math.floor((low + high) / 2); 

        mergeSort(list, low, mid, animationList);
        mergeSort(list, mid + 1, high, animationList);

        // Perform merging of two arrays
        mergeArrays(list, low, mid, high, animationList);
    }
}

const mergeArrays = (list, low, mid, high, animationList) => {
    let i = low;
    let j = mid + 1; 

    let mergingArray = [];

    while (i <= mid || j <= high) {
        // If we already finished merging the i -> mid subarray
        if (i > mid) {
            mergingArray.push(list[j]);
            j = j + 1;
        } 
        // If we already finished merging the mid + 1 -> high subarray
        else if (j > high) {
            mergingArray.push(list[i]);
            i = i + 1;
        }
        else if (list[i] <= list[j]) {
            mergingArray.push(list[i]);
            i = i + 1;
        } else {
            mergingArray.push(list[j]);
            j = j + 1;
        }
    }

    // Copy over mergedArray to main list
    var index;
    for (index = low; index <= high; index++) {
        list[index] = mergingArray[index - low];
    }

    // Animations

    // Showcase merging
    for (index = low; index <= high; index++) {
        animationList.push({ type: "set", targetBar: index, colorHex: "#ef4444", barVal: list[index] });
    }

    // Post merge animation color
    let colorHex = "#818182"

    // Bars in sorted position
    if (list.length === (high - low + 1)) {
        colorHex = "#009f75"
    }

    for (index = low; index <= high; index++) {
        animationList.push({ type: "color", targetBar: index, colorHex: colorHex });
    }
}

const swap = (list, swapOne, swapTwo, animationList) => {
    let temp = list[swapOne];
    list[swapOne] = list[swapTwo];
    list[swapTwo] = temp;
    
    swapAnimate(swapOne, swapTwo, animationList);
}

const swapAnimate = (swapOne, swapTwo, animationList) => {
    // Highlight bars that are being swapped
    animationList.push({ type: "color", targetBar: swapOne, colorHex: "#ef4444" });
    animationList.push({ type: "color", targetBar: swapTwo, colorHex: "#ef4444" });

    // Swap the bars
    animationList.push({ type: "swap", targetOne: swapOne, targetTwo: swapTwo });

    // Revert colors
    animationList.push({ type: "color", targetBar: swapOne, colorHex: "#818182" });
    animationList.push({ type: "color", targetBar: swapTwo, colorHex: "#818182" });
}
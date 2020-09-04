import { quickSort, bubbleSort, mergeSort } from './sortingAlgorithms';
import { generateArray } from './util';

test('quickSort output matches array.sort() output', () => {
    let testArray = generateArray(100);
    let testArrayCopy = [...testArray];

    quickSort(testArray, 0, testArray.length - 1, []);
    
    expect(testArray).toEqual(testArrayCopy.sort((a, b)=> a - b));
});

test('bubbleSort output matches array.sort() output', () => {
    let testArray = generateArray(100);
    let testArrayCopy = [...testArray];

    bubbleSort(testArray, []);
    
    expect(testArray).toEqual(testArrayCopy.sort((a, b)=> a - b));
});

test('mergeSort output matches array.sort() output', () => {
    let testArray = generateArray(100);
    let testArrayCopy = [...testArray];

    mergeSort(testArray, 0, testArray.length - 1, []);
    
    expect(testArray).toEqual(testArrayCopy.sort((a, b)=> a - b));
});
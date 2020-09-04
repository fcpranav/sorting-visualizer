export const getMaxInArray = (array) => {
    let max = 0;
    
    for (let num of array) {
      if (num > max) {
          max = num;
      }
    };

    return max;
}

export const generateArray = (length) => {
  var generatedArray = [];

  for (let i = 0; i < length; i++) {
    generatedArray.push(Math.ceil(Math.random() * length));
  };

  return generatedArray;
}
// All valid credit card numbers
const valid1 = [4, 5, 3, 9, 6, 7, 7, 9, 0, 8, 0, 1, 6, 8, 0, 8];
const valid2 = [5, 5, 3, 5, 7, 6, 6, 7, 6, 8, 7, 5, 1, 4, 3, 9];
const valid3 = [3, 7, 1, 6, 1, 2, 0, 1, 9, 9, 8, 5, 2, 3, 6];
const valid4 = [6, 0, 1, 1, 1, 4, 4, 3, 4, 0, 6, 8, 2, 9, 0, 5];
const valid5 = [4, 5, 3, 9, 4, 0, 4, 9, 6, 7, 8, 6, 9, 6, 6, 6];

// All invalid credit card numbers
const invalid1 = [4, 5, 3, 2, 7, 7, 8, 7, 7, 1, 0, 9, 1, 7, 9, 5];
const invalid2 = [5, 7, 9, 5, 5, 9, 3, 3, 9, 2, 1, 3, 4, 6, 4, 3];
const invalid3 = [3, 7, 5, 7, 9, 6, 0, 8, 4, 4, 5, 9, 9, 1, 4];
const invalid4 = [6, 0, 1, 1, 1, 2, 7, 9, 6, 1, 7, 7, 7, 9, 3, 5];
const invalid5 = [5, 3, 8, 2, 0, 1, 9, 7, 7, 2, 8, 8, 3, 8, 5, 4];

// Can be either valid or invalid
const mystery1 = [3, 4, 4, 8, 0, 1, 9, 6, 8, 3, 0, 5, 4, 1, 4];
const mystery2 = [5, 4, 6, 6, 1, 0, 0, 8, 6, 1, 6, 2, 0, 2, 3, 9];
const mystery3 = [6, 0, 1, 1, 3, 7, 7, 0, 2, 0, 9, 6, 2, 6, 5, 6, 2, 0, 3];
const mystery4 = [4, 9, 2, 9, 8, 7, 7, 1, 6, 9, 2, 1, 7, 0, 9, 3];
const mystery5 = [4, 9, 1, 3, 5, 4, 0, 4, 6, 3, 0, 7, 2, 5, 2, 3];

// An array of all the arrays above
const batch = [valid1, valid2, valid3, valid4, valid5, invalid1, invalid2, invalid3, invalid4, invalid5, mystery1, mystery2, mystery3, mystery4, mystery5];

// Add your functions below:

// Function that validates if the card num is valid or not
const validateCred = numArray => {

  // original array inverted
  let newArray = new Array;
  for(let i = numArray.length - 1; i >= 0; i--) {
    newArray.push(numArray[i]);
  }

  // saving the check number then removing it from the inverted array
  const check = newArray[0];
  newArray.shift();

  // changing the values in the array according to the algorithm
  let finalArray = new Array;
  for(let j = 0; j < newArray.length; j++) {

    // if the index modulo 2 is 0
    if(j % 2 == 0) {
      // and the value multiplied by 2 is larger than 9 then subtract 9 and push it to new array
      if((newArray[j] * 2) > 9) {
        finalArray.push((newArray[j] * 2) - 9)
        //if it's not higher than 9 just multiply by 2 and push
      } else{
        finalArray.push(newArray[j] * 2)
      }
      //if the modulo is not 0 push as it is
    } else {
      finalArray.push(newArray[j])
    }
  }

// reducing the final array to a single number
  finalArray = finalArray.reduce((prev, cur) => {
    return prev + cur
  }, 0);
  // then add the check number
  finalArray = finalArray + check;

  //if the answer modulo 10 is 0 then the function will return valid, else will return invalid
  let answer;
  if(finalArray % 10 == 0) {
    answer = 'valid';
  } else {
    answer = 'invalid';
  }
  return answer
}

// Function that sorts the invalid credit cards from the parent array
const findInvalidCards = credCards => {

  // Looping through each array in the parent array and calling validateCred on each one
  let invalidCards = new Array;
  credCards.forEach(card => {
    // If an array is found invalid it will be pushed to the invalidCards array
    if(validateCred(card) == 'invalid') {
      invalidCards.push(card);
    }
  });
  return invalidCards
}

// Function that identifies the companies that issues invalid cards
const idInvalidCardCompanies = invalidCards => {
  let faultyCompanies = new Array;
  // Looping through the invalid credit cards array to find which companies issued them based on unique first digit
  invalidCards.forEach(card => {
    if(card[0] == 3) {
      faultyCompanies.push('Amex');
    }else if(card[0] == 4) {
      faultyCompanies.push('Visa');
    }else if(card[0] == 5) {
      faultyCompanies.push('Mastercard');
    }else if(card[0] == 6) {
      faultyCompanies.push('Discover');
    }else {
      faultyCompanies.push('Unknown company');
    }
  });

  // Deleting the duplicates in the faultyCompanies array
  faultyCompanies = [...new Set(faultyCompanies)];

  return faultyCompanies;
}
console.log(findInvalidCards(batch));
console.log(idInvalidCardCompanies(findInvalidCards(batch)));

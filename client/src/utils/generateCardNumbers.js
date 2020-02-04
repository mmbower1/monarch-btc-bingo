
const generateCardNumbers = () => {
    //[] --> [1-15, 16-30, 31-45, 46-60, 61-75]
    let lowerRange = 1;
    let upperRange = 0;
    let cardNumbers = [];
    for (var i = 0; i < 5; i++) {
      upperRange += 15;
      // console.log("================= Lower Range " + lowerRange);
      // console.log("================= Upper Range " + upperRange);
      for (var j = 0; j < 5; j++) {
        // console.log("================= Inner loop ");
        let random = Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange;
        while (cardNumbers.indexOf(random) !== -1) {
          random = Math.floor(Math.random() * (upperRange - lowerRange + 1)) + lowerRange;
        }
        cardNumbers.push(random);
      }
      lowerRange += 15;
    }
    console.log("randomNumbers in generateCardNumbers " + cardNumbers) ;
    return cardNumbers;
  }
    
  export default generateCardNumbers;
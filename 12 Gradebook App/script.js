// function to calculate average grade based on array length
function getAverage(scores) {
  let average = 0;
  let sum  = 0
  for (let i = 0; i < scores.length; i++) {
    sum += scores[i];
  }
  average = sum / scores.length;
  return average;
}

/* console.log(getAverage([92, 88, 12, 77, 57, 100, 67, 38, 97, 89]));
console.log(getAverage([45, 87, 98, 100, 86, 94, 67, 88, 94, 95])); */

// get individual student grades:
function getGrade(score) {
  if (score === 100) {
    return "A++";
  } else if (score >= 90 && score <= 99) {
    return "A";
  } else if (score >= 80 && score <= 89) {
    return "B";
  } else if (score >= 70 && score <= 79) {
    return "C";
  } else if (score >= 60 && score <= 69) {
    return "D";
  } else if (score >= 0 && score <= 59) {
    return "F";
  }
}

/* console.log(getGrade(96));
console.log(getGrade(82));
console.log(getGrade(56)); */

// decide if student passes the course based on grade:
function hasPassingGrade(score) {
  if (getGrade(score) === "F") {
    return false;
  } else {
    return true;
  }
}

/* console.log(hasPassingGrade(100));
console.log(hasPassingGrade(53));
console.log(hasPassingGrade(87)); */

// a message is printed with the class average and student grade, combining all 3 functions above: 
function studentMsg(totalScores, studentScore) {
  if (hasPassingGrade(studentScore) === false) {
    return `Class average: ${getAverage(totalScores)}. Your grade: ${getGrade(studentScore)}. You failed the course.`;
  } else {
    return `Class average: ${getAverage(totalScores)}. Your grade: ${getGrade(studentScore)}. You passed the course.`;
  }
}
console.log(studentMsg([92, 88, 12, 77, 57, 100, 67, 38, 97, 89], 37));
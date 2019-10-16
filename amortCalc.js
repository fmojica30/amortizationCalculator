// Variables being ussed
let monthlyPay, principal, intRate, termMonths, values, pmt, sumPmts, totalInt;


// Reading the inputs
function readInputs () {
  principal = document.getElementById("principal").value;
  intRate = document.getElementById("apy").value;
  termMonths = document.getElementById("loanTerm").value;
}

// validating the inputs read in
function validateInputs(p, r, m) {
  let values = [Number(p), Number(r), Number(m)];
  for (let i = 0; i < values.length; i++) {
    if (isNaN(values[i])) {
      return false
    }
  }
  return values
}

// Trim the values to 2 decimal places
function trim(n) {
  let num = Number(n.toFixed(2));
  return num
}

// Write the output of the calculation and return a string of that value
function calculateMonthlyPayments(p, r, m) {
  m = Math.round(m) // this is here to fix in case the months are entered in decimals
  let monthInt = (r/12)/100;
  let denom = (1 + monthInt)**m;
  denom = 1 / denom;
  denom = 1 - denom;
  let pmt = (p * monthInt)/denom;
  return pmt.toFixed(2)
}

//Formatting the numbers so they appear with correct commas
function formatNums(n) {
  let subStrs = n.split(".");
  let cents = subStrs[1];
  let chars = subStrs[0].split("");
  chars = chars.reverse();
  let newChars = [];
  if (n.length > 3) {
    for (let i = 0; i < chars.length; i++) {
      if ((i % 3 === 0) && (i !== 0)) {
        newChars.push(",");
      }
      newChars.push(chars[i]);
    }
    if (newChars[0] === ",") {
      newChars.shift();
    }
    newChars = newChars.reverse();
    let newStr = "$";
    for (let i = 0; i < newChars.length; i++) {
      newStr += newChars[i];
    }
    newStr += "." + cents;

    return newStr;
  }
  return n;
}

// Creating the amortization table as a 2d list
function aTable(principal, pmt, r, m) {
  let t = [];
  principal = Number(principal);
  pmt = Number(pmt);
  r = (Number(r) / 12) / 100;
  m = Number(m);

  for (let i = 0; i < m; i++) {
    let outputs = [];

    if (i === (m - 1)) {
      let month = i + 1;
      outputs.push(month.toString());

      pmt = principal;
      outputs.push(formatNums(pmt.toFixed(2)));

      let interestPaid = principal * r;
      outputs.push(formatNums(interestPaid.toFixed(2)));

      let principalPaid = pmt - interestPaid;
      outputs.push(formatNums(principalPaid.toFixed(2)));

      let principalPostPayment = 0;
      outputs.push(formatNums(principalPostPayment.toFixed(2)));

      t.push(outputs);

    } else {
      let month = i + 1;
      outputs.push(month.toString());

      outputs.push(formatNums(pmt.toFixed(2)));

      let interestPaid = principal * r;
      outputs.push(formatNums(interestPaid.toFixed(2)));

      let principalPaid = pmt - interestPaid;
      outputs.push(formatNums(principalPaid.toFixed(2)));

      let principalPostPayment = principal - principalPaid;
      principal -= principalPaid;
      outputs.push(formatNums(principalPostPayment.toFixed(2)));

      t.push(outputs);
    }
  }
  for (let i = 0; i < t.length; i++) {
    console.log(t[i]);
  }
}
// clearing out calues input in the calculator
function initialize() {
  document.getElementById("principal").value = "";
  document.getElementById("apy").value = "";
  document.getElementById("loanTerm").value = "";
}

//Setting the values in the page
function setValues(m, t, s) {
  document.getElementById("monthPmt").textContent = m;
  document.getElementById("totalInt").textContent = t;
  document.getElementById("sumPmts").textContent = s;
}

//initializing page when loaded
initialize();

//clearing elements on clear button press
document.getElementById("clear").addEventListener("click", initialize);

//calculating payment after clicking calculate button
document.getElementById("calc").addEventListener("click", function() {
  readInputs();
  let check = validateInputs(principal, intRate, termMonths);
  if (check == false){
    alert("Please insert correct values")
    return
  }
  let goodValues = [];
  for (let i = 0; i < check.length; i ++) {
    let trimmed = trim(check[i])
    goodValues.push(trimmed);
  }
  pmt = calculateMonthlyPayments(goodValues[0],goodValues[1],goodValues[2]);
  sumPmts = pmt * goodValues[2];
  totalInt = sumPmts - principal;

  pmtPush = formatNums(pmt);
  sumPmtPush = formatNums(sumPmts.toFixed(2));
  totalIntPush = formatNums(totalInt.toFixed(2));

  setValues(pmtPush, totalIntPush, sumPmtPush);
})

aTable("100000","1887.12","5","60");

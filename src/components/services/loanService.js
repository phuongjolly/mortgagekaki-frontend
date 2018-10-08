function pmt(rate, duration, loanAmount) {
  const k = (1.0 + rate) ** duration;
  return (loanAmount * rate * k / (k - 1));
}


function calculateLoanInterest(loanValue, duration, data) {
  const result = data;
  let balance = loanValue;
  const periods = duration * 12;
  let totalInterest = 0;

  for (let i = 0; i < 3; i += 1) {
    const rate = result.rates[i];
    const monthlyInterest = rate.rate / 1200;
    const monthlyBalance = pmt(monthlyInterest, (periods - i * 12), balance);

    for (let month = 0; month < 12; month += 1) {
      const interest = balance * monthlyInterest;
      totalInterest += interest;
      balance -= monthlyBalance - interest;
    }

    rate.monthlyBalance = monthlyBalance;
  }

  result.totalInterest = totalInterest;
  return result;
}

function calculateLoan(
  loanValue,
  duration,
  item,
) {
  const result = item;
  result.rates = result.rates.map(
    rate => ({
      ...rate,
      rate: ((rate.baseRate || {}).value || 0.0) + rate.absoluteRate,
    }),
  );

  return calculateLoanInterest(
    loanValue,
    duration,
    item,
  );
}

export function calculateInterest(balance, duration, rates) {
  return calculateLoanInterest(
    balance,
    duration,
    {
      rates: rates.map(rate => ({
        rate: +rate,
      })),
    },
  );
}

export default function calculateLoans(
  loanValue,
  duration,
  result,
) {
  const data = result.map(item => calculateLoan(loanValue, duration, item));
  return data;
}

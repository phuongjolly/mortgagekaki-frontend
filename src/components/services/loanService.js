function pmt(rate, duration, loanAmount) {
  const k = (1.0 + rate) ** duration;
  return (loanAmount * rate * k / (k - 1));
}

function calculateLoan(
  loanValue,
  duration,
  item,
) {
  const result = item;
  let balance = loanValue;
  const periods = duration * 12;
  let totalInterest = 0;

  result.rates = result.rates.map(
    rate => ({
      ...rate,
      rate: ((rate.baseRate || {}).value || 0.0) + rate.absoluteRate,
    }),
  );

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

export default function calculateLoans(
  loanValue,
  duration,
  result,
) {
  const data = result.map(item => calculateLoan(loanValue, duration, item));
  return data;
}

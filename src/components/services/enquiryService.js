export default async function enquiry(packageId, state) {
  const { email, mobile } = state.application;
  const { packageFilter } = state;
  const { filter } = packageFilter;

  const data = {
    emailId: email,
    mobileNum: mobile,
    termsCheckbox: true,
    type: filter.type === 'NEW' ? 'newLoanAnalysis' : 'refinanceLoanAnalysis',
    loanPackage: {
      packageId,
    },
    loanInput: {
      email,
      loanToValuation: packageFilter.loanValue / packageFilter.purchasePrice,
      loanType: filter.type,
      loanValue: packageFilter.loanValue,
      propertyType: filter.propertyType,
      purchasePrice: packageFilter.purchasePrice,
      tenure: packageFilter.duration,
    },
  };

  const response = await fetch('/osmr/rest/paid/enquire', {
    method: 'POST',
    headers: {
      contentType: 'application/json',
      body: JSON.stringify(data),
    },
  });

  console.log(response);
}

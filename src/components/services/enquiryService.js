export default async function enquiry(packageId, state) {
  const { name, email, mobile } = state.application;
  const { packageFilter } = state;
  const {
    filter,
    interests,
    duration,
    result,
    purchasePrice,
  } = packageFilter;
  const selectedPackage = result.filter(item => item.id === packageId)[0] || {};

  const data = {
    name,
    email,
    mobile,
    type: filter.type,
    lockIn: filter.lockIn,
    loanType: filter.loanType,
    propertyType: filter.propertyType,
    purchasePrice,
    interests,
    duration,
    packageName: selectedPackage.name,
  };

  const response = await fetch('/api/v1/enquiry', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  console.log(response);
}

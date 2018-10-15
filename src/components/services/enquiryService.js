import { LockInTypes } from '../rate-comparison/SearchPanel';

export default async function enquiry(packageId, state) {
  const { name, email, mobile } = state.application;
  const { packageFilter, propertyTypes } = state;
  const {
    filter,
    duration,
    result,
    purchasePrice,
    currentBank,
    interests,
    loanValue,
  } = packageFilter;
  const selectedPackage = result.filter(item => item.id === packageId)[0] || {};
  const propertyType = propertyTypes.propertyTypes.filter(
    item => item.id === filter.propertyType,
  )[0] || {};

  const lockIn = LockInTypes.filter(item => item.id === filter.lockIn)[0] || {};

  const data = {
    name,
    email,
    mobile,
    type: filter.type,
    lockIn: lockIn.name,
    loanType: filter.loanType,
    propertyType: propertyType.name,
    purchasePrice,
    interests,
    duration,
    currentBank,
    loanValue,
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

export const formatCardNumber = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");

  const truncatedValue = cleanedValue.slice(0, 16);

  return truncatedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
};

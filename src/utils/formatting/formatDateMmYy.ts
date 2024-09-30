export const formatDateMmYy = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");

  const truncatedValue = cleanedValue.slice(0, 4);

  return truncatedValue.replace(/(\d{2})(\d)/, "$1/$2");
};

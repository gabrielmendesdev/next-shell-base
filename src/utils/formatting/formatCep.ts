export const formatCep = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");

  const formattedValue = cleanedValue
    .slice(0, 8)
    .replace(/(\d{5})(\d)/, "$1-$2");

  return formattedValue;
};

export const formatDate = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");

  const truncatedValue = cleanedValue.slice(0, 8);

  return truncatedValue
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})\d+?$/, "$1");
};

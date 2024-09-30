export const formatPhone = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length <= 10) {
    const truncatedValue = cleanedValue.slice(0, 10);
    return truncatedValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  } else {
    const truncatedValue = cleanedValue.slice(0, 11);
    return truncatedValue
      .replace(/(\d{2})(\d)/, "($1) $2")
      .replace(/(\d{5})(\d)/, "$1-$2");
  }
};

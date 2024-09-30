export const formatCpfCnpj = (value: string) => {
  const cleanedValue = value.replace(/\D/g, "");

  if (cleanedValue.length <= 11) {
    const truncatedValue = cleanedValue.slice(0, 11);
    return truncatedValue
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d{1,2})/, "$1-$2")
      .replace(/(-\d{2})\d+?$/, "$1");
  } else {
    const truncatedValue = cleanedValue.slice(0, 14);
    return truncatedValue
      .replace(/(\d{2})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1.$2")
      .replace(/(\d{3})(\d)/, "$1/$2")
      .replace(/(\d{4})(\d)/, "$1-$2");
  }
};

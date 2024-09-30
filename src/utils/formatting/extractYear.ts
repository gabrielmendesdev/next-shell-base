export const extractYear = (
  date: string | Date | undefined,
): number | undefined => {
  if (!date) return undefined;

  let parsedDate: Date;

  if (typeof date === "string") {
    const [day, month, year] = date.split("/").map(Number);
    parsedDate = new Date(year, month - 1, day);
  } else {
    parsedDate = date;
  }

  return parsedDate.getFullYear();
};

export const toLocaleDateString = (date: string) => {
  return new Date(date).toLocaleDateString("no-NO", { dateStyle: "medium" });
};

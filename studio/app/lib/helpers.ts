export const toLocaleDateString = (date: string) => {
  return new Date(date).toLocaleDateString("no-NO", { dateStyle: "medium" });
};

export const required = {
  codegen: { required: true },
  validation: (Rule) => Rule.required(),
};

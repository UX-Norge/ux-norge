export const validateData = (data: object): void => {
  const dataArrays = Object.values(data);
  if (dataArrays.some((arr) => arr.length <= 0)) {
    throw new Error("Data is empty");
  }
};

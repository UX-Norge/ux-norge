import { daysLeft } from "@Lib/helpers";

export const getDaysToDeadline = (deadline: string) => {
  if (!deadline) return "Ansetter fortløpende";
  return !deadline
    ? "ansetter fortløpende"
    : "Søknadsfrist er om " + daysLeft(deadline);
};

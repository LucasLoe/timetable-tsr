export default function createValidDateFromString(inputDate: string): Date {
  return new Date(inputDate + "T01:00:00");
}

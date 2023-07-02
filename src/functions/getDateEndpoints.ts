export default function getDateEndpoints(inputDate: string): [number, number] {
	const dateCopy = new Date(inputDate);
	const beginDate = new Date(dateCopy.setHours(0, 0, 0, 0)).getTime();
	const endDate = new Date(dateCopy.setHours(23, 59, 59, 999)).getTime();
	return [beginDate, endDate];
}

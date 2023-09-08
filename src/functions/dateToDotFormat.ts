export default function dateToDotFormat(date: string) {
	const reorderedDate = date.slice(8, 10) + date.slice(4, 8) + date.slice(0, 4);
	return reorderedDate.replaceAll("-", ".");
}

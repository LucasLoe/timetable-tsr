export default function replaceObjectByUuid<T extends { _uuid: string }>(
	arr: T[],
	obj: T,
	uuid: string
): T[] {
	for (let i = 0; i < arr.length; i++) {
		if (arr[i]._uuid === uuid) {
			arr[i] = obj;
			break;
		}
	}
	return arr;
}

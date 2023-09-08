export default function createJSDateFromYYYYMMDD(dateString: string): Date {
	const parts = dateString.split("-");

	// Ensure there are three parts in the date string (YYYY, MM, DD)
	if (parts.length !== 3) {
		throw new Error('Invalid date format. Expected "YYYY-MM-DD".');
	}

	const year = parseInt(parts[0], 10);
	const month = parseInt(parts[1], 10) - 1; // Adjust for 0-based indexing
	const day = parseInt(parts[2], 10);

	if (isNaN(year) || isNaN(month) || isNaN(day)) {
		throw new Error("Invalid date format. Year, month, and day must be numeric.");
	}

	// Create the initial date object
	const dateObject = new Date(year, month, day);

	// Add exactly 1 hour
	dateObject.setHours(dateObject.getHours() + 2);

	return dateObject;
}

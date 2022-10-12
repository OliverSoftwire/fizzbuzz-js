exports.action = (outputArray) => {
	if (outputArray.length > 0) {
		for (let i = 0; i < outputArray.length; i++) {
			if (outputArray[i][0] !== "B") continue;

			outputArray.splice(i, 0, "Fezz");
			return;
		}
	}

	outputArray.push("Fezz");
}

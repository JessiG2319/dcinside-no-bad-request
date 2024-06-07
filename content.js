'use strict';

browser.runtime.sendMessage(null).then((values) => {
	if (values.some((value) => value.value === null || value.status == "rejected")) {
		console.error("Something has gone wrong. Here are the details.");
		console.group();
		values.forEach((value) => {
			if (value.value === null) {
				console.error("reason: Unknown");
			} else if (value.status == "rejected") {
				console.error("reason: " + value.reason);
			}
		});
		console.groupEnd();
	} else if (values.length == 0) {
		// Do nothing
	} else if (values.length == 1) {
		console.log('Removed a expired cookie.');
		console.group();
		values.forEach((value) => console.log(value.value));
		console.groupEnd();
	} else {
		console.log('Removed ' + values.length + ' number of expired cookies.');
		console.group();
		values.forEach((value) => console.log(value.value));
		console.groupEnd();
	}
});
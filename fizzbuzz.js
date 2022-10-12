function fizzbuzz() {
	console.log('Welcome to FizzBuzz!');

	for (let number = 1; number <= 100; number++) {
		output = "";
		let shouldPrintNumber = true;

		if (number % 3 == 0) {
			output += "Fizz";
			shouldPrintNumber = false;
		}
		if (number % 5 == 0) {
			output += "Buzz";
			shouldPrintNumber = false;
		}

		console.log(shouldPrintNumber ? number : output);
	}
}

fizzbuzz();

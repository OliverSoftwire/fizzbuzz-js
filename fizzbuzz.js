const rules = [
	["Fizz", 3],
	["Buzz", 5]
];

function fizzbuzz() {
	console.log('Welcome to FizzBuzz!');

	for (let number = 1; number <= 100; number++) {
		output = "";
		let shouldPrintNumber = true;

		rules.forEach(rule => {
			const [stringToAdd, divisibleBy] = rule;
			if (number % divisibleBy == 0) {
				output += stringToAdd;
				shouldPrintNumber = false;
			}
		});

		console.log(shouldPrintNumber ? number : output);
	}
}

fizzbuzz();

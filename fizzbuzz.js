const stack = [];

const rules = [
	[() => { stack.push("Fizz"); }, 3],
	[() => { stack.push("Buzz"); }, 5],
	[() => { stack.push("Bang"); }, 7],
	[() => {
		stack.length = 1;
		stack[0] = "Bong";
	}, 11],
	[() => {
		if (stack.length === 0) {
			for (let i = 0; i < stack.length; i++) {
				if (stack[i][0] !== "B") continue;
	
				stack.splice(i + 1, 0, "Fezz");
				return;
			}
		}

		stack.push("Fezz");
	}, 13],
	[() => { stack.reverse(); }, 17]
];

function fizzbuzz() {
	console.log('Welcome to FizzBuzz!');

	for (let number = 1; number <= 100; number++) {
		output = "";
		let shouldPrintNumber = true;

		rules.forEach(rule => {
			const [actionFunc, divisibleBy] = rule;
			if (number % divisibleBy === 0) {
				actionFunc();
			}
		});

		console.log(stack.length > 0 ? stack.join("") : number);
		stack.length = 0;
	}
}

fizzbuzz();

class Rule {
	divisor = 1;
	applyFunc = () => { throw "Rule was not initialised!"; };

	constructor(divisor, applyFunc) {
		this.divisor = divisor;
		this.applyFunc = applyFunc;
	}

	apply(outputArray, number) {
		if (number % this.divisor === 0) {
			this.applyFunc(outputArray);
		}
	}
}

class AppendIfMultiple extends Rule {
	constructor(name, divisor) {
		super(divisor, (outputArray) => { outputArray.push(name); });
	}
}

const rules = [
	new AppendIfMultiple("Fizz", 3),
	new AppendIfMultiple("Buzz", 5),
	new AppendIfMultiple("Bang", 7),
	new Rule(11, (outputArray) => {
		outputArray.length = 1;
		outputArray[0] = "Bong";
	}),
	new Rule(13, (outputArray) => {
		if (outputArray.length === 0) {
			for (let i = 0; i < outputArray.length; i++) {
				if (outputArray[i][0] !== "B") continue;
	
				outputArray.splice(i + 1, 0, "Fezz");
				return;
			}
		}

		outputArray.push("Fezz");
	}),
	new Rule(17, (outputArray) => { outputArray.reverse(); })
];

function fizzbuzz() {
	console.log('Welcome to FizzBuzz!');

	for (let number = 1; number <= 100; number++) {
		const output = [];

		rules.forEach(rule => { rule.apply(output, number); });

		console.log(output.length > 0 ? output.join("") : number);
	}
}

fizzbuzz();

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
		if (outputArray.length > 0) {
			for (let i = 0; i < outputArray.length; i++) {
				if (outputArray[i][0] !== "B") continue;
	
				outputArray.splice(i, 0, "Fezz");
				return;
			}
		}

		outputArray.push("Fezz");
	}),
	new Rule(17, (outputArray) => { outputArray.reverse(); })
];

function applyRules(number) {
	const output = [];
	rules.forEach(rule => { rule.apply(output, number); });

	return output.length > 0 ? output.join("") : number.toString();
}

function fizzbuzz() {
	console.log('Welcome to FizzBuzz!');

	for (let number = 1; number <= 100; number++) {
		console.log(applyRules(number));
	}
}

function runTests() {
	const fs = require("fs");
	const rawJsonData = fs.readFileSync("tests.json");

	const tests = JSON.parse(rawJsonData);
	let numPasses = 0;

	console.log(`Running ${tests.length} tests...`);

	tests.forEach(test => {
		const result = applyRules(test.input);

		const passed = result == test.output;
		if (passed) {
			numPasses++;
		}

		console.log(`Input: ${test.input} | Expected Output: ${test.output} | Actual Output: ${result} => ${passed ? "Passed!" : "Failed"}`);
	})

	console.log(`${numPasses}/${tests.length} tests passed (${Math.round(numPasses / tests.length * 100)}%)`);
}

const shouldRunTests = true; // Make this an option

if (shouldRunTests) {
	runTests();
} else {
	fizzbuzz();
}

const fs = require("fs");

class Rule {
	divisor = 1;
	action = () => { throw "Rule was not initialised!"; };

	constructor(divisor, action) {
		this.divisor = divisor;
		this.action = action;
	}

	apply(outputArray, number) {
		if (number % this.divisor === 0) {
			this.action(outputArray);
		}
	}
}

class AppendIfMultiple extends Rule {
	constructor(name, divisor) {
		super(divisor, (outputArray) => { outputArray.push(name); });
	}
}

const rules = [];

function loadRules() {
	const rawJsonData = fs.readFileSync("rules.json");
	const rulesJson = JSON.parse(rawJsonData);

	rulesJson.forEach(rule => {
		if (!rule.hasOwnProperty("divisor")) {
			throw "Invalid rule in rules.json (missing divisor)";
		}
		if (!rule.hasOwnProperty("name")) {
			throw "Invalid rule in rules.json (missing name)";
		}

		switch (rule.type) {
			case "custom":
				let userScript;
				try {
					userScript = require("./rules/" + rule.name);
				} catch {
					throw "Invalid custom rule in rules.json (failed to import script)";
				}

				if (!("action" in userScript)) {
					throw "Custom rule script is missing action function (make sure to set exports.action!)";
				}

				rules.push(new Rule(rule.divisor, userScript.action));
				break;
			case "append_if_multiple":
				rules.push(new AppendIfMultiple(rule.name, rule.divisor));
				break;
			default:
				throw "Invalid rule in rules.json (missing or unknown type)";
		}
	})
}

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

const commandLineArgs = process.argv.slice(2);
const mode = commandLineArgs[0];

if (mode === "test") {
	try {
		loadRules();
	} catch (e) {
		console.log("An error occured while loading rules:\n" + e);
		return;
	}

	runTests();
} else if (mode === "run") {
	try {
		loadRules();
	} catch (e) {
		console.log("An error occured while loading rules:\n" + e);
		return;
	}

	fizzbuzz();
} else {
	console.log("Usage: node fizzbuzz.js test|run");
}

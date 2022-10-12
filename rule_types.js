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

exports.Rule = Rule;
exports.AppendIfMultiple = AppendIfMultiple;

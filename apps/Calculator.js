function CalculatorApp() {
	this.w = 340;
	this.h = 520;
	this.minW = 300;
	this.minH = 300;
	this.title = "Calculator";
	this.type = "CalculatorApp";
	
	this.calcText = "";
	
	this.buttons = [
		",", "0", "=", "+",
		"1", "2", "3", "-",
		"4", "5", "6", "*",
		"7", "8", "9", "/",
		"C", "<-", "(", ")"
	];
	
	this.hoverButtons = [
		false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false,
		false, false, false, false
	]
	
	this.draw = (ctx) => {
		let q = (this.w - 4) / 4;
		let bw = q - 4;
		let bh = (this.h - 124) / 5 - 4;
		
		setTextStyle(ctx, "#EEE", "24px sans-serif", "right", "middle");
		ctx.fillText(this.calcText, this.w - 20, 62);
		
		ctx.fillStyle = "#FFF1";
		for (let i = 1; i <= 5; i++) {
			for (let j = 0; j < 4; j++) {
				let index = -4 + i * 4 + j;
				
				ctx.fillStyle = this.hoverButtons[index] ? "#FFF2" : "#FFF1";
				fillRoundedRect(ctx, 4 + bw * j + 4 * j, this.h - bh * i - 4 * i, bw, bh, 4);
				
				let tx = 4 + q * (j + 0.5);
				let ty = this.h - bh * (i - 0.5) - 4 * i;
				
				setTextStyle(ctx, "#EEE", "18px sans-serif", "center", "middle");
				ctx.fillText(this.buttons[index], tx, ty);
			}
		}
		
		this.validated = true;
	};
	
	this.mouseExit = () => {
		let inval = false;
		
		for (var i = 0; i < this.hoverButtons.length; i++) {
			inval = inval || this.hoverButtons[i];
			this.hoverButtons[i] = false;
		}
		
		if (inval) this.invalidate();
	};
	
	this.mouseMove = () => {
		let inval = false;
		
		let q = (this.w - 4) / 4;
		let bw = q - 4;
		let bh = (this.h - 124) / 5 - 4;
		
		for (let i = 1; i <= 5; i++) {
			for (let j = 0; j < 4; j++) {
				let index = -4 + i * 4 + j;
				
				let temp = this.hoverButtons[index];
				this.hoverButtons[index] = this.detectMouse(4 + bw * j + 4 * j, this.h - bh * i - 4 * i, bw, bh);
				inval = inval || this.hoverButtons[index] != temp;
			}
		}
		
		if (inval) this.invalidate();
	};
	
	this.mouseClick = () => {
		for (var i = 0; i < this.hoverButtons.length; i++) {
			if (this.hoverButtons[i]) {
				let button = this.buttons[i];
				
				if (button == "<-") {
					this.eraseCharacter();
				}
				else if (button == "C") {
					this.calcText = "";
				}
				else if (button == "=") {
					this.calculate();
				}
				else {
					this.calcText += button;
				}
				
				this.invalidate();
				break;
			}
		}
	};
	
	this.keyType = () => {
		let key = keyboard.key;
		
		if (key == "Backspace" && this.calcText != "") {
			this.eraseCharacter();
		}
		else if (key.toLowerCase() == "c") {
			this.calcText = "";
		}
		else if (key == "=") {
			this.calculate();
		}
		else if (this.buttons.includes(key)) {
			this.calcText += key;
		}
		
		this.invalidate();
	};
	
	this.keyDown = () => {
		if (keyboard.key == "Enter") {
			this.calculate();
			this.invalidate();
		}
	};
	
	this.calculate = () => {
		var input = this.calcText;
		
		var nums = [];
		var op = [];
		
		var nextNum = "";
		for (var i = 0; i < input.length; i++) {
			let d = input.charAt(i);
			
			if (d == "+" || d == "-" || d == "*" || d == "/" || d == "(" || d == ")") {
				if (nextNum != "") {
					nums.push(parseInt(nextNum));
					nextNum = "";
				}
				op.push(d);
			}
			else {
				nextNum += d;
			}
		}
		
		if (nextNum != "") {
			nums.push(parseInt(nextNum));
		}
		
		var res = 0;
		for (let i = 0, n = 0, a = 0; i < nums.length; i++) {
			n = nums[i];
			
			a = n;
			if (i == 0) {
				res = a;
				continue;
			}
			
			switch (op[i - 1]) {
				case "+":
					res += a;
					break;
				
				case "-":
					res -= a;
					break;
				
				case "*":
					res *= a;
					break;
				
				case "/":
					res /= a;
					break;
				
				default: break;
			}
		}
		
		
		this.calcText = res;
	};
	
	this.eraseCharacter = () => {
		this.calcText = this.calcText.substr(0, this.calcText.length - 1);
	};
}

setDrawablePrototype(CalculatorApp);
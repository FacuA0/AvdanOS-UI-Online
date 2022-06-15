function TerminalApp() {
	this.w = 600;
	this.h = 400;
	this.title = "Terminal";
	this.type = "TerminalApp";
	
	this.buffer = "AvdanOS UI Alpha 0.03 - Terminal\nType 'help' to show the commands available.\n\n";
	this.promptEnabled = true;
	this.cursorVisible = true;
	this.promptAnswer = "";
	this.path = "/Users/User";
	
	this.buffer += this.path + ">";
	
	this.intervalCursor = setInterval((app) => {
		app.cursorVisible = !app.cursorVisible;
		
		app.invalidate();
	}, 1000, this);
	
	this.draw = (ctx) => {
		setTextStyle(ctx, "#EEE", "12px monospace", "left", "top");
		
		var lines = this.buffer.split("\n");
		
		for (let i = 0; i < lines.length; i++) {
			let text = lines[i];
			
			if (i == lines.length - 1) {
				text += this.promptAnswer + (this.promptEnabled && this.cursorVisible ? "_" : "");
			}
			
			ctx.fillText(text, 6, 6 + i * 16);
		}
		
		this.validated = true;
	};
	
	this.keyType = () => {
		if (!this.promptEnabled) return;
		
		let letter = keyboard.key;
		
		if (letter == "Backspace") {
			this.promptAnswer = this.promptAnswer.substr(0, this.promptAnswer.length - 1)
		}
		else {
			this.promptAnswer += keyboard.key;
		}
	};
	
	this.keyDown = () => {
		if (keyboard.key != "Enter") return;
		
		this.buffer += this.promptAnswer + "\n";
		this.promptEnabled = false;
		
		this.evaluate(this.promptAnswer);
		
		this.buffer += this.path + ">";
		this.promptAnswer = "";
		this.promptEnabled = true;
	};
	
	this.evaluate = (input) => {
		if (input.trim() == "") return;
		
		var parts = input.split(" ");
		var op = parts[0];
		
		switch (op) {
			case "help": 
				this.buffer += "Command list:\n" + 
							" - help: Shows this command list.\n" + 
							" - cls: Clears the display.\n" + 
							" - dir: Shows a list of files and subdirectories in this directory.\n" + 
							" - cd: Changes the current directory to a relative one.\n\n";
				break;
				
			case "cls":
				this.buffer = "";
				break;
			
			case "dir":
				var folder = fileSystem.get(this.path);
				var list = folder.contents;
				
				if (list.length == 0) {
					this.buffer += "The folder '" + folder.name + "' is empty.\n\n";
					break;
				}
				
				this.buffer += "Contents of '" + folder.name + "':\n";
				
				for (var i = 0; i < list.length; i++) {
					let child = list[i];
					this.buffer += " - " + child.name + " (" + child.type + ")\n";
				}
				
				this.buffer += "\n";
				break;
				
			case "cd":
				if (!parts[1] || parts[1] == "") break;
				
				if (parts[1] == ".." && this.path.length > 1) {
					this.path = this.path.substring(0, this.path.lastIndexOf("/"));
					break;
				} 
				else {
					if (!fileSystem.get(this.path + "/" + parts[1])) break;
					
					this.path += "/" + parts[1];
				}
				break;
				
			default: 
				this.buffer += "This command does not exist.\nType 'help' for a list of avalaible commands.\n\n";
		}
	};
}

setDrawablePrototype(TerminalApp);
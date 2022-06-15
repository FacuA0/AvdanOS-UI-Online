function NotesApp() {
	this.w = 720;
	this.h = 400;
	this.title = "Notes";
	this.type = "NotesApp";
	
	this.icAddNote = loadIcon("Photos", "More", 12, 12);
	this.icBack = loadIcon("global", "Back", 12, 12);
	this.icNewNote = loadIcon("Notes", "NewNote", 12, 12);
	this.icBold = loadIcon("Notes", "Bold", 12, 12);
	this.icItalic = loadIcon("Notes", "Italic", 12, 12);
	this.icUnderlined = loadIcon("Notes", "Underlined", 12, 12);
	this.icChecklist = loadIcon("Notes", "Checklist", 12, 12);
	this.icTable = loadIcon("Notes", "Table", 12, 12);
	this.icImage = loadIcon("Notes", "Image", 12, 12);
	this.icAddProfile = loadIcon("Notes", "AddProfile", 12, 12);
	this.icShare = loadIcon("global", "Share", 12, 12);
	this.icMoreOptions = loadIcon("global", "MoreOptions", 12, 12);
	this.icDelete = loadIcon("global", "Delete", 12, 12);
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icDefault = loadIcon("global", "Default", 12, 12);
	this.icDropdown = loadIcon("global", "Dropdown", 8, 8);
	
	this.textField = "";
	
	if (StorageSystem.exists("Notes", "List")) {
		this.notesList = JSON.parse(StorageSystem.get("Notes", "List"));
	}
	else {
		this.notesList = [];
	}
	
	this.editor = false;
	
	this.hover = {
		list: -1,
		addNote: false
	};
	
	this.hoverNew = {
		back: false,
		newNote: false,
		font: false,
		size: false,
		bold: false,
		italic: false,
		underlined: false,
		checklist: false,
		table: false,
		image: false,
		profile: false,
		share: false,
		options: false,
		remove: false
	};
	
	this.draw = (ctx) => {
		if (!this.editor) {
			this.drawMain(ctx);
		}
		else {
			this.drawEditor(ctx);
		}
		
		this.validated = true;
	};
	
	this.drawMain = (ctx) => {
		setTextStyle(ctx, "#EEE", "18px sans-serif", "center", "middle");
		ctx.fillText("Notes", this.w / 2, 32);
		
		// New note
		ctx.fillStyle = this.hover.addNote ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4);
		ctx.drawImage(this.icAddNote, this.w - 25, 10);
		
		if (this.notesList.length == 0) {
			setTextStyle(ctx, "#888", "12px sans-serif", "center", "middle");
			ctx.fillText("There is no content here for now...", this.w / 2, this.h / 2);
			return;
		}
		else {
			for (var i = 0; i < this.notesList.length; i++) {
				ctx.fillStyle = this.hover.list == i ? "#FFF4" : "#FFF2";
				fillRoundedRect(ctx, 32, 64 + i * 40, this.w - 64, 32, 4);
				setTextStyle(ctx, "#DDD", "12px sans-serif", "left", "middle");
				
				var text = this.notesList[i].split("\n")[0];
				var tw = ctx.measureText(text).width;
				var l = tw > this.w - 88, l2 = l;
				
				while (l) {
					text = text.substring(0, text.length - 1);
					tw = ctx.measureText(text).width;
					l = tw > this.w - 88;
				}
				
				ctx.fillText(text + (l2 ? "..." : ""), 40, 83 + i * 40);
			}
		}
		
	};
	
	this.drawEditor = (ctx) => {
		ctx.fillStyle = "#0001";
		ctx.fillRect(0, 0, this.w, 32);
		
		// Back button
		ctx.fillStyle = this.hoverNew.back ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 6, 6, 34, 20, 4);
		ctx.drawImage(this.icBack, 17, 10);
		
		// New note button
		ctx.fillStyle = this.hoverNew.newNote ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 46, 6, 34, 20, 4);
		ctx.drawImage(this.icNewNote, 57, 10);
		
		// Font selector
		ctx.fillStyle = this.hoverNew.font ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 86, 6, 74, 20, 4);
		ctx.drawImage(this.icDropdown, 146, 12);
		
		setTextStyle(ctx, "#EEE", "9px sans-serif", "left", "middle");
		ctx.fillText("Sans serif", 92, 18);
		
		// Size selector
		ctx.fillStyle = this.hoverNew.size ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 166, 6, 36, 20, 4);
		ctx.drawImage(this.icDropdown, 188, 12);
		
		setTextStyle(ctx, "#EEE", "10px sans-serif", "left", "middle");
		ctx.fillText("16", 172, 17);
		
		// Formatting
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, 208, 6, 72, 20, 4);
		ctx.drawImage(this.icBold, 214, 10);
		ctx.drawImage(this.icItalic, 238, 10);
		ctx.drawImage(this.icUnderlined, 262, 10);
		
		// Checklist button
		ctx.fillStyle = this.hoverNew.checklist ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 286, 6, 26, 20, 4);
		ctx.drawImage(this.icChecklist, 293, 10);
		
		// Table button
		ctx.fillStyle = this.hoverNew.table ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 318, 6, 26, 20, 4);
		ctx.drawImage(this.icTable, 325, 10);
		
		// Image button
		ctx.fillStyle = this.hoverNew.image ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 350, 6, 36, 20, 4);
		ctx.drawImage(this.icImage, 356, 10);
		ctx.drawImage(this.icDropdown, 372, 12);
		
		// Add profile button
		ctx.fillStyle = this.hoverNew.profile ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 392, 6, 26, 20, 4);
		ctx.drawImage(this.icAddProfile, 399, 10);
		
		// Share button
		ctx.fillStyle = this.hoverNew.share ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 424, 6, 26, 20, 4);
		ctx.drawImage(this.icShare, 431, 10);
		
		// More options button
		ctx.fillStyle = this.hoverNew.options ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 456, 6, 26, 20, 4);
		ctx.drawImage(this.icMoreOptions, 463, 10);
		
		// Delete button
		ctx.fillStyle = this.hoverNew.remove ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 488, 6, 26, 20, 4);
		ctx.drawImage(this.icDelete, 495, 10);
		
		// Search bar
		ctx.fillStyle = this.hoverNew.search ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, 520, 6, this.w - 526, 20, 4);
		ctx.drawImage(this.icSearch, this.w - 24, 10);
		
		setTextStyle(ctx, "#CCC", "10px sans-serif", "left", "middle");
		ctx.fillText("Search", 526, 17);
		
		let empty = this.textField == "";
		// Text
		
		if (empty) {
			setTextStyle(ctx, "#CCC", "12px sans-serif", "left", "top");
			ctx.fillText("Start typing...", 12, 44);
		}
		else {
			var lines = this.textField.split("\n");
			
			setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
			for (var i = 0; i < lines.length; i++) {
				ctx.fillText(lines[i], 12, 44 + i * 18);
			}
		}
	};
	
	this.checkHoverMain = () => {
		if (this.editor) return false;
		let preHover = Object.assign({}, this.hover);
		let inval = false;
		
		this.hover.addNote = this.detectMouse(this.w - 32, 6, 26, 20);
		inval = preHover.addNote != this.hover.addNote;
		
		for (let i = 0; i < this.notesList.length; i++) {
			if (this.detectMouse(32, 64 + i * 40, this.w - 64, 32)) {
				this.hover.list = i;
				break;
			}
			
			if (i == this.notesList.length - 1) {
				this.hover.list = -1;
			}
		}
		
		inval = inval || preHover.list != this.hover.list;
		
		return inval;
	};
	
	this.checkHoverNewNote = () => {
		if (!this.editor) return false;
		
		let inval = false;
		let preHover = Object.assign({}, this.hoverNew);
		
		this.hoverNew.back = this.detectMouse(6, 6, 34, 20);
		this.hoverNew.newNote = this.detectMouse(46, 6, 34, 20);
		this.hoverNew.font = this.detectMouse(86, 6, 74, 20);
		this.hoverNew.size = this.detectMouse(166, 6, 36, 20);
		this.hoverNew.checklist = this.detectMouse(286, 6, 26, 20);
		this.hoverNew.table = this.detectMouse(318, 6, 26, 20);
		this.hoverNew.image = this.detectMouse(350, 6, 36, 20);
		this.hoverNew.profile = this.detectMouse(392, 6, 26, 20);
		this.hoverNew.share = this.detectMouse(424, 6, 26, 20);
		this.hoverNew.options = this.detectMouse(456, 6, 26, 20);
		this.hoverNew.remove = this.detectMouse(488, 6, 26, 20);
		
		for (h in this.hoverNew) {
			inval = inval || preHover[h] != this.hoverNew[h];
		}
		
		return inval;
	};
	
	this.mouseMove = () => {
		let inval = false;
		
		inval = inval || this.checkHoverMain();
		inval = inval || this.checkHoverNewNote();
		
		if (inval) this.invalidate();
	};
	
	this.mouseClick = (event) => {
		if (!this.editor) {
			if (this.hover.addNote) {
				this.editor = true;
			}
			else if (this.hover.list >= 0) {
				this.editor = true;
				this.textField = this.notesList[this.hover.list];
			}
		}
		else {
			if (this.hoverNew.back) {
				this.editor = false;
				
				if (this.textField == "") return;
				if (this.notesList.includes(this.textField)) return;
				
				this.notesList.push(this.textField);
				
				StorageSystem.set("Notes", "List", JSON.stringify(this.notesList));
				
				this.textField = "";
			}
		}
	};
	
	this.keyType = () => {
		if (!this.editor) return;
		
		let letter = keyboard.key;
		
		if (letter == "Backspace") {
			this.textField = this.textField.substr(0, this.textField.length - 1)
		}
		else {
			this.textField += letter;
		}
	};
	
	this.keyDown = () => {
		if (!this.editor || keyboard.key != "Enter") return;
		
		this.textField += "\n";
	};
}

setDrawablePrototype(NotesApp);
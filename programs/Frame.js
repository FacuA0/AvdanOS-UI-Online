function Frame(app) {
	this.app = app;
	
	this.minW = 340;
	this.minH = 32;
	
	if (app.minW) this.minW = Math.max(this.minW, app.minW);
	if (app.minH) this.minH = Math.max(this.minH, app.minH + 32);
	
	this.w = Math.max(this.minW, app.w);
	this.h = Math.max(this.minH, app.h + 32);
	
	if (app.hasOwnProperty("x") || app.hasOwnProperty("y")) {
		this.x = app.x;
		this.y = app.y - 32;
	}
	else {
		this.x = parseInt(Math.max(0, (width - this.w) / 2));
		this.y = parseInt(Math.max(0, (height - this.h) / 2));
		app.x = this.x;
		app.y = this.y + 32;
	}
	
	app.w = this.w;
	app.h = this.h - 32;
	
	this.winX = 0;
	this.winY = 0;
	this.winW = 0;
	this.winH = 0;
	this.maximized = false;
	
	this.movable = true;
	this.resizable = true;
	this.type = "Frame";
	
	this.rx = 0;
	this.ry = 0;
	this.rw = 0;
	this.rh = 0;
	this.resizing = false;
	
	this.apps = [app];
	this.indexApp = 0;
	this.title = app.title;
	
	this.icClose = loadIcon("Frame", "Close");
	this.icMinimize = loadIcon("Frame", "Minimize");
	this.icMaximize = loadIcon("Frame", "Maximize");
	this.icSplitLeft = loadIcon("Frame", "SplitLeft");
	this.icMultitask = loadIcon("Frame", "Multitask");
	this.icSplitRight = loadIcon("Frame", "SplitRight");
	this.icAddTab = loadIcon("Frame", "AddTab");
	
	this.hover = {
		close: false,
		minimize: false,
		maximize: false,
		splitLeft: false,
		multitask: false,
		splitRight: false,
		addTab: false
	};
	
	this.initCanvas(this);
	
	this.draw = (ctx) => {
		//ctx.translate(this.x, this.y);
		
		ctx.fillStyle = "#000A";
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		//ctx.shadowBlur = 1;
		ctx.shadowColor = "#222";
		
		//fillRoundedRect(ctx, 0, 0, this.w, this.h, 0);
		ctx.fillRect(0, 0, this.w, this.h);
		
		ctx.shadowOffsetX = 0;
		ctx.shadowOffsetY = 0;
		ctx.shadowBlur = 0;
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w - 78, 6, 72, 20, 4);
		
		if (this.hover.close) fillRoundedRect2(ctx, this.w - 24 - 6, 6, 24, 20, 0, 4, 4, 0);
		if (this.hover.minimize) ctx.fillRect(this.w - 48 - 6, 6, 24, 20);
		if (this.hover.maximize) fillRoundedRect2(ctx, this.w - 72 - 6, 6, 24, 20, 4, 0, 0, 4);
		
		ctx.drawImage(this.icClose, this.w - 10 - 13, 11, 10, 10);
		ctx.drawImage(this.icMinimize, this.w - 20 - 27, 11, 10, 10);
		ctx.drawImage(this.icMaximize, this.w - 30 - 41, 11, 10, 10);
		
		fillRoundedRect(ctx, this.w - 156, 6, 72, 20, 4);
		
		if (this.hover.splitLeft) fillRoundedRect2(ctx, this.w - 96 - 12, 6, 24, 20, 0, 4, 4, 0);
		if (this.hover.multitask) ctx.fillRect(this.w - 120 - 12, 6, 24, 20);
		if (this.hover.splitRight) fillRoundedRect2(ctx, this.w - 144 - 12, 6, 24, 20, 4, 0, 0, 4);
		
		ctx.drawImage(this.icSplitLeft, this.w - 40 - 61, 11, 10, 10);
		ctx.drawImage(this.icMultitask, this.w - 50 - 75, 11, 10, 10);
		ctx.drawImage(this.icSplitRight, this.w - 60 - 89, 11, 10, 10);
		
		this.app = this.apps[this.indexApp];
		
		for (var i = 0, app; i < this.apps.length; i++) {
			app = this.apps[i];
			
			ctx.fillStyle = this.apps.length > 1 ? (i === this.indexApp ? "#FFF4" : "#CCC2") : "#FFF2";
			fillRoundedRect(ctx, 6 + i * 120 + i * 6, 6, 120, 20, 4);
			
			setTextStyle(ctx, "#FFF", "12px sans-serif", "center", "middle");
			ctx.fillText(app.title, 6 + i * 120 + i * 6 + 60, 17);
		}
		
		let x = 6 * (this.apps.length + 1) + this.apps.length * 120;
		let b = this.detectMouse(x, 8, 16, 16);
		ctx.fillStyle = "#FFF1";
		if (this.hover.addTab) fillRoundedRect(ctx, x, 6, 20, 20, 4);
		ctx.drawImage(this.icAddTab, x + 4, 10);
		
		var app = this.apps[this.indexApp];
		
		if (!app.validated) this.invalidate();
		
		ctx.translate(0, 32);
		
		app.draw(ctx);
		
		ctx.translate(0, -32);
	};
	
	this.add = (app) => {
		this.apps.push(app);
		
		this.minW = Math.max(this.minW, app.minW);
		this.minH = Math.max(this.minH, app.minH + 32);
		
		this.setSize(200 + 130 * this.apps.length, this.h);
		
		app.x = 0;
		app.y = 32;
		app.w = this.w;
		app.h = this.h - 32;
	};
	
	this.remove = (app) => {
		this.apps.splice(this.apps.indexOf(app), 1);
	};
	
	this.move = (dx, dy) => {
		this.x += dx;
		this.y += dy;
		
		for (app of this.apps) {
			app.x += dx;
			app.y += dy;
			
			app.windowMove();
		}
	};
	
	this.startResize = () => {
		this.resizing = true;
		
		this.rx = this.x;
		this.ry = this.y;
		this.rw = this.w;
		this.rh = this.h;
	};
	
	this.resize = (dt, db, dl, dr) => {
		if (this.resizing) {
			dt = Math.min(dt, this.rh - this.minH);
			dl = Math.min(dl, this.rw - this.minW);
			
			this.x = this.rx + dl;
			this.y = this.ry + dt;
			this.w = Math.max(this.minW, this.rw + dr - dl);
			this.h = Math.max(this.minH, this.rh + db - dt);
			
			for (a of this.apps) { 
				a.x = this.x;
				a.y = this.y + 32;
				a.w = this.w;
				a.h = this.h - 32;
				
				app.windowResize();
			}
			
			this.invalidate();
		}
	};
	
	this.setSize = (w, h) => {
		this.w = Math.max(w, this.minW);
		this.h = Math.max(h, this.minH);
	
		for (a of this.apps) { 
			a.w = this.w;
			a.h = this.h - 32;
		}
	};
	
	this.endResize = () => {
		this.resizing = false;
	};
	
	this.maximize = () => {
		this.maximized = true;
		
		this.winX = this.x;
		this.winY = this.y;
		this.winW = this.w;
		this.winH = this.h;
		
		this.x = 0;
		this.y = 0;
		this.w = width;
		this.h = height;
		
		for (a of this.apps) {
			a.x = this.x;
			a.y = this.y + 32;
			a.w = this.w;
			a.h = this.h - 32;
		}
		
		this.cornerRadius = 0;
		
		dock.setAutohide();
		
		setTimeout(this.setFrameArea, 0);
		this.invalidate();
	};
	
	this.restore = () => {
		this.maximized = false;
		
		this.x = this.winX;
		this.y = this.winY;
		this.w = this.winW;
		this.h = this.winH;
		
		for (a of this.apps) {
			a.x = this.x;
			a.y = this.y + 32;
			a.w = this.w;
			a.h = this.h - 32;
		}
		
		this.cornerRadius = 6;
		
		dock.setAutohide();
		
		setTimeout(this.setFrameArea, 0);
		this.invalidate();
	};
	
	this.close = () => {
		for (app of this.apps) {
			app.close();
		}
		
		dock.setAutohide();
		
		drawables[1].splice(drawables.indexOf(this), 1);
	}
	
	this.detectMouseClose = () => {
		let b = this.detectMouse(this.w - 30, 6, 24, 20);
		this.hover.close = b;
		return b;
	};
	
	this.detectMouseMinimize = () => {
		let b = this.detectMouse(this.w - 54, 6, 24, 20);
		this.hover.minimize = b;
		return b;
	};
	
	this.detectMouseMaximize = () => {
		let b = this.detectMouse(this.w - 78, 6, 24, 20);
		this.hover.maximize = b;
		return b;
	};
	
	this.detectMouseSplitLeft = () => {
		let b = this.detectMouse(this.w - 108, 6, 24, 20);
		this.hover.splitLeft = b;
		return b;
	};
	
	this.detectMouseMultitask = () => {
		let b = this.detectMouse(this.w - 132, 6, 24, 20);
		this.hover.multitask = b;
		return b;
	};
	
	this.detectMouseSplitRight = () => {
		let b = this.detectMouse(this.w - 156, 6, 24, 20);
		this.hover.splitRight = b;
		return b;
	};
	
	this.detectMouseAddTab = () => {
		let x = 6 * (this.apps.length + 1) + this.apps.length * 120;
		let b = this.detectMouse(x, 6, 20, 20);
		this.hover.addTab = b;
		return b;
	};
	
	this.mouseDown = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseDown) {
			this.app.mouseDown(event);
		}
	};
	
	this.mouseMove = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			let newVal = false;
			let preHover = this.hover;
		
			newVal = newVal || preHover.close != this.detectMouseClose();
			newVal = newVal || preHover.minimize != this.detectMouseMinimize();
			newVal = newVal || preHover.maximize != this.detectMouseMaximize();
			newVal = newVal || preHover.splitLeft != this.detectMouseSplitLeft();
			newVal = newVal || preHover.multitask != this.detectMouseMultitask();
			newVal = newVal || preHover.splitRight != this.detectMouseSplitRight();
			newVal = newVal || preHover.addTab != this.detectMouseAddTab();
			
			if (newVal) this.invalidate();
		}
		else if (this.app.mouseMove) {
			this.app.mouseMove(event);
			if (!this.app.validated) this.invalidate();
		}
	};
	
	this.mouseDrag = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseDrag) {
			this.app.mouseDrag(event);
		}
	};
	
	this.mouseUp = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseUp) {
			this.app.mouseUp(event);
		}
	};
	
	this.mouseWheel = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			// Nothing
		}
		else if (this.app.mouseWheel) {
			this.app.mouseWheel(event);
		}
	};
	
	this.mouseClick = (event) => {
		if (detectMouse(this.x, this.y, this.w, 32)) {
			if (this.hover.close) {
				closeAppFrame(this);
			}
			
			if (this.hover.minimize) {
				minimizeAppFrame(this);
			}
			
			if (this.hover.maximize) {
				if (!this.maximized) {
					this.maximize();
				}
				else {
					this.restore();
				}
				
				setTimeout(setFrameArea, 0);
			}
		}
		else if (this.app.mouseClick) {
			this.app.mouseClick(event);
		}
	};
	
	this.mouseExit = (event) => {
		for (e in this.hover) this.hover[e] = false;
		
		this.app.mouseExit(event);
		
		this.invalidate();
	};
	
	this.keyDown = (event) => {
		this.app.keyDown(event);
		if (!this.app.validated) this.invalidate();
	};
	
	this.keyType = (event) => {
		this.app.keyType(event);
		if (!this.app.validated) this.invalidate();
	};
	
	this.keyUp = (event) => {
		this.app.keyUp(event);
		if (!this.app.validated) this.invalidate();
	};
}

setDrawablePrototype(Frame);
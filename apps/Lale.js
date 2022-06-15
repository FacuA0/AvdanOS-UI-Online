function LaleApp() {
	this.w = 920;
	this.h = 500;
	this.title = "Home";
	this.type = "LaleApp";
	
	this.icLogo = loadIcon("Apps", "Lale", 72, 72);
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icOptions = loadIcon("global", "MoreOptions", 12, 12);
	this.icAddTab = loadIcon("Photos", "More", 12, 12);
	this.icTabs = loadIcon("Files", "ShowGrid", 12, 12);
	this.icSidebar = loadIcon("Lale", "Sidebar", 12, 12);
	
	this.icBack = loadIcon("global", "Back", 12, 12);
	this.icForward = loadIcon("global", "Forward", 12, 12);
	this.icHome = loadIcon("global", "Home", 12, 12);
	this.icRefresh = loadIcon("Lale", "Refresh", 12, 12);
	
	this.pageMode = false;
	this.url = "";
	this.history = [""];
	
	this.pageIFrame = document.createElement("iframe");
	this.pageIFrame.width = 0;
	this.pageIFrame.height = 0;
	this.pageIFrame.style.borderRadius = "0px 0px 6px 6px";
	
	this.pageIFrame.style.position = "fixed";
	this.pageIFrame.style.border = "0px";
	
	document.body.append(this.pageIFrame);
	
	this.hover = {
		options: false,
		addTab: false,
		tabs: false,
		sidebar: false,
	};
	
	this.hoverPage = {
		back: false,
		forward: false,
		home: false,
		refresh: false,
		bar: false,
		options: false,
		tabs: false,
		sidebar: false
	};
	
	this.draw = (ctx) => {
		if (!this.pageMode) {
			this.drawMain(ctx);
		}
		else {
			this.drawPage(ctx);
		}
		
		this.validated = true;
	};
	
	this.drawMain = (ctx) => {
		ctx.fillStyle = "#0006";
		fillRoundedRect(ctx, 0, 0, this.w, this.h, 6);
		
		ctx.drawImage(this.icLogo, this.w / 2 - 36, 48);
		
		setTextStyle(ctx, "#EEE", "bold 16px sans-serif", "center", "middle");
		ctx.fillText("Lale", this.w / 2, 128);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w / 2 - 128, 160, 256, 24, 4);
		
		let search = this.url == "" ? "Search or enter a website" : this.url;
		
		setTextStyle(ctx, "#CCC", "10px sans-serif", "center", "middle");
		ctx.fillText(search, this.w / 2, 173);
		
		ctx.drawImage(this.icSearch, this.w / 2 - 122, 166);
		
		ctx.fillStyle = this.hover.sidebar ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4);
		ctx.drawImage(this.icSidebar, this.w - 25, 10);
		
		ctx.fillStyle = this.hover.addTab ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, this.w - 64, 6, 26, 20, 4);
		ctx.drawImage(this.icTabs, this.w - 57, 10);
		
		ctx.fillStyle = this.hover.tabs ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, this.w - 96, 6, 26, 20, 4);
		ctx.drawImage(this.icAddTab, this.w - 89, 10);
		
		ctx.fillStyle = this.hover.options ? "#FFF4" : "#FFF2";
		fillRoundedRect(ctx, this.w - 128, 6, 26, 20, 4);
		ctx.drawImage(this.icOptions, this.w - 121, 10);
		
	};
	
	this.drawPage = (ctx) => {
		var miniBar = this.w < 480;
		var searchBarWidth = 128;
		var searchBarX = this.w - (!miniBar ? 134 : 32);
		var searchIconX = this.w - (!miniBar ? 24 : 25);
		var optionsX = this.w - (!miniBar ? 160 : 64);
		var tagX = this.w - (!miniBar ? 192 : 96);
		var barWidth = this.w - 249;
		
		ctx.fillStyle = (this.hoverPage.back ? "#FFF4" : "#FFF2"); // Back button
		fillRoundedRect(ctx, 6, 6, 34, 20, 4);
		ctx.fillStyle = (this.hoverPage.forward ? "#FFF4" : "#FFF2"); // Forward button
		fillRoundedRect(ctx, 43, 6, 34, 20, 4);
		
		ctx.fillStyle = (this.hoverPage.home ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, 83, 6, 26, 20, 4); // Home button
		ctx.fillStyle = (this.hoverPage.refresh ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, 115, 6, 26, 20, 4); // Refresh button
		
		ctx.fillStyle = (this.hoverPage.options ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, this.w - 96, 6, 26, 20, 4); // More Options button
		ctx.fillStyle = (this.hoverPage.tabs ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, this.w - 64, 6, 26, 20, 4); // Tabs button
		ctx.fillStyle = (this.hoverPage.sidebar ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4); // Sidebar button
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, 147, 6, barWidth, 20, 4); // Path bar
		
		ctx.drawImage(this.icBack, 17, 10);
		ctx.drawImage(this.icForward, 54, 10);
		ctx.drawImage(this.icHome, 90, 10);
		ctx.drawImage(this.icRefresh, 122, 10);
		ctx.drawImage(this.icOptions, this.w - 89, 10);
		ctx.drawImage(this.icTabs, this.w - 57, 10);
		ctx.drawImage(this.icSidebar, this.w - 25, 10);
		
		this.url = this.pageIFrame.src;
		setTextStyle(ctx, "#FFF", "10px sans-serif", "center", "middle");
		ctx.fillText(this.url, 147 + barWidth / 2, 17);
		
		this.pageIFrame.style.left = (margin.left + this.x) + "px";
		this.pageIFrame.style.top = (margin.top + this.y + 32) + "px";
		this.pageIFrame.width = this.w;
		this.pageIFrame.height = this.h - 32;
	};
	
	this.checkHoverMain = () => {
		let inval = false;
		let oldHover = Object.assign({}, this.hover);
		
		this.hover.sidebar = this.detectMouse(this.w - 32, 6, 26, 20);
		this.hover.addTab = this.detectMouse(this.w - 64, 6, 26, 20);
		this.hover.tabs = this.detectMouse(this.w - 96, 6, 26, 20);
		this.hover.options = this.detectMouse(this.w - 128, 6, 26, 20);
		
		for (h in this.hover) {
			inval = inval || this.hover[h] != oldHover[h];
		}
		
		return inval;
	};
	
	this.checkHoverPage = () => {
		let inval = false;
		let oldHover = Object.assign({}, this.hoverPage);
		
		this.hoverPage.back = this.detectMouse(6, 6, 34, 20);
		this.hoverPage.forward = this.detectMouse(43, 6, 34, 20);
		this.hoverPage.home = this.detectMouse(83, 6, 26, 20);
		this.hoverPage.refresh = this.detectMouse(115, 6, 26, 20);
		this.hoverPage.bar = this.detectMouse(147, 6, this.w - 249, 20);
		this.hoverPage.options = this.detectMouse(this.w - 96, 6, 26, 20);
		this.hoverPage.tabs = this.detectMouse(this.w - 64, 6, 26, 20);
		this.hoverPage.sidebar = this.detectMouse(this.w - 32, 6, 26, 20);
		
		for (h in this.hoverPage) {
			inval = inval || this.hoverPage[h] != oldHover[h];
		}
		
		return inval;
	};
	
	this.mouseMove = () => {
		let inval = false;
		
		inval = inval || this.checkHoverMain();
		inval = inval || this.checkHoverPage();
		
		if (inval) this.invalidate();
	};
	
	this.mouseClick = () => {
		if (this.pageMode) {
			if (this.hoverPage.back) {
				//this.pageIFrame.contentWindow.history.back();
			}
			else if (this.hoverPage.forward) {
				//this.pageIFrame.contentWindow.history.forward();
			}
			else if (this.hoverPage.home) {
				this.pageMode = false;
				this.pageIFrame.style.display = "none";
				this.url = "";
			}
			else if (this.hoverPage.refresh) {
				this.pageIFrame.src = this.pageIFrame.src;
			}
			else if (this.hoverPage.options) {
				
			}
			else if (this.hoverPage.tabs) {
				
			}
			else if (this.hoverPage.sidebar) {
				
			}
		}
	};
	
	this.close = () => {
		document.body.removeChild(this.pageIFrame);
		this.pageIFrame = null;
	};
	
	this.minimize = () => {
		this.pageIFrame.style.display = "none";
	};
	
	this.restore = () => {
		this.pageIFrame.style.display = this.pageMode ? "block" : "none";
	};
	
	this.windowMove = () => {
		this.pageIFrame.style.left = this.x + "px";
		this.pageIFrame.style.top = (this.y + 32) + "px";
	};
	
	this.keyType = () => {
		if (keyboard.key == "Backspace") {
			this.url = this.url.substr(0, this.url.length - 1);
		}
		else {
			this.url += keyboard.key;
		}
		
		this.invalidate();
	};
	
	this.keyUp = () => {
		if (keyboard.key == "Enter") {
			if (!this.url.startsWith("https://") && (this.url.includes(" ") || !this.url.includes("."))) {
				this.url = "https://bing.com/search?q=" + this.url;
				this.pageIFrame.src = this.url;
				this.pageMode = true;
				this.pageIFrame.style.display = "block";
				this.invalidate();
			}
			else {
				this.pageIFrame.src = this.url;
				this.pageMode = true;
				this.pageIFrame.style.display = "block";
				this.invalidate();
			}
		}
	}
}

setDrawablePrototype(LaleApp);
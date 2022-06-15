function StartMenu() {
	this.w = 800;
	this.h = 600;
	
	this.isCentered = true;
	
	this.x = width / 2 - this.w / 2;
	this.y = height - dock.h - 24 - this.h;
	
	if (!this.isCentered) {
		this.x = 8;
	}
	
	this.cornerRadius = 8;
	
	this.visible = false;
	this.movable = false;
	this.resizable = false;
	this.type = "StartMenu";
	
	this.icSun = loadIcon("Dock", "Sun");
	this.icPlay = loadIcon("Start", "Play");
	this.icStar = loadIcon("Start", "Star");
	this.icDevPhone = loadIcon("Start", "DevicePhone");
	this.icDevWatch = loadIcon("Start", "DeviceWatch");
	this.icDevCar = loadIcon("Start", "DeviceCar");
	this.icProfile = loadIcon("Start", "DefaultProfilePicture");
	this.icCloud = loadIcon("Start", "Cloud");
	
	this.icBtnSettings = loadIcon("Start", "Settings", 16, 16);
	this.icAllApps = loadIcon("Start", "AllApps", 16, 16);
	this.icPower = loadIcon("Start", "Power", 16, 16);
	
	this.icFiles = loadIcon("Apps", "Files", 40, 40);
	this.icMail = loadIcon("Apps", "Mail", 40, 40);
	this.icLale = loadIcon("Apps", "Lale", 40, 40);
	this.icGallery = loadIcon("Apps", "Gallery", 40, 40);
	this.icCalendar = loadIcon("Apps", "Calendar", 40, 40);
	this.icNotes = loadIcon("Apps", "Notes", 40, 40);
	this.icSettings = loadIcon("Apps", "Settings", 40, 40);
	this.icMusic = loadIcon("Apps", "Music", 40, 40);
	this.icMessages = loadIcon("Apps", "Messages", 40, 40);
	this.icMovies = loadIcon("Apps", "Movies", 40, 40);
	this.icCalculator = loadIcon("Apps", "Calculator", 40, 40);
	this.icPresents = loadIcon("Apps", "Presentations", 40, 40);
	this.icAfterEffects = loadIcon("Apps", "AfterEffects", 40, 40);
	this.icPhotoshop = loadIcon("Apps", "Photoshop", 40, 40);
	this.icIllustrator = loadIcon("Apps", "Illustrator", 40, 40);
	this.icAppDefault = loadIcon("global", "Default", 40, 40);
	this.icPdf = loadIcon("Apps", "PDFReader", 40, 40);
	this.icTerminal = loadIcon("Apps", "Terminal", 40, 40);
	this.icTextEditor = loadIcon("Apps", "TextEditor", 40, 40);
	
	this.allAppsScreen = false;
	this.scrollAllApps = 0;
	
	this.apps = [{
			name: "After Effects",
			icon: this.icAfterEffects,
			app: null
		},{
			name: "Calculator",
			icon: this.icCalculator,
			app: CalculatorApp
		},{
			name: "Calendar",
			icon: this.icCalendar,
			app: null
		},{
			name: "Files",
			icon: this.icFiles,
			app: FilesApp
		},{
			name: "Illustrator",
			icon: this.icIllustrator,
			app: null
		},{
			name: "Lale",
			icon: this.icLale,
			app: LaleApp
		},{
			name: "Mail",
			icon: this.icMail,
			app: null
		},{
			name: "Messages",
			icon: this.icMessages,
			app: MessagesApp
		},{
			name: "Movies",
			icon: this.icMovies,
			app: null
		},{
			name: "Music",
			icon: this.icMusic,
			app: null
		},{
			name: "Notes",
			icon: this.icNotes,
			app: NotesApp
		},{
			name: "Photos",
			icon: this.icGallery,
			app: PhotosApp
		},{
			name: "Photoshop",
			icon: this.icPhotoshop,
			app: null
		},{
			name: "Presentations",
			icon: this.icPresents,
			app: null
		},{
			name: "Terminal",
			icon: this.icTerminal,
			app: TerminalApp
		},{
			name: "Text Editor",
			icon: this.icTextEditor,
			app: TextEditorApp
		}
	];
	
	this.pinnedApps = [
		{app: 6},
		{app: 11},
		{app: 5},
		{app: 2},
		{app: 10},
		{app: 7},
		{app: 9},
		{app: 8},
		{app: 1},
		{app: 13},
		{app: 3},
		{app: 0},
		{app: 12},
		{app: 4}
	];
	
	for (let a of this.apps) {
		a.hover = false;
	}
	
	for (let pa of this.pinnedApps) {
		pa.hover = false;
	}
	
	this.hoverBottomBar = {
		user: false,
		settings: false,
		allApps: false,
		shutdown: false,
		cloud: false
	}
	
	this.initCanvas(this);
	
	this.draw = (ctx) => {
		// Background
		ctx.fillStyle = "#00000088";
		fillRoundedRect(ctx, 0, 0, this.w, this.h, 8);
		
		this.drawBottomBar(ctx);
		
		if (!this.allAppsScreen) {
			this.drawMainScreen(ctx);
		}
		else {
			this.drawAllAppsScreen(ctx);
		}
	};
	
	this.drawMainScreen = (ctx) => {
		
		// Widgets
		var widgetWidth = (this.w - (20 * 2 + 8 * 2)) / 3;
		
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, 20, 24, widgetWidth, 128, 6);
		fillRoundedRect(ctx, 20 + widgetWidth + 8, 24, widgetWidth, 128, 6);
		fillRoundedRect(ctx, 20 + widgetWidth * 2 + 16, 24, widgetWidth, 128, 6);
		
		// Weather widget
		ctx.translate(20, 24);
		
		// City
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "top");
		ctx.fillText("Example City", 16, 12);
		
		// Temperature
		ctx.font = "16px sans-serif";
		ctx.fillText("24\u00B0", 16, 34);
		
		// Sun
		ctx.drawImage(this.icSun, widgetWidth - 32, 20, 24, 24);
		
		// Status, Max/min temperature
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "right", "bottom");
		ctx.fillText("Sunny", widgetWidth - 44, 32);
		setTextStyle(ctx, "#EEEEEE", "10px sans-serif", "right", "top");
		ctx.fillText("H: 28\u00B0, L: 6\u00B0", widgetWidth - 44, 34);
		
		// Weather in the week
		for (var i = 1; i <= 7; i++) {
			var x = widgetWidth / 8 * i;
			
			setTextStyle(ctx, "#BBBBBB", "8px sans-serif", "center", "middle");
			ctx.fillText(new Date().getDate() + i - 1, x, 70);
			setTextStyle(ctx, "#DDDDDD", "10px sans-serif", "center", "middle");
			ctx.fillText("24\u00B0", x, 106);
			
			ctx.drawImage(this.icSun, x - 8, 78, 16, 16);
		}
		
		// Reminder widget
		ctx.translate(widgetWidth + 8, 0);
		
		// Title
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "middle", "middle");
		ctx.fillText("Today", widgetWidth / 2, 20);
		
		// Times
		setTextStyle(ctx, "#EEEEEE", "10px sans-serif", "left", "top");
		ctx.fillText("12:00 - 13:00", 24, 40);
		ctx.fillText("17:00 - 18:00", 24, 80);
		
		// Reminders
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "left", "top");
		ctx.fillText("Reminder 1", 24, 56);
		ctx.fillText("Reminder 2", 24, 96);
		
		// Dots
		ctx.fillStyle = "#CC0077";
		ctx.beginPath();
		ctx.arc(16, 44, 4, 0, 2 * Math.PI);
		ctx.arc(16, 84, 4, 0, 2 * Math.PI);
		ctx.fill();
		
		// Devices widget
		ctx.translate(widgetWidth + 8, 0);
		
		var devIcons = [this.icDevPhone, this.icDevWatch, this.icDevCar];
		var devNames = ["My Phone", "Kaan's Watch", "Togg SUV"];
		var devBatteries = [25, 85, 55];
		for (var i = 0; i < 3; i++) {
			var x = widgetWidth / 6 * (i * 2 + 1);
			
			// Circles
			ctx.fillStyle = "#00000066";
			ctx.beginPath();
			ctx.arc(x, 36, 16, 0, 2 * Math.PI);
			ctx.fill();
			
			ctx.strokeStyle = "#FFFFFF44";
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(x, 36, 16, 0, 2 * Math.PI);
			ctx.stroke();
			
			// Device icon
			ctx.drawImage(devIcons[i], x - 8, 28);
			
			// Name
			setTextStyle(ctx, "#EEEEEE", "10px sans-serif", "center", "middle");
			ctx.fillText(devNames[i], x, 72);
			
			// Battery
			setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "center", "middle");
			ctx.fillText(devBatteries[i] + "%", x, 92);
			
			// Battery bar
			ctx.fillStyle = "#FFFFFF66";
			fillRoundedRect(ctx, x - 24, 108, 48, 6, 3);
			ctx.fillStyle = "#22DD88";
			fillRoundedRect2(ctx, x - 24, 108, 48 * (devBatteries[i] / 100), 6, 3, 0, 0, 3);
		}
		
		ctx.translate(-widgetWidth * 2 - 16 - 20, -24);
		
		// Pinned Apps
		ctx.translate(24, 180);
		
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "top");
		ctx.fillText("Pinned Apps", 0, 0);
		
		var appsWidth = this.w * 0.6;
		
		for (var i = 0; i < this.pinnedApps.length; i++) {
			var x = appsWidth / 7 * (i % 7 + 0.5);
			var y = 52 + 92 * Math.floor(i / 7);
			
			let pApp = this.pinnedApps[i];
			let app = this.apps[pApp.app];
			
			if (pApp.hover) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, x - 32, y - 32, 64, 88, 4);
			}
			
			ctx.drawImage(app.icon, x - 20, y - 20);
			
			setTextStyle(ctx, "#DDD", "11px sans-serif", "center", "top");
			ctx.fillText(app.name, x, y + 30);
		}
		
		ctx.translate(-24, -180);
		
		// App setups
		ctx.translate(24, 390);
		
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "top");
		ctx.fillText("App Setups", 0, 0);
		
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, 0, 32, 112, 84, 4);
		fillRoundedRect(ctx, 4, 36, 50, 76, 4);
		fillRoundedRect(ctx, 58, 36, 50, 76, 4);
		
		ctx.drawImage(this.icPhotoshop, 15, 60, 28, 28);
		ctx.drawImage(this.icIllustrator, 69, 60, 28, 28);
		
		fillRoundedRect(ctx, 120, 32, 112, 84, 4);
		fillRoundedRect(ctx, 124, 36, 104, 76, 4);
		
		ctx.fillStyle = "#FFFFFF44";
		fillRoundedRect(ctx, 184, 56, 36, 48, 4);
		ctx.fillStyle = "#FFFFFF22";
		
		ctx.drawImage(this.icNotes, 140, 60, 28, 28);
		ctx.drawImage(this.icCalculator, 190, 68, 24, 24);
		
		fillRoundedRect(ctx, 240, 32, 112, 84, 4);
		fillRoundedRect(ctx, 244, 36, 50, 36, 4);
		fillRoundedRect(ctx, 244, 76, 50, 36, 4);
		fillRoundedRect(ctx, 298, 36, 50, 76, 4);
		
		ctx.drawImage(this.icNotes, 257, 42, 24, 24);
		ctx.drawImage(this.icMessages, 257, 82, 24, 24);
		ctx.drawImage(this.icLale, 309, 60, 28, 28);
		
		fillRoundedRect(ctx, 360, 32, 112, 84, 4);
		fillRoundedRect(ctx, 364, 36, 50, 76, 4);
		fillRoundedRect(ctx, 418, 36, 50, 36, 4);
		fillRoundedRect(ctx, 418, 76, 50, 36, 4);
		
		ctx.drawImage(this.icMail, 375, 60, 28, 28);
		ctx.drawImage(this.icCalendar, 431, 42, 24, 24);
		ctx.drawImage(this.icLale, 431, 82, 24, 24);
		
		ctx.translate(-24, -390);
		
		// Divider line between Apps and Recents
		ctx.strokeStyle = "#FFFFFF22";
		ctx.lineWidth = 2;
		ctx.beginPath();
		ctx.moveTo(36 + appsWidth, 180);
		ctx.lineTo(36 + appsWidth, 507);
		ctx.stroke();
		
		// Pick up where you left off
		ctx.translate(56 + appsWidth, 180);
		
		var rightWidth = this.w - appsWidth - 56 - 24;
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "top");
		ctx.fillText("Pick up where you left off", 0, 0);
		
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, 0, 32, rightWidth, 92, 4);
		fillRoundedRect(ctx, 0, 133, rightWidth, 92, 4);
		fillRoundedRect(ctx, 0, 234, rightWidth, 92, 4);
		
		// Continue listening
		ctx.translate(0, 32);
		
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "left", "top");
		ctx.fillText("Continue listening", 16, 12);
		
		ctx.globalAlpha = 0.4;
		ctx.drawImage(this.icMusic, 16, 38);
		ctx.globalAlpha = 1;
		ctx.drawImage(this.icMusic, 40, 62, 18, 18);
		
		setTextStyle(ctx, "#EEEEEE", "10px sans-serif", "left", "bottom");
		ctx.fillText("Singing", 72, 56);
		setTextStyle(ctx, "#CCCCCC", "8px sans-serif", "left", "top");
		ctx.fillText("Singer", 72, 60);
		
		ctx.drawImage(this.icPlay, rightWidth - 64, 50, 16, 16);
		ctx.drawImage(this.icStar, rightWidth - 32, 49, 18, 18);
		
		// Continue editing
		ctx.translate(0, 101);
		
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "left", "top");
		ctx.fillText("Continue editing", 16, 12);
		
		ctx.globalAlpha = 0.4;
		ctx.drawImage(this.icGallery, 16, 38);
		ctx.globalAlpha = 1;
		ctx.drawImage(this.icIllustrator, 40, 62, 18, 18);
		
		setTextStyle(ctx, "#EEEEEE", "10px sans-serif", "left", "bottom");
		ctx.fillText("Abstract Wallpaper", 72, 56);
		setTextStyle(ctx, "#CCCCCC", "8px sans-serif", "left", "top");
		ctx.fillText("Adobe Illustrator Document", 72, 60);
		
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, rightWidth - 64, 46, 48, 24, 4);
		setTextStyle(ctx, "#CCCCCC", "10px sans-serif", "center", "middle");
		ctx.fillText("Open", rightWidth - 40, 58);
		
		// Continue reading
		ctx.translate(0, 101);
		
		setTextStyle(ctx, "#EEEEEE", "12px sans-serif", "left", "top");
		ctx.fillText("Continue reading", 16, 12);
		
		ctx.globalAlpha = 0.4;
		ctx.drawImage(this.icGallery, 16, 38);
		ctx.globalAlpha = 1;
		ctx.drawImage(this.icPdf, 40, 62, 18, 18);
		
		setTextStyle(ctx, "#EEEEEE", "10px sans-serif", "left", "bottom");
		ctx.fillText("Some Book", 72, 56);
		setTextStyle(ctx, "#CCCCCC", "8px sans-serif", "left", "top");
		ctx.fillText("PDF Reader", 72, 60);
		
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, rightWidth - 64, 46, 48, 24, 4);
		setTextStyle(ctx, "#CCCCCC", "10px sans-serif", "center", "middle");
		ctx.fillText("Open", rightWidth - 40, 58);
		
		ctx.translate(0, -234);
		
		ctx.translate(-56 - appsWidth, -180);
	};
	
	this.drawAllAppsScreen = (ctx) => {
		/*
		for (let i = 0, app; i < this.apps.length; i++) {
			app = this.apps[i];
			let y = 20 + i * 40;
			
			ctx.drawImage(app.icon, 20, y, 24, 24);
			
			setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
			ctx.fillText(app.name, 64, y + 13);
		}
		*/
		var allAppsHeight = this.h - 64;
		
		var pl = "", cl = "";
		for (let i = 0, tx = 0, ty = 0; i < this.apps.length; i++) {
			let app = this.apps[i];
			
			cl = app.name[0];
			
			let changedLetter = pl != cl;
			if (changedLetter) {
				pl = cl;
				
				tx = 0;
				ty += 2;
				
			}
			
			if (tx > 2) {
				tx = 0;
				ty++;
			}
			
			var x = 32 + tx * (this.w - 64) / 3;
			var y = -24 + ty * 40 - this.scrollAllApps;
			
			ctx.rect(0, 0, this.w, allAppsHeight);
			ctx.clip();
			
			if (changedLetter) {
				setTextStyle(ctx, "#CCC", "16px sans-serif", "center", "top");
				ctx.fillText(cl, x + 16, y - 40);
			}
			
			if (app.hover) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, x - 4, y - 20, (this.w - 64) / 3, 40, 4);
			}
			
			ctx.drawImage(app.icon ? app.icon : this.icAppDefault, x, y - 16, 32, 32);
			
			setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
			ctx.fillText(app.name, x + 40, y);
			
			ctx.beginPath();
			
			tx++;
		}
		
		let totalHeight = allAppsHeight - 12;
		let contentHeight = totalHeight * allAppsHeight / 760;
		
		// Scrollbar
		ctx.fillStyle = "#0003";
		fillRoundedRect(ctx, this.w - 10, 6, 4, totalHeight, 2);
		
		let contentY = 6 + (totalHeight - contentHeight) * (this.scrollAllApps / (760 - allAppsHeight));
		
		// Scrollbar slider
		ctx.fillStyle = "#FFF3";
		fillRoundedRect(ctx, this.w - 10, contentY, 4, contentHeight, 2);
	};
	
	this.drawBottomBar = (ctx) => {
		
		// Bottom bar
		ctx.translate(0, this.h - 64);
		
		ctx.fillStyle = "#00000044";
		fillRoundedRect2(ctx, 0, 0, this.w, 64, 0, 0, 8, 8);
		
		// User account
		if (this.hoverBottomBar.user) {
			ctx.fillStyle = "#FFF1";
			fillRoundedRect(ctx, 20, 8, 112, 48, 4);
		}
		
		ctx.drawImage(this.icProfile, 24, 12, 40, 40);
		
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "middle");
		ctx.fillText("User", 80, 33);
		
		// Action buttons
		var half = this.w / 2;
		ctx.fillStyle = this.hoverBottomBar.settings ? "#FFF3" : "#FFF2";
		fillRoundedRect(ctx, half - 104, 20, 64, 24, 4);
		
		ctx.fillStyle = this.hoverBottomBar.allApps ? "#FFF3" : "#FFF2";
		fillRoundedRect(ctx, half - 32, 20, 64, 24, 4);
		
		ctx.fillStyle = this.hoverBottomBar.shutdown ? "#FFF3" : "#FFF2";
		fillRoundedRect(ctx, half + 40, 20, 64, 24, 4);
		
		ctx.drawImage(this.icBtnSettings, half - 80, 24);
		ctx.drawImage(this.icAllApps, half - 8, 24);
		ctx.drawImage(this.icPower, half + 32 + 8 + 32 - 8, 24);
		
		// Cloud storage
		if (this.hoverBottomBar.cloud) {
			ctx.fillStyle = "#FFF1";
			fillRoundedRect(ctx, 612, 8, 166, 48, 4);
		}
		
		ctx.drawImage(this.icCloud, this.w - 48, 12, 24, 24);
		
		setTextStyle(ctx, "#DDDDDD", "11px sans-serif", "right", "top");
		ctx.fillText("Cloud Storage", this.w - 64, 12);
		setTextStyle(ctx, "#BBBBBB", "9px sans-serif", "right", "top");
		ctx.fillText("252 GB used of 1 TB", this.w - 64, 28);
	
		ctx.fillStyle = "#FFFFFF22";
		fillRoundedRect(ctx, this.w - 174, 44, 150, 6, 3);
		ctx.fillStyle = "#8AACFF";
		fillRoundedRect(ctx, this.w - 174, 44, 150 * 0.252, 6, 3);
		fillRoundedRect(ctx, this.w - 174, 44, 150 * 0.252, 6, 3);
		
		ctx.translate(0, -(this.h - 64));
	};
	
	this.mouseMove = () => {
		let inval = false;
		
		inval = inval || this.checkHoverBottomBar();
		inval = inval || this.checkHoverPinnedApps();
		inval = inval || this.checkHoverAllApps();
		
		if (inval) this.invalidate();
	};
	
	this.checkHoverBottomBar = () => {
		let inval = false;
		let hover = this.hoverBottomBar;
		let preHover = Object.assign({}, hover);
		
		hover.user = this.detectMouse(20, 544, 112, 48);
		
		hover.settings = this.detectMouse(296, 556, 64, 24);
		hover.allApps = this.detectMouse(368, 556, 64, 24);
		hover.shutdown = this.detectMouse(440, 556, 64, 24);
		
		hover.cloud = this.detectMouse(612, 544, 166, 48);
		
		inval = inval || preHover.user != hover.user;
		inval = inval || preHover.settings != hover.settings;
		inval = inval || preHover.allApps != hover.allApps;
		inval = inval || preHover.shutdown != hover.shutdown;
		inval = inval || preHover.cloud != hover.cloud;
		
		return inval;
	};
	
	this.checkHoverPinnedApps = () => {
		if (this.allAppsScreen) return false;
		
		var inval = false;
		var appsWidth = this.w * 0.6;
		
		for (var i = 0; i < this.pinnedApps.length; i++) {
			var x = 24 + appsWidth / 7 * (i % 7 + 0.5);
			var y = 180 + 52 + 92 * Math.floor(i / 7);
			
			let temp = this.pinnedApps[i].hover;
			let newVal = this.detectMouse(x - 32, y - 32, 64, 88);
			inval = inval || temp != newVal;
			this.pinnedApps[i].hover = newVal;
		}
		
		return inval;
	};
	
	this.checkHoverAllApps = () => {
		if (!this.allAppsScreen) return false;
		
		var inval = false;
		
		var pl = "", cl = "";
		for (let i = 0, tx = 0, ty = 0; i < this.apps.length; i++) {
			let app = this.apps[i];
			
			cl = app.name[0];
			
			let changedLetter = pl != cl;
			if (changedLetter) {
				pl = cl;
				
				tx = 0;
				ty += 2;
			}
			
			if (tx > 2) {
				tx = 0;
				ty++;
			}
			
			var x = 32 + tx * (this.w - 64) / 3;
			var y = -24 + ty * 40 - this.scrollAllApps;
			
			let temp = this.apps[i].hover;
			let newVal = this.detectMouse(x - 4, y - 20, (this.w - 64) / 3, 40);
			inval = inval || temp != newVal;
			this.apps[i].hover = newVal;
			
			tx++;
		}
		
		return inval;
	};
	
	this.mouseClick = () => {
		if (this.hoverBottomBar.settings || this.hoverBottomBar.user || this.hoverBottomBar.cloud) {
			openApp(SettingsApp);
			this.visible = false;
			this.allAppsScreen = false;
			return;
		}
		
		if (this.hoverBottomBar.allApps) {
			this.allAppsScreen = !this.allAppsScreen;
			this.invalidate();
			return;
		}
		
		if (this.allAppsScreen) {
			for (let i = 0; i < this.apps.length; i++) {
				let app = this.apps[i];
				if (app.hover && app.app) {
					openApp(app.app);
					this.visible = false;
					this.allAppsScreen = false;
					return;
				}
			}
		}
		else {
			for (let i = 0; i < this.pinnedApps.length; i++) {
				let pApp = this.pinnedApps[i];
				let app = this.apps[pApp.app];
				if (pApp.hover && app.app) {
					openApp(app.app);
					this.visible = false;
					this.allAppsScreen = false;
					return;
				}
			}
		}
	};
	
	this.mouseWheel = () => {
		if (this.allAppsScreen && this.detectMouse(0, 0, this.w, this.h - 64)) {
			this.scrollAllApps += mouse.wheelDelta;
			this.scrollAllApps = Math.min(Math.max(this.scrollAllApps, 0), 760 - (this.h - 64));
			
			this.invalidate();
		}
	};
}

setDrawablePrototype(StartMenu);
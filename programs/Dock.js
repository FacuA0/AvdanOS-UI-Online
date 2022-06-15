function Dock() {
	this.w = 1008;
	this.h = 48;
	
	this.x = width / 2 - this.w / 2;
	
	this.sy = height - 16 - this.h;
	this.hy = height + 10;
	
	this.y = this.sy;
	
	this.cornerRadius = 8;
	
	this.movable = false;
	this.resizable = false;
	this.type = "Dock";
	
	this.hidden = false;
	this.autohide = false;
	
	this.icFiles = loadIcon("Apps", "Files", 32, 32);
	this.icMail = loadIcon("Apps", "Mail", 32, 32);
	this.icLale = loadIcon("Apps", "Lale", 32, 32);
	this.icGallery = loadIcon("Apps", "Gallery", 32, 32);
	this.icCalendar = loadIcon("Apps", "Calendar", 32, 32);
	this.icNotes = loadIcon("Apps", "Notes", 32, 32);
	this.icSettings = loadIcon("Apps", "Settings", 32, 32);
	this.icMusic = loadIcon("Apps", "Music", 32, 32);
	this.icMessages = loadIcon("Apps", "Messages", 32, 32);
	this.icHide = loadIcon("Dock", "HideApps");
	
	this.icSearch = loadIcon("Dock", "Search", 16, 16);
	this.icAvdan = loadIcon("Dock", "AvdanMenu", 20, 20);
	this.icRecents = loadIcon("Dock", "RecentApps", 16, 16);
	
	this.icWeatherSun = loadIcon("Dock", "Sun");
	
	this.icWifi = loadIcon("Dock", "WiFi", 32, 32);
	this.icBluetooth = loadIcon("Dock", "Bluetooth", 24, 24);
	this.icSound = loadIcon("Dock", "Sound", 24, 24);
	this.icBattery = loadIcon("Dock", "Battery", 24, 24);
	this.icQuick = loadIcon("Dock", "QuickSettings", 24, 24);
	
	this.pinnedApps = [
		{
			app: FilesApp,
			name: "FilesApp",
			icon: this.icFiles,
			hover: false
		},{
			app: null,
			name: "null",
			icon: this.icMail,
			hover: false
		},{
			app: LaleApp,
			name: "LaleApp",
			icon: this.icLale,
			hover: false
		},{
			app: PhotosApp,
			name: "PhotosApp",
			icon: this.icGallery,
			hover: false
		},{
			app: null,
			name: "null",
			icon: this.icCalendar,
			hover: false
		},{
			app: NotesApp,
			name: "NotesApp",
			icon: this.icNotes,
			hover: false
		}
	]
	
	this.pinnedApps2 = [
		{
			app: SettingsApp,
			name: "SettingsApp",
			icon: this.icSettings,
			hover: false
		},{
			app: null,
			name: "null",
			icon: this.icMusic,
			hover: false
		},{
			app: MessagesApp,
			name: "MessagesApp",
			icon: this.icMessages,
			hover: false
		}
	]
	
	this.checkHover = {
		pinnedApps: false,
		main: false,
		statusBar: false
	}
	
	this.hoverMain = {
		search: false,
		start: false,
		recents: false
	};
	
	this.hoverStatusBar = {
		wifi: false,
		bluetooth: false,
		sound: false,
		battery: false,
		more: false
	};
	
	this.initCanvas(this);
	
	this.draw = (ctx) => {
		//ctx.translate(this.x, this.y);
		
		ctx.fillStyle = "#0002";
		//fillRoundedRect(0, 0, this.w, this.h, 8);
		
		ctx.fillStyle = "#0008";
		fillRoundedRect(ctx, 0, 0, 400, this.h, 8);
		
		ctx.fillStyle = "#0008";
		fillRoundedRect(ctx, 416, 0, 128, this.h, 8);
		
		ctx.fillStyle = "#0008";
		fillRoundedRect(ctx, 560, 0, 224, this.h, 8);
		
		ctx.fillStyle = "#0008";
		fillRoundedRect(ctx, 800, 0, 208, this.h, 8);
		ctx.setTransform(1, 0, 0, 1, 8, 8);
		
		ctx.fillStyle = "#FFF1";
		
		this.pinnedApps.forEach((ic, i) => {
			if (ic.hover) fillRoundedRect(ctx, 40 * i - 4, -4, 40, 40, 6);
			
			ctx.drawImage(ic.icon, 40 * i, 0);
			
			let app = this.findAppFrame(ic);
			if (app) {
				ctx.strokeStyle = app.visible ? "#E92B6A" : "#FFFA";
				ctx.lineWidth = 2;
			
				ctx.beginPath();
					ctx.moveTo(40 * i + 4, 35);
					ctx.lineTo(40 * i + 28, 35);
				ctx.stroke();
			}
		});
		
		ctx.strokeStyle = "#FFF4";
		ctx.lineWidth = 2;
		
		ctx.beginPath();
			ctx.moveTo(240, 0);
			ctx.lineTo(240, 32);
		ctx.stroke();
		
		ctx.translate(8, 0);
		
		this.pinnedApps2.forEach((ic, i) => {
			if (ic.hover) fillRoundedRect(ctx, 236 + 40 * i, -4, 40, 40, 6);
			
			ctx.drawImage(ic.icon, 240 + 40 * i, 0);
			
			let app = this.findAppFrame(ic);
			if (app) {
				ctx.strokeStyle = app.visible ? "#E92B6A" : "#FFFA";
				ctx.lineWidth = 2;
			
				ctx.beginPath();
					ctx.moveTo(240 + 40 * i + 4, 35);
					ctx.lineTo(240 + 40 * i + 28, 35);
				ctx.stroke();
			}
		});
		
		ctx.drawImage(this.icHide, 360, 8);
		
		ctx.setTransform(1, 0, 0, 1, 424, 8);
		
		if (this.hoverMain.search)
			fillRoundedRect(ctx, -4, -4, 40, 40, 6);
		if (this.hoverMain.start)
			fillRoundedRect(ctx, 36, -4, 40, 40, 6);
		if (this.hoverMain.recents)
			fillRoundedRect(ctx, 76, -4, 40, 40, 6);
		
		ctx.drawImage(this.icSearch, 8, 8);
		ctx.drawImage(this.icAvdan, 46, 6);
		ctx.drawImage(this.icRecents, 88, 8);
		
		ctx.translate(144, 0);
		
		//ctx.fillRect(0, 0, 32, 32);
		
		let daysWeek = ["Sunday", "Monday", "Thursday", "Wednesday", "Tuesday", "Friday", "Saturday"];
		let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		let date = new Date();
		
		setTextStyle(ctx, "#EEEEEE", "14px sans-serif", "left", "top");
		ctx.fillText(date.getHours() + ":" + date.getMinutes(), 0, 0);
		
		ctx.font = "12px sans-serif";
		ctx.textBaseline = "bottom";
		ctx.fillText(daysWeek[date.getDay()] + ", " + months[date.getMonth()] + " " + date.getDate(), 0, 32);
		
		ctx.drawImage(this.icWeatherSun, 164, 8, 16, 16);
		
		setTextStyle(ctx, "#EEEEEE", "16px sans-serif", "right", "middle");
		ctx.fillText("24\u00B0", 208, 17);
		
		ctx.translate(240, 0);
		
		ctx.fillStyle = "#FFF1";
		
		if (this.hoverStatusBar.wifi)
			fillRoundedRect(ctx, -4, -4, 40, 40, 6);
		if (this.hoverStatusBar.bluetooth)
			fillRoundedRect(ctx, 36, -4, 40, 40, 6);
		if (this.hoverStatusBar.sound)
			fillRoundedRect(ctx, 76, -4, 40, 40, 6);
		if (this.hoverStatusBar.battery)
			fillRoundedRect(ctx, 116, -4, 40, 40, 6);
		if (this.hoverStatusBar.more)
			fillRoundedRect(ctx, 156, -4, 40, 40, 6);
		
		ctx.drawImage(this.icWifi, 0, 0);
		ctx.drawImage(this.icBluetooth, 44, 4);
		ctx.drawImage(this.icSound, 84, 4);
		ctx.drawImage(this.icBattery, 124, 4);
		ctx.drawImage(this.icQuick, 164, 4);
		
		ctx.translate(-808, -8);
		
		//ctx.translate(-this.x, -this.y);
	};
	
	this.show = () => {
		this.visible = true;
		this.hidden = false;
		this.invalidate();
	};
	
	this.hide = () => {
		this.visible = false;
		this.hidden = true;
		this.invalidate();
	};
	
	this.setAutohide = () => {
		let auto = false;
		for (let i = 0; i < drawables[1].length; i++) {
			let f = drawables[1][i];
			
			if (!f.visible) continue;
			
			auto = false;
			
			if (!f.maximized) continue;
			
			auto = true;
		}
		
		if (start.visible) auto = false;
		
		this.autohide = auto;
		if (!auto) {
			this.show();
		}
		else if (!this.detectMouse(0, 0, this.w, this.h)) {
			this.hide();
		}
	};
	
	this.findAppFrame = (dockApp) => {
		return drawables[1].find((f) => f.app.type == dockApp.name)
	};
	
	this.mouseClick = (event) => {
		if (this.detectMouse(4, 4, 4 + 40 * this.pinnedApps.length, 40)) {
			for (let i = 0; i < this.pinnedApps.length; i++) {
				
				if (!this.detectMouse(4 + 40 * i, 4, 40, 40)) continue;
				
				let currentApp = this.pinnedApps[i];
				let s = this.findAppFrame(currentApp);
				if (s == undefined) {
					if (!currentApp.app) return;
					
					openApp(currentApp.app);
				}
				else {
					if (s.visible && drawables[1].indexOf(s) == drawables[1].length - 1) {
						minimizeAppFrame(s);
					}
					else {
						restoreAppFrame(s);
					}
				}
				return;
			}
		}
		
		if (this.detectMouse(252, 4, 4 + 40 * this.pinnedApps2.length, 40)) {
			for (let i = 0; i < this.pinnedApps2.length; i++) {
				
				if (!this.detectMouse(252 + 40 * i, 4, 40, 40)) continue;
				
				let currentApp = this.pinnedApps2[i];
				let s = this.findAppFrame(currentApp);
				if (s == undefined) {
					if (!currentApp.app) return;
					
					openApp(currentApp.app);
				}
				else {
					if (s.visible && drawables[1].indexOf(s) == drawables[1].length - 1) {
						minimizeAppFrame(s);
					}
					else {
						restoreAppFrame(s);
					}
				}
				return;
			}
		}
		/*
		
		if (this.detectMouse(4, 4, 40, 40)) {
			drawables[1].push(new Frame(new FilesApp()));
		}
		if (this.detectMouse(84, 4, 40, 40)) {
			drawables[1].push(new Frame(new LaleApp()));
		}
		if (this.detectMouse(124, 4, 40, 40)) {
			drawables[1].push(new Frame(new PhotosApp()));
		}
		if (this.detectMouse(204, 4, 40, 40)) {
			drawables[1].push(new Frame(new NotesApp()));
		}
		if (this.detectMouse(252, 4, 40, 40)) {
			drawables[1].push(new Frame(new SettingsApp()));
		}
		if (this.detectMouse(332, 4, 40, 40)) {
			drawables[1].push(new Frame(new MessagesApp()));
		}
		*/
		if (this.detectMouse(460, 4, 40, 40)) {
			start.visible = !start.visible;
			start.allAppsScreen = false;
			start.invalidate();
		}
	};
	
	this.mouseMove = () => {
		
		if (this.autohiding) {
			clearInterval(this.autohiding);
			this.autohiding = null;
		}
		
		var inval = false;
		
		if (this.detectMouse(4, 4, 368, 40)) {
			for (var i = 0; i < this.pinnedApps.length; i++) {
				let preValue = this.pinnedApps[i].hover;
				let newValue = this.detectMouse(4 + i * 40, 4, 40, 40);
				
				inval = inval || newValue != preValue;
				
				this.pinnedApps[i].hover = newValue;
			}
			
			this.checkHover.pinnedApps = true;
			
			for (var i = 0; i < this.pinnedApps2.length; i++) {
				let preValue = this.pinnedApps2[i].hover;
				let newValue = this.detectMouse(252 + i * 40, 4, 40, 40);
				
				inval = inval || newValue != preValue;
				
				this.pinnedApps2[i].hover = newValue;
			}
		}
		else {
			for (var i = 0; i < this.pinnedApps.length; i++) {
				this.pinnedApps[i].hover = false;
			}
			for (var i = 0; i < this.pinnedApps2.length; i++) {
				this.pinnedApps2[i].hover = false;
			}
			
			if (this.checkHover.pinnedApps) {
				inval = true;
				this.checkHover.pinnedApps = false;
			}
		}
		
		if (this.detectMouse(420, 4, 120, 40)) {
			let preHover = Object.assign({}, this.hoverMain);
			
			this.hoverMain.search = this.detectMouse(420, 4, 40, 40);
			this.hoverMain.start = this.detectMouse(460, 4, 40, 40);
			this.hoverMain.recents = this.detectMouse(500, 4, 40, 40);
			this.checkHover.main = true;
			
			this.setAutohide();
			
			for (h in this.hoverMain) {
				inval = inval || (this.hoverMain[h] != preHover[h]);
			}
		}
		else {
			this.hoverMain.search = false;
			this.hoverMain.start = false;
			this.hoverMain.recents = false;
			
			if (this.checkHover.main) {
				inval = true;
				this.checkHover.main = false;
			}
		}	
		
		if (this.detectMouse(804, 4, 200, 40)) {
			let preHover = Object.assign({}, this.hoverStatusBar);
			
			this.hoverStatusBar.wifi = this.detectMouse(804, 4, 40, 40);
			this.hoverStatusBar.bluetooth = this.detectMouse(844, 4, 40, 40);
			this.hoverStatusBar.sound = this.detectMouse(884, 4, 40, 40);
			this.hoverStatusBar.battery = this.detectMouse(924, 4, 40, 40);
			this.hoverStatusBar.more = this.detectMouse(964, 4, 40, 40);
			this.checkHover.statusBar = true;
			
			for (h in this.hoverStatusBar) {
				inval = inval || (this.hoverStatusBar[h] != preHover[h]);
			}
		}
		else {
			this.hoverStatusBar.wifi = false;
			this.hoverStatusBar.bluetooth = false;
			this.hoverStatusBar.sound = false;
			this.hoverStatusBar.battery = false;
			this.hoverStatusBar.more = false;
			
			if (this.checkHover.statusBar) {
				inval = true;
				this.checkHover.statusBar = false;
			}
		}
		
		if (inval) this.invalidate();
	};
	
	this.mouseExit = (event) => {
		for (e of this.pinnedApps) e.hover = false;
		for (e of this.pinnedApps2) e.hover = false;
		for (e in this.hoverMain) this.hoverMain[e] = false;
		for (e in this.hoverStatusBar) this.hoverStatusBar[e] = false;
		
		if (this.autohide) {
			this.hide();
		}
		
		this.invalidate();
	};
}

setDrawablePrototype(Dock);
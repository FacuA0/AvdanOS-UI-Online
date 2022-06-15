function SettingsApp() {
	this.w = 910;
	this.h = 578;
	this.minW = 560;
	this.minH = 120;
	this.title = "Settings";
	this.type = "SettingsApp";
	
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icMainProfile = loadIcon("Start", "DefaultProfilePicture", 36, 36);
	this.icMainCloud = loadIcon("Start", "Cloud");
	this.icHome = loadIcon("global", "Home", 12, 12);
	this.icOptions = loadIcon("global", "MoreOptions", 12, 12);
	
	this.icWallpaper = loadIcon("Settings", "Wallpaper", 24, 24);
	this.icNotifications = loadIcon("Settings", "Notifications", 24, 24);
	this.icNetAccounts = loadIcon("Settings", "NetAccounts", 24, 24);
	this.icBluetooth = loadIcon("Settings", "Bluetooth", 24, 24);
	this.icUpdate = loadIcon("Settings", "Update", 24, 24);
	this.icUpToDate = loadIcon("Settings", "UpToDate", 24, 24);
	this.icBattery = loadIcon("Settings", "Battery", 24, 24);
	this.icDock = loadIcon("Settings", "Dock", 24, 24);
	
	this.icSetGeneral = loadIcon("Settings", "General", 24, 24);
	this.icSetPersonalize = loadIcon("Settings", "Personalization", 24, 24);
	this.icSetNetwork = loadIcon("Settings", "Network", 24, 24);
	this.icSetLanguage = loadIcon("Settings", "Language", 24, 24);
	this.icSetTime = loadIcon("Settings", "Time", 24, 24);
	this.icSetSearch = loadIcon("Settings", "Search", 24, 24);
	this.icSetDisplays = loadIcon("Settings", "Displays", 24, 24);
	this.icSetApps = loadIcon("Settings", "Apps", 24, 24);
	this.inSetAccessibility = loadIcon("Settings", "Accessibility", 24, 24);
	this.icSetSound = loadIcon("Settings", "Sound", 24, 24);
	this.inSetPrivacy = loadIcon("Settings", "Privacy", 24, 24);
	this.icSetSecurity = loadIcon("Settings", "Security", 24, 24);
	this.icSetUsers = loadIcon("Settings", "Users", 24, 24);
	this.icSetDevices = loadIcon("Settings", "Devices", 24, 24);
	this.icSetExtensions = loadIcon("Settings", "Extensions", 24, 24);
	this.icMainSetting = loadIcon("global", "Default", 24, 24);
	
	this.icBack = loadIcon("global", "Back", 12, 12);
	this.icForward = loadIcon("global", "Forward", 12, 12);
	this.icMainGo = loadIcon("global", "Forward", 12, 13);
	
	this.icPersonalTheme = loadIcon("global", "Default", 192, 128);
	this.icPersonalAppearance = loadIcon("global", "Default", 128, 88);
	this.imgPersonalStyleRoundedBG = loadImage("Settings", "AppearanceStyleRoundedBG");
	this.imgPersonalStyleRoundedNoBG = loadImage("Settings", "AppearanceStyleRoundedNoBG");
	this.imgPersonalStyleStraightBG = loadImage("Settings", "AppearanceStyleStraightBG");
	this.imgPersonalStyleStraightNoBG = loadImage("Settings", "AppearanceStyleStraightNoBG");
	
	this.settingsScreen = false;
	this.settingsCat = null;
	this.settingsSection = null;
	
	this.hover = {
		back: false,
		forward: false,
		home: false,
		options: false,
		sections: -1
	};
	
	this.settings = [
		{
			name: "General",
			icon: this.icSetGeneral,
			sections: [
				{name: "Option 1", func: "Option1"},
				{name: "Updates"},
				{name: "About"}
			]
		}, {
			name: "Personalization",
			func: "Personal",
			icon: this.icSetPersonalize,
			sections: [
				{name: "Wallpaper"},
				{name: "Themes"},
				{name: "Appearance"},
				{name: "Dock"},
				{name: "Menus"},
				{name: "Screensaver"}
			]
		}, {
			name: "Network and Internet",
			func: "Network",
			icon: this.icSetNetwork,
			sections: [
				{name: "Wi-Fi", func: "Wifi"},
				{name: "Bluetooth"}
			]
		}, {
			name: "Language and Region",
			func: "Language",
			icon: this.icSetLanguage,
			sections: [
				{name: "Language"},
				{name: "Keyboard Layout", func: "Keyboard"},
				{name: "Format"}
			]
		}, {
			name: "Time and Date",
			func: "Time",
			icon: this.icSetTime,
			sections: [
				{name: "Time"},
				{name: "Date"},
				{name: "Timezone"}
			]
		}, {
			name: "Search",
			icon: this.icSetSearch,
			sections: [
				{name: "Search"}
			]
		}, {
			name: "Displays",
			icon: this.icSetDisplays,
			sections: []
		}, {
			name: "Apps",
			icon: this.icSetApps,
			sections: [
				{name: "Apps"},
				{name: "Defaults"}
			]
		}, {
			name: "Accessibility",
			func: "Access",
			icon: this.inSetAccessibility,
			sections: [
				{name: "Visual"},
				{name: "Audio"}
			]
		}, {
			name: "Sound",
			icon: this.icSetSound,
			sections: [
				{name: "Input"},
				{name: "Output"},
				{name: "System Sounds", func: "System"}
			]
		}, {
			name: "Privacy",
			icon: this.inSetPrivacy,
			sections: []
		}, {
			name: "Security",
			icon: this.icSetSecurity,
			sections: []
		}, {
			name: "Users",
			icon: this.icSetUsers,
			sections: [
				{name: "Accounts"},
				{name: "Internet Accounts", func: "Internet"}
			]
		}, {
			name: "Devices",
			icon: this.icSetDevices,
			sections: [
				{name: "Devices"},
				{name: "Mouse"},
				{name: "Keyboard"}
			]
		}, {
			name: "Extensions",
			icon: this.icSetExtensions,
			sections: []
		}
	];
	
	for (let s in this.settings) {
		this.settings[s].hover = false;
		
		if (!this.settings[s].func) {
			this.settings[s].func = this.settings[s].name;
		}
		
		for (sec of this.settings[s].sections) {
			sec.hover = false;
			if (!sec.func) sec.func = sec.name;
		}
	}
	
	this.themes = [
		{
			name: "Default",
			image: this.icPersonalTheme
		},{
			name: "Classic",
			image: this.icPersonalTheme
		},{
			name: "Pastel",
			image: this.icPersonalTheme
		},{
			name: "Neon",
			image: this.icPersonalTheme
		},{
			name: "Organic",
			image: this.icPersonalTheme
		},{
			name: "Pro",
			image: this.icPersonalTheme
		},{
			name: "Dynamic",
			image: this.icPersonalTheme
		},{
			name: "Basic",
			image: this.icPersonalTheme
		}
	];
	
	this.appearances = [
		{
			name: "Dark",
			image: this.icPersonalAppearance
		},{
			name: "Light",
			image: this.icPersonalAppearance
		},{
			name: "Pastel",
			image: this.icPersonalAppearance
		},{
			name: "Custom 1",
			image: this.icPersonalAppearance
		},{
			name: "Create New Appearance",
			image: this.icPersonalAppearance
		}
	];
	
	this.windowColors = [
		"#FFF",
		"#1C1A1E",
		"#F1C3E8",
		"#A986AD",
		"#F8AC91",
		"#9E6DE4",
		"#F66B7C",
		"#1E1F67",
		"#EC1851",
		"#013B2A",
		"#4A8B52",
		"#DED5C6",
		"#FF4848",
		"new"
	];
	
	this.accentColors = [
		"any",
		"#D01B64",
		"#56DCFF",
		"#F88084",
		"#FF54A1",
		"#9D6FE6",
		"#B97CCE",
		"#645275",
		"#FFAF3E",
		"#95DBCA",
		"#2AB97C",
		"#8FB0FE",
		"#1E1F69",
		"new"
	];
	
	this.draw = (ctx) => {
		if (!this.settingsScreen) {
			this.drawMain(ctx);
		}
		else {
			this.drawSettings(ctx);
		}
		
		this.validated = true;
	};
	
	this.drawMain = (ctx) => {
		setTextStyle(ctx, "#EEE", "20px sans-serif", "center", "top");
		ctx.fillText("Settings", this.w / 2, 15);
		
		// Profile
		ctx.drawImage(this.icMainProfile, 18, 21);
		
		setTextStyle(ctx, "#FFFE", "12px sans-serif", "left", "top");
		ctx.fillText("User", 68, 27);
		
		setTextStyle(ctx, "#FFFB", "10px sans-serif", "left", "top");
		ctx.fillText("user@gmail.com", 68, 44);
		
		// Search bar
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w / 2 - 128, 45, 256, 24, 4);
		
		setTextStyle(ctx, "#CCC", "11px sans-serif", "left", "middle");
		ctx.fillText("Find a setting", this.w / 2 - 118, 58);
		
		ctx.drawImage(this.icSearch, this.w / 2 + 108, 51);
		
		// Cloud Managing
		ctx.drawImage(this.icMainCloud, this.w - 53, 24);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "right", "top");
		ctx.fillText("Cloud", this.w - 70, 27);
		
		setTextStyle(ctx, "#BBB", "10px sans-serif", "right", "top");
		ctx.fillText("Manage", this.w - 70, 44);
		
		
		// Pinned
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Pinned", 20, 78);
		
		ctx.fillStyle = "#FFF1";
		//fillRoundedRect(ctx, 20, 104, this.w - 40, 127, 4);
		
		let wPinned = this.w - 40;
		let wPinS = wPinned * 0.220859;
		let wPinL = wPinned * 0.265337;
		
		// Wallpaper
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 104, wPinS, 37, 4);
		ctx.drawImage(this.icWallpaper, 30, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Wallpaper", 60, 124);
		ctx.drawImage(this.icMainGo, wPinS, 116);
		
		// Notifications
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 149, wPinS, 37, 4);
		ctx.drawImage(this.icNotifications, 30, 157, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Notifications", 60, 169);
		ctx.drawImage(this.icMainGo, wPinS, 161);
		
		// Internet accounts
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 194, wPinS, 37, 4);
		ctx.drawImage(this.icNetAccounts, 30, 202, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Internet Accounts", 60, 214);
		ctx.drawImage(this.icMainGo, wPinS, 206);
		
		
		// Bluetooth
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 28 + wPinS, 104, wPinL, 127, 4);
		ctx.drawImage(this.icBluetooth, 38 + wPinS, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
		ctx.fillText("Bluetooth", 68 + wPinS, 124);
		
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Alya's Earbuds", 68 + wPinS, 154);
		ctx.fillText("Kaan's Headphones", 68 + wPinS, 184);
		ctx.fillText("BT Mouse", 68 + wPinS, 214);
		
		setTextStyle(ctx, "#BBB", "11px sans-serif", "right", "middle");
		ctx.fillText("Not Connected", 16 + wPinS + wPinL, 154);
		ctx.fillText("Connected", 16 + wPinS + wPinL, 184);
		ctx.fillText("Connected", 16 + wPinS + wPinL, 214);
		
		
		// Updates
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 36 + wPinS + wPinL, 104, wPinS, 82, 4);
		
		ctx.drawImage(this.icUpdate, 46 + wPinS + wPinL, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
		ctx.fillText("Updates", 76 + wPinS + wPinL, 124);
		
		ctx.drawImage(this.icUpToDate, 48 + wPinS + wPinL, 148, 15, 15);
		ctx.fillText("AvdanOS is up to date.", 76 + wPinS + wPinL, 152);
		setTextStyle(ctx, "#BBB", "11px sans-serif", "left", "middle");
		ctx.fillText("Check for updates", 76 + wPinS + wPinL, 169);
		ctx.drawImage(this.icMainGo, 16 + wPinS * 2 + wPinL, 138);
		
		// Battery
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 36 + wPinS + wPinL, 194, wPinS, 37, 4);
		ctx.drawImage(this.icBattery, 46 + wPinS + wPinL, 202, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Battery", 76 + wPinS + wPinL, 214);
		ctx.drawImage(this.icMainGo, 16 + wPinS * 2 + wPinL, 206);
		
		
		// Wi-Fi
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 44 + wPinS * 2 + wPinL, 104, wPinL, 127, 4);
		ctx.drawImage(this.icSetNetwork, 54 + wPinS * 2 + wPinL, 112, 20, 20);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
		ctx.fillText("Wi-Fi", 84 + wPinS * 2 + wPinL, 124);
		
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Home", 84 + wPinS * 2 + wPinL, 154);
		ctx.fillText("Work", 84 + wPinS * 2 + wPinL, 184);
		ctx.fillText("Avdan VDSL", 84 + wPinS * 2 + wPinL, 214);
		
		setTextStyle(ctx, "#BBB", "11px sans-serif", "right", "middle");
		ctx.fillText("Connected", 32 + wPinS * 2 + wPinL * 2, 154);
		
		
		// Settings
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Other settings", 20, 256);
		
		for (var i = 0, s; i < this.settings.length; i++) {
			s = this.settings[i];
			
			var cols = Math.floor((this.w - 40) / 160);
			var x = parseInt(28 + (this.w - 40) / cols * (i % cols));
			var y = parseInt(301 + Math.floor(i / cols) * 50);
			var icon = s.icon;
			
			if (s.hover) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, x - 8, y - 20, (this.w - 40) / cols - 12, 40, 4);
			}
			
			ctx.drawImage(icon, x, y - 12);
			
			setTextStyle(ctx, "#DDD", "11px sans-serif", "left", "middle");
			ctx.fillText(s.name, x + 32, y);
		}
		
		// Recommended
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Recommended", 20, 453);
		
		let wRec = (this.w - 64) / 4;
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 20, 480, wRec, 38, 4);
		ctx.drawImage(this.icSetDisplays, 29, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Connect to a wireless display", 59, 499);
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 28 + wRec, 480, wRec, 38, 4);
		ctx.drawImage(this.icWallpaper, 37 + wRec, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Change your wallpaper", 28 + wRec + 39, 499);
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 36 + wRec * 2, 480, wRec, 38, 4);
		ctx.drawImage(this.icDock, 45 + wRec * 2, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Customize the Dock", 36 + wRec * 2 + 39, 499);
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 44 + wRec * 3, 480, wRec, 38, 4);
		ctx.drawImage(this.icSetGeneral, 53 + wRec * 3, 489, 20, 20);
		setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
		ctx.fillText("Open Pro Mode Preferences", 44 + wRec * 3 + 39, 499);
	};
	
	this.drawSettings = (ctx) => {
		var miniBar = this.w < 480;
		var searchBarWidth = 128;
		var searchBarX = this.w - (!miniBar ? 134 : 32);
		var searchIconX = this.w - (!miniBar ? 24 : 25);
		var optionsX = this.w - (!miniBar ? 160 : 64);
		var tagX = this.w - (!miniBar ? 192 : 96);
		var barWidth = Math.min(342, this.w - 287);
		var barX = Math.max(this.w / 2 - barWidth / 2, 147);
		
		ctx.fillStyle = (this.hover.back ? "#FFF4" : "#FFF2"); // Back button
		fillRoundedRect(ctx, 6, 6, 34, 20, 4);
		ctx.fillStyle = (this.hover.forward ? "#FFF4" : "#FFF2"); // Forward button
		fillRoundedRect(ctx, 43, 6, 34, 20, 4);
		
		ctx.fillStyle = (this.hover.home ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, 83, 6, 26, 20, 4); // Home button
		
		ctx.fillStyle = (this.hover.options ? "#FFF4" : "#FFF2");
		fillRoundedRect(ctx, 115, 6, 26, 20, 4); // More Options button
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, barX, 6, barWidth, 20, 4); // Path bar
		fillRoundedRect(ctx, searchBarX, 6, searchBarWidth, 20, 4); // Search bar
		
		ctx.drawImage(this.icBack, 17, 10);
		ctx.drawImage(this.icForward, 54, 10);
		ctx.drawImage(this.icHome, 90, 10);
		ctx.drawImage(this.icOptions, 122, 10);
		ctx.drawImage(this.icSearch, searchIconX, 10);
		
		setTextStyle(ctx, "#FFF", "10px sans-serif", "center", "middle");
		ctx.fillText(this.settingsCat.name, barX + barWidth / 2, 17);
		
		if (!miniBar) {
			let s = this.textSearch !== "";
			setTextStyle(ctx, s ? "#EEE" : "#CCC", "10px sans-serif", "left", "middle");
			ctx.fillText("Find a setting", searchBarX + 6, 17);
		}
		
		// If the current category has no sections, end this.
		if (this.settingsCat.sections.length == 0) {			
			setTextStyle(ctx, "#BBB", "12px sans-serif", "center", "middle");
			ctx.fillText("There's nothing in this category for now.", this.w / 2, this.h / 2);
			
			return;
		}
	
		var sections = this.settingsCat.sections;
		
		// Draw section tabs.
		for (var i = 0; i < sections.length; i++) {
			let w = (this.w - 12 - 6 * (sections.length - 1)) / sections.length;
			let x = 6 + w * i + 6 * i;
			
			if (this.settingsSection == sections[i]) {
				ctx.strokeStyle = "#D26";
				ctx.strokeWeight = 2;
				ctx.beginPath();
				ctx.moveTo(x + 4, 74);
				ctx.lineTo(x + w - 4, 74);
				ctx.stroke();
			}
			
			ctx.fillStyle = this.hover.sections == i ? "#FFF3" : "#FFF2";
			fillRoundedRect(ctx, x, 48, w, 26, 4);
			
			setTextStyle(ctx, "#EEE", "11px sans-serif", "center", "middle");
			ctx.fillText(sections[i].name, x + w / 2, 62);
		}
		
		let drawSection = this["draw" + this.settingsCat.func + this.settingsSection.func];
		
		if (!drawSection) {
			setTextStyle(ctx, "#BBB", "12px sans-serif", "center", "middle");
			ctx.fillText("There's nothing in this section for now.", this.w / 2, this.h / 2);
			
			return;
		}
		
		drawSection(ctx);
	};
	
	this.drawGeneralAbout = (ctx) => {
		setTextStyle(ctx, "#EEE", "20px sans-serif", "center", "middle");
		ctx.fillText("AvdanOS UI Alpha 0.03", this.w / 2, this.h / 2);
		
		setTextStyle(ctx, "#DDD", "16px sans-serif", "center", "top");
		ctx.fillText("Credits", this.w / 2, this.h / 2 + 52);
		
		ctx.font = "12px sans-serif";
		ctx.fillText("Original concept: Avdan", this.w / 2, this.h / 2 + 80);
		ctx.fillText("Author: FacuA0", this.w / 2, this.h / 2 + 100);
		ctx.fillText("Some icons (and wallpaper): u/Mood_Aware", this.w / 2, this.h / 2 + 120);
		
	};
	
	this.drawPersonalWallpaper = (ctx) => {
		setTextStyle(ctx, "#DDD", "16px sans-serif", "center", "middle");
		ctx.fillText("Wallpaper", this.w / 2, this.h / 2);
	};
	
	this.drawPersonalThemes = (ctx) => {
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Themes", 32, 104);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w - 178, 102, 40, 20, 4);
		fillRoundedRect(ctx, this.w - 132, 102, 100, 20, 4);
		
		setTextStyle(ctx, "#EEE", "10px sans-serif", "center", "middle");
		ctx.fillText("Edit", this.w - 158, 113);
		ctx.fillText("Get more themes", this.w - 82, 113);
		
		for (var i = 0, t; i < this.themes.length; i++) {
			t = this.themes[i];
			
			var cols = Math.floor((this.w - 64) / 204);
			var x = parseInt(32 + (this.w - 64) / cols * ((i + 0.5) % cols));
			var y = parseInt(178 + Math.floor(i / cols) * 192);
			
			ctx.drawImage(t.image, x - t.image.width / 2, y);
			
			setTextStyle(ctx, "#DDD", "11px sans-serif", "center", "top");
			ctx.fillText(t.name, x, y + t.image.height + 12);
		}
	};
	
	this.drawPersonalAppearance = (ctx) => {
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Appearances", 32, 98);
		
		for (var i = 0, t; i < this.appearances.length; i++) {
			t = this.appearances[i];
			
			var cols = this.appearances.length;
			var x = parseInt(32 + (this.w - 64) / cols * (i + 0.5));
			var y = 118;
			
			ctx.drawImage(t.image, x - t.image.width / 2, y);
			
			setTextStyle(ctx, "#DDD", "11px sans-serif", "center", "top");
			ctx.fillText(t.name, x, y + t.image.height + 12);
		}
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Window Color", 32, 246);
		
		for (var i = 0, c; i < this.windowColors.length; i++) {
			c = this.windowColors[i];
			
			var cols = 7;
			var x = parseInt(32 + 220 / cols * ((i + 0.5) % cols));
			var y = parseInt(278 + Math.floor(i / cols) * 32);
			
			ctx.strokeStyle = "#FFF";
			ctx.strokeWeight = 2;
			ctx.beginPath();
			ctx.arc(x, y, 11, 0, 2 * Math.PI);
			ctx.stroke();
			
			if (c == "any") {
				continue;
			}
			
			if (c == "new") {
				continue;
			}
			
			ctx.fillStyle = c;
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.fill();
		}
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Accent Color", 32, 336);
		
		for (var i = 0, t; i < this.accentColors.length; i++) {
			c = this.accentColors[i];
			
			var cols = 7;
			var x = parseInt(32 + 220 / cols * ((i + 0.5) % cols));
			var y = parseInt(368 + Math.floor(i / cols) * 32);
			
			ctx.strokeStyle = "#FFF";
			ctx.strokeWeight = 2;
			ctx.beginPath();
			ctx.arc(x, y, 11, 0, 2 * Math.PI);
			ctx.stroke();
			
			if (c == "any") {
				continue;
			}
			
			if (c == "new") {
				continue;
			}
			
			ctx.fillStyle = c;
			ctx.beginPath();
			ctx.arc(x, y, 10, 0, 2 * Math.PI);
			ctx.fill();
		}
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Wallpaper Appearance", 32, 440);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, 160, 435, 100, 20, 4);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Dark Version", 168, 440);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Transparency Effect", 32, 468);
		
		let mx = this.w / 2 - 116;
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Appearance Schedule", mx, 246);
		setTextStyle(ctx, "#CCC", "10px sans-serif", "left", "top");
		ctx.fillText("Schedule times to change appearance automatically.", mx, 265);
		
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, mx, 285, 112, 20, 4);
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w / 2 + 4, 285, 112, 20, 4);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "center", "top");
		ctx.fillText("Sunset to Sunrise", this.w / 2 - 60, 290);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "center", "top");
		ctx.fillText("Custom Schedule", this.w / 2 + 60, 290);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Day", mx, 324);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w / 2 - 74, 319, 98, 20, 4);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Pastel", this.w / 2 - 66, 324);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Night", mx, 353);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w / 2 - 74, 348, 98, 20, 4);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Dark", this.w / 2 - 66, 353);
		
		ctx.strokeStyle = "#444";
		ctx.strokeWeight = 1;
		ctx.beginPath();
		ctx.moveTo(mx, 381);
		ctx.lineTo(this.w / 2 + 116, 381);
		ctx.stroke();
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Text Size", mx, 398);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Icon Size", mx, 427);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, mx + 60, 422, 98, 20, 4);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Medium", mx + 68, 427);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Buttons and Tabs", this.w / 2 - 116, 456);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, mx + 103, 451, 98, 20, 4);
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Transparent", mx + 111, 456);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Button Style", this.w - 264, 246);
		
		ctx.drawImage(this.imgPersonalStyleRoundedBG, this.w - 264, 266);
		ctx.drawImage(this.imgPersonalStyleRoundedNoBG, this.w - 158, 266);
		
		ctx.fillStyle = "#E92B6A";
		fillRoundedRect(ctx, this.w - (true ? 230 : 124), 355, 24, 4, 2);
		
		setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
		ctx.fillText("Corner Radius", this.w - 264, 381);
		
		ctx.drawImage(this.imgPersonalStyleRoundedBG, this.w - 264, 401);
		ctx.drawImage(this.imgPersonalStyleStraightBG, this.w - 158, 401);
		
		ctx.fillStyle = "#E92B6A";
		fillRoundedRect(ctx, this.w - (true ? 230 : 124), 490, 24, 4, 2);
	};
	
	this.checkHoverMainSettings = () => {
		if (this.settingsScreen) return false;
		
		let inval = false;
		
		for (var i = 0, s; i < this.settings.length; i++) {
			s = this.settings[i];
			
			let cols = Math.floor((this.w - 40) / 160);
			let x = parseInt(28 + (this.w - 40) / cols * (i % cols));
			let y = parseInt(301 + Math.floor(i / cols) * 50);
			
			let preHover = s.hover;
			s.hover = this.detectMouse(x - 8, y - 20, (this.w - 40) / cols - 12, 40);
			inval = inval || preHover != s.hover;
		}
		
		return inval;
	};
	
	this.checkHoverSecondSettings = () => {
		if (!this.settingsScreen) return false;
		
		let inval = false;
		let preHover = Object.assign({}, this.hover);
		
		this.hover.back = this.detectMouse(6, 6, 34, 20);
		this.hover.forward = this.detectMouse(43, 6, 34, 20);
		this.hover.home = this.detectMouse(83, 6, 26, 20);
		this.hover.options = this.detectMouse(115, 6, 26, 20);
		
		let sections = this.settingsCat.sections;
		for (let i = 0; i < sections.length; i++) {
			
			let w = (this.w - 12 - 6 * (sections.length - 1)) / sections.length;
			let x = 6 + w * i + 6 * i;
			
			
			if (this.detectMouse(x, 48, w, 26)) {
				this.hover.sections = i;
				break;
			}
			
			if (i == this.settingsCat.sections.length - 1) {
				this.hover.sections = -1;
			}
		}
		
		for (let k in this.hover) {
			inval = inval || this.hover[k] != preHover[k];
		}
		
		return inval;
	};
	
	this.mouseMove = () => {
		let inval = false;
		
		inval = inval || this.checkHoverMainSettings();
		inval = inval || this.checkHoverSecondSettings();
		
		if (inval) this.invalidate();
	};
	
	this.mouseClick = () => {
		if (this.settingsScreen) {
			if (this.hover.back) {
				this.settingsScreen = false;
				this.settingsCat = null;
				this.settingsSection = null;
			}
			else if (this.hover.sections != -1) {
				this.settingsSection = this.settingsCat.sections[this.hover.sections];
			}
			return;
		}
		
		for (let s of this.settings) {
			if (s.hover) {
				this.settingsScreen = true;
				this.settingsCat = s;
				if (s.sections.length > 0) {
					this.settingsSection = s.sections[0];
				}
				break;
			}
		}
	};
}

setDrawablePrototype(SettingsApp);
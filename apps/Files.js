function FilesApp() {
	this.w = 740;
	this.h = 500;
	this.minW = 386;
	this.title = "Files";
	this.type = "FilesApp";
	
	// Icons
	this.icSearch = loadIcon("Files", "Search", 12, 12);
	this.icFolder = loadIcon("Files", "Folder", 48, 48);
	this.icHome = loadIcon("Files", "Home", 40, 40);
	this.icDocuments = loadIcon("Files", "Documents", 40, 40);
	this.icDownloads = loadIcon("Files", "Downloads", 40, 40);
	this.icApps = loadIcon("Files", "Aplications", 40, 40);
	this.icDesktop = loadIcon("Files", "Desktop", 40, 40);
	this.icRecents = loadIcon("Files", "Recents", 40, 40);
	this.icTags = loadIcon("Files", "Tags", 32, 32);
	
	this.icBack = loadIcon("Files", "Back", 12, 12);
	this.icForward = loadIcon("Files", "Forward", 12, 12);
	this.icShowColumn = loadIcon("Files", "ShowColumn", 14, 14);
	this.icShowGrid = loadIcon("Files", "ShowGrid", 14, 14);
	this.icShowList = loadIcon("Files", "ShowList", 14, 14);
	this.icShrink = loadIcon("Files", "Shrink", 12, 12);
	this.icExpand = loadIcon("Files", "Expand", 12, 12);
	this.icTag = loadIcon("Files", "Tag", 12, 12);
	this.icShare = loadIcon("Files", "Share", 12, 12);
	this.icOptions = loadIcon("Files", "MoreOptions", 12, 12);
	
	this.icFile = loadIcon("Files", "Documents", 48, 48);
	
	this.path = "";
	this.pathHistory = [this.path];
	this.pathHistoryIndex = 0;
	this.canGoBack = false;
	this.canGoForward = false;
	this.hoverBack = false;
	this.hoverForward = false;
	
	this.hoverSidebar = {
		home: false,
		documents: false,
		downloads: false,
		apps: false,
		desktop: false,
		recents: false
	};
	
	this.mainLeftPanel = true;
	
	this.favorites = {
		documents: {
			name: "Documents",
			icon: this.icDocuments,
			path: "/Users/User/Documents/",
			hover: false
		},
		downloads: {
			name: "Downloads",
			icon: this.icDownloads,
			path: "/Users/User/Downloads/",
			hover: false
		},
		apps: {
			name: "Applications",
			icon: this.icApps,
			path: "/Apps/",
			hover: false
		},
		desktop: {
			name: "Desktop",
			icon: this.icDesktop,
			path: "/Users/User/Desktop/",
			hover: false
		},
		recents: {
			name: "Recents",
			icon: this.icRecents,
			path: "/",
			hover: false
		}
	};
	
	this.mainFavorites = [this.icDocuments, this.icDownloads, this.icApps, this.icDesktop, this.icRecents];
	this.mainFavoritesL = ["Documents", "Downloads", "Applications", "Desktop", "Recents"];
	this.mainFavoritesPaths = ["/Users/User/Documents/", "/Users/User/Downloads/", "/Apps/", "/Users/User/Desktop/", "/"];
	this.mainFavoritesHover = [false, false, false, false, false];
	
	this.mainPinnedL = ["Notes", "Voice Memos", "Work", "Wallpapers", "Project M"];
	this.mainPinnedHover = new Array(this.mainPinnedL.length);
	this.mainPinnedHover = [false, false, false, false, false];
	
	this.tags = ["Projects", "Important", "Sound", "Work", "Travel", "Design"];
	this.mainTagsHover = new Array(this.tags.length);
	this.mainTagsHover = [false, false, false, false, false];
	
	this.recents = [
		{
			name: "2022 Monthly Expenses",
			lastModified: "5m ago",
			icon: this.icDocuments,
			address: "/Users/User/Documents/",
			hover: false
		},
		{
			name: "Instructions",
			lastModified: "1h ago",
			icon: this.icDownloads,
			address: "/Users/User/Documents/",
			hover: false
		},
		{
			name: "Rental Agreement",
			lastModified: "2h ago",
			icon: this.icDesktop,
			address: "/Users/User/Documents/",
			hover: false
		}
	];
	
	this.recommended = [
		{
			name: "Introduction Video.aep",
			icon: this.icDocuments,
			address: "/Users/User/Documents/",
			hover: false
		},
		{
			name: "Brand Guidelines.psd",
			icon: this.icDocuments,
			address: "/Users/User/Documents/",
			hover: false
		},
		{
			name: "Project X",
			icon: this.icFolder,
			address: "/Users/User/Documents/",
			hover: false
		}
	];
	
	this.textSearch = "";
	
	this.currentFolder = null;
	this.pathFiles = [];
	this.hoverFiles = [];
	
	if (this.path != "") {
		this.currentFolder = fileSystem.get(this.path);
		this.pathFiles = this.currentFolder.contents;
		this.hoverFiles = new Array(this.pathFiles.length);
		this.hoverFiles.forEach((e, i) => this.hoverFiles[i] = false);
	}
	
	this.draw = (ctx) => {
		if (this.path === "") {
			this.drawMain(ctx);
		}
		else {
			this.drawPathScreen(ctx);
		}
		this.validated = true;
	};
	
	this.drawMain = (ctx) => {
		// Title
		setTextStyle(ctx, "#FFF", "20px sans-serif", "center", "middle");
		ctx.fillText("Files", this.w / 2, 14);
		
		// Search bar
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, this.w / 2 - 120, 48, 240, 24, 4);
		
		let s = this.textSearch !== "";
		setTextStyle(ctx, s ? "#EEE" : "#CCC", "12px sans-serif", "left", "middle");
		ctx.fillText(s ? this.textSearch : "Find a file", this.w / 2 - 108, 62);
		
		ctx.drawImage(this.icSearch, this.w / 2 + 96, 54);
		
		var favWidth = Math.floor(this.w * (this.mainLeftPanel ? 0.48 : 0.76));
		var favLeft = Math.floor(this.w * 0.12);
		var rMargin = Math.floor(this.w * 0.68);
		
		// Favorites
		setTextStyle(ctx, "#EEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Favorites", favLeft - 28, 120);
		
		for (var i = 0; i < this.mainFavorites.length; i++) {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			if (this.mainFavoritesHover[i]) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, x - 42, 130, 84, 84, 6);
			}
			
			ctx.drawImage(this.mainFavorites[i], x - 20, 138);
			setTextStyle(ctx, "#DDD", "12px sans-serif", "center", "top");
			ctx.fillText(this.mainFavoritesL[i], x, 194);
		}
		
		// Pinned
		setTextStyle(ctx, "#EEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Pinned", favLeft - 28, 240);
		
		setTextStyle(ctx, "#DDD", "12px sans-serif", "center", "top");
		
		for (var i = 0; i < this.mainFavorites.length; i++) {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			if (this.mainPinnedHover[i]) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, x - 42, 250, 84, 84, 6);
			}
			
			ctx.drawImage(this.icFolder, x - 20, 258, 40, 40);
			setTextStyle(ctx, "#DDD", "12px sans-serif", "center", "top");
			ctx.fillText(this.mainPinnedL[i], x, 314);
		}
		
		// Tags
		setTextStyle(ctx, "#EEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Tags", favLeft - 28, 360);
		
		setTextStyle(ctx, "#DDD", "12px sans-serif", "center", "top");
		
		for (var i = 0; i < this.mainFavorites.length; i++) {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			if (this.mainTagsHover[i]) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, x - 42, 370, 84, 84, 6);
			}
			
			ctx.drawImage(this.icTags, x - 16, 384);
			setTextStyle(ctx, "#DDD", "12px sans-serif", "center", "top");
			ctx.fillText(this.tags[i], x, 434);
		}
		
		// Recently opened
		setTextStyle(ctx, "#EEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Recently Opened", rMargin, 120);
		
		ctx.drawImage(this.icForward, rMargin + ctx.measureText("Recently Opened").width + 6, 113);
		
		this.recents.forEach((recent, i, recents) => {
			let btnX = rMargin;
			let btnY = 136 + i * 50;
			let btnW = this.w - rMargin - 16;
			let btnH = 42;
			
			ctx.fillStyle = recent.hover ? "#FFF4" : "#FFF2";
			fillRoundedRect(ctx, btnX, btnY, btnW, btnH, 5);
			
			ctx.drawImage(recent.icon, btnX + 6, btnY + 6, btnH - 12, btnH - 12);
			
			setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
			ctx.fillText(recent.name, btnX + btnH, btnY + btnH / 2 + 1);
			
			setTextStyle(ctx, "#CCC", "9px sans-serif", "right", "middle");
			ctx.fillText(recent.lastModified, btnX + btnW - 4, btnY + btnH / 2 + 2);
		});
		
		// Recommended
		setTextStyle(ctx, "#EEE", "14px sans-serif", "left", "middle");
		ctx.fillText("Recommended", rMargin, 298);
		
		ctx.drawImage(this.icForward, rMargin + ctx.measureText("Recommended").width + 6, 291);
		
		this.recommended.forEach((rec, i, recommended) => {
			let btnX = rMargin;
			let btnY = 312 + i * 50;
			let btnW = this.w - rMargin - 16;
			let btnH = 42;
			
			ctx.fillStyle = rec.hover ? "#FFF4" : "#FFF2";
			fillRoundedRect(ctx, btnX, btnY, btnW, btnH, 5);
			
			ctx.drawImage(rec.icon, btnX + 6, btnY + 6, btnH - 12, btnH - 12);
			
			setTextStyle(ctx, "#EEE", "11px sans-serif", "left", "middle");
			ctx.fillText(rec.name, btnX + btnH, btnY + btnH / 2 + 1);
		});
	};
	
	this.drawPathScreen = (ctx) => {
		var miniBar = this.w < 480;
		var searchBarWidth = !miniBar ? 122 : 26;
		var searchBarX = this.w - (!miniBar ? 128 : 32);
		var searchIconX = this.w - (!miniBar ? 24 : 25);
		var optionsX = this.w - (!miniBar ? 160 : 64);
		var tagX = this.w - (!miniBar ? 192 : 96);
		var barX = !miniBar ? 201 : 201;
		var barWidth = this.w - (!miniBar ? 399 : 303);
		
		ctx.fillStyle = this.canGoBack ? (this.hoverBack ? "#FFF4" : "#FFF2") : "#FFF1"; // Back button
		fillRoundedRect(ctx, 6, 6, 34, 20, 4);
		ctx.fillStyle = this.canGoForward ? (this.hoverForward ? "#FFF4" : "#FFF2") : "#FFF1"; // Forward button
		fillRoundedRect(ctx, 43, 6, 34, 20, 4);
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, 83, 6, 80, 20, 4); // View as
		fillRoundedRect(ctx, 169, 6, 26, 20, 4); // Share button
		fillRoundedRect(ctx, barX, 6, barWidth, 20, 4); // Path bar
		fillRoundedRect(ctx, tagX, 6, 26, 20, 4); // Tag button
		fillRoundedRect(ctx, optionsX, 6, 26, 20, 4); // Options button
		fillRoundedRect(ctx, searchBarX, 6, searchBarWidth, 20, 4); // Search bar
		
		ctx.drawImage(this.icBack, 17, 10);
		ctx.drawImage(this.icForward, 54, 10);
		ctx.drawImage(this.icShowGrid, 89, 9);
		ctx.drawImage(this.icShowColumn, 116, 9);
		ctx.drawImage(this.icShowList, 143, 9);
		ctx.drawImage(this.icShare, 176, 10);
		ctx.drawImage(this.icTag, tagX + 7, 10);
		ctx.drawImage(this.icOptions, optionsX + 7, 10);
		ctx.drawImage(this.icSearch, searchIconX, 10);
		
		setTextStyle(ctx, "#FFF", "10px sans-serif", "center", "middle");
		ctx.fillText(this.currentFolder.name, barX + barWidth / 2, 17);
		
		if (!miniBar) {
			let s = this.textSearch !== "";
			setTextStyle(ctx, s ? "#EEE" : "#CCC", "10px sans-serif", "left", "middle");
			ctx.fillText(s ? this.textSearch : "Find a file", searchBarX + 6, 17);
		}
		
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, this.w - 116, 38, 110, 20, 4); // Ordering spinner
		setTextStyle(ctx, "#EEE", "10px sans-serif", "left", "middle");
		ctx.fillText("Kind", this.w - 110, 49);
		ctx.drawImage(this.icExpand, this.w - 23, 43, 10, 10);
		
		// Sidebar
		ctx.fillStyle = "#FFF2";
		fillRoundedRect2(ctx, 0, 80, 32, 264, 0, 6, 6, 0);
		
		ctx.fillStyle = "#0006";
		
		let highlightOption = 80;
		
		switch (this.path) {
			case this.favorites.documents.path: highlightOption = 124; break;
			case this.favorites.downloads.path: highlightOption = 168; break;
			case this.favorites.apps.path: highlightOption = 212; break;
			case this.favorites.desktop.path: highlightOption = 256; break;
			case this.favorites.recents.path: highlightOption = 300; break;
			default: highlightOption = -1;
		}
		
		if (highlightOption > 0) {
			fillRoundedRect2(ctx, 0, highlightOption, 32, 44, 0, 0, 0, 0);
		}
		
		ctx.fillStyle = "#FFF1";
		if (this.hoverSidebar.home)
			fillRoundedRect2(ctx, 0, 80, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.documents)
			fillRoundedRect2(ctx, 0, 124, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.downloads)
			fillRoundedRect2(ctx, 0, 168, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.apps)
			fillRoundedRect2(ctx, 0, 212, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.desktop)
			fillRoundedRect2(ctx, 0, 256, 32, 44, 0, 0, 0, 0);
		if (this.hoverSidebar.recents)
			fillRoundedRect2(ctx, 0, 300, 32, 44, 0, 0, 0, 0);
		
		ctx.drawImage(this.icHome, 4, 90, 24, 24);
		ctx.drawImage(this.icDocuments, 4, 134, 24, 24);
		ctx.drawImage(this.icDownloads, 4, 178, 24, 24);
		ctx.drawImage(this.icApps, 4, 222, 24, 24);
		ctx.drawImage(this.icDesktop, 4, 266, 24, 24);
		ctx.drawImage(this.icRecents, 4, 310, 24, 24);
		
		// Files
		
		if (this.pathFiles.length > 0) {
			for (var i = 0, f; i < this.pathFiles.length; i++) {
				f = this.pathFiles[i];
				
				var cols = Math.floor((this.w - 54) / 100);
				var x = parseInt(48 + (this.w - 54) / cols * (i % cols + 0.5));
				var y = parseInt(84 + Math.floor(i / cols) * 96);
				var icon = (f.type == "File" ? this.icFile : this.icFolder);
				
				if (this.hoverFiles[i]) {
					ctx.fillStyle = "#FFF2";
					fillRoundedRect(ctx, x - 48, y - 16, 96, 96, 6);
				}
				
				ctx.drawImage(icon, x - 24, y - 4);
				setTextStyle(ctx, "#DDD", "11px sans-serif", "center", "top");
				ctx.fillText(f.name, x, y + 56);
			}
		}
		else {
			setTextStyle(ctx, "#AAA", "16px sans-serif", "center", "middle");
			ctx.fillText("There is no files here...", this.w / 2, this.h / 2);
		}
	};
	
	this.goToPath = (newPath) => {
		var files = fileSystem.get(newPath);
		
		if (files == null) return;
		if (files.type == "File") {
			if (files.address) {
				if (files.name.endsWith(".jpg") || files.name.endsWith(".png")) {
					let img = document.createElement("img");
					img.crossOrigin = "anonymous";
					img.src = files.address;
					
					openApp(PhotosApp, img, files.name);
					//drawables[1].push(new Frame(new PhotosApp(img, files.name)));
				}
			}
			return;
		}
		
		this.textSearch = "";
		
		if (!newPath.endsWith("/")) newPath += "/";
		
		this.path = newPath;
		
		var historyIndex = this.pathHistoryIndex;
		
		if (this.canGoForward) {
			this.pathHistory = this.pathHistory.slice(0, historyIndex + 1);
		}
		
		this.pathHistory.push(newPath);
		this.pathHistoryIndex++;
		
		this.refreshFiles();
	};
	
	this.refreshFiles = () => {
		var files = fileSystem.get(this.path);
		
		if (files == null) return;
		if (files.type == "File") return;
		
		this.currentFolder = files;
		this.pathFiles = files.contents;
		
		var historyStart = this.pathHistoryIndex == 0;
		var historyCurrent = this.pathHistoryIndex == this.pathHistory.length - 1;
		
		this.canGoBack = !historyStart;
		this.canGoForward = !historyCurrent;
		
		this.hoverFiles = new Array(this.pathFiles.length);
		this.mouseMove(null);
	};
	
	this.goBack = () => {
		this.pathHistoryIndex--;
		this.path = this.pathHistory[this.pathHistoryIndex];
		this.refreshFiles();
	};
	
	this.goForward = () => {
		this.pathHistoryIndex++;
		this.path = this.pathHistory[this.pathHistoryIndex];
		this.refreshFiles();
	};
	
	this.goHome = () => {
		this.path = "";
		this.pathHistory = [this.path];
		this.pathHistoryIndex = 0;
		this.refreshFiles();
	};
	
	this.detectClickMain = () => {
		var favWidth = Math.floor(this.w * (this.mainLeftPanel ? 0.48 : 0.76));
		var favLeft = Math.floor(this.w * 0.12);
		var rMargin = Math.floor(this.w * 0.68);
		var newVal = false;
		
		this.mainFavoritesHover.forEach((hover, i, list) => {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			let preH = list[i];
			list[i] = this.detectMouse(x - 42, 130, 84, 84);
			newVal = newVal || preH != list[i];
		});
		
		this.mainPinnedHover.forEach((hover, i, list) => {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			let preH = list[i];
			list[i] = this.detectMouse(x - 42, 250, 84, 84);
			newVal = newVal || preH != list[i];
		});
		
		this.mainTagsHover.forEach((hover, i, list) => {
			var x = parseInt(favLeft + i * (favWidth / 4));
			
			let preH = list[i];
			list[i] = this.detectMouse(x - 42, 370, 84, 84);
			newVal = newVal || preH != list[i];
		});
		
		this.recents.forEach((recent, i, list) => {
			let btnY = 136 + i * 50;
			
			let preH = list[i].hover;
			list[i].hover = this.detectMouse(rMargin, btnY, this.w - rMargin - 16, 42);
			newVal = newVal || preH != list[i].hover;
		});
		
		this.recommended.forEach((recent, i, list) => {
			let btnY = 312 + i * 50;
			
			let preH = list[i].hover;
			list[i].hover = this.detectMouse(rMargin, btnY, this.w - rMargin - 16, 42);
			newVal = newVal || preH != list[i].hover;
		});
		
		if (newVal) this.invalidate();
	};
	
	this.detectClickFile = () => {
		var newVal = false;
		for (var i = 0, f; i < this.pathFiles.length; i++) {
			f = this.pathFiles[i];
			
			var cols = Math.floor((this.w - 54) / 100);
			var x = parseInt(48 + (this.w - 54) / cols * (i % cols + 0.5));
			var y = parseInt(84 + Math.floor(i / cols) * 96);
			
			let preH = this.hoverFiles[i];
			this.hoverFiles[i] = this.detectMouse(x - 48, y - 4, 96, 96);
			newVal = newVal || preH != this.hoverFiles[i];
		}
		if (newVal) this.invalidate();
	};
	
	this.detectSidebar = () => {
		var hover = this.hoverSidebar;
		var preHover = Object.assign({}, hover);
		
		hover.home = this.detectMouse(0, 80, 32, 44);
		hover.documents = this.detectMouse(0, 124, 32, 44);
		hover.downloads = this.detectMouse(0, 168, 32, 44);
		hover.apps = this.detectMouse(0, 212, 32, 44);
		hover.desktop = this.detectMouse(0, 256, 32, 44);
		hover.recents = this.detectMouse(0, 300, 32, 44);
		hover.any = false;
		
		for (h in hover) {
			hover.any = hover.any || hover[h];
		}
		
		for (h in hover) {
			if (hover[h] != preHover[h]) this.invalidate();
		}
	};
	
	this.detectBack = () => detectMouse(this.x + 6, this.y + 6, 32, 20);
	this.detectForward = () => detectMouse(this.x + 46, this.y + 6, 34, 20);
	
	this.mouseMove = (event) => {
		if (this.path === "") {
			this.detectClickMain();
		}
		else {
			this.detectClickFile();
			
			this.detectSidebar();
			
			let preBack = this.hoverBack;
			let preForward = this.hoverForward;
			
			this.hoverBack = this.detectBack();
			this.hoverForward = this.detectForward();
			
			if (preBack != this.hoverBack || preForward != this.hoverForward)
				this.invalidate();
		}
	};
	
	this.mouseClick = (event) => {
		if (this.path == "") {
			this.mainFavoritesHover.forEach((hover, i) => {
				if (hover) {
					var favPaths = ["", "", "/Apps/", "", null];
					if (favPaths[i] != null) {
						var newPath = favPaths[i] == "" ? ("/Users/User/" + this.mainFavoritesL[i] + "/") : favPaths[i];
						this.goToPath(newPath);
					}
				}
			});
		}
		else {
			this.hoverFiles.forEach((hover, i) => {
				if (hover) {
					this.goToPath(this.path + this.pathFiles[i].name);
				}
			});
			
			if (this.detectBack() && this.canGoBack) {
				this.goBack();
			}
				
			if (this.detectForward() && this.canGoForward) {
				this.goForward();
			}
			
			if (this.hoverSidebar.any) {
				let hover = this.hoverSidebar;
				let userPath = "/Users/User/";
				
				if (hover.home) {
					this.goHome();
				}
				if (hover.documents) {
					this.goToPath(userPath + "Documents/");
				}
				if (hover.downloads) {
					this.goToPath(userPath + "Downloads/");
				}
				if (hover.apps) {
					this.goToPath("/Apps/");
				}
				if (hover.desktop) {
					this.goToPath(userPath + "Desktop/");
				}
				if (hover.recents) {
					this.goHome();
				}
			}
		}
	};
	
	this.mouseExit = (event) => {
		for (e in this.hoverSidebar) this.hoverSidebar[e] = false;
		for (e of this.mainFavoritesHover) e = false;
		for (e of this.mainPinnedHover) e = false;
		for (e of this.mainTagsHover) e = false;
		for (e of this.hoverFiles) e = false;
		this.hoverForward = false;
		this.hoverBack = false;
		
		this.invalidate();
	};
	
	this.keyDown = (event) => {
		if (keyboard.key != "Enter") return;
		if (this.textSearch == "") return;
		
		if (this.textSearch.startsWith("/")) {
			this.goToPath(this.textSearch);
			this.textSearch = "";
		}
	};
	
	this.keyType = (event) => {
		if (keyboard.key == "Enter") return;
		
		if (keyboard.key == "Backspace") {
			if (this.textSearch == "") return;
			
			this.textSearch = this.textSearch.substr(0, this.textSearch.length - 1);
		}
		else {
			this.textSearch += keyboard.key;
		}
	};
}

setDrawablePrototype(FilesApp);
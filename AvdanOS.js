// AvdanOS UI Alpha 0.03

var htmlCanvas, canvas, htmlCtx, ctx, width, height, frameCount, drawables, bg, dock, start, images, icons, validated, loaded, fileSystem, debug;
var drawingCanvas, dctx, blurCanvas, bctx, frameRates, t0, t1;
var newRendering, blurring;

var margin = {
	top: 0,
	left: 0
};

var mouse = {
	x: 0,
	y: 0,
	px: 0,
	py: 0,
	rx: 0,
	ry: 0,
	
	down: false,
	drag: false,
	
	overDrawable: null,
	frameAction: "",
	overFrameArea: "",
	
	wheelDelta: 0
};

var keyboard = {
	down: false,
	key: "",
	keys: [],
	focus: null
};

window.onload = init;

function init() {
	var html = document.getElementsByTagName("html")[0];
	htmlCanvas = document.getElementById("canvas");
	htmlCtx = htmlCanvas.getContext("2d");
	
	canvas = document.createElement("canvas");
	ctx = canvas.getContext("2d");
	
	blurCanvas = document.createElement("canvas");
	bctx = blurCanvas.getContext("2d");
	
	drawingCanvas = document.createElement("canvas");
	dctx = drawingCanvas.getContext("2d");
	
	debug = false;
	frameCount = 0;
	frameRates = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
	drawables = [[], [], []];
	validated = false;
	loaded = false;
	t0 = 0;
	t1 = 0;
	
	newRendering = true;
	blurring = true;
	
	html.addEventListener("mousedown", mouseDown);
	html.addEventListener("mousemove", mouseMove);
	html.addEventListener("mouseup", mouseUp);
	html.addEventListener("wheel", mouseWheel);
	html.addEventListener("keydown", keyDown);
	html.addEventListener("keyup", keyUp);
	
	loadFileSystem();
	setTimeout(loadImages, 0);
	
	setCanvasSize(innerWidth, innerHeight);
	
	//setTimeout(loadDrawables, 2000);
	
	requestAnimationFrame(update);
}

function loadDrawables() {
	/* Create applications */
	
	bg = new Background();
	dock = new Dock();
	start = new StartMenu();
	
	drawables[0].push(bg);
	drawables[2].push(dock);
	drawables[2].push(start);
	
	//drawables[1].push(new Frame(new ColorApp("Red", "#FF0000", 64, 64)));
	//drawables[1].push(new Frame(new ColorApp("Blue", "#0000FF", 140, 96)));
	//drawables[1].push(new Frame(new ColorApp("Yellow", "#FFFF00", 120, 220)));
	//drawables[1].push(new Frame(new FilesApp()));
	//drawables[1].push(new Frame(new PhotosApp(loadImage("backgrounds", "AvdanOS"), "AvdanOSWallpaper.jpg")));
	
	//drawables[1][0].add(new ColorApp("Pink", "#FF8888"));
	
	// Flag as loaded
	validated = false;
	loaded = true;
}

function update() {
	
	setCanvasMargin();
	
	if (!validated) {
		ctx.clearRect(0, 0, width, height);
		
		if (loaded) {
			
			ctx.fillStyle = "red";
			ctx.fillRect(60, 60, width - 120, height - 120);
			
			ctx.fillStyle = "white";
			ctx.font = "24px sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Avdan OS", width / 2, height / 2);
			
			showDrawables();
			
			validated = true;
		}
		else {
			let cx = width / 2;
			let cy = height / 2;
			let l = cx - 128;
			let r = cx + 128;
			let t = cy - 128;
			let b = cy + 128;
			let time = frameCount * 0.02;
			
			let circ = (rad) => {
				return {
					x: width / 2 + Math.sin(rad) * 128,
					y: height / 2 - Math.cos(rad) * 128,
				}
			};
			
			let circ1 = circ(time);
			let circ2 = circ(time + Math.PI);
			
			let gr1_x1 = time < Math.PI ? cx : circ2.x;
			let gr1_y1 = time < Math.PI ? t : circ2.y;
			let gr1_x2 = circ1.x;
			let gr1_y2 = circ1.y;
			let gr2_x1 = time < Math.PI ? cx : circ1.x;
			let gr2_y1 = time < Math.PI ? b : circ1.y;
			let gr2_x2 = circ2.x;
			let gr2_y2 = circ2.y;
			
			var gr = ctx.createLinearGradient(gr1_x1, gr1_y1, gr1_x2, gr1_y2);
			gr.addColorStop(0, "#D44273");
			gr.addColorStop(1, "#000");
			ctx.strokeStyle = gr;
			
			ctx.lineWidth = 2;
			ctx.beginPath();
			ctx.arc(cx, cy, 128, -0.5 * Math.PI + time, 0.5 * Math.PI + time);
			ctx.stroke();
			
			gr = ctx.createLinearGradient(gr2_x1, gr2_y1, gr2_x2, gr2_y2);
			gr.addColorStop(0, "#D44273");
			gr.addColorStop(1, "#000");
			ctx.strokeStyle = gr;
			
			ctx.beginPath();
			ctx.arc(cx, cy, 128, 0.5 * Math.PI + time, 1.5 * Math.PI + time);
			ctx.stroke();
			
			ctx.fillStyle = "#888";
			ctx.font = "18px sans-serif";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("Loading AvdanOS UI", cx, cy + 240);
		}
	}
	
	htmlCtx.clearRect(0, 0, width, height);
	htmlCtx.drawImage(canvas, 0, 0);
	
	if (debug) {
		htmlCtx.fillStyle = "#BB0A";
		htmlCtx.beginPath();
		htmlCtx.arc(mouse.x, mouse.y, 4, 0, 2 * Math.PI);
		htmlCtx.fill();
	}
	
	t0 = t1;
	t1 = performance.now();
	
	if (debug) drawDebug();
	
	//setTimeout(update, 12);
	requestAnimationFrame(update);
	
	frameCount++;
	
	function drawDebug() {
		htmlCtx.fillStyle = "white";
		htmlCtx.font = "12px sans-serif";
		htmlCtx.textAlign = "left";
		htmlCtx.textBaseline = "top";
		htmlCtx.fillText("Frames: " + frameCount, 12, 12);
		
		frameRates.push((1000 / (t1 - t0)));
		frameRates.shift();
		let frameRateAvg = 0;
		frameRates.forEach((f) => {frameRateAvg += f});
		frameRateAvg = Math.round(frameRateAvg / frameRates.length);
		
		let min = 100;
		frameRates.forEach(e => {min = Math.min(min, e)});
		
		let max = 0;
		frameRates.forEach(e => {max = Math.max(max, e)});
		
		htmlCtx.fillText("FPS: " + frameRateAvg + ", Min: " + Math.round(min) + ", Max: " + Math.round(max), 12, 32);
	}
}

function showDrawables() {
	bctx.clearRect(0, 0, width, height);
	
	ctx.imageSmoothingEnabled = !newRendering;
	for (sub of drawables) {
		for (d of sub) {
			if (!d.visible) continue;
				
			if (newRendering) {
				drawingCanvas.width = d.w;
				drawingCanvas.height = d.h;
				
				d.preDraw(dctx);
				
				ctx.drawImage(drawingCanvas, d.x, d.y);
			}
			else {
				d.preDraw(ctx);
			}
		}
	}
}

/*
 * Events
 */
function mouseMove(event) {
	mouse.px = mouse.x;
	mouse.py = mouse.y;
	
	mouse.x = event.pageX - margin.left;
	mouse.y = event.pageY - margin.top;
	
	if (mouse.down === true) {
		mouse.drag = true;
		mouseDrag(event);
		return;
	}
	
	if (dock && dock.autohide && detectMouse(dock.x, height - 1, dock.w, 1) && !dock.autohiding) {
		dock.show();
		
		let x = setTimeout(() => {
			if (dock.autohide) {
				dock.hide();
			}
			
			dock.autohiding = null;
		}, 1200);
		
		dock.autohiding = x;
	}
	
	setTimeout(setFrameArea, 0, event);
}

function mouseDown(event) {
	mouse.down = true;
	mouse.x = event.pageX - margin.left;
	mouse.y = event.pageY - margin.top;
	
	validated = false;
	
	if (mouse.overDrawable != null) {
		var f = mouse.overDrawable;
		
		for (var i = 0; i < drawables.length; i++) {
			if (drawables[i].indexOf(f) != -1 && drawables[i].indexOf(f) != drawables[i].length - 1) {
				drawables[i].splice(drawables[i].indexOf(f), 1);
				drawables[i].push(f);
				
				if (i == 1) {
					dock.setAutohide();
				}
			}
		}
		
		keyboard.focus = f;
		
		f.invalidate();
		
		if (mouse.overFrameArea == "PANEL" || mouse.overFrameArea == "APP") {
			if (mouse.overFrameArea == "PANEL") {
				if (f.movable !== false) {
					mouse.frameAction = "MOVE";
				}
			}
			f.mouseDown(event);
		}
		else {
			if (f.resizable !== false) {
				mouse.rx = mouse.x;
				mouse.ry = mouse.y;
				
				mouse.frameAction = "RESIZE_" + mouse.overFrameArea;
				f.startResize();
			}
		}
	}
}

function mouseDrag(event) {
	var d = mouse.overDrawable;
	
	if (mouse.frameAction !== "") {
		
		var mx = mouse.x - mouse.px;
		var my = mouse.y - mouse.py;
		
		var dx = mouse.x - mouse.rx;
		var dy = mouse.y - mouse.ry;
		
		switch (mouse.frameAction) {
			
			case "MOVE":
				if (d.maximized) {
					d.restore();
					
					let nx = Math.min(Math.max(mouse.x - d.w / 2, 0), width - d.w) - d.x;
					let ny = 0 - d.y;
					
					d.move(nx, ny);
				}
				
				d.move(mx, my);
				break;
			
			case "RESIZE_TOP":
				d.resize(dy, 0, 0, 0);
				break;
			
			case "RESIZE_LEFT":
				d.resize(0, 0, dx, 0);
				break;
			
			case "RESIZE_BOTTOM":
				d.resize(0, dy, 0, 0);
				break;
			
			case "RESIZE_RIGHT":
				d.resize(0, 0, 0, dx);
				break;
			
			case "RESIZE_TOP_LEFT":
				d.resize(dy, 0, dx, 0);
				break;
			
			case "RESIZE_TOP_RIGHT":
				d.resize(dy, 0, 0, dx);
				break;
			
			case "RESIZE_BOTTOM_LEFT":
				d.resize(0, dy, dx, 0);
				break;
			
			case "RESIZE_BOTTOM_RIGHT":
				d.resize(0, dy, 0, dx);
				break;
		}
	
		validated = false;
	}
	else if (d != null) {
		d.mouseDrag(event);
	}
}

function mouseUp(event) {
	mouse.down = false;
	
	validated = false;
	
	if (!mouse.drag) {
		mouseClick();
	}
	
	mouse.drag = false;
	
	var d = mouse.overDrawable;
	
	if (d != null) {
		if (mouse.frameAction !== "") {
			d.endResize();
		}
		d.mouseUp(event);
		d.invalidate();
	}
	mouse.frameAction = "";
}

function mouseClick(event) {
	var d = mouse.overDrawable;
	
	if (d != null) {
		d.mouseClick(event);
		d.invalidate();
	}
}

function mouseWheel(event) {
	mouse.wheelDelta = event.deltaY;
	
	if (debug) {
		console.log("Wheel scrolled: " + mouse.wheelDelta);
	}
	
	let d = mouse.overDrawable;
	
	if (d) {
		d.mouseWheel(d);
	}
}

function keyDown(event) {
	if (event.key != "F12" && event.key != "F5")
		event.preventDefault();
	
	keyboard.down = true;
	keyboard.key = event.key;
	
	let keys = keyboard.keys;
	let original = !keys.includes(event.key);
	if (keyboard.focus && original) {
		keyboard.focus.keyDown(event);
		keyboard.focus.invalidate();
	}
	
	callKeyType();
	
	if (original) {
		keys.push(event.key);
	}
	
	function callKeyType() {
		if (event.key == "Alt") return;
		if (event.key == "Control") return;
		if (event.key == "Meta") return;
		if (event.key == "Shift") return;
		if (event.key == "Escape") return;
		if (event.key == "ScrollLock") return;
		if (event.key == "NumLock") return;
		if (event.key == "CapsLock") return;
		if (event.key == "Enter") return;
		if (event.key == "Home") return;
		if (event.key == "End") return;	
		if (event.key == "Dead") return;	
		if (event.key.startsWith("Arrow")) return;
		if (event.key.startsWith("F") && event.key.length >= 2) return;
		
		keyType(event);
	}
}

function keyType(event) {
	let key = event.key;
	
	if (debug) {
		console.log("Key typed: " + keyboard.key);
	}
	
	if (keyboard.focus) {
		keyboard.focus.keyType(event);
		keyboard.focus.invalidate();
	}
}

function keyUp(event) {
	keyboard.down = false;
	event.preventDefault();
	keyboard.key = event.key;
	//console.log("Key up: " + keyboard.key);
	
	let keys = keyboard.keys;
	if (keys.includes(event.key)) {
		keys.splice(keys.indexOf(event.key), 1);
	}
	
	if (keyboard.focus) {
		keyboard.focus.keyUp(event);
		keyboard.focus.invalidate();
	}
}


function setFrameArea(event) {
	setCursor("url(icons/Cursor/Default.png),default");
	
	var br = false;
	for (var h = drawables.length - 1; h >= 0; h--) {
		for (var i = drawables[h].length - 1, p; i >= 0; i--) {
			p = drawables[h][i];
			
			if (!p.visible) continue;
			
			var dout = detectMouseRounded(p.x - 6, p.y - 6, p.w + 12, p.h + 12, 8);
			if (!dout) continue;
			
			var isFrame = p.type === "Frame";
			var din = detectMouseRounded(p.x, p.y, p.w, p.h, 6);
			
			if (isFrame) {
				if (din || p.maximized) {
					if (detectMouse(p.x, p.y, p.w, 32)) {
						mouse.overFrameArea = "PANEL";
					}
					else {
						mouse.overFrameArea = "APP";
					}
				}
				else {
					if (detectMouse(p.x - 6, p.y - 6, 12, 12)) { // Top-left corner
						mouse.overFrameArea = "TOP_LEFT";
						setCursor("nw-resize");
					}
					else if (detectMouse(p.x + 6, p.y - 6, p.w - 12, 6)) { // Top edge
						mouse.overFrameArea = "TOP";
						setCursor("n-resize");
					}
					else if (detectMouse(p.x + p.w - 6, p.y - 6, 12, 12)) { // Top-right corner
						mouse.overFrameArea = "TOP_RIGHT";
						setCursor("ne-resize");
					}
					else if (detectMouse(p.x + p.w, p.y + 6, 6, p.h - 12)) { // Right edge
						mouse.overFrameArea = "RIGHT";
						setCursor("e-resize");
					}
					else if (detectMouse(p.x + p.w - 6, p.y + p.h - 6, 12, 12)) { // Bottom-right corner
						mouse.overFrameArea = "BOTTOM_RIGHT";
						setCursor("se-resize");
					}
					else if (detectMouse(p.x + 6, p.y + p.h, p.w - 12, 6)) { // Bottom edge
						mouse.overFrameArea = "BOTTOM";
						setCursor("s-resize");
					}
					else if (detectMouse(p.x - 6, p.y + p.h - 6, 12, 12)) { // Bottom-left corner
						mouse.overFrameArea = "BOTTOM_LEFT";
						setCursor("sw-resize");
					}
					else if (detectMouse(p.x - 6, p.y + 6, 6, p.h - 12)) { // Left edge
						mouse.overFrameArea = "LEFT";
						setCursor("w-resize");
					}
				}
			}
			else {
				if (!din) continue;
				mouse.overFrameArea = "DRAWABLE";
			}
			
			if (mouse.overDrawable != null && mouse.overDrawable != p) {
				mouse.overDrawable.mouseExit(event);
				p.mouseEnter(event);
			}
			
			mouse.overDrawable = p;
			p.mouseMove(event);
			br = true;
			break;
		}
		
		if (br) break;
	}
	
	function setCursor(cursor) {
		htmlCanvas.style.cursor = cursor;
	}
}

function fillRoundedRect2(ctx, x, y, w, h, r1, r2, r3, r4) {
	setRoundedPath(ctx, x, y, w, h, r1, r2, r3, r4);
	ctx.fill();
}

function fillRoundedRect(ctx, x, y, w, h, r) {
	setRoundedPath(ctx, x, y, w, h, r, r, r, r);
	ctx.fill();
}

function setRoundedPath(ctx, x, y, w, h, r1, r2, r3, r4) {
	ctx.beginPath();
	ctx.moveTo(x + r1, y);
	ctx.lineTo(x + w - r2, y);
	ctx.arc(x + w - r2, y + r2, r2, -0.5 * Math.PI, 0 * Math.PI);
	
	ctx.lineTo(x + w, y + h - r3);
	ctx.arc(x + w - r3, y + h - r3, r3, 0, 0.5 * Math.PI);
	
	ctx.lineTo(x + r4, y + h);
	ctx.arc(x + r4, y + h - r4, r4, 0.5 * Math.PI, Math.PI);
	
	ctx.lineTo(x, y + r1);
	ctx.arc(x + r1, y + r1, r1, Math.PI, 1.5 * Math.PI);
}

function detectMouse(bx, by, bw, bh) {
	return detectPoint(mouse.x, mouse.y, bx, by, bw, bh);
}

function detectMouseRounded(bx, by, bw, bh, br) {
	return detectPointRounded(mouse.x, mouse.y, bx, by, bw, bh, br);
}

function detectPoint(mx, my, bx, by, bw, bh) {
	var bool1 = mx >= bx && mx < bx + bw;
	var bool2 = my >= by && my < by + bh;
	return bool1 && bool2;
}

function detectPointRounded(mx, my, bx, by, bw, bh, br) {
	setRoundedPath(ctx, bx, by, bw, bh, br, br, br, br);
	return ctx.isPointInPath(mx, my);
}

function loadImages() {
	var t0 = performance.now();
	var database = {
		icons: {
			Apps: [
				"Files",
				"Mail",
				"Lale",
				"Gallery",
				"Calendar",
				"Notes",
				"Settings",
				"Music",
				"Messages",
				"Movies",
				"Calculator",
				"Presentations",
				"AfterEffects",
				"Photoshop",
				"Illustrator",
				"PDFReader",
				"Terminal",
				"TextEditor"
			],
			Files: [
				"Home",
				"Documents",
				"Downloads",
				"Aplications",
				"Desktop",
				"Recents",
				"PHFolder",
				"Folder",
				"ShowGrid",
				"ShowColumn",
				"ShowList",
				"Tag",
				"Tags",
				"Expand",
				"Shrink",
				"TxtFile"
			],
			Notes: [
				"NewNote",
				"Bold",
				"Italic",
				"Underlined",
				"Checklist",
				"Table",
				"Image",
				"AddProfile",
			],
			Messages: [
				"Info",
				"Emoji"
			],
			Settings: [
				"General",
				"Personalization",
				"Network",
				"Language",
				"Time",
				"Search",
				"Displays",
				"Apps",
				"Accessibility",
				"Sound",
				"Privacy",
				"Security",
				"Users",
				"Devices",
				"Extensions",
				"Wallpaper",
				"Notifications",
				"NetAccounts",
				"Bluetooth",
				"Update",
				"UpToDate",
				"Battery",
				"Dock"
			],
			Lale: [
				"Sidebar",
				"Refresh"
			],
			Frame: [
				"Close",
				"Minimize",
				"Maximize",
				"SplitLeft",
				"Multitask",
				"SplitRight",
				"AddTab",
			],
			Dock: [
				"HideApps",
				"AvdanMenu",
				"RecentApps",
				"Sun",
				"WiFi",
				"Bluetooth",
				"Sound",
				"Battery",
				"QuickSettings"
			],
			Photos: [
				"More",
				"Less",
				"Rotate"
			],
			Start: [
				"DevicePhone",
				"DeviceWatch",
				"DeviceCar",
				"DefaultProfilePicture",
				"DefaultProfilePicture2",
				"Power",
				"AllApps",
				"Settings",
				"Cloud"
			],
			global: [
				"Back",
				"Forward",
				"MoreOptions",
				"Search",
				"Share",
				"Play",
				"Star",
				"Dropdown",
				"Delete",
				"Home",
				"Default"
			]
		},
		images: {
			backgrounds: [
				"AvdanOS.jpg",
				"AvdanOSWallpaper.jpg"
			],
			Settings: [
				"AppearanceStyleRoundedBG.png",
				"AppearanceStyleRoundedNoBG.png",
				"AppearanceStyleStraightBG.png",
				"AppearanceStyleStraightNoBG.png"
			]
		}
	};
	
	images = {};
	icons = {};
	var remaining = 0;
	
	for (key in database.images) {
		images[key] = {};
		
		for (i of database.images[key]) {
			var imgObj = {};
			
			var img = createImgElement("images/" + key.toString() + "/" + i);
			
			remaining++;
			imgObj.original = img;
			imgObj.loaded = false;
			images[key][i.substring(0, i.indexOf("."))] = imgObj;
		}
	}
	
	for (key in database.icons) {
		icons[key] = {};
		for (i of database.icons[key]) {
			var icObj = {};
			
			var ic;
			if (key.includes("global")) {
				ic = createImgElement("icons/" + i + ".png");
			}
			else {
				ic = createImgElement("icons/" + key + "/" + i + ".png");
			}
			
			remaining++;
			icObj.original = ic;
			icObj.loaded = false;
			icons[key][i] = icObj;
		}
	}
	
	validated = false;
	
	function createImgElement(src) {
		var img = document.createElement("img");
		img.crossOrigin = "anonymous";
		img.src = src;
		img.onload = () => {
			remaining--;
			if (remaining <= 0) {
				setTimeout(loadDrawables, 0);
			}
		};
		return img;
	}
	var t1 = performance.now();
	//console.log("Load Images: " + Math.round((t1 - t0) * 10) / 10);
}

function loadIcon(appName, name, w, h) {
	
	var icObj = {};
	if (icons[appName][name]) {
		icObj = icons[appName][name];
	}
	else if (icons.global[name]) {
		icObj = icons.global[name];
	}
	else return null;
	
	if (arguments.length == 2) {
		return icObj.original;
	}
	else if (arguments.length == 4) {
		
		var prop = "s_" + w + "x" + h;
		if (Object.hasOwn(icObj, prop)) {
			return icObj[prop];
		}
		else {
			var cnv = document.createElement("canvas");
			cnv.width = w;
			cnv.height = h;
			cnv.getContext("2d").drawImage(icObj.original, 0, 0, w, h);
			
			icObj[prop] = cnv;
			return cnv;
		}
	}
}

function loadImage(folder, name, w, h) {
	var imgObj = images[folder][name];
	
	if (arguments.length == 2) {
		return imgObj.original;
	}
	else {
		
		var prop = "s_" + w + "x" + h;
		if (imgObj.hasOwn(prop)) {
			return imgObj[prop];
		}
		else {
			var cnv = document.createElement("canvas");
			cnv.width = w;
			cnv.height = h;
			cnv.getContext("2d").drawImage(imgObj.original, 0, 0, w, h);
			
			imgObj[prop] = cnv;
			return cnv;
		}
	}
}

function loadFileSystem() {
	fileSystem = {};
	
	fetch("fileSystem.json")
	.then((response) => {
		//console.log(response.text().then((text) => console.log(text)));
		return response.json();
	})
	.then((files) => {
		fileSystem = files;
		fileSystem.cache = new Map();
		
		var root = fileSystem.root;
		
		var passThrough = (file, path) => {
			fileSystem.cache.set(path, file);
			if (file.type != "File") {
				for (child of file.contents) {
					var newPath = path + child.name + (child.type == "Folder" ? "/" : "") 
					passThrough(child, newPath);
				}
			}
		};
		
		passThrough(root, "/");
		
		fileSystem.drives.forEach((drive, i) => {
			var abc = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
			passThrough(drive, abc.charAt(i) + ":/");
		});
		
		fileSystem.get = (path) => {
			var cache = fileSystem.cache;
			if (cache.has(path)) {
				return cache.get(path);
			}
			else if (!path.endsWith("/")) {
				return fileSystem.get(path + "/");
			}
			else {
				return null;
			}
		};
		
		fileSystem.list = (path) => {
			var folder = fileSystem.get(path);
			if (!folder) return null;
			
			if (folder.type != "Folder") return null;
			
			return folder.contents;
		};
		
		console.log(fileSystem);
	})
	.catch((error) => {
		console.error("There is an error related to the file system: " + error);
		console.error(error);
	});
}

function openApp(app, ...args) {
	let newApp = new app(...args);
	let newFrame = new Frame(newApp);
	drawables[1].push(newFrame);
	
	keyboard.focus = newFrame;
	
	dock.setAutohide();
	dock.invalidate();
}

function closeAppFrame(frame) {
	frame.close();
	
	dock.setAutohide();
	dock.invalidate();
	
	setTimeout(setFrameArea, 0);
}

function minimizeAppFrame(frame) {
	frame.visible = false;
	if (frame.app.minimize) {
		frame.app.minimize();
	}
	
	dock.setAutohide();
	dock.invalidate();
	
	setTimeout(setFrameArea, 0);
}

function restoreAppFrame(frame) {
	frame.visible = true;
	if (frame.app.restore) {
		frame.app.restore();
	}
	
	drawables[1].splice(drawables[1].indexOf(frame), 1);
	drawables[1].push(frame);
	
	dock.setAutohide();
	dock.invalidate();
	
	setTimeout(setFrameArea, 0);
}

function setTextStyle(ctx, style, font, align, baseline) {
	ctx.fillStyle = style;
	ctx.font = font;
	ctx.textAlign = align;
	ctx.textBaseline = baseline;
}

function setCanvasSize(w, h) {
	canvas.width = width = w;
	canvas.height = height = h;
	
	htmlCanvas.width = w;
	htmlCanvas.height = h;
	//htmlCanvas.style.width = w;
	//htmlCanvas.style.height = h;
	
	blurCanvas.width = w;
	blurCanvas.height = h;
	
	drawingCanvas.width = w;
	drawingCanvas.height = h;
	
	validated = false;
}

function setCanvasMargin() {
	margin.top = innerHeight > height ? (innerHeight - height) / 2 : -(height - innerHeight);
	margin.left = (innerWidth - width) / 2;
	
	htmlCanvas.style.top = margin.top + "px";
	htmlCanvas.style.left = margin.left + "px";
}

function setDrawablePrototype(f) {
	f.prototype = Drawable;
	f.prototype.constructor = f;
}

function setAppDrawablePrototype(a) {
	a.prototype = Drawable;
	a.prototype.constructor = a;
}
var Drawable = {
	x: 0,
	y: 0,
	w: 0,
	h: 0,
	minW: 0,
	minH: 0,
	cornerRadius: 6,
	visible: true,
	movable: false,
	resizable: false,
	validated: false,
	type: "Drawable",
	
	drawCanvas: null,
	blurCanvas: null,
	bgCanvas: null,
	
	initCanvas: function() {
		this.drawCanvas = document.createElement("canvas");
		this.blurCanvas = document.createElement("canvas");
	},
	
	preDraw: function(dctx) {
		if (newRendering) {
			/*
			if (blurring) {
				if (d.blurValidated) {
					dctx.drawImage(d.bgCanvas, d.x, d.y, d.w, d.h, d.x, d.y, d.w, d.h);
				}
				else {
					d.bgCanvas.width = width;
					d.bgCanvas.height = height;
					
					var bgCtx = d.bgCanvas.getContext("2d");
					
					bgCtx.filter = "blur(12px)";
					bgCtx.drawImage(dctx.canvas, 0, 0);
					bgCtx.filter = "none";
					
					dctx.drawImage(d.bgCanvas, d.x, d.y, d.w, d.h, d.x, d.y, d.w, d.h);
					
					d.blurValidated = true;
				}
			}
			
			if (d.validated) {
				dctx.imageSmoothingEnabled = false;
				dctx.drawImage(d.drawCanvas, d.x, d.y);
				dctx.imageSmoothingEnabled = true;
			}
			else {
				d.drawCanvas.width = d.w;
				d.drawCanvas.height = d.h;
				
				var drawCtx = d.drawCanvas.getContext("2d");
			
				d.draw(drawCtx);
				
				drawCtx.globalCompositeOperation = "destination-in";
				drawCtx.fillStyle = "#FFF";
				fillRoundedRect(drawCtx, 0, 0, d.w, d.h, d.cornerRadius);
				drawCtx.globalCompositeOperation = "source-over";
				
				dctx.imageSmoothingEnabled = false;
				dctx.drawImage(d.drawCanvas, d.x, d.y);
				dctx.imageSmoothingEnabled = true;
				
				d.validated = true;
			}
			
			*/
			var bctx = this.blurCanvas.getContext("2d");
			var drawCtx = this.drawCanvas.getContext("2d");
			
			if (blurring) {
				dctx.drawImage(blurCanvas, this.x, this.y, this.w, this.h, 0, 0, this.w, this.h);
			}
			
			if (!this.validated) {
				this.drawCanvas.width = this.w;
				this.drawCanvas.height = this.h;
				
				this.draw(drawCtx);
				
				if (blurring) {
					this.blurCanvas.width = this.w + 32;
					this.blurCanvas.height = this.h + 32;
					
					bctx.filter = "blur(8px)";
					bctx.drawImage(this.drawCanvas, 16, 16);
					bctx.filter = "none";
				}
				this.validated = true;
			}
			
			dctx.imageSmoothingEnabled = false;
			dctx.drawImage(d.drawCanvas, 0, 0);
			
			// Clip rounded corners
			dctx.globalCompositeOperation = "destination-in";
			dctx.fillStyle = "#FFF";
			fillRoundedRect(dctx, 0, 0, this.w, this.h, this.cornerRadius);
			dctx.globalCompositeOperation = "source-over";
			
			if (blurring) {
				window.bctx.drawImage(this.blurCanvas, this.x - 16, this.y - 16);
			}
			
			// If blurring, draw onto main canvas the current blur of blurCanvas
			// If invalidated, redraw the drawable onto drawCanvas
			//  - If blurred, redraw onto blur canvas the blurred version of the drawable.
			// Draw onto main canvas the drawable
			// Draw onto screen the main canvas
			// Draw onto blurCanvas the contents of the blur canvas
			
		}
		else {
			ctx.setTransform(1, 0, 0, 1, d.x, d.y);
			if (blurring) {
				var img = dctx.getImageData(d.x, d.y, d.w, d.h);
				var data = img.data, preData = new Array(data.length), ndata = new Array(data.length);
				
				var blur = 16;
				
				for (var i = 0; i < data.length; i += 4) {
					var px = i / 4 % img.width;
					var py = parseInt(i / 4 / img.width);
					
					var xMin = Math.max(px - blur, 0);
					var xMax = Math.min(px + blur, img.width - 1);
					
					var r = 0;
					var g = 0;
					var b = 0;
					var c = 0;
					for (var k = xMin; k <= xMax; k++) {
						var pix = (py * img.width + k) * 4;
						
						r += data[pix];
						g += data[pix + 1];
						b += data[pix + 2];
						c++;
					}
					
					preData[i] = parseInt(r / c);
					preData[i + 1] = parseInt(g / c);
					preData[i + 2] = parseInt(b / c);
					preData[i + 3] = 255;
				}
				for (var i = 0; i < data.length; i += 4) {
					var px = i / 4 % img.width;
					var py = parseInt(i / 4 / img.width);
					
					var yMin = Math.max(py - blur, 0);
					var yMax = Math.min(py + blur, img.height - 1);
					
					var r = 0;
					var g = 0;
					var b = 0;
					var c = 0;
					for (var j = yMin; j <= yMax; j++) {
						var pix = (j * img.width + px) * 4;
						
						r += preData[pix];
						g += preData[pix + 1];
						b += preData[pix + 2];
						c++;
					}
					
					ndata[i] = parseInt(r / c);
					ndata[i + 1] = parseInt(g / c);
					ndata[i + 2] = parseInt(b / c);
					ndata[i + 3] = 255;
				}
				ndata.forEach((p, i) => {
					img.data[i] = p;
				});
				
				dctx.putImageData(img, d.x, d.y);
			}
			
			this.draw(dctx);
			dctx.setTransform(1, 0, 0, 1, 0, 0);
		}
	},
	draw: (ctx) => {},
	
	invalidate: function() {
		this.validated = false;
		validated = false;
	},
	
	detectMouse: function(x, y, w, h) {
		return detectMouse(this.x + x, this.y + y, w, h);
	},
	
	close: () => {}, // App-only
	minimize: () => {}, // App-only
	restore: () => {}, // App-only
	windowMove: () => {},// App-only
	windowResize: () => {},// App-only
	mouseMove: (event) => {},
	mouseDown: (event) => {},
	mouseDrag: (event) => {},
	mouseUp: (event) => {},
	mouseClick: (event) => {},
	mouseWheel: (event) => {},
	mouseEnter: (event) => {},
	mouseExit: (event) => {},
	keyDown: (event) => {},
	keyType: (event) => {},
	keyUp: (event) => {}
};
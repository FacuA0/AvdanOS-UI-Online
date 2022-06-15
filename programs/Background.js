function Background() {
	this.x = 0;
	this.y = 0;
	this.w = width;
	this.h = height;
	
	this.cornerRadius = 0;
	
	this.img = loadImage("backgrounds", "AvdanOSWallpaper");
	this.frame = false;
	this.type = "Background";
	
	this.initCanvas(this);
	
	this.draw = (ctx) => {
		var img = this.img;
		
		var cvRatio = width / height;
		var bgRatio = img.width / img.height;
		
		if (cvRatio > bgRatio) {
			var ratio = width / img.width;
			ctx.drawImage(img, 0, (height - img.height * ratio) / 2, width, img.height * ratio);
		}
		else {
			var ratio = height / img.height;
			ctx.drawImage(img, (width - img.width * ratio) / 2, 0, img.width * ratio, height);
		}
		
	};
	
	this.preDraw = function(dctx) {
		
		var bctx = this.blurCanvas.getContext("2d");
		var drawCtx = this.drawCanvas.getContext("2d");
		
		if (!this.validated) {
			this.drawCanvas.width = this.w;
			this.drawCanvas.height = this.h;
			
			this.draw(drawCtx);
			
			if (blurring) {
				this.blurCanvas.width = this.w;
				this.blurCanvas.height = this.h;
				
				bctx.filter = "blur(8px)";
				bctx.drawImage(this.drawCanvas, 0, 0);
				bctx.filter = "none";
			}
			
			this.validated = true;
		}
		
		dctx.drawImage(this.drawCanvas, 0, 0);
		
		if (blurring) {
			window.bctx.drawImage(this.blurCanvas, 0, 0);
		}
	}
}

setDrawablePrototype(Background);
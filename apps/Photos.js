function PhotosApp(photo, name) {
	this.w = 640;
	this.h = 420;
	this.minH = 64;
	this.title = "Photos";
	this.type = "PhotosApp";
	
	this.icMore = loadIcon("Photos", "More", 8, 8);
	this.icLess = loadIcon("Photos", "Less", 8, 8);
	this.icRotate = loadIcon("Photos", "Rotate", 12, 12);
	this.icSearch = loadIcon("Photos", "Search", 12, 12);
	this.icShare = loadIcon("Photos", "Share", 12, 12);
	this.icOptions = loadIcon("Photos", "MoreOptions", 12, 12);
	
	this.photo = photo ? photo : null;
	this.photoName = photo ? name : "";
	this.zoom = 0;
	
	this.draw = (ctx) => {
		if (this.photo) {
			this.drawPhoto(ctx);
		}
		else {
			this.drawMain(ctx);
		}
		this.validated = true;
	};
	
	this.drawPhoto = (ctx) => {
		var photo = this.photo;
		var h = this.h - 32;
		
		// Zoombar
		ctx.fillStyle = "#FFF1";
		fillRoundedRect(ctx, 6, 6, 100, 20, 4);
		ctx.fillStyle = "#FFFB";
		fillRoundedRect(ctx, 24, 14, 64, 4, 3);
		
		ctx.fillStyle = "#FFF";
		ctx.beginPath();
		ctx.arc(30 + 52 * this.zoom, 16, 6, 0, 2 * Math.PI);
		ctx.fill();
		
		ctx.drawImage(this.icLess, 11, 12);
		ctx.drawImage(this.icMore, 93, 12);
		
		// Rotate
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, 112, 6, 26, 20, 4);
		ctx.drawImage(this.icRotate, 119, 10);
		
		// Search
		fillRoundedRect(ctx, this.w - 96, 6, 26, 20, 4);
		ctx.drawImage(this.icSearch, this.w - 89, 10);
		
		// Share
		fillRoundedRect(ctx, this.w - 64, 6, 26, 20, 4);
		ctx.drawImage(this.icShare, this.w - 57, 10);
		
		// More options
		fillRoundedRect(ctx, this.w - 32, 6, 26, 20, 4);
		ctx.drawImage(this.icOptions, this.w - 25, 10);
		
		setTextStyle(ctx, "#EEE", "bold 12px sans-serif", "center", "middle");
		ctx.fillText(this.photoName, this.w / 2, 16);
		
		ctx.fillStyle = "#FFFFFF02";
		ctx.fillRect(0, 32, this.w, h);
		
		var fRatio = this.w / h;
		var pRatio = photo.width / photo.height;
		
		if (fRatio <= pRatio) {
			var ratio = this.w / photo.width;
			ctx.drawImage(photo, 0, 32 + (h - photo.height * ratio) / 2, this.w, photo.height * ratio);
		}
		else {
			var ratio = h / photo.height;
			ctx.drawImage(photo, (this.w - photo.width * ratio) / 2, 32, photo.width * ratio, h);
		}
		
		this.validated = true;
	};
	
	this.drawMain = (ctx) => {
		setTextStyle(ctx, "#EEE", "16px sans-serif", "center", "middle");
		ctx.fillText("Photos", this.w / 2, 48);
		
		setTextStyle(ctx, "#888", "10px sans-serif", "center", "middle");
		ctx.fillText("There is no content here for now...", this.w / 2, this.h / 2);
	};
}

setDrawablePrototype(PhotosApp);
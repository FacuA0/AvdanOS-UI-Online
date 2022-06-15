function ColorApp(name, color, x, y) {
	this.x = x;
	this.y = y;
	this.w = 280;
	this.h = 220;
	
	this.color = color;
	this.name = name;
	this.title = name;
	this.frame = true;
	this.type = "ColorApp";
	
	this.draw = (ctx) => {
		ctx.fillStyle = this.color;
		fillRoundedRect(ctx, 0, 0, this.w, this.h, 6);
		
		setTextStyle(ctx, "#FFFFFF", "32px sans-serif", "center", "middle");
		ctx.fillText(this.name, this.w / 2, this.h / 2);
		
		this.validated = true;
	};
}

setDrawablePrototype(ColorApp);
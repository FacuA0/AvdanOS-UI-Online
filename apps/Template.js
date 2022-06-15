function TemplateApp() { // Change this
	this.w = 600;
	this.h = 400;
	this.title = "Template"; // Change this
	this.type = "TemplateApp"; // Change this
	
	this.draw = (ctx) => {
		setTextStyle(ctx, "#EEE", "16px sans-serif", "center", "middle");
		ctx.fillText("Template App", this.w / 2, 48); // Change this
		
		setTextStyle(ctx, "#888", "10px sans-serif", "center", "middle");
		ctx.fillText("There is no content here for now...", this.w / 2, this.h / 2);
	};
}

setDrawablePrototype(TemplateApp); // Change this
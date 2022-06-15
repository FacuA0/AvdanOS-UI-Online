function TextEditorApp() {
	this.w = 600;
	this.h = 400;
	this.title = "Text editor";
	this.type = "TextEditorApp";
	
	this.draw = (ctx) => {
		setTextStyle(ctx, "#EEE", "16px sans-serif", "center", "middle");
		ctx.fillText("Text Editor", this.w / 2, 48);
		
		setTextStyle(ctx, "#888", "10px sans-serif", "center", "middle");
		ctx.fillText("There is no content here for now...", this.w / 2, this.h / 2);
	};
}

setDrawablePrototype(TextEditorApp);
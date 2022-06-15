function MessagesApp() {
	this.w = 600;
	this.h = 400;
	this.title = "Messages";
	this.type = "MessagesApp";
	
	this.icSearch = loadIcon("global", "Search", 12, 12);
	this.icPictures = loadIcon("Start", "DefaultProfilePicture", 40, 40);
	this.icChatPicture = loadIcon("Start", "DefaultProfilePicture", 24, 24);
	this.icChatInfo = loadIcon("Messages", "Info", 16, 16);
	this.icChatEmoji = loadIcon("Messages", "Emoji", 16, 16);
	
	this.chatsPanel = true;
	
	this.textBar = "";
	
	this.currentChat = null;
	this.currentChatIndex = -1;
	this.hoverChat = -1;
	
	this.draw = (ctx) => {
		this.chatsPanel = this.w >= 512;
		
		var panel = this.chatsPanel;
		var wPanel = panel ? 220 : 0;
		
		ctx.fillStyle = "#0004";
		fillRoundedRect(ctx, 6 + wPanel, 6, this.w - 12 - wPanel, this.h - 12, 6);
		
		if (this.currentChat) {
			var chat = this.currentChat;
			
			ctx.fillStyle = "#FFF2";
			fillRoundedRect(ctx, 14 + wPanel, 14, this.w - 28 - wPanel, 32, 6);
			
			ctx.drawImage(this.icChatPicture, 20 + wPanel, 18);
			
			setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
			ctx.fillText(chat.name, 52 + wPanel, 31);
			
			ctx.drawImage(this.icChatInfo, this.w - 38, 22);
			
			setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "hanging");
			chat.chat.forEach((message, i, chatList) => {
				let x = message.owner ? this.w - 24 : 28 + wPanel;
				let y = 64 + i * 40;
				let w = ctx.measureText(message.message).width;
				let align = message.owner ? "right" : "left";
				
				ctx.fillStyle = message.owner ? "#FFF2" : "#FB266A";
				fillRoundedRect(ctx, message.owner ? x - w - 8 : x - 8, y - 8, w + 16, 28, 6);
				setTextStyle(ctx, "#EEE", "12px sans-serif", align, "hanging");
				ctx.fillText(message.message, x, y);
			});
			
			ctx.fillStyle = "#FFF3";
			fillRoundedRect(ctx, 18 + wPanel, this.h - 42, this.w - 36 - wPanel, 24, 6);
			
			setTextStyle(ctx, this.textBar == "" ? "#BBB" : "#EEE", "12px sans-serif", "left", "middle");
			ctx.fillText(this.textBar == "" ? "Type a message" : this.textBar, 24 + wPanel, this.h - 29);
			
			ctx.drawImage(this.icChatEmoji, this.w - 40, this.h - 38);
		}
		
		if (!panel) return;
		
		ctx.fillStyle = "#FFF2";
		fillRoundedRect(ctx, 6, 6, wPanel - 6, 20, 4);
		
		ctx.drawImage(this.icSearch, wPanel - 18, 10);
		
		setTextStyle(ctx, "#CCC", "10px sans-serif", "left", "middle");
		ctx.fillText("Search", 12, 17);
		
		this.chats.forEach((chat, i) => {
			
			if (i == this.currentChatIndex) {
				ctx.fillStyle = "#FFF2";
				fillRoundedRect(ctx, 6, 32 + i * 64, wPanel - 6, 64, 4);
			}
			
			if (i == this.hoverChat) {
				ctx.fillStyle = "#FFF1";
				fillRoundedRect(ctx, 6, 32 + i * 64, wPanel - 6, 64, 4);
			}
			
			setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "top");
			ctx.fillText(chat.name, 64, 44 + i * 64);
			
			setTextStyle(ctx, "#EEE", "12px sans-serif", "left", "middle");
			ctx.fillText(chat.lastMessage, 64, 68 + i * 64);
			
			setTextStyle(ctx, "#CCC", "10px sans-serif", "right", "middle");
			ctx.fillText(chat.time, wPanel - 6, 48 + i * 64);
			
			ctx.drawImage(this.icPictures, 12, 44 + i * 64);
		});
		
		this.validated = true;
	};
	
	this.chats = [
		{
			name: "Name 1",
			lastMessage: "I don't know...",
			time: "12:00",
			chat: [
				{
					time: "11:56",
					message: "Hi.",
					owner: false
				},
				{
					time: "11:58",
					message: "Hi!",
					owner: true
				},
				{
					time: "11:59",
					message: "I have a question...",
					owner: false
				},
				{
					time: "11:59",
					message: "Okay, what is it?",
					owner: true
				},
				{
					time: "12:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},
				{
					time: "12:00",
					message: "I don't know...",
					owner: true
				}
			]
		},
		{
			name: "Name 2",
			lastMessage: "I don't know...",
			time: "11:00",
			chat: [
				{
					time: "10:56",
					message: "Hi.",
					owner: false
				},
				{
					time: "10:58",
					message: "Hi!",
					owner: true
				},
				{
					time: "10:59",
					message: "I have a question...",
					owner: false
				},
				{
					time: "10:59",
					message: "Okay, what is it?",
					owner: true
				},
				{
					time: "11:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},
				{
					time: "11:00",
					message: "I don't know...",
					owner: true
				}
			]
		},
		{
			name: "Name 3",
			lastMessage: "I don't know...",
			time: "10:00",
			chat: [
				{
					time: "9:56",
					message: "Hi.",
					owner: false
				},
				{
					time: "9:58",
					message: "Hi!",
					owner: true
				},
				{
					time: "9:59",
					message: "I have a question...",
					owner: false
				},
				{
					time: "9:59",
					message: "Okay, what is it?",
					owner: true
				},
				{
					time: "10:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},
				{
					time: "10:00",
					message: "I don't know...",
					owner: true
				}
			]
		},
		{
			name: "Name 4",
			lastMessage: "I don't know...",
			time: "9:00",
			chat: [
				{
					time: "8:56",
					message: "Hi.",
					owner: false
				},
				{
					time: "8:58",
					message: "Hi!",
					owner: true
				},
				{
					time: "8:59",
					message: "I have a question...",
					owner: false
				},
				{
					time: "8:59",
					message: "Okay, what is it?",
					owner: true
				},
				{
					time: "9:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},
				{
					time: "9:00",
					message: "I don't know...",
					owner: true
				}
			]
		},
		{
			name: "Name 5",
			lastMessage: "I don't know...",
			time: "8:00",
			chat: [
				{
					time: "7:56",
					message: "Hi.",
					owner: false
				},
				{
					time: "7:58",
					message: "Hi!",
					owner: true
				},
				{
					time: "7:59",
					message: "I have a question...",
					owner: false
				},
				{
					time: "7:59",
					message: "Okay, what is it?",
					owner: true
				},
				{
					time: "8:00",
					message: "Why are all conversations exactly the same?",
					owner: false
				},
				{
					time: "8:00",
					message: "I don't know...",
					owner: true
				}
			]
		},
		{
			name: "Name 6",
			lastMessage: "Oh, you're right!",
			time: "7:01",
			chat: [
				{
					time: "6:56",
					message: "Hi.",
					owner: true
				},
				{
					time: "6:58",
					message: "Hi!",
					owner: false
				},
				{
					time: "6:59",
					message: "I have a question...",
					owner: true
				},
				{
					time: "6:59",
					message: "Okay, what is it?",
					owner: false
				},
				{
					time: "7:00",
					message: "Why are all conversations exactly the same?",
					owner: true
				},
				{
					time: "7:00",
					message: "They are not the same. This one is different...",
					owner: false
				},
				{
					time: "7:01",
					message: "Oh, you're right!",
					owner: true
				}
			]
		}
	];
	
	this.currentChatIndex = 0;
	this.currentChat = this.chats[this.currentChatIndex];
	
	this.mouseMove = () => {
		for (let i = 0; i < this.chats.length; i++) {
			if (this.detectMouse(6, 32 + i * 66, (this.chatsPanel ? 220 : 0) - 6, 64)) {
				if (this.hoverChat == i) return;
				
				this.hoverChat = i;
				this.invalidate();
				
				return;
			}
		}
		
		if (this.hoverChat != -1) {
			this.hoverChat = -1;
			this.invalidate();
		};
	}
	
	this.mouseClick = () => {
		if (this.hoverChat != -1) {
			this.currentChatIndex = this.hoverChat;
			this.currentChat = this.chats[this.currentChatIndex];
			this.invalidate();
		}
	};
	
	this.mouseExit = () => {
		this.hoverChat = -1;
		this.invalidate();
	};
	
	this.keyType = () => {
		let letter = keyboard.key;
		
		if (letter == "Backspace") {
			this.textBar = this.textBar.substr(0, this.textBar.length - 1)
		}
		else {
			this.textBar += letter;
		}
	};
	
	this.keyDown = () => {
		if (keyboard.key != "Enter") return;
		
		var time = new Date().getHours() + ":" + new Date().getMinutes();
		
		this.currentChat.chat.push({
			time: time,
			message: this.textBar,
			owner: true
		});
		
		this.currentChat.lastMessage = this.textBar;
		this.currentChat.time = time;
		
		this.textBar = "";
	};
}

setDrawablePrototype(MessagesApp);
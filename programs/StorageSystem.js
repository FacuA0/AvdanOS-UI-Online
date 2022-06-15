var StorageSystem = {
	user: "User",
	
	get(app, key) {
		return window.localStorage.getItem(this.user + "." + app + ":" + key);
	},
	
	set(app, key, value) {
		window.localStorage.setItem(this.user + "." + app + ":" + key, value);
	},
	
	exists(app, key) {
		return window.localStorage.getItem(this.user + "." + app + ":" + key) !== null;
	}
};
export default class Board {

	constructor (obj) {
		Object.assign(this, obj);
	}

	getBackgroundStyle () {
		if (this.prefs.backgroundImage) {
			return {
				backgroundImage: `url("${this.prefs.backgroundImage}")`
			};
		} else {
			return {
				background: this.prefs.backgroundColor
			};
		}
	}
}
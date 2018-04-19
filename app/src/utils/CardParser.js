const rex = /\([^)]*\)|\[[^\]]*\]/g;

export default {
	getPoints (cardName) {
		let points = rex.exec(cardName);

		if (points != null && points.length > 0) {
			return points[0].replace("(", "").replace(")", "");
		}

		return "?";
	},
	getName (name) {
		return name.replace(rex, "");
	}
}
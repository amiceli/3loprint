const rex = /\([^)]*\)|\[[^\]]*\]/g;

/**
 * @property {string} name
 * @property {Array} checklists
 */
class Card {

	constructor(obj) {
		Object.assign(this, obj);
	}

	hasChecklistsItem () {
		let countItem = 0;

		for (let checklist of this.checklists) {
			countItem += checklist.checkItems.length;
		}

		return countItem > 0;
	}

	getPoints () {
		let points = rex.exec(this.name);

		if (points != null && points.length > 0) {
			return points[0].replace("(", "").replace(")", "");
		}

		return "?";
	}

	getName () {
		return this.name.replace(rex, "");
	}
}

export default Card;
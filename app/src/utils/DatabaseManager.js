import PouchDB from "pouchdb";

const db = new PouchDB("trello");

export default {
	getConfig() {
		return db.get("1");
	},
	saveConfig(config) {
		let doc = {
			_id: "1",
			key: config.key,
			token: config.token,
			organization: config.organization
		};

		return db.put(doc);
	}
};

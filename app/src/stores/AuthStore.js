import Vue from "vue";
import Vuex from "vuex";
import TrelloApiConnector from "@/utils/TrelloApiConnector";
import DatabaseManager from "@/utils/DatabaseManager";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		key: "",
		secret: "",
		organization: ""
	},
	mutations: {
		saveConfig(state, config) {
			state.key = config.key;
			state.secret = config.secret;
			state.organization = config.organization;

			return DatabaseManager.saveConfig(config);
		},
		updateConfig(state, config) {
			state.key = config.key;
			state.secret = config.secret;
			state.organization = config.organization;
		}
	},
	actions: {
		getConfig({commit}) {
			return new Promise((resolve, reject) => {
				DatabaseManager.getConfig().then(doc => {
					commit("updateConfig", doc);
					resolve();
				}).catch((err) => {
					console.error("Unable to retrieve your config", err);
					reject();
				});
			});
		},
		saveConfig({commit}, config) {
			return TrelloApiConnector.checkTokenAndSecret(
				config.key,
				config.token,
				config.organization
			).then(() => {
				commit("saveConfig", config);
			}).catch(err => {
				console.error("Something failed with trello api", err);
			});
		}
	}
});

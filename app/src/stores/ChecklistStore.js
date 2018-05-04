import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		card: null
	},
	mutations: {
		setCard(state, card) {
			state.card = card;
		},
		emptyCard(state) {
			state.card = null;
		}
	}
});
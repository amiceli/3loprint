import Vue from "vue";
import Vuex from "vuex";
import axios from "axios/index";

Vue.use(Vuex);

const instance = axios.create({
	baseURL: "/"
});

export default new Vuex.Store({
	state: {
		selectedCard: [],
		pdfLink: null
	},
	mutations: {
		setLink(state, pdfName) {
			this.pdfLink = `/api/pdf${pdfName}`;
		}
	},
	actions: {
		clearLink({state}) {
			state.clearLink = null;
		},
		selectCard({commit, state}, cardId) {
			let index = state.selectedCard.indexOf(cardId);

			if (index >= 0) {
				state.selectedCard.splice(index, 1);
			} else {
				state.selectedCard.push(cardId);
			}
		},
		selectList({state}, list) {
			let cards = Array.from(list.cards, c => c.id);

			for (let card of cards) {
				if (!state.selectedCard.includes(card)) {
					state.selectedCard.push(card);
				}
			}
		},
		generate({commit}, postIts) {
			return instance.post("/generate", {postIts}).then(res => {
				commit("setLink", res.data);
			});
		}
	}
});

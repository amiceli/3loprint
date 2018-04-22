import Vue from "vue";
import Vuex from "vuex";
import TrelloApiConnector from "@/utils/TrelloApiConnector";
import DatabaseManager from "@/utils/DatabaseManager";
import Board from '@/models/Board';
import Card from '@/models/Card';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		boards: [],
		board: null,
		members: []
	},
	mutations: {
		updateBoards(state, list) {
			state.boards = list;
		},
		updateBoard(state, board) {
			state.board = board;
		},
		updateBoardCards(state, cards) {
			for (let l of state.board.lists) {
				for (let card of cards) {
					if (l.id === card.idList) {
						l.cards.push( new Card(card) );
					}
				}
			}
		},
		updateBoardLists(state, lists) {
			state.board.lists = lists;

			for (let l of lists) {
				l.cards = [];
			}
		},
		updateMembers(state, list) {
			state.members = list;
		}
	},
	actions: {
		listBoards({commit}) {
			return DatabaseManager.getConfig().then(config => {
				return TrelloApiConnector.listBoards(
					config.key,
					config.token,
					config.organization
				).then((response) => {
					let boards = [];

					for (let board of response.data) {
						boards.push( new Board(board) )
					}

					commit("updateBoards", boards);
					return response;
				}).catch((err) => {
					console.error("An error occurred listBoards : ", err);
				});
			});
		},
		loadBoard({commit}, boardId) {
			return DatabaseManager.getConfig().then(config => {
				return TrelloApiConnector.getBoard(
					config.key,
					config.token,
					config.organization,
					boardId
				).then(response => {
					commit("updateBoard", new Board(response.data));
					return response;
				}).catch(err => {
					console.error("An error occurred loadBoard : ", err);
				});
			});
		},
		loadBoardCards({commit}, boardId) {
			return DatabaseManager.getConfig().then(config => {
				return TrelloApiConnector.getBoardCards(
					config.key,
					config.token,
					config.organization,
					boardId
				).then(response => {
					commit("updateBoardCards", response.data);
					return response;
				}).catch(err => {
					console.log("err : ", err);
				});
			});
		},
		loadBoardLists({commit}, boardId) {
			return DatabaseManager.getConfig().then(config => {
				return TrelloApiConnector.getBoardLists(
					config.key,
					config.token,
					config.organization,
					boardId
				).then(response => {
					commit("updateBoardLists", response.data);
					return response;
				}).catch(err => {
					console.log("err : ", err);
				});
			});
		},
		loadMembers({commit}) {
			return DatabaseManager.getConfig().then(config => {
				return TrelloApiConnector.getMembers(
					config.key,
					config.token,
					config.organization
				).then(response => {
					commit("updateMembers", response.data);
					return response;
				}).catch(err => {
					console.log("err : ", err);
				});
			});
		}
	}
});

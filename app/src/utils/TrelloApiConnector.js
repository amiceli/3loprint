import axios from "axios";

const instance = axios.create({
	baseURL: "https://api.trello.com"
});

export default {
	listBoards(key, token, organization) {
		return instance.get(`/1/organizations/${organization}/boards/`, {
			params: {key, token}
		});
	},
	getBoard(key, token, organization, id) {
		return instance.get(`/1/boards/${id}`, {params: {key, token}});
	},
	getBoardCards(key, token, organization, id) {
		return instance.get(`/1/boards/${id}/cards`, {params: {key, token}});
	},
	getBoardLists(key, token, organization, id) {
		return instance.get(`/1/boards/${id}/lists`, {params: {key, token}});
	},
	checkTokenAndSecret(key, token, organization) {
		return instance.get(`/1/organizations/${organization}`, {
			params: {key, token}
		});
	},
	getMembers(key, token, organization) {
		return instance.get(`/1/organizations/${organization}/members`, {
			params: {key, token}
		});
	}
};

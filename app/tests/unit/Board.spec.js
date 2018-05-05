import Element from "element-ui";
import Vue from 'vue';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import {shallow} from '@vue/test-utils'

import Board from '../../src/views/Board.vue';
import router from '../../src/router';

Vue.use(Element);
Vue.use(VueRouter);
Vue.use(Vuex);

describe('Board component', () => {

	it('should be initialized', () => {
		const defaultData = Board.data();

		expect(defaultData.loading).toBeTruthy();
		expect(defaultData.preview).toBeFalsy();
		expect(typeof defaultData.message).toEqual('string');
	});

	it('should call load method', () => {
		let loadSpy = jest.fn();

		Board.methods.load = loadSpy;

		shallow(Board, {
			router
		});

		expect(loadSpy).toHaveBeenCalled();
	});

});
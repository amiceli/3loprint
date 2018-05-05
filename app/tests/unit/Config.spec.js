import {createLocalVue, mount, shallow} from "@vue/test-utils";
import Element from "element-ui";
import Vue from 'vue';

import Config from '../../src/components/Config.vue';

Vue.use(Element);

describe('Config component', () => {

	let vm;

	beforeEach(() => {
		vm = new Vue(Config).$mount();
	});

	it('should be initialized with correct data', () => {
		expect(vm.configForm.key).toEqual("");
		expect(vm.configForm.organization).toEqual("");
		expect(vm.configForm.token).toEqual("");
	});

	it('should be able to validate form values', () => {
		let spy = jest.fn();

		vm.$refs.configForm.validate = spy;

		vm.onSubmit();

		expect(spy).toHaveBeenCalled();
	});

	it('should be able to save config through store', (done) => {
		let spy = jest.fn(()=>{
			return new Promise((resolve) => {resolve()});
		});
		let messageSpy = jest.fn();

		vm = new Vue(Config).$mount();

		vm.$store.dispatch = spy;
		vm.$message.success = messageSpy;

		vm.configForm.key = 'foo';
		vm.configForm.token = 'awesome-token';
		vm.configForm.organization = "awesome-organization";

		Vue.nextTick(() => {
			vm.onSubmit();

			expect(spy).toHaveBeenCalled();
			expect(spy).toHaveBeenCalledWith("saveConfig", {
				key : 'foo',
				token : 'awesome-token',
				organization : 'awesome-organization'
			});

			done()
		})
	})

});
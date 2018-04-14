<template>
    <div class="config">
        <h1>
            config your trello access
        </h1>
        <br>
        <el-alert title="" type="info" show-icon>
            First you need api token and secret : <a href="https://trello.com/app-key/">check it</a>
        </el-alert>
        <br>
        <el-alert title="" type="info" show-icon>
            We not save your access information, all your data are saved <b>IN</b> your browser, in a
            <a href="https://pouchdb.com/" target="_blank">PouchDB database</a>
            <br>
            You can delete it, <b>when you want</b>.
        </el-alert>
        <br>
        <el-form ref="configForm" :rules="rules" :model="configForm" label-width="120px">
            <el-form-item :label-width="'0'" prop="key">
                <el-input v-model="configForm.key" placeholder="Your trello api key"></el-input>
            </el-form-item>
            <el-form-item :label-width="'0'" prop="token">
                <el-input v-model="configForm.token" placeholder="Your trello api token"></el-input>
            </el-form-item>
            <el-form-item :label-width="'0'" prop="organization">
                <el-input v-model="configForm.organization" placeholder="Your trello organization name"></el-input>
            </el-form-item>
            <el-form-item :label-width="'0'">
                <el-button type="primary" v-on:click="onSubmit">
                    save
                </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
	import AuthStore from "@/stores/AuthStore.js";

	export default {
		data() {
			return {
				configForm: {
					key: "",
					token: "",
					organization: ""
				},
				rules: {
					key: [
						{required: true, trigger: "blur", message: "A token is required"}
					],
					token: [
						{required: true, trigger: "blur", message: "A secret is required"}
					],
					organization: [
						{
							required: true,
							trigger: "blur",
							message: "An organization name is required"
						}
					]
				}
			}
		},
		store: AuthStore,
		methods: {
			onSubmit() {
				let self = this;

				this.$refs.configForm.validate(valid => {
					if (valid) {
						this.$store.dispatch("saveConfig", this.configForm).then(() => {
							self.$message.success("Your config is saved");
						}).catch(err => {
							console.error("failed to saved config", err);
							self.$message.error("Oops, an error occurred. Config not saved");
						});
					} else {
						this.$message.error("Oops, some fields are invalid");
						return false;
					}
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
    * {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    .config {
        h1 {
            text-align: center;
            font-weight: 400;
        }
    }
</style>

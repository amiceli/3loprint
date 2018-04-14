<template>
    <el-row :gutter="20">
        <el-col :span="12" :offset="6">
            <Config v-if="hasTrelloToken === false || hasTrelloSecret === false"></Config>
            <Boards v-if="hasTrelloToken && hasTrelloSecret"></Boards>
        </el-col>
    </el-row>
</template>

<script>
	import AuthStore from "@/stores/AuthStore.js";
	import Config from "@/components/Config.vue";
	import Boards from "@/components/Boards.vue";

	export default {
		name: "home",
		store: AuthStore,
		components: {
			Config,
			Boards
		},
		mounted() {
			this.$store.dispatch("getConfig").then(() => {
				this.$notify.success({
					title: "Cool !",
					message: "I've found your config"
				});
			}).catch(() => {
				this.$notify.warning({
					title: 'Oops !',
					message: "No config found"
				});
			})
		},
		computed: {
			hasTrelloToken() {
				return this.$store.state.key !== "";
			},
			hasTrelloSecret() {
				return this.$store.state.secret !== "";
			}
		}
	};
</script>

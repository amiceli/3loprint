<template>
    <div>
        <Spinner :message="'load board list'" v-if="loading"></Spinner>
        <div v-if="!loading">
            <h1 class="display-2">
                Choose a board
            </h1>
            <br>
            <div class="boards" v-for="b in boards" :key="b.id" v-on:click="chooseBoard(b)">
                <el-card class="box-card" v-bind:style="background(b)">
                <span>
                    {{ b.name }}
                </span>
                </el-card>
                <br>
            </div>
        </div>
    </div>
</template>

<script>
	import Spinner from "@/components/Spinner.vue";
	import TrelloStore from "@/stores/TrelloStore.js";

	export default {
		store: TrelloStore,
		components: {
			Spinner
		},
		data() {
			return {
				loading: true
			};
		},
		mounted() {
			this.$store.dispatch("listBoards").then(response => {
				this.$notify.success(`${response.data.length} boards loaded`);
				setTimeout(() => {
					this.loading = false;
				}, 1000);
			});
		},
		computed: {
			boards() {
				return this.$store.state.boards;
			}
		},
		methods: {
			chooseBoard(board) {
				this.$router.push({name: "board", params: {id: board.id}});
			},
			background(board) {
				if (board.prefs.backgroundImage) {
					return {
						backgroundImage: `url("${board.prefs.backgroundImage}")`
					};
				} else {
					return {
						background: board.prefs.backgroundColor
					};
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
    .boards {
        &:hover {
            cursor: pointer;
        }
    }

    * {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
        "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
    }

    h1 {
        text-align: center;
    }

    .el-card__body {
        span {
            color: white;
        }

        .el-icon-check {
            float: right;
            color: white;
            font-size: 20px;
        }
    }
</style>

<template>
    <el-row :gutter="20" v-if="board != null">
        <Checklists></Checklists>
        <Spinner :message="message" v-if="loading"></Spinner>
        <OverflowSpinner v-if="generating"></OverflowSpinner>
        <PrintChecklists v-if="showCheckitems"></PrintChecklists>
        <el-col :span="20" :offset="2" v-if="!loading && board != null">
            <header v-bind:style="board.getBackgroundStyle()">
                <h1>
                    {{ board.name }}
                </h1>
            </header>
            <el-button type="primary" plain v-on:click="preview = !preview">
                <font-awesome-icon icon="eye"/>
                {{ preview ? 'disable preview' : 'preview card' }}
            </el-button>
            <el-button type="primary" plain v-on:click="generatePdf()">
                generate pdf
            </el-button>
            <a v-bind:href="pdfLink" v-if="pdfLink != null" target="_blank" v-on:click="clearLink()">
                <el-button type="primary" plain>
                    download pdf
                </el-button>
            </a>
            <div v-for="l in board.lists" :key="l.id">
                <h2 v-if="l.cards.length > 0">
                    {{ l.name }}
                    <small>
                        {{ l.cards.length }} cards
                    </small>
                    <el-checkbox v-on:change="selectList(l)" v-bind:value="isSelected(l)">
                        select all cards
                    </el-checkbox>
                </h2>
                <div class="lists" v-if="l.cards.length > 0">
                    <ul v-bind:style="{width : (l.cards.length * 330) + 'px'}">
                        <Card v-for="c in l.cards" :card="c" :key="c.id" :preview="preview" :pdf="pdf"></Card>
                    </ul>
                </div>
            </div>
        </el-col>
    </el-row>

</template>

<script>
	import TrelloStore from "@/stores/TrelloStore.js";
	import Spinner from "@/components/Spinner.vue";
	import OverflowSpinner from "@/components/OverflowSpinner.vue";
	import PrintChecklists from "@/components/PrintChecklists.vue";
	import Checklists from "@/components/Checklists.vue";
	import Card from "@/components/Card.vue";
	import PdfStore from "@/stores/PdfStore.js";
	import domtoimage from "dom-to-image";

	export default {
		store: TrelloStore,
		components: {Spinner, Card, OverflowSpinner, Checklists, PrintChecklists},
		data() {
			return {
				loading: true,
				message: "load board lists",
				preview: false,
				generating: false,
				pdf: false,
				link: null,
				showCheckitems : false
			};
		},
		methods: {
			generatePdf() {
				this.generating = true;
				this.pdf = true;
				this.showCheckitems = true;

				setTimeout(() => {

					let promises = [];

					let node = document.getElementById('lo-checkItems');

					for (let item of node.children) {
						promises.push(domtoimage.toJpeg(item));
                    }


					for (let card of this.selectedCards) {
						promises.push(
							domtoimage.toJpeg(document.getElementById(`card-${card}`))
						);
					}

					Promise.all(promises).then(values => {
						PdfStore.dispatch("generate", {postIts: values}).then(() => {
							this.pdf = false;
							this.generating = false;
							this.showCheckitems = false;
						}).catch(() => {
							// display error message
						});
					});
				}, 2000);
			},
			clearLink() {
				PdfStore.dispatch("clearLink");
			},
			selectList(list) {
				PdfStore.dispatch("selectList", list);
			},
			isSelected(list) {
				let cards = Array.from(list.cards, x => x.id);

				let selected = true;

				for (let card of cards) {
					selected = selected && PdfStore.state.selectedCard.includes(card);
				}

				return selected;
			}
		},
		computed: {
			board() {
				return this.$store.state.board;
			},
			pdfLink() {
				return PdfStore.state.pdfLink;
			},
			selectedCards() {
				return PdfStore.state.selectedCard;
			},
			allCards() {
				let list = [];

				for (let l of this.board.lists) {
					for (let c of l.cards) {
						list.push(c);
					}
				}

				return list;
			}
		},
		mounted() {
			let self = this;

			self.$store.dispatch("loadMembers");

			(async function load() {
				try {
					await self.$store.dispatch("loadBoard", self.$route.params.id);
					await self.$store.dispatch("loadBoardLists", self.$route.params.id);
					await self.$store.dispatch("loadBoardCards", self.$route.params.id);

					self.loading = false;
				} catch (e) {
					console.error('An error occurred', e);
					self.$notify({
						title: 'Oops',
						message: 'Some resources couldn\'t be loaded',
						type: 'error'
					});
					self.$router.push({name: 'home'});
				}
			})();
		}
	};
</script>

<style lang="scss" scoped>

    .spinner {
        margin-top: 100px;
    }

    header {
        height: 100px;
        line-height: 100px;
        margin-bottom: 20px;
        background: #fedafe;
        /*position: absolute;*/
        top: 62px;
        width: 100%;
        left: 0;
        z-index: 255;

        h1 {
            text-align: center;
            font-weight: 500;
            margin: 0;
            padding: 0;
            color: rgba(0, 0, 0, 0.6);
        }
    }

    .el-col {
        /*padding-top: 100px;*/
    }

    .lists {
        height: 350px;
        width: 100%;
        padding-top: 10px;
        padding-left: 20px;
        overflow-y: hidden;
        overflow-x: scroll;

        ul {
            list-style-type: none;
        }
    }

    a {
        margin-left: 10px;
    }

    h2 {
        font-weight: 400;
        small {
            font-weight: 300;
            color: #ddd;
        }
    }
</style>

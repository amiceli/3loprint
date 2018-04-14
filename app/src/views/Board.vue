<template>
    <el-row :gutter="20">
        <Spinner :message="message" v-if="loading"></Spinner>
        <OverflowSpinner v-if="generating"></OverflowSpinner>
        <el-col :span="20" :offset="2" v-if="!loading && board != null">
            <h1>
                {{ board.name }}
            </h1>
            <el-button type="primary" plain v-on:click="preview = !preview">
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
                <h2>
                    {{ l.name }}
                    <small>
                        {{ l.cards.length }} cards
                    </small>
                    <el-checkbox v-on:change="selectList(l)" v-bind:value="isSelected(l)">
                        select all cards
                    </el-checkbox>
                </h2>
                <div class="lists">
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
	import Card from "@/components/Card.vue";
	import PdfStore from "@/stores/PdfStore.js";
	import domtoimage from "dom-to-image";

	export default {
		store: TrelloStore,
		components: {Spinner, Card, OverflowSpinner},
		data() {
			return {
				loading: true,
				message: "load board lists",
				preview: false,
				generating: false,
				pdf: false,
				link: null
			};
		},
		methods: {
			generatePdf() {
				this.generating = true;
				this.pdf = true;

				setTimeout(() => {
					let promises = [];

					for (let card of this.selectedCards) {
						promises.push(
							domtoimage.toPng(document.getElementById(`card-${card}`))
						);
					}

					Promise.all(promises).then(values => {
						PdfStore.dispatch("generate", {postIts: values}).then(() => {
							this.pdf = false;
							this.generating = false;
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
			// Maybe, I can do something to optimize this section of code

			this.$store.dispatch("loadMembers");

			this.$store.dispatch("loadBoard", this.$route.params.id).then(() => {
				this.$store.dispatch("loadBoardLists", this.$route.params.id).then(res => {
					this.message = "ok, now we load board list cards";

					this.$store.dispatch("loadBoardCards", this.$route.params.id).then(res => {
						this.loading = false;
					});
				});
			}).catch((err) => {
				this.$router.push({name: 'home'});
			});
		}
	};
</script>

<style lang="scss" scoped>
    * {
    }

    h1 {
        text-align: center;
        font-weight: 500;
        margin-bottom: 50px;
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

    h2 {
        font-weight: 400;
        small {
            font-weight: 300;
            color: #ddd;
        }
    }
</style>

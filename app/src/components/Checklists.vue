<template>
    <div class="lo-checklists" v-bind:class="{'display' : card != null}">
        <header>
            <h1>
                Checklists
            </h1>
        </header>
        <div v-if="card != null" class="lo-cards">
            <div v-for="checklist in card.checklists">
                <Card v-for="item in checklist.checkItems" :rotate="false" :checklist="true"
                      :card="generateCardFromChecklistItem(item)"
                      :key="item.id"></Card>
            </div>
        </div>
        <footer>
            <el-button plain type="primary" v-on:click="close()">
                Close
            </el-button>
        </footer>
    </div>
</template>

<script>
	import ChecklistStore from "@/stores/ChecklistStore.js";
	import Card from '@/components/Card.vue';

	export default {
		store: ChecklistStore,
		components: {
			Card
		},
		computed: {
			card() {
				return this.$store.state.card;
			}
		},
		methods: {
			generateCardFromChecklistItem(item) {
				return {
					name: item.name,
					id: item.id,
					checklists: [],
					idShort: this.card.idShort,
					idMembers: this.card.idMembers
				}
			},
			close() {
				this.$store.commit('emptyCard');
			}
		}
	}
</script>

<style lang="scss" scoped>
    $width: 350px;

    .lo-checklists {
        position: fixed;
        top: 0;
        right: -$width;
        width: $width;
        height: 100%;
        background: #fefefe;
        z-index: 255;
        transition: right 0.3s ease-in-out;
        box-shadow: -15px 0px 10px -15px #aaa;

        .lo-cards {
            width: 100%;
            height: calc(100% - 120px);
            overflow: scroll;
            overflow-x: hidden;

            li {
                margin-bottom: 15px;
                margin-left: 20px;
            }
        }

        &.display {
            right: 0;
        }

        header {
            height: 60px;
            overflow: hidden;
            line-height: 60px;
            h1 {
                text-align: center;
                font-weight: 400;
                margin: 0;
                padding: 0;
            }
        }

        footer {
            position: absolute;
            bottom: 0;
            height: 60px;
            line-height: 60px;
            left: 0;
            width: 100%;
            padding-left: 25px;
            background: #f1f1f1;
        }
    }
</style>
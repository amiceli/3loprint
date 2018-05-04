<template>
    <div v-if="board != null" id="lo-checkItems">
        <Card :card="item" :pdf="true" :preview="true" v-for="item in checklistsItem" v-if="selectedCards.includes(item.idCard)"></Card>
    </div>
</template>

<script>
	import Card from "@/components/Card.vue";
	import TrelloStore from "@/stores/TrelloStore.js";
	import PdfStore from "@/stores/PdfStore.js";

	export default {
		store: TrelloStore,
		components: {Card},
		computed: {
			board() {
				return this.$store.state.board;
			},
            checklistsItem () {
				return this.$store.state.checklistsItem;
            },
            selectedCards () {
				return PdfStore.state.selectedCard;
            }
		}
	}
</script>
<template>
    <div class="ov-spinner">
        <div class="ov-spinner__wrap">
            <img src="https://media.giphy.com/media/TvLuZ00OIADoQ/giphy.gif" alt="waiting...">
            <br>
            <Spinner :message="'Orcas are generating pdf'"></Spinner>
        </div>
    </div>
</template>

<script>
	import Spinner from "@/components/Spinner.vue";

	export default {
		components: {
			Spinner
		}
	};
</script>

<style lang="scss" scoped>
    .ov-spinner {
        z-index: 255;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        display: flex;
        background: #ffffff;
        align-items: center;
        justify-content: center;

        &__wrap {
            display: inline-block;
            text-align: center;
            img {
                width: 60%;
                box-shadow: 0 10px 6px -6px #777;
            }
        }
    }
</style>

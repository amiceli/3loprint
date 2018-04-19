<template>
    <el-container>
        <el-header>
            <Navbar></Navbar>
        </el-header>
        <el-main>
            <router-view></router-view>
        </el-main>
    </el-container>
</template>

<script>
	import Navbar from "@/components/Navbar.vue";

	export default {
		name: "app",
		components: {
			Navbar
		}
	};
</script>

<style lang="scss" scoped>
    .el-header {
        position: fixed;
        width: 100%;
        z-index: 255;
    }
    .el-main {
        padding-top: 80px;
    }
</style>

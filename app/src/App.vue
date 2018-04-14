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

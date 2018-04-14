<template>
    <el-menu mode="horizontal" :router="true" :default-active="'home'">
        <el-menu-item index="/home">
            Home
        </el-menu-item>
        <el-menu-item index="/about">
            About
        </el-menu-item>
    </el-menu>
</template>

<script>
	export default {
		name: "Navbar"
	};
</script>

<style>
</style>

<template>
    <div class="spinner">
        <svg width="300px" height="150px" viewBox="0 0 187.3 93.7" preserveAspectRatio="xMidYMid meet">
            <path stroke="#409EFF" id="outline" fill="none" stroke-width="4" stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-miterlimit="10"
                  d="M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/>
            <path id="outline-bg" opacity="0.05" fill="none" stroke="#000" stroke-width="4" stroke-linecap="round"
                  stroke-linejoin="round" stroke-miterlimit="10"
                  d="				M93.9,46.4c9.3,9.5,13.8,17.9,23.5,17.9s17.5-7.8,17.5-17.5s-7.8-17.6-17.5-17.5c-9.7,0.1-13.3,7.2-22.1,17.1 				c-8.9,8.8-15.7,17.9-25.4,17.9s-17.5-7.8-17.5-17.5s7.8-17.5,17.5-17.5S86.2,38.6,93.9,46.4z"/>
        </svg>
        <br>
        <p class="message">
            {{ message }}
        </p>
    </div>
</template>

<script>
	export default {
		props: ["message"]
	};
</script>

<style lang="scss" scoped>
    $len: 242.776657104492px;
    $time: 1.6s;

    .spinner {
        width: 300px;
        margin-left: auto;
        margin-right: auto;

        #outline {
            stroke-dasharray: $len * 0.01, $len;
            stroke-dashoffset: 0;
            animation: anim $time linear infinite;
        }

        .message {
            font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB",
            "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
            color: #409eff;
            margin: 0;
            text-align: center;
            animation: fade 2s linear infinite;
        }

        @keyframes fade {
            0% {
                opacity: 1;
            }
            50% {
                opacity: 0;
            }
            100% {
                opacity: 1;
            }
        }

        @keyframes anim {
            12.5% {
                stroke-dasharray: $len * 0.14, $len;
                stroke-dashoffset: -$len * 0.11;
            }
            43.75% {
                stroke-dasharray: $len * 0.35, $len;
                stroke-dashoffset: -$len * 0.35;
            }
            100% {
                stroke-dasharray: $len * 0.01, $len;
                stroke-dashoffset: -$len * 0.99;
            }
        }
    }
</style>

<template>
    <div class="about">
        <h1>
            About 3loprint
        </h1>
        <br>
        <h2>
            About me
        </h2>
        <p>
            I'm a french developer who loves Vue ecosystem. <br>
            If you want to check my other project : <a target="_blank" href="https://github.com/amiceli">see my github
            profile.</a>
            <br>
            <br>
            If you want to contact me for 3loprint feel free to open an issue, <br>for other thing you contact me on
            <a href="https://www.linkedin.com/in/antoinemiceli/">linkedin</a>.
        </p>
        <br>
        <h2>
            Why 3loprint ?
        </h2>
        <p>
            In my company we use Scrum as project management methodology. <br>
            So we need to write some post-its for our scrum board.
        </p>
        <p>
            So as my teacher said : <i>Developers are lazy</i>, so I create a tool for that. <br>
            3loprint use Trello API to genrate PDF with your post-its.
        </p>
        <br>
        <h2>
            About your information
        </h2>
        <el-tag type="warning">Please read it</el-tag>
        <p>
            3loprint use PouchDB, so your Trello information like token and organization name are saved in your browser.
            <br>
            <b>You can delete it when you want !</b>
        </p>
        <br>
        <h2>
            How it works
        </h2>
        <p>
            3loprint use some self chosen convention to generate PDF : <br>
        </p>
        <ul>
            <li>
                Story points in parenthesis at begin of title: <b>(7) </b> Built something awesome
            </li>
            <li>
                Only story points muse be in parenthesis, nothing else in title
            </li>
        </ul>
        <p>
            <b>
                3loprint is currently under development so it only generates user story not dev tasks (checklist on
                trello).
            </b>
        </p>
        <br>
        <h2>
            Technologies
        </h2>
        <p>
            3loprint is built with Vuejs (also vue-router and vuex) with PouchDB for database. <br>
            Server is built with <a href="https://github.com/klein/klein.php" target="_blank">Klein.php</a>.
        </p>
    </div>
</template>

<style lang="scss" scoped>
    h1 {
        font-weight: 400;
        font-size: 31px;
    }

    h2 {
        font-weight: 400;
    }

    p {
        line-height: 25px;
        font-size: 18px;
    }
</style>

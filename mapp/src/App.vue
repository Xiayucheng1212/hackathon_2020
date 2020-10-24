<template>
<div id="app">
    <!--<Ti title="hello bro" />-->
    <GMap />
    <!--<router-view></router-view>-->
</div>
</template>

<script>
import Ti from './components/Title.vue'
import GMap from './components/GoogleMap.vue'

export default {
    name: "App",
    components: {
        Ti,
        GMap
    }
}
</script>

<style lang="scss">
@import "~bootstrap/scss/bootstrap";

#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    //margin-top: 60px;
}
</style>

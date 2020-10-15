<template>
  <div id="app">
    <div>地點</div>
    <div id="location">
      <input v-model="message">
    </div>
    <button id="search">search</button>
    <hr>
    <div id="album"></div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  margin-top: 7%;
}
#app > div{
  display: inline;
  margin: 2%;
}
#search{

}
hr{
  margin-top: 6%;
}
</style>

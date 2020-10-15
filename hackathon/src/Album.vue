<template>
  <div>
    <input id="upload_file" type="file" accept="image/*">
    <div class="image-item space">
        <div class="image-up"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Album',
  data(){
      return{
          imglist: [],
          datas: new FormData(),
          files:0,
          size:0
      }
  },
  methods:{
      
  }
}
</script>

<style>

</style>
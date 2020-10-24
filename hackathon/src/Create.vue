<template>
  <div id="app">
    <div class="app_inner">相簿名稱</div>
    <input id="locate_name_disabled" class="app_inner" v-model="place">
    <hr id="hr1">
    <div id="album" :upload="'123'">
      <el-upload
        class="upload-demo"
        ref="upload"
        action="https://hereisanewapp.herokuapp.com/testForCreateAlbum"
        list-type="picture-card"
        :auto-upload="false"
        :file-list="fileList">
        <i slot="default" class="el-icon-plus"></i>
        <div id="imgs" slot="file" slot-scope="{file}">
          <img class="el-upload-list__item-thumbnail" :src="file.url" alt />
        </div>
      </el-upload>
    </div>
    <hr id="hr2">
    <button id="bottom" @click="transtoBase64">Create</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data(){
    return{
      formData: new FormData(),
      fileList:[],
      tagNameList: [],
      bottom_message: "Update",
      project_id: '5f93c69ec1cf340017d9b33b',
      place: '',
      position:{
        lat: "223",
        lng: "223"
      },
    }
  },
  methods:{
    async transtoBase64() {
      const files = this.$refs.upload.uploadFiles;
      console.log(files);

      var reader = new FileReader();
      reader.readAsDataURL(files[0].raw);
      var imgsrc0 = "";
      var imgsrc1 = "";
      var params = {};
      reader.onload = async e => {
        imgsrc0 = e.target.result;
        console.log(imgsrc0);

        reader.readAsDataURL(files[1].raw);
        reader.onload = async e => {
          imgsrc1 = e.target.result;
          console.log(imgsrc1);
          params = this.$qs.stringify({
            img0: imgsrc0,
            img1: imgsrc1,
            lat: this.lat,
            lng: this.lng,
            place: this.place,
            project_id: this.project_id
          });
          var res = await this.$http.post("testForCreateAlbum", params, {
            // 设置请求头
            headers: {
              "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
            }
          });
          if (res) {
            console.log(res);
            console.log("成功接收");
          }
        };
      };
    },
    handleAvatarSuccess(res, file){
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    beforeAvatarUpload(file){
      const isJPG = file.type === 'image/jpeg'
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) this.$message.error('上传头像图片只能是 JPG 格式!')
      if (!isLt2M) this.$message.error('上传头像图片大小不能超过 2MB!')
      return isJPG && isLt2M;
    },
  }
}
</script>

<style>
#app{
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  height: 760px;
  padding-top: 7%;
}
.app_inner{
  display: inline;
  margin: 5px;
}
#hr1{
  margin-top: 6%;
}
#bottom{
  margin-top: -1.5%;
  width: 100%;
  height: 80px;
  border: none;
}
#album{
  height: 590px;
  margin-top: -6px;
  margin-bottom: -5px;
  padding: 15px;
  overflow: scroll;
  box-shadow: 0px 0px 5px inset;
}
i{
  width: 100px;
  height: 100px;
}
</style>

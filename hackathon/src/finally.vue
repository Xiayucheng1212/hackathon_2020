<template>
  <div id="app">
    <div class="app_inner">相簿名稱</div>
    <input id="locate_name_disabled" class="app_inner" readonly>
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
    <button id="bottom" @click="updateAlbum">Update</button>
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
      place: '早餐店*6',
      position:{
        lat: "3",
        lng: "3"
      },
    }
  },
  created(){
    this.getAlbumName()
    this.getImages()
  },
  methods:{
    async updateAlbum() {
      const files = this.$refs.upload.uploadFiles;
      console.log(files);

      var reader = new FileReader();
      var imgsrc0 = files[0].url;
      var imgsrc1 = files[1].url
      console.log(imgsrc0)
      var imgsrc2 = "";
      var params = {};
      reader.readAsDataURL(files[2].raw);
      reader.onload = async e => {
        imgsrc2 = e.target.result;
        console.log(imgsrc2);

        params = this.$qs.stringify({
          img0: imgsrc0,
          img1: imgsrc1,
          img2: imgsrc2,
          lat: "3",
          lng: "3",
          place: "早餐店*6",
          project_id: "5f93c69ec1cf340017d9b33b"
        });
        var res = await this.$http.post("updateAlbum", params, {
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
    async getImages(){
      var res = await this.$http.get('https://hereisanewapp.herokuapp.com/getAlbum?lat='+this.position.lat+"&lng="+this.position.lng+"&project_id="+this.project_id)
      console.log(res);
      for(let i=0;i<res.data.photos.length;i++){
        this.fileList.push({name:"img"+i, url:res.data.photos[i].path})
      }
    },
    async getAlbumName(){
      var res = await this.$http.get('https://hereisanewapp.herokuapp.com/getAlbum?lat='+this.position.lat+"&lng="+this.position.lng+"&project_id="+this.project_id)
      this.place = res.data.place
      document.getElementById('locate_name_disabled').placeholder = this.place
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

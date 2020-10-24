<template>
  <div id="app" v-loading="loading"
    :element-loading-text="loading_msg"
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <div id="top_bar">更新相簿</div>
    <div id="album_name">相簿名稱:</div>
    <input id="locate_name_disabled" v-model="place" readonly>
    <div id="add_new_photo">新增照片:</div>
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
    <button id="bottom" @click="updateAlbum">更新</button>
  </div>
</template>

<script>
export default {
  name: 'Finally',
  data(){
    return{
      formData: new FormData(),
      fileList:[],
      tagNameList: [],
      project_id: '5f94019792bf49001740ff1c',
      place: 'yoyo',
      position:{
        lat: "24.82",
        lng: "120.88"
      },
      loading: true,
      loading_msg: '',
    }
  },
  created(){
    this.loading_msg = "載入相簿中..."
    this.getAlbumName()
    this.getImages()
  },
  methods:{
    async updateAlbum() {
      this.loading_msg = "更新相簿中..."
      this.loading = true
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
          lat: this.position.lat,
          lng: this.position.lng,
          place: this.place,
          project_id: this.project_id
        });
        var res = await this.$http.post("updateAlbum", params, {
          // 设置请求头
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8"
          }
        });
        this.loading = false
        if (res) {
          console.log(res);
          console.log("成功接收");
          this.$message({
            message: '成功更新相簿',
            type: 'success'
          });
        }
        else{
          this.$message.error('更新失敗...');
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
      if(res){
        this.loading = false
      }
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
  font-family: 'Microsoft YaHei','Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  text-align: center;
  height: 812px;
}
#top_bar{
  padding: 5%;
  font-size: 30px;
  color: white;
  background-color: #6633cc;
}
#album_name{
  margin-top: 5px;
  margin-bottom: 3%;
  background-color: #E6E6FA;
}
#locate_name_disabled{
  margin-top: 15px;
  border-top: none;
  border-left: none;
  border-right: none;
  border-bottom-color: #c0c0c0;
  font-size: 25px;
  text-align: center;
  width: 80%;
}
#add_new_photo{
  margin-top: 5px;
  margin-bottom: 10px;
  background-color: #E6E6FA;
}
#album{
  height: 430px;
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
#bottom{
  margin-top: 2.3%;
  width: 250px;
  height: 50px;
  font-size: 23px;
  color: white;
  background-color: #6633cc;
  border: none;
}
</style>

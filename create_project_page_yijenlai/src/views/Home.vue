<template>
  <div>
    <div v-if="state==0">
      <div class="image_container">
        <img id="cover" src="https://tnimage.s3.hicloud.net.tw/photos/2019/10/07/1570443526-5d9b1106c7c9c.jpg"/>
        <div class="img_filter"></div>
        <h1>創建旅程</h1>
      </div>
      <div class="container">
        <!-- <form method="POST" id="form_project"> -->
          <p>旅程名稱:</p>
          <input name="project_name" v-model="project_name">
          <p>日期:</p>
          <input type="text" id="text-calendar" class="calendar" name="date" />
          <p>地點:</p>
          <select name="place" v-model="place">
            <option value="Keelung">基隆</option>
            <option value="NewTaipei">新北</option>
            <option value="Taipei">臺北</option>
            <option value="Yilan">宜蘭</option>
            <option value="Taoyuan">桃園</option>
            <option value="Hsinchu">新竹</option>
            <option value="Miaoli">苗栗</option>
            <option value="Taichung">臺中</option>
            <option value="Changhua">彰化</option>
            <option value="Nantou">南投</option>
            <option value="Yunlin">雲林</option>
            <option value="Chiayi">嘉義</option>
            <option value="Tainan">臺南</option>
            <option value="Kaohsiung">高雄</option>
            <option value="Pingtung">屏東</option>
            <option value="Taitung">臺東</option>
            <option value="Hualien">花蓮</option>
            <option value="Penghu">澎湖</option>
            <option value="Kinmen">金門</option>
            <option value="Lienchiang">連江</option>
          </select>
        <!-- </form> -->
        <button type="submit" @click="uploadData">創建 >></button>
      </div>
    </div>
    <div class="share" v-if='state==1'>
      <h1>創建成功</h1>
      <p>將旅程分享給你的夥伴</p>
      <div class="member_group">
        <img class="circle_wrapper" id="profile_img" :src=UserImg>
        <div class="circle_wrapper invite_wrapper" @click="shareTarget">
            <i class="fas fa-share fa-2x"></i>
        </div>
      </div>
      <a :href='url'>進入專案</a>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data(){
    return {
      UserImg: '../assets/logo.png',
      UserName: 'test',
      project_name: null,
      place: null,
      date: null,
      lineId: 'testtest',
      project_id : null,
      url: null,
      state: 0
    }
  },
  beforeCreate(){
    window.$( document ).ready(()=>{
      window.$('.calendar').pignoseCalendar({multiple: true,buttons:true});
    })
    // var liffID = '1655093786-Joa47Erb';
    // window.liff.init({
    // liffId: liffID
    // })
    // .then(()=> {
    //   console.log('LIFF init');

    //   if (!window.liff.isLoggedIn()) {
    //     window.liff.login();
    //   }
    //   else{
    //     window.liff.getProfile()
    //     .then((profile)=>{
    //      this.lineId = profile.userId;
    //       this.UserName = profile.displayName;
    //       this.UserImg = profile.pictureUrl;
    //     });
    //   }
    // });
  },
  methods:{
    async uploadData(){//上傳到server
      this.date = document.getElementsByName("date")[0].value;
      var res = await this.$http.post('createProject',{
        lineId:this.lineId,username:this.UserName,projectName:this.project_name,time:this.date,place:this.place
      })
      this.project_id = res.data.project_id;
      this.url = "https://liff.line.me/1655093786-Joa47Erb/project?projectId="+this.project_id;
      this.state = 1; 
    },
    shareTarget(){
      window.liff.shareTargetPicker([
    {"type": "flex",
    "altText": "Flex Message",
    "contents":{
      "type": "bubble",
      "hero": {
        "type": "image",
        "url": "https://tnimage.s3.hicloud.net.tw/photos/2019/10/07/1570443526-5d9b1106c7c9c.jpg",
        "size": "full",
        "aspectRatio": "20:13",
        "aspectMode": "cover",
        "action": {
          "type": "uri",
          "uri": this.url
        }
      },
      "body": {
        "type": "box",
        "layout": "vertical",
        "contents": [
          {
            "type": "text",
            "text": this.project_name,
            "weight": "bold",
            "size": "xl"
          },
          {
            "type": "box",
            "layout": "vertical",
            "margin": "lg",
            "spacing": "sm",
            "contents": [
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "邀請人",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": this.UserName,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "時間",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": this.date,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              },
              {
                "type": "box",
                "layout": "baseline",
                "contents": [
                  {
                    "type": "text",
                    "text": "地點",
                    "color": "#aaaaaa",
                    "size": "sm",
                    "flex": 2
                  },
                  {
                    "type": "text",
                    "text": this.place,
                    "wrap": true,
                    "color": "#666666",
                    "size": "sm",
                    "flex": 5
                  }
                ]
              }
            ]
          }
        ]
      },
      "footer": {
        "type": "box",
        "layout": "vertical",
        "spacing": "sm",
        "contents": [
          {
            "type": "button",
            "style": "link",
            "height": "sm",
            "action": {
              "type": "uri",
              "label": "加入",
              "uri": this.url
            }
          },
          {
            "type": "spacer",
            "size": "sm"
          }
        ],
        "flex": 0
      }
    }
    }]);
    }
  }
}
</script>

<style scoped>
.image_container{
    width: 100%;
    height: 60vw;
}
#cover, .img_filter{
  width: 100%;
  height: 60vw;
  position: absolute;
  top: 0;
  left: 0;
}
.img_filter{
  background-color: rgba(0,0,0,0.3);
}
.image_container h1{
  position: absolute;
  color: white;
  z-index: 3;
  top:18vw;
  left: 32vw;
  text-shadow: 1px 3px rgba(0, 0, 0, 0.52);
}
.container{
  margin: 10px 6%;
}
.container p{
    font-size: 5vw;
    margin: 2vw 0;
}
input,select{
    font-size: 5vw;
    width: 90%;
    border: 1px solid #555555;
}

select {
  width: 98%;
  -webkit-appearance: none;
  -moz-appearance: none;
  background: transparent;
  background-image: url("data:image/svg+xml;utf8,<svg fill='black' height='24' viewBox='0 0 24 24' width='24' xmlns='http://www.w3.org/2000/svg'><path d='M7 10l5 5 5-5z'/><path d='M0 0h24v24H0z' fill='none'/></svg>");
  background-repeat: no-repeat;
  background-position-x: 100%;
  background-position-y: 0.5rem;
  border-radius: 5px;
  margin-right: 2rem;
  padding: 0.4rem;
  padding-right: 2rem;
}
button{
  -webkit-appearance: none;
  width: 98%;
  height: 50px;
  border-radius: 10px;
  background-color:  #b399ff;
  text-align: center;
  cursor: pointer;
  color: white;
  margin-top: 5vw;
}
.share{
  display: flex;
  height: 90%;
  flex-direction: column;
  align-content: center;
  justify-content: center;
}
h1{
  text-align: center;
}
.share p{
  text-align: center;
}
.circle_wrapper{
    border-radius: 50%;
    width: 16vw;
    height: 16vw;
    margin-right: 1.5em;
}
.invite_wrapper{
    background-color: #2fabb7;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3vw;
}
.invite_wrapper:hover{
    cursor: pointer;
    background-color: #49c4d0;
}
.member_group{
    display: flex;
    flex-direction: row;
    align-items: center;
}
#profile_img{
    border: black 1px solid;
}
</style>

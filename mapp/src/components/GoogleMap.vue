<template>
<div>
    <!-- <div>
         <button class="bt" @click="addMarker">Add</button>
     </div> -->
    <vue-fab icon="receipt_long" mainBtnColor="#3599DB" @clickMainBtn="bill">
    </vue-fab>
    <div id="map" class="map">
        <gmap-map style="width: 375px; height: 812px;" :options="{minZoom: 8, maxZoom: 18}" :center="Mycoordinates" :zoom="12" ref="mapRef">
            <gmap-marker :position="{lat:Mapcoordinates.lat,lng:Mapcoordinates.lng}" :clickable="true" :draggable="false" :icon="markerOptions" label="Create!!" color="blue" @click="addMarker">
            </gmap-marker>
            <!-- v-if 的statement (check status  create if(成功) else 不顯示marker )-->
            <gmap-marker v-for="(m,index) in markers" :key="index" :label="m.label" :position="m.position" :clickable="true" :draggable="false" :icon="markerOptions" @click="getImagesRes">
            </gmap-marker>

        </gmap-map>
    </div>

</div>
</template>

<script>
import GmapCustomMarker from 'vue2-gmap-custom-marker'

//need project id
//need status 成功 or null
//need place Zoom到該區塊

//post project id
//post 經緯度、place

export default {
    name: "GoogleMap",
    data() {
        const mapMarker = require('@/assets/cutePeople_icon2.png');
        return {
            markerOptions: {
                url: mapMarker,
                scaledSize: {
                    width: 30,
                    height: 40,
                    f: 'px',
                    b: 'px',
                },
            },

            map: null,
            Mycoordinates: {
                lat: 0,
                lng: 0
            },

            markers: [{
                label: {
                    text: "我是白癡",
                    color: 'Indigo',
                    fontFamily: 'SexChinese',
                    fontSize: '14px',
                    fontWeight: "bolder"
                },
                position: {
                    lat: 24.78,
                    lng: 120.99
                }
            }, {
                label: {
                    text: "是在哈佛",
                    color: 'Indigo',
                    fontFamily: 'SexChinese',
                    fontSize: '14px',
                    fontWeight: "bolder"
                },
                position: {
                    lat: 24.7,
                    lng: 120.7
                }
            }],
        };
    },
    created() {
        // get user's coordinates from browser requset
        this.$getLocation({})
            .then(coordinates => {
                this.Mycoordinates = coordinates;
                console.log(coordinates.lat, coordinates.lng)
                //get city 的座標
            })
            .catch(error => alert(error));

        this.needMarker()
    },
    mounted() {
        //add the map to a data object
        this.$refs.mapRef.$mapPromise.then(map => this.map = map);
    },
    computed: {
        Mapcoordinates() {
            if (!this.map) {
                return {
                    lat: 0,
                    lng: 0
                };
            }

            return {
                lat: this.map.getCenter().lat(),
                lng: this.map.getCenter().lng()
            }
        },
    },
    methods: {
        async needMarker() {
            var res = await this.$http.get('getAllAlbums?project_id=5f94019792bf49001740ff1c');
            console.log(res)
            let leng = res.data.album.length;
            for (let i = 0; i < leng; i++) {
                const getMarkerAndAdd = {
                    lat: parseFloat(res.data.album[i].latlon.lat),
                    lng: parseFloat(res.data.album[i].latlon.lng)
                }
                this.markers.push({
                    position: getMarkerAndAdd,
                    label: {
                        text: res.data.album[i].place,
                        color: "#005757",
                        fontFamily: "SexChinese",
                        fontSize: "14px",
                        fontWeight: "bolder",
                    }
                })
            }
        },

        addMarker() {
            console.log("addNew")
            console.log(this.map.getCenter().lat(),
                this.map.getCenter().lng(), )
            if (true) {
                const marker = {
                    lat: this.map.getCenter().lat(),
                    lng: this.map.getCenter().lng(),
                };
                this.markers.push({
                    position: marker,
                    label: {
                        text: "詩意少",
                        color: "#005757",
                        fontFamily: "SexChinese",
                        fontSize: "14px",
                        fontWeight: "bolder",
                    }
                });
            }
        },
        getImagesRes() {
            console.log("getImages");
            console.log(this.markers[0].position.lat);
            console.log(this.markers[0].position.lng);
        },

        bill() {
            console.log('bill');
        },
    },
}
</script>

<style>
@font-face {
    font-family: "SexChinese";
    src: url('../fonts/cwTeXYen-zhonly.woff')format('woff'),
        url('../fonts/cwTeXYen-zhonly.ttf')format('truetype'),
        url('../fonts/cwTeXYen-zhonly.eot')format('embedded-opentype');
}

.fab-main-container {

    position: fixed;
    z-index: 5;
    margin-inline-end: 850px;
    bottom: 10%;
    overflow: initial;
    box-sizing: border-box;
}

.gm-style div div div div {
    margin-top: 3px;
    margin-bottom: -70px;
    text-shadow: 0.1em 4px 4px #CAFFFF;
    text-align: right;
}

.gm-style div div div {
    margin-top: -10px;
}

.bt {
    margin-left: -90%;
}
</style>

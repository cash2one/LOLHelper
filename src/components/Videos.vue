<template>
  <div class="videos">
    <div class="videos-list">
        <div class="videos-list-item" v-for="item in videoList" :key="item.game_id">
            <a :href="item.video_url">
                <img :src="item.image_url">
                <p>{{item.title}}</p>
                <p>
                    {{item.publication_date.slice(0,10)}}
                    <span>{{item.time_span | pv}}</span>
                </p>
            </a>
        </div>
    </div>
  </div>
</template>

<script>
import { getVideoSrc } from '../filters/index.js';
import { pv } from '../filters/index.js';
export default {
  created(){
      this.setTitle();
      this.getVideo();
  },
  computed:{
    videoList(){
        return this.$store.state.videoList;
    }
  },
  methods:{
      setTitle(){
          this.$store.commit("set_title","最新视频");
      },
      getVideo(){
          this.$store.dispatch("GET_VIDEO_LIST");
      }
  },
  filters:{
      pv
  }
}
</script>

<style lang="less" scoped>
    .videos{
        &-list{
            padding:0.8rem;
            overflow: hidden;
            box-sizing: border-box;
            &-item{
                float: left;
                width: 47%;
                height: 170px;
                padding:0.5rem;
                margin-bottom: 0.5rem;
                box-sizing: border-box;
                background-color: white;
                &:nth-child(2n+1){
                    margin-right: 3%;
                }
                &:nth-child(2n){
                    margin-left: 3%;
                }
                a{
                    width: 100%;
                    color: black;
                    text-decoration: none;
                    img{
                        width: 90%;
                    }
                    p{
                        font-size: 12px;
                        color: #666;
                    }
                }
            }
        }
    }
</style>

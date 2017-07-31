<template>
  <div class="news">
       <div class="news-banner">
        <div v-for="news in bannerNews" :key="news.article_url" class="news-banner-wrap">
            <a :href="news.article_url">
                <img :src="news.image_url_big" class="news-banner-wrap-item" alt="">
            </a>
        </div>
      </div>
      <div class="news-list">
        <div class="news-list-item" v-for="item in newstNews" :key="item.article_url">
            <a :href="item.article_url">
                <img :src="item.image_url_small" alt="" class="news-list-item-img">
                <div class="news-list-item-content">
                    <p class="news-list-item-content-title">{{item.title}}</p>
                    <p class="news-list-item-content-info">{{item.summary}}</p>
                    <p class="news-list-item-content-detail">
                        {{item.publication_date.split(" ")[0]}}
                        <span>{{item.pv | pv}}阅</span>
                    </p>
                </div>
            </a>
        </div>
      </div> 
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { pv } from '../filters/index.js';
// import { bannerNews , newstNews } from '../data';
export default {
//   data(){
//     return{
//         bannerNews,
//         newstNews
//     }
//   },
  created(){
      this.setTitle();
      this.getNews();
  },
  computed:{
    ...mapState(["bannerNews","newstNews"])
  },
  methods:{
      setTitle(){
          this.$store.commit("set_title","资讯");
      },
      getNews(){
        this.$store.dispatch("GET_BANNER_NEWS");
        this.$store.dispatch("GET_NEWST_NEWS" , {p : 0});
        this.$store.dispatch("GET_NEWST_NEWS" , {p : 1});
      },
  },
  filters:{
      pv
  }
}
</script>

<style lang="less" scoped>
    .news{
        width:100%;
        overflow: hidden;
        &-banner{
            width:500%;
            height: 10rem;
            transform: translate(0,0);
            animation: loop 10s linear infinite;
            &-wrap{
                display: inline-block;
                width:20%;
                height:100%;
                a{
                    width:100%;
                    height: 100%;
                    .news-banner-wrap-item{
                        width:100%;
                        height: 100%;
                    }
                }
            }
        }
        &-list{
            padding: 0.5rem;
            &-item{
                position: relative;
                margin-bottom: 0.5rem;
                padding:0.5rem 0;
                background-color: white;
                box-sizing: border-box;
                &-img{
                    position: relative;
                    top:50%;
                    margin-top: -2rem;
                    width:5rem;
                    height:4rem;
                }
                &-content{
                    padding-left: 0.5rem;
                    display: inline-block;
                    width:calc(~"100% - 5rem - 2 * 0.5rem");
                    &-title{
                        font-size: 14px;
                        color:black;
                        margin-bottom: 0.5rem;
                    }
                    &-info{
                        margin-top: 0;
                        margin-bottom: 0.5rem;
                        font-size: 12px;
                        color:#666;
                    }
                    &-detail{
                        margin-top: 0;
                        font-size: 12px;
                        color: #666;
                        span{
                            color: #A35D26;
                        }
                    }
                }
            }
        }
    }

    @keyframes loop{
        0%{transform:translate(0,0);}
		15%{transform:translate(0,0);}

		20%{transform:translate(-20%,0);}
		35%{transform:translate(-20%,0);}

		40%{transform:translate(-40%,0);}
		55%{transform:translate(-40%,0);}

		60%{transform:translate(-60%,0);}
		75%{transform:translate(-60%,0);}

		80%{transform:translate(-80%,0);}
		95%{transform:translate(-80%,0);}

		100%{transform:translate(0,0);}
    }
</style>

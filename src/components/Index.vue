<template>
  <div class="index">
    <div class="index-top">
        <span class="index-top-back" @click="goback">&larr;</span>
        <span class="index-top-title">{{title}}</span>
    </div>
    <div class="index-content" id="index-content">
        <transition>
            <router-view></router-view>
        </transition>
    </div>
    <div class="index-bottom">
        <ul class="index-bottom-list">
            <li t="0" name="news" class="index-bottom-list-item" @click="handleChange"><img src="../../static/img/news-active.png"><a :class=" listArr[0] ? 'active' : ''">咨询</a></li>
            <li t="1" name="players" class="index-bottom-list-item" @click="handleChange"><img src="../../static/img/players.png"><a :class=" listArr[1] ? 'active' : ''">玩家</a></li>
            <li t="2" name="heros" class="index-bottom-list-item" @click="handleChange"><img src="../../static/img/heros.png"><a :class=" listArr[2] ? 'active' : ''">英雄</a></li>
            <li t="3" name="videos" class="index-bottom-list-item" @click="handleChange"><img src="../../static/img/videos.png"><a :class=" listArr[3] ? 'active' : ''">视频</a></li>
        </ul>
    </div>
  </div>
</template>

<script>
export default {
  name : "index",
  data(){
    return{
        listArr : [1,0,0,0]
    }
  },
  computed:{
    title(){
        return this.$store.state.title;
    }
  },
  methods:{
      //后退到上一步操作
      goback(){
          this.$router.go("-1");
      },
      //根据点击的按钮所具有的属性改变路由
      handleChange(e){
            var val = e.currentTarget.getAttribute("name");
            if(val != this.$route.name){
                var t = e.currentTarget.getAttribute("t");
                for(let i=0; i<4;i++){
                    if(this.listArr[i] == 1){
                        this.listArr[i] = 0;
                    }
                }
                this.listArr[parseInt(t)] = 1;
                switch(t){
                    case "0":
                        e.currentTarget.firstChild.setAttribute("src","../static/img/news-active.png");
                        e.currentTarget.parentNode.children[1].firstChild.setAttribute("src","../static/img/players.png");
                        e.currentTarget.parentNode.children[2].firstChild.setAttribute("src","../static/img/heros.png");
                        e.currentTarget.parentNode.children[3].firstChild.setAttribute("src","../static/img/videos.png");
                        break;
                    case "1":
                        e.currentTarget.firstChild.setAttribute("src","../static/img/players-active.png");
                        e.currentTarget.parentNode.children[0].firstChild.setAttribute("src","../static/img/news.png");
                        e.currentTarget.parentNode.children[2].firstChild.setAttribute("src","../static/img/heros.png");
                        e.currentTarget.parentNode.children[3].firstChild.setAttribute("src","../static/img/videos.png");
                        break;
                    case "2":
                        e.currentTarget.firstChild.setAttribute("src","../static/img/heros-active.png");
                        e.currentTarget.parentNode.children[1].firstChild.setAttribute("src","../static/img/players.png");
                        e.currentTarget.parentNode.children[0].firstChild.setAttribute("src","../static/img/news.png");
                        e.currentTarget.parentNode.children[3].firstChild.setAttribute("src","../static/img/videos.png");
                        break;
                    default:
                        e.currentTarget.firstChild.setAttribute("src","../static/img/videos-active.png");
                        e.currentTarget.parentNode.children[1].firstChild.setAttribute("src","../static/img/players.png");
                        e.currentTarget.parentNode.children[2].firstChild.setAttribute("src","../static/img/heros.png");
                        e.currentTarget.parentNode.children[0].firstChild.setAttribute("src","../static/img/news.png");
                        break;
                }
                this.$router.push({name : val});
            }
      }
  }
}
</script>

<style lang="less" scoped>
    html{
        font-size: 62.5%;
    }
    .index{
        width: 100%;
        height: 100%;
        &-top{
            position: fixed;
            top:0;
            width: 100%;
            height: 3rem;
            background-color: #03A9F4;
            text-align: center;
            z-index: 2;
            &-back{
                position: absolute;
                top:0;
                left:0;
                display:block;
                color:white;
                width:2rem;
                height: 3rem;
                line-height: 3rem;
                font-size: 22px;
                padding-left: 1rem;
            }
            &-title{
                display: block;
                font-size: 18px;
                color: white;
                height: 3rem;
                line-height: 3rem;
            }       
        }
        &-content{
            position: relative;
            width:100%;
            top:3rem;
            margin-bottom: 3rem;
            background-color: #F1F1F1;
        }
        &-bottom{
            position: fixed;
            bottom: 0;
            width:100%;
            height:3rem;
            border-top: 1px solid #EDEDED;
            background-color: white;
            &-list{
                width:100%;
                list-style: none;
                margin:0;
                padding:0;
                overflow: hidden;
                &-item{
                    width: 25%;
                    height:3rem;
                    text-align: center;
                    float: left;
                    z-index: 2;
                    img{
                        width: 1.5rem;
                    }
                    a{  
                        display: block;
                        font-size: 12px;
                        color:#999;
                    }
                }
            }
        }
    }
    .active{
        color: #7E57C2 !important; 
    }
</style>

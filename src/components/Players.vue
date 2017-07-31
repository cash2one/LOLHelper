<template>
    <div class="players">
        <div class="players-search">
            <input type="text" class="players-search-input" placeholder="召唤师姓名" v-model="username">
            <button class="players-search-button" @click="playersClick">搜索</button>
        </div>
        <div class="players-empty" v-if="playersSearchResult.length == 0">
            <img src="../../static/img/empty.png">
        </div>
        <div class="players-list" v-else>
            <div class="players-list-item" v-for="item in playersSearchResult" :key="item.name">
                <router-link :to="{name : 'playerDetail' , params : {qquin : item.qquin , vaid : item.area_id , level : item.level , iconid : item.icon_id , username : item.name}}">
                    <div class="players-list-item-icon">
                        <img :src="TGPIcon + item.icon_id + '.png'">
                    </div>
                    <div class="players-list-item-info">
                        <p class="players-list-item-info-name">{{item.name}}</p>
                        <p class="players-list-item-info-detail">
                            {{item.area_id | getArea}} 
                            <span> 等级:{{item.level}}</span>
                        </p>
                    </div>
                </router-link>
            </div>   
        </div>
    </div>
</template>

<script>
import { mapState , mapActions , mapMutations , mapGetters } from 'vuex';
import { getArea } from '../filters/index.js';

const TGPIcon = "http://cdn.tgp.qq.com/lol/images/resources/usericon/";

export default {
  data(){
      return{
          username:"",  //召唤师姓名
          TGPIcon:TGPIcon,   //召唤师TGP头像
          dialog:false  //是否显示错误提示框
      }
  },
  created(){
    this.setTitle();
  },
  computed:{
    playersSearchResult(){
        return this.$store.state.playersSearchResult;
    }
  },
  methods:{
    playersClick(){
        if(this.username === ""){
            this.dialog = true;
            return;
        }
        this.$store.dispatch("get_players_search",{
            username : encodeURIComponent(this.username)
        });

    },
    setTitle(){
        this.$store.commit("set_title","搜索召唤师");
    }
  },
  filters:{
      getArea
  }
}
</script>

<style lang="less" scoped>
    html{
        font-size: 62.5%;
    }
    .players{
        background-color: white;
        &-search{
            box-sizing: border-box;
            padding:0.3rem;
            background-color: #03A9F4;
            &-input{
                border: 0;
                outline: none;
                width: 70%;
                height: 2rem;
                box-sizing: border-box;
                font-size: 0.8rem;
                text-indent: 0.8rem;
            }
            &-button{
                float: right;
                border: 1px solid #50BFF0;
                outline: none;
                background-color: #03A9F4;
                color: white;
                width:30%;
                height: 2rem;
                border-radius: 2px;
            }
        }
        &-empty{
            width: 6rem;
            margin: 0 auto;
            margin-top: 6rem;
            img{
                width:100%;
            }
        }
        &-list{
            width:100%;
            background-color: white;
            &-item{
                padding:0.5rem;
                border-bottom: 1px solid #E6E6E6;
                &-icon{
                    float: left;
                    img{
                        width:4rem;
                        border-radius: 50%;
                    }
                }
                &-info{
                   display: inline-block;
                   padding-left: 1.5rem;
                   &-name{
                       font-size: 14px;
                       color:red;
                   }
                   &-detail{
                       font-size: 14px;
                       color: red;
                       margin-bottom: 0;
                       span{
                           color: black;
                       }
                   }
                }
            }
        }
    }
</style>

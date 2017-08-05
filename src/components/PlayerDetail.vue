<template>
  <div class="playerDetail">
    <div class="playerDetail-header">
        <div class="playerDetail-header-icon">
            <img :src="TGPIcon + playerDetail.icon + '.png'" v-if="playerDetail.length !== 0">
        </div>
        <div class="playerDetail-header-info">
            <p>{{ playerDetail.level }}级</p>
            <p>{{ playerDetail.area_id | getArea }} | {{ tierQueue }}</p>
            <p>战斗力:{{ playerDetail.power_value }} | 赞:{{ playerDetail.praise_num }}</p>
        </div>
    </div>
    <div class="playerDetail-mvp">
        <div class="playerDetail-mvp-item">
            <img src="../../static/img/3.png">
            <p>三杀:{{ tripleKills }}</p>
        </div>
        <div class="playerDetail-mvp-item">
            <img src="../../static/img/4.png">
            <p>四杀:{{ quadraKills }}</p>
        </div>
        <div class="playerDetail-mvp-item">
            <img src="../../static/img/5.png">
            <p>五杀:{{ pentaKills }}</p>
        </div>
        <div class="playerDetail-mvp-item">
            <img src="../../static/img/total.png">
            <p>总击杀:{{ killsTotal }}</p>
        </div>
        <div class="playerDetail-mvp-item">
            <img src="../../static/img/mvpicon.png">
            <p>MVP:{{ totalMvp }}</p>
        </div>
        <div class="playerDetail-mvp-item">
            <img src="../../static/img/godlike.png">
            <p>超神:{{ godlikeNum }}</p>
        </div>
    </div>
    <div class="playerDetail-combats">
        <ul v-if="combatList.length !== 0">
            <li v-for="item in combatList" :key="item.battle_map" class="playerDetail-combats-item">
                <router-link :to="{name : 'combatDetail' , params : {gameid : item.game_id}}">
                    <img :src="pics + item.champion_id + '.png'" class="playerDetail-combats-item-icon">
                    <div class="playerDetail-combats-item-info">
                        <p class="playerDetail-combats-item-info-result" :class="item.win == '1'?'win':'lose'">
                            {{ item.win == "1" ? '胜利' : '失败'}}
                        </p>
                        <p class="playerDetail-combats-item-info-type">{{item.game_type | getGameType}}</p>
                    </div>
                    <div class="playerDetail-combats-item-arrow">
                        <img src="../../static/img/arrow.png">
                    </div>
                </router-link>
            </li>
        </ul>
        <div v-else class="playerDetail-combatsEmpty">
            <img src="../../static/img/empty.png">
        </div>
    </div>
  </div>
</template>

<script>
import { mapState ,mapMutations } from 'vuex';
import { getArea , getGameType } from '../filters/index.js';
const TGPIcon = 'http://cdn.tgp.qq.com/lol/images/resources/usericon/';
const pics = "http://cdn.tgp.qq.com/pallas/images/champions_id/";

export default {
  data(){
    return{
        TGPIcon:TGPIcon,
        iconid:"",
        pics:pics,
    }
  },
  created(){
    this.iconid = this.$route.params.iconid;
    this.setTitle();
    this.getDetail();
    this.getCombatsList();
    // this.empty_combat_list();
  },
  computed:{
    ...mapState(["playerDetail","combatList","tierQueue","tripleKills","quadraKills","pentaKills","godlikeNum","killsTotal","totalMvp"])
  },
  methods:{
    setTitle(){
        return this.$store.commit("set_title",this.$route.params.username);
    },
    getDetail(){
        let params = {
            qquin : this.$route.params.qquin,
            vaid : this.$route.params.vaid
        };
        this.$store.dispatch("GET_PLAYER_FIGHT_DETAIL",params);
        this.$store.dispatch("GET_PLAYER_BASE_DETAIL",params);
    },
    getCombatsList(){
        let params = {
            qquin : this.$route.params.qquin,
            vaid : this.$route.params.vaid,
        };
        this.$store.dispatch("GET_COMBAT_LIST",params);
    },
    // ...mapMutations(["empty_combat_list"])
  },
  filters:{
      getArea,
      getGameType
  }
}
</script>

<style lang="less" scoped>
    html{
        font-size: 62.5%;
    }
    .playerDetail{
        background-color: white;
        &-header{
            width:100%;
            height: 10rem;
            background-image: url("../../static/img/playerdetailbg.png");
            &-icon{
                padding-top: 1rem;
                text-align: center;
                height:3.5rem;
                img{
                    width:3.5rem;
                    border-radius: 50%;
                }
            }
            &-info{
                width:100%;
                text-align: center;
                p{
                    margin-top: 0.5rem;
                    margin-bottom: 0;
                    font-size: 13px;
                    color:white;
                }
            }
        }
        &-mvp{
             display: flex;
            flex-direction: row;
            flex-wrap: wrap;
            &-item{
                width: calc(~"100% / 3");
                text-align: center;
                padding: 10px 0;
                p{  
                    text-align: center;
                    font-size: 12px;
                    margin:0;
                }
            }
        }
        &-combats{
            width:100%;
            ul{ 
                width:100%;
                list-style: none;
                margin:0;
                padding:0;
                .playerDetail-combats-item{
                    width:100%;
                    padding:0.5rem;
                    border-bottom: 1px solid #E6E6E6;
                    box-sizing: border-box;
                    a{
                        text-decoration: none;
                        display: block;
                        width:100%;
                    }
                    &-icon{
                        width:3rem;
                        border-radius: 50%;
                    }
                    &-info{
                        display: inline-block;
                        margin-left: 1rem;
                        &-result{
                            font-size: 14px;
                            margin:0;
                        }
                        &-type{
                            margin-top: 0.8rem;
                            margin-bottom: 0;
                            font-size: 14px;
                            color: #666;
                        }
                    }
                    &-arrow{
                        float: right;
                        margin-top: 1rem;
                        margin-right: 1rem;
                        img{
                            width:1rem;
                        }
                    }
                }
            }
        }
        &-combatsEmpty{
            margin-top: 2rem;
            text-align: center;
            img{
                width: 6rem;
            }
        }
    }
    .win{
        color:#A9DAFF;
    }
    .lose{
        color: red;
    }
</style>

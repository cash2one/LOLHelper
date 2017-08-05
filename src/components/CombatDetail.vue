<template>
  <div class="combatDetail">
    <div class="combatDetail-info">
        <p>开始时间:{{combatDetail.start_time.split(" ")[1].slice(0,5)}}</p>
        <p>总时长:{{Math.ceil(combatDetail.duration / 60)}}分钟</p>
        <p>模式:{{combatDetail.game_type | getGameType}}</p>
    </div>
    <div class="combatDetail-players">
        <div class="combatDetail-players-win">
            <div class="combatDetail-players-win-header">
                <div class="combatDetail-players-win-header-label">胜利方</div>
                <div class="combatDetail-players-win-header-pic">
                    <img src="../../static/img/kill.png" alt="">
                    <img src="../../static/img/death.png" alt="">
                    <img src="../../static/img/sup.png" alt="">
                </div>
            </div>
            <div class="combatDetail-players-win-list">
                <div class="combatDetail-players-win-list-item" v-for="item in win" :key="item.qquin">
                    <router-link :to="{name : 'herosDetail' , params : {id : item.champion_id}}">
                        <div class="item-icon">
                            <img :src="pics + item.champion_id + '.png'" alt="">
                            <p class="item-level">Lv{{item.level}}</p>
                        </div>
                        <div class="item-equip">
                            <p class="item-name">{{item.name}}</p>
                            <img :src="equips + item.item0 + '.png'">
                            <img :src="equips + item.item1 + '.png'">
                            <img :src="equips + item.item2 + '.png'">
                            <img :src="equips + item.item3 + '.png'">
                            <img :src="equips + item.item4 + '.png'">
                            <img :src="equips + item.item5 + '.png'">
                        </div>
                        <div class="item-kda">
                            {{item.champions_killed}} / {{item.num_deaths}} / {{item.assists}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="combatDetail-players-lose">
            <div class="combatDetail-players-lose-header">
                <div class="combatDetail-players-lose-header-label ">失败方</div>
                <div class="combatDetail-players-lose-header-pic">
                    <img src="../../static/img/kill2.png" alt="">
                    <img src="../../static/img/death2.png" alt="">
                    <img src="../../static/img/sup2.png" alt="">
                </div>
            </div>
            <div class="combatDetail-players-lose-list">
                <div class="combatDetail-players-lose-list-item" v-for="item in lose" :key="item.qquin">
                    <router-link :to="{name : 'herosDetail' , params : {id : item.champion_id}}">
                        <div class="item-icon">
                            <img :src="pics + item.champion_id + '.png'" alt="">
                            <p class="item-level">Lv{{item.level}}</p>
                        </div>
                        <div class="item-equip">
                            <p class="item-name">{{item.name}}</p>
                            <img :src="equips + item.item0 + '.png'">
                            <img :src="equips + item.item1 + '.png'">
                            <img :src="equips + item.item2 + '.png'">
                            <img :src="equips + item.item3 + '.png'">
                            <img :src="equips + item.item4 + '.png'">
                            <img :src="equips + item.item5 + '.png'">
                        </div>
                        <div class="item-kda">
                            {{item.champions_killed}} / {{item.num_deaths}} / {{item.assists}}
                        </div>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex';
import { getGameType } from '../filters/index.js';
const pics = 'http://cdn.tgp.qq.com/pallas/images/champions_id/';
const equips = 'http://ddragon.leagueoflegends.com/cdn/6.21.1/img/item/';

export default {
  data(){
    return{
        pics,
        equips
    }
  },
  created(){
      this.setTitle();
      this.getDetail();
  },
  computed:{
    combatDetail(){
        return this.$store.state.combatDetail;
    },
    ...mapGetters(["win","lose"]),
  },
  methods:{
      setTitle(){
          this.$store.commit("set_title","对战详情");
      },
      getDetail(){
          let params = {
              qquin : this.$route.params["qquin"],
              vaid : this.$route.params["vaid"],
              gameid : this.$route.params["gameid"]
          };
          this.$store.dispatch("GET_COMBAT_DETAIL",params);
      }
  },
  filters:{
      getGameType
  }
}
</script>

<style lang="less" scoped>
    html{
        font-size: 62.5%;
    }
    .combatDetail{
        width:100%;
        &-info{
            padding:0.5rem 0.2rem;
            background-color: white;
            overflow: hidden;
            box-sizing: border-box;
            p{
                float: left;
                font-size: 14px;
                margin:0;
                width:calc(~"100% / 3");
                text-align: center;
            }
        }
        &-players{
            &-win{
                &-header{
                    padding:0.2rem 0.5rem;
                    border-bottom: 1px solid #E6E6E6;
                    overflow: hidden;
                    &-label{
                        float: left;
                        padding:0.5rem;
                        color:white;
                        background-color: #03A9F4;
                        box-sizing: border-box;
                        border-radius: 2px;
                    }
                    &-pic{
                        float:right;
                        padding:0.5rem;
                        img{
                            margin-right: 0.5rem;
                        }
                    }
                }
                &-list{
                    // background-color: white;
                    &-item{
                        overflow: hidden;
                        padding:0.5rem;
                        border-bottom: 1px solid #E6E6E6;
                        a{
                            color:black;
                        }
                        .item-icon{
                            float: left;
                            border: 1px solid #88B37A;
                            img{
                                width:3rem;
                            }
                            p{
                                font-size: 14px;
                                margin: 0.2rem 0;
                                text-align: center;
                            }
                        }
                        .item-equip{
                            float: left;
                            margin-left: 0.5rem;
                            .item-name{
                               margin-left: 0.5rem;
                               font-size: 1rem;
                            }
                            img{
                                float: left;
                                width:1.2rem;
                                margin-left: 0.5rem;
                            }
                        }
                        .item-kda{
                            float: right;
                            position: relative;
                            font-size: 14px;
                            right:0.2rem;
                            bottom:-3.2rem;
                        }
                    }
                }
            }
             &-lose{
                &-header{
                    padding:0.2rem 0.5rem;
                    border-bottom: 1px solid #E6E6E6;
                    overflow: hidden;
                    &-label{
                        float: left;
                        padding:0.5rem;
                        color:white;
                        background-color: #FF3E3E;
                        box-sizing: border-box;
                        border-radius: 2px;
                    }
                    &-pic{
                        float:right;
                        padding:0.5rem;
                        img{
                            margin-right: 0.5rem;
                        }
                    }
                }
                &-list{
                    // background-color: white;
                    &-item{
                        overflow: hidden;
                        padding:0.5rem;
                        border-bottom: 1px solid #E6E6E6;
                        a{
                            color: black;
                        }
                        .item-icon{
                            float: left;
                            border: 1px solid #88B37A;
                            img{
                                width:3rem;
                            }
                            p{
                                font-size: 14px;
                                margin: 0.2rem 0;
                                text-align: center;
                            }
                        }
                        .item-equip{
                            float: left;
                            margin-left: 0.5rem;
                            .item-name{
                               margin-left: 0.5rem;
                               font-size: 1rem;
                            }
                            img{
                                float: left;
                                width:1.2rem;
                                margin-left: 0.5rem;
                            }
                        }
                        .item-kda{
                            float: right;
                            position: relative;
                            font-size: 14px;
                            right:0.2rem;
                            bottom:-3.2rem;
                        }
                    }
                }
            }
        }
    }
</style>

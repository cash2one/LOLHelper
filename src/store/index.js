import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const TOKEN = {
    "DAIWAN-API-TOKEN": "B0681-094A4-9A414-A524B"
};
const VIDEOTOKEN = {
    "DAIWAN-API-TOKEN":"6656F-6D566-5BFB4-FF645"
};

//开发模式下手动设置为true，生产环境下手动设置为false
const DEBUG_MODE = false;   
const PREFIX = DEBUG_MODE ? "/api" : "http://lijiawei.com.cn:3333";

const API = {
    playersSearch : `${PREFIX}/UserArea?keyword=`,
    playExtInfo: `${PREFIX}/UserHonor?qquin=`,
    playerDetail: `${PREFIX}/UserHotInfo?qquin=`,
    getTierQueue: `${PREFIX}/GetTierQueue?tier=`,
    combatList: `${PREFIX}/CombatList?qquin=`,
    combatDetail : `${PREFIX}/CombatDetail?qquin=`,
    herosAll : `${PREFIX}/Champion`,
    herosFree : `${PREFIX}/Free`,
    heroDetail : `${PREFIX}/HeroDetail?championid=`,
    videoList : `${PREFIX}/VideoList`,
    bannerNews:`${PREFIX}/BannerNews`,
    newstNews:`${PREFIX}/NewstNews?p=`
};

const store = new Vuex.Store({
    state:{
        playersSearchResult:[],
        title : "",
        tripleKills:0,
        quadraKills:0,
        pentaKills:0,
        godlikeNum:0,
        killsTotal:0,
        totalMvp:0,
        playerDetail:[],
        tierQueue:[],
        combatList: [],
        combatDetail:null,
        herosAll:[],
        herosFree:[],
        heroDetail:null,
        videoList:[],
        bannerNews:[],
        newstNews:[]
    },
    actions:{
        //搜索召唤师
        GET_PLAYERS_SEARCH(context , object){
            axios.get(API.playersSearch + object.username).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_players_search" , res.data.data);
                }
            })
            .catch(function(err){
                console.log(err);
            });
        },
        GET_PLAYER_FIGHT_DETAIL(context , object){
            let qquin = object.qquin;
            let vaid = object.vaid;

            axios.get(API.playExtInfo + qquin + '&areaid=' + vaid).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_player_fight_detail",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_PLAYER_BASE_DETAIL(context , object){
            let qquin = object.qquin;
            let vaid = object.vaid;

            axios.get(API.playerDetail + qquin + '&areaid=' + vaid).then(function(res){
                if(res.data.code == 0){
                    var data1 = res.data.data;
                    context.commit("get_player_base_detail",{data1 , data1});
                    // axios.get(API.getTierQueue + data1.tier + "&queue=" + data1.queue , {
                    //     headers:TOKEN
                    // }).then(function(res){
                    //     if(res.data.code == 0){
                    //         var data2 = res.data.data[0].return;
                    //         context.commit("get_player_base_detail",{data1 , data2});
                    //     }
                    // })
                }
            }).catch(function(err){
                 console.log(err);
              });
        },
        GET_COMBAT_LIST(context, object) {
            axios.get(API.combatList + object.qquin + '&areaid=' + object.vaid).then((res) => {
                if (res.data.code == 0) {
                    context.commit('get_combat_list', res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_COMBAT_DETAIL(context , object){
            axios.get(API.combatDetail + object.qquin + "&areaid=" + object.vaid + "&gameid=" + object.gameid).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_combat_detail",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_HEROS_ALL(context){
            axios.get(API.herosAll).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_heros_all",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_HEROS_FREE(context){
            axios.get(API.herosFree).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_heros_free",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_HERO_DETAIL(context , object){
            axios.get(API.heroDetail + object.id).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_hero_detail",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_VIDEO_LIST(context , object){
            axios.get(API.videoList).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_video_list",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_BANNER_NEWS(context , object){
            axios.get(API.bannerNews).then(function(res){
                    if(res.statusTxt = "OK"){
                        var obj = res.data.data;
                        var arr = [];
                        for(var item in obj){
                            var t = {
                                article_id : obj[item][1],
                                image_url_big : obj[item][2]
                            };
                            arr.push(t);
                        }
                        context.commit("get_banner_news",arr);
                    }
                }).catch(function(err){
                    console.log(err);
                });
        },
        GET_NEWST_NEWS(context, object) {
            var p = object.p;
            axios.get(API.newstNews + p + '&plat=ios&version=33').then((res) => {
                if (res.statusText == "OK") {
                    context.commit("get_newst_news",res.data.data);
                }
            })
        },
    },
    mutations:{
        get_players_search(state , data){
            state.playersSearchResult = data;
        },
        set_title(state , data){
            state.title = data;
        },
        get_player_fight_detail(state , data){
            state.tripleKills = data[1].triple_kills;
            state.quadraKills = data[1].quadra_kills;
            state.pentaKills = data[1].penta_kills;
            state.godlikeNum = data[1].god_like_num;
            state.killsTotal = data[1].kills_total;
            state.totalMvp =  data[0].total_match_mvps + data[0].total_rank_mvps;
        },
        get_player_base_detail(state , data){
            state.playerDetail = data.data1;
            state.tierQueue = data.data2;
        },
        get_combat_list(state, data) {
            state.combatList = data;
        },
        empty_combat_list(state){
            state.combatList = [];
        },
        get_combat_detail(state , data){
            state.combatDetail = data;
        },
        get_heros_all(state , data){
            var arr = [];
            for(var item in data){
                arr.push(data[item]);
            }
            state.herosAll = arr;
        },
        get_heros_free(state , data){
            var arr = [];
            for(var item in data){
                arr.push(data[item]);
            }
            state.herosFree = arr;
        },
        get_hero_detail(state , data){
            state.heroDetail = data;
        },
        get_video_list(state , data){
            state.videoList = data;
        },
        get_banner_news(state , data){
            state.bannerNews = data.slice(0,5);
        },
        get_newst_news(state , data){
            state.newstNews = state.newstNews.concat(data);
        },
        empty_heroDetail(state){
            state.heroDetail = [];
        }
    },
    getters:{
        win(state){
            if(!state.combatDetail){
                return;
            }
            return state.combatDetail.gamer_records.slice(0,5);
        },
        lose(state){
            if(!state.combatDetail){
                return;
            }
            return state.combatDetail.gamer_records.slice(-5);
        },
        skins(state){
            if(!state.heroDetail){
                return;
            }

            let skins = [];
            for(let i=0; i<state.heroDetail.skins.length; i++){
                let obj = {
                    name : state.heroDetail.skins[i].name,
                    skinUrl : `http://cdn.tgp.qq.com/pallas/images/skins/original/${state.heroDetail.key}-${state.heroDetail.skins[i].id}.jpg`,
                    videoUrl : state.heroDetail.skins[i].displayUrl
                };

                skins.push(obj);
            }
            return skins;
        },
        skills(state){
            if(!state.heroDetail){
                console.log(12);
                return;
            }
            let skills = [
                {
                    name : state.heroDetail.passive.name,
                    skillUrl : `http://ossweb-img.qq.com/images/lol/img/passive/${state.heroDetail.passive.image.full}`,
                    description : state.heroDetail.passive.description
                }
            ];
            for(let i=0; i<state.heroDetail.skins.length; i++){
                let obj = {
                    name : state.heroDetail.spells[i].name,
                    skillUrl : `http://ossweb-img.qq.com/images/lol/img/spell/${state.heroDetail.spells[i].image.full}`,
                    description : state.heroDetail.spells[i].tooltip
                }
                skills.push(obj);
            }
            console.log(skills);
            return skills;
        }
    }
});

export default store;
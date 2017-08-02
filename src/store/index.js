import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const TOKEN = {
    "DAIWAN-API-TOKEN": "15110-57E6F-5575D-FA06A"
};
const VIDEOTOKEN = {
    "DAIWAN-API-TOKEN":"F20EE-024EE-505D0-40230"
};

//开发模式下手动设置为true，生产环境下手动设置为false
const DEBUG_MODE = false;   
const PREFIX = DEBUG_MODE ? "/api" : "http://lolapi.games-cube.com";
const PREFIX_2 = DEBUG_MODE ? "/videoApi" : "http://infoapi.games-cube.com";
const PREFIX_3 = DEBUG_MODE ? "/newsApi" : "http://lijiawei.com.cn:3333";

const API = {
    playersSearch : `${PREFIX}/UserArea?keyword=`,
    playExtInfo: `${PREFIX}/UserExtInfo?qquin=`,
    playerDetail: `${PREFIX}/UserHotInfo?qquin=`,
    getTierQueue: `${PREFIX}/GetTierQueue?tier=`,
    combatList: `${PREFIX}/CombatList?qquin=`,
    combatDetail : `${PREFIX}/GameDetail?qquin=`,
    herosAll : `${PREFIX}/champion`,
    herosFree : `${PREFIX}/Free`,
    heroDetail : `${PREFIX}/GetChampionDetail?champion_id=`,
    videoList : `${PREFIX_2}/GetNewstVideos`,
    bannerNews:`${PREFIX_3}/BannerNews`,
    newstNews:`${PREFIX_3}/NewstNews?p=`
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
        get_players_search(context , object){
            axios.get(API.playersSearch + object.username , {
                headers:TOKEN
            }).then(function(res){
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

            axios.get(API.playExtInfo + qquin + '&vaid=' + vaid , {
                headers:TOKEN
            }).then(function(res){
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

            axios.get(API.playerDetail + qquin + '&vaid=' + vaid , {
                headers:TOKEN
            }).then(function(res){
                if(res.data.code === 0){
                    var data1 = res.data.data[0];
                    axios.get(API.getTierQueue + data1.tier + "&queue=" + data1.queue , {
                        headers:TOKEN
                    }).then(function(res){
                        if(res.data.code == 0){
                            var data2 = res.data.data[0].return;
                            context.commit("get_player_base_detail",{data1 , data2});
                        }
                    })
                }
            }).catch(function(err){
                 console.log(err);
              });
        },
        GET_COMBAT_LIST(context, object) {
            axios.get(API.combatList + object.qquin + '&vaid=' + object.vaid + '&p=' + object.p, {
                headers: TOKEN
            }).then((res) => {
                if (res.data.code == 0) {
                    context.commit('get_combat_list', res.data.data[0].battle_list);
                    console.log(res.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_COMBAT_DETAIL(context , object){
            axios.get(API.combatDetail + object.qquin + "&vaid=" + object.vaid + "&gameid=" + object.gameid , {
                headers : TOKEN
            }).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_combat_detail",res.data.data[0].battle);
                    console.log(res.data.data[0].battle);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_HEROS_ALL(context){
            axios.get(API.herosAll,{
                headers : TOKEN
            }).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_heros_all",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_HEROS_FREE(context){
            axios.get(API.herosFree,{
                headers : TOKEN
            }).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_heros_free",res.data.data[0]);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_HERO_DETAIL(context , object){
            axios.get(API.heroDetail + object.id , {
                headers : TOKEN
            }).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_hero_detail",res.data.data[0]);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_VIDEO_LIST(context , object){
            axios.get(API.videoList + '?p=' + object.p , {
                headers : VIDEOTOKEN
            }).then(function(res){
                if(res.data.code == 0){
                    context.commit("get_video_list",res.data.data);
                }
            }).catch(function(err){
                console.log(err);
            });
        },
        GET_BANNER_NEWS(context , object){
            axios.get(API.bannerNews)
                .then(function(res){
                    if(res.statusTxt = "OK"){
                        context.commit("get_banner_news",res.data.data);
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
            state.totalMvp =  data[2].total_match_mvps + data[2].total_rank_mvps;
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
            state.herosAll = data;
        },
        get_heros_free(state , data){
            state.herosFree = data;
        },
        get_hero_detail(state , data){
            state.heroDetail = data;
        },
        get_video_list(state , data){
            state.videoList = data;
        },
        get_banner_news(state , data){
            state.bannerNews = data.slice(0,5);
            console.log(data);
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
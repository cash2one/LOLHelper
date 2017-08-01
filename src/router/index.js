import vue from 'vue';
import Router from 'vue-router';

vue.use(Router);

const Loading = function(cb){
    require.ensure([] , function(){
        cb(require("../components/Loading.vue"));
    },"loading");
};

const Index = function(cb){
    require.ensure([] , function(){
        cb(require("../components/Index.vue"));
    },"index");
};

const News = function(cb){
    require.ensure([] , function(){
        cb(require("../components/News.vue"));
    },"news");
};

const Players = function(cb){
    require.ensure([] , function(){
        cb(require("../components/Players.vue"));
    },"players");
};

const Heros = function(cb){
    require.ensure([],function(){
        cb(require("../components/Heros.vue"));
    },"heros");
}

const Videos = function(cb){
    require.ensure([] , function(){
        cb(require("../components/Videos.vue"));
    },"videos");
};

const PlayerDetail = function(cb){
    require.ensure([],function(){
        cb(require("../components/PlayerDetail.vue"));
    },"playerDetail");
};

const CombatDetail = function(cb){
    require.ensure([],function(){
        cb(require("../components/CombatDetail.vue"));
    },"combatDetail");
}

const HerosDetail = function(cb){
    require.ensure([],function(){
        cb(require("../components/HerosDetail.vue"));
    },"herosDetail");
};

const HerosAll = function(cb){
    require.ensure([],function(){
        cb(require("../components/HerosAll.vue"));
    },"herosAll");
};

const HerosFree = function(cb){
    require.ensure([],function(){
        cb(require("../components/HerosFree.vue"));
    },"herosFree");
};

export default new Router({
    // mode : "history",
    // scrollBehavior(to , from , savedPosition){
    //     if(savedPosition){
    //         return savedPosition;
    //     }
    // },
    base:"/lol",
    routes : [
        {
            path : "/",
            component : Loading
        },
        {
            path : "/index",
            name : "index",
            component :  Index,
            children : [
                {
                    name : "news",
                    path : "news",
                    component : News
                },
                {
                    name : "players",
                    path : "players",
                    component : Players
                },
                {
                    name : "playerDetail",
                    path : "playerDetail/:qquin/:vaid",
                    component : PlayerDetail
                },
                {
                    name : "combatDetail",
                    path : "combatDetail/:qquin/:vaid/:gameid",
                    component : CombatDetail
                },
                {
                    name : "herosDetail",
                    path : "herosDetail/:id",
                    component : HerosDetail
                },
                {
                    name : "heros",
                    path : "heros",
                    component : Heros,
                    redirect : "heros/herosAll",
                    children : [
                        {
                            name : "herosAll",
                            path : "herosAll",
                            component : HerosAll
                        },
                        {
                            name : "herosFree",
                            path : "herosFree",
                            component : HerosFree
                        }
                    ]
                },
                {   
                    name : "videos",
                    path : "videos",
                    component : Videos
                }
            ]
        }
    ]
});
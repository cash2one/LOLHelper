<template>
  <div class="herosDetail" v-if="heroDetail != null">
    <div class="herosDetail-header" :style="{backgroundImage : 'url('+ p + heroDetail.key +'-'+ heroDetail.skins[0].id + '.jpg)'}">
      <p class="herosDetail-header-name">{{heroDetail.name}}</p>
      <p class="herosDetail-header-tag">
        <span v-for="item in heroDetail.tags" :key="item">{{ positions[item] }} </span>
      </p>
      <div class="herosDetail-header-prop">
        属性系数：
        <p>
            <span>攻击:{{heroDetail.info.attack}}</span>
            <span>法术:{{heroDetail.info.magic}}</span>
          </p>
        <p>
            <span>防御:{{heroDetail.info.defense}}</span>
            <span>操作:{{heroDetail.info.difficulty}}</span>
        </p>
      </div>
    </div>
    <div class="herosDetail-tab">
        <div name="skill" class="herosDetail-tab-skill" :class="active ? 'act' : 'nonact'" @click="changeOption">技能说明</div>
        <div name="skin" class="herosDetail-tab" :class="!active ? 'act' : 'nonact'" @click="changeOption">皮肤欣赏</div>
    </div>
     <div class="herosDetail-skill" v-if="lastTab == 'skill'">
      <p class="herosDetail-skill-title">技能介绍</p>
       <div class="herosDetail-skill-list">
        <div v-for="item in heroDetail.spells" :key="item.name">
          <img :src="t + item.image.full" alt="">
          <div class="herosDetail-skill-list-info">
            <p>{{item.name}}</p>
            <p v-html="item.tooltip"></p>
          </div>
        </div>
      </div> 
      <p class="herosDetail-skill-title">技能加点推荐</p>
      <p class="herosDetail-skill-add" v-for="(val , key) in heroDetail.trait" :key="key">
        <span>{{fp[key]}}：</span>{{val['add-point']}}
      </p>
    </div> 
     <div class="herosDetail-skin" v-else>
       <p class="herosDetail-skin-title">
         该英雄系列皮肤
       </p>
      <div class="herosDetail-skin-list">
        <div class="herosDetail-skin-list-item" v-for="(item , index) in heroDetail.skins" :key="index" v-if="index>0">
          <img :src=" p + heroDetail.key +'-'+ item.id + '.jpg'">
          <p>{{item.name}}</p>
        </div>
      </div>
    </div>   
  </div>
</template>

<script>
import { mapState , mapGetters } from 'vuex';
const skinsUrl = "http://cdn.tgp.qq.com/pallas/images/skins/original/";
const skillsUrl = "http://ossweb-img.qq.com/images/lol/img/passive/";
const t = "http://ossweb-img.qq.com/images/lol/img/spell/";
const p = "http://cdn.tgp.qq.com/pallas/images/skins/original/";
const positions = {
  'Tank': '坦克',
  'Mage': '法师',
  'Assassin': '刺客',
  'Fighter': '战士',
  'Support': '辅助',
  'Marksman': '射手'
};
const fp = {
  'adc': 'ADC',
  'zd': '中单',
  'dy': '打野',
  'fz': '辅助',
  'sd': '上单'
};

export default {
  data(){
    return{
      positions,
      fp,
      active:true,
      lastTab:"skill",
      t,
      p
    }
  },
  created(){
    this.setTitle();
    this.getHeroDetail();
    this.emptyHeroDetail();
  },
  computed:{
    ...mapState(['heroDetail']),
    // ...mapGetters(["skins"]),
  },
  methods:{
    setTitle(){
      this.$store.commit("set_title","英雄详情");
    },
    getHeroDetail(){
      let params = {
        id : this.$route.params.id
      };
      this.$store.dispatch("GET_HERO_DETAIL",params);
      console.log(this.$store.state.heroDetail);
    },
    changeOption(e){
      var val = e.target.getAttribute("name");
      if(this.lastTab !== val){
        this.active = !this.active;
        if(this.lastTab == 'skill'){
          this.lastTab = 'skin';
        }else{
          this.lastTab = 'skill';
        }
      }
    },
    emptyHeroDetail(){
      this.$store.commit("empty_heroDetail");
    }
  }
}
</script>

<style lang="less" scoped>
    @fontColor : #E6E6E6;
    .herosDetail{
      background-color: white;
      &-header{
        width:100%;
        height: 12rem;
        background-size: cover;
        overflow: hidden;
        color:white;
        font-size: 14px;
        &-name{
          margin-top: 2rem;
          margin-left: 1.5rem;
          font-weight: bolder;
          font-size: 16px;
        }
        &-tag{
          margin-left: 1.5rem;
        }
        &-prop{
          margin-left: 1.5rem;
          p{
            font-size: 12px;
          }
        }
      }
      &-tab{
        width: 100%;
        background-color: #7E57C2;
        overflow: hidden;
        div{
          float: left;
          width: 50%;
          padding: 0.8rem 2rem;
          box-sizing: border-box;
          color:@fontColor;
          text-align: center;
          font-size: 14px;
        }
      }
      &-skill{
        padding:0.5rem;
        &-title{
          color: #03A9F4;
        }
        &-list{
          img{
            width: 3rem;
          }
          &-info{
            p{
              font-size: 14px;
              &:nth-child(1){
                color: #7E57C2;
              }
              &:nth-child(2){
                text-indent: 16px;
              }
            }
          }
        }
        &-add{
          font-size: 14px;
          color: #A5A5A5;
          span{
            color: #F78612;
          }
        }
      }
      &-skin{
        padding: 0.5rem;
        &-title{
          text-align: center;
          color: #03A9F4;
        }
        &-list{
          padding: 0 1rem;
          overflow: hidden;
          &-item{
            img{
              width: 100%;
              height: 12rem;
            }
            p{
              text-align: center;
              color: #666;
              margin:1rem 0;
              font-size: 14px;
            }
          }
        }
      }
    }
    .act{
      color: white !important;
      border-bottom: 1px solid #FF4081;
    }
    .nonact{
      color: @fontColor !important;
      border-bottom: none;
    }
</style>

<template>
  <div class="heros">
    <div class="heros-header">
        <div name="herosAll" class="heros-header-all" @click="changeOption" :class="active ? 'act' : 'nonact'">全部英雄</div>
        <div name="herosFree" class="heros-header-free" @click="changeOption" :class="!active ? 'act' : 'nonact'">周免英雄</div>
    </div>
     <router-view></router-view> 
  </div>
</template>

<script>
const pics = 'http://cdn.tgp.qq.com/pallas/images/champions_id/';

export default {
  data(){
    return{
        active:this.$route.name == "herosAll" ? 1 : 0
    }
  },
  created(){
      this.setTitle();
  },
  watch: {
  '$route' (to, from) {
        this.active = this.$route.name == "herosAll" ? 1 : 0;
    }
  },
  methods:{
      setTitle(){
          this.$store.commit("set_title","英雄列表");
      },
      changeOption(e){
        var val = e.target.getAttribute("name");
        if(val !== this.$route.name){
            this.$router.push({name:val});
        }
      }
  },
  
}
</script>

<style lang="less" scoped>
    .heros{
        &-header{
            width: 100%;
            background-color: #B9DFF9;
            overflow: hidden;
            &-all{
                float: left;
                width:50%;
                padding:1rem 2rem;
                box-sizing: border-box;
                text-align: center;
                color:white;
            }
            &-free{
                float: left;
                width: 50%;
                padding:1rem 2rem;
                box-sizing: border-box;
                text-align: center;
                color:white;
            }
        }
    }
    .act{
        border-bottom: 0.1rem solid #41B883;
    }
    .nonact{
        border-bottom: none;
    }
</style>

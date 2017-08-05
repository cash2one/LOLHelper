<template>
  <div class="herosFree">
    <div class="herosFree-list">
        <div class="herosFree-list-item" v-for="item in herosFree" :key="item.key" @click="getHeroDetail(item['key'])">
            <img :src="pics + item['key'] + '.png'">
            <div class="herosFree-list-item-info">
                <p>{{item['title']}}</p>
                <p>{{item['name']}}</p>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
const pics = 'http://cdn.tgp.qq.com/pallas/images/champions_id/';
export default {
  data(){
    return{
      pics,
    }
  },
  created(){
    this.getHerosFree();
  },
  computed:{
    herosFree(){
        return this.$store.state.herosFree;
    }
  },
  methods:{
    getHerosFree(){
        this.$store.dispatch("GET_HEROS_FREE");
    },
    getHeroDetail(id){
        this.$router.push({name : "herosDetail" , params : {id : id}});
    }
  }
}
</script>

<style lang="less" scoped>
    .herosFree{
        &-list{
            padding:0.5rem;
            overflow: hidden;
            background-color: white;
            &-item{
                float:left;
                width:50%;
                padding:0.5rem 0;
                overflow: hidden;
                img{
                    float: left;
                    width:3.5rem;
                    border-radius: 50%;
                }
                &-info{
                    float: left;
                    margin-left: 1rem;
                    p{
                        font-size: 14px;
                        &:nth-child(1){
                            margin-top: 0.5rem;
                            margin-bottom: 0;
                        }
                        &:nth-child(2){
                            font-size: 12px;
                            margin-top: 0.5rem;
                            color: #666;
                        }
                    }
                }
            }
        }
    }
</style>
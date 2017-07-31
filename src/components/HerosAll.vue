<template>
  <div class="herosAll">
    <div class="herosAll-list">
        <div class="herosAll-list-item" v-for="item in herosAll" :key="item.id" @click="getHeroDetail(item.id)">
            <img :src="pics + item.id + '.png'" alt="">
            <div class="herosAll-list-item-info">
                <p>{{item.title}}</p>
                <p>{{item.cname}}</p>
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
    this.getHerosAll();
  },
  computed:{
    herosAll(){
        return this.$store.state.herosAll;
    }
  },
  methods:{
    getHerosAll(){
        this.$store.dispatch("GET_HEROS_ALL");
    },
    getHeroDetail(id){
        this.$router.push({name : "herosDetail" , params : {id :id}});
    }
  }
}
</script>

<style lang="less" scoped>
    .herosAll{
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
                    width:3rem;
                    border-radius: 50%;
                }
                &-info{
                    float: left;
                    margin-left: 1rem;
                    p{
                        font-size: 14px;
                        &:nth-child(1){
                            width: 5.5rem;
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

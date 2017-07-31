<template>
  <div class="loading-page">
    <div class="loading-page-content">
        <p class="loading-page-content-topic">vue2.0 - 闲来无事</p>
        <p class="loading-page-content-enter"><button class="loading-page-content-button" @click="enter">进入首页</button></p>
    </div>
  </div>
</template>

<script>
export default {
  name : "loading",
  methods:{
      enter(){
          this.$router.push("/index/news");
      }
  }
}
</script>

<style lang="less">
    .loading-page{
        width:100%;
        height: 100%;
        background-image: url("../../static/img/loading.jpg");
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items: center;
        &-content{
            box-sizing: border-box;
            &-topic{
                width:100%;
                padding:150px 0;
                text-align: center;
                font-size: 24px;
                color:white;
                font-weight: bolder;
            }
            &-enter{
                text-align: center;
                .loading-page-content-button{
                    padding: 10px;
                    background-color: #7E57C2;
                    color:white;
                    border:0;
                    outline: none;
                    &:hover{
                        background-color: rgba(126,87,194, .6);
                    }
                }
            }
        }
    }
</style>

<template>
<div class="breadcrumb"><span class="back" @click="goback"><span class="arrowleft"></span></span>{{title}}</div>
</template>
<script>
export default {
  data() {
    return {
    }
  },
  props: ['title'],
  methods:{
    goback() {
      window.history.back();
    }
  }
}
</script>
<style>
.breadcrumb {
  line-height: 50px;
  background-color: #35a8be;
  color: #fff;
  font-size: 18px;
}
.arrowleft {
  display: inline-block;
  width:0; 
  height:0; 
  border-top:10px solid transparent;
  border-bottom:10px solid transparent; 
  border-right:10px solid #fff; 
}
.back {
  display: inline-block;
  width: 50px;
  height: 50px;
  text-align: center;
}
</style>
<template>
  <div>
    <div class="list-group" v-for="item in items" :key="item._id">
      <div class="list-t">
        <span class="title">
          <router-link :to="{path:`/detail/${item._id}`}">{{ item.title }}</router-link>
        </span>
        <span class="created">{{ item.createtime }}</span>
      </div>
      <div class="list-m">
        <div class="pic" v-if="item.imgOrigin"><img :src="`static/art${item.imgOrigin}`"></div>
        <div class="list-m-r">
          <router-link :to="{path:`/detail/${item._id}`}" class="desc">{{ item.desc }}</router-link>
        </div>
      </div>
      <div class="list-b">
        <div class="list-b-r">
          <a href="/a/2018-01-16/0011516119327.html" class="reply">评论 0</a>
          <span class="like" data-id="33801" data-islike="0">点赞 <i class="support33801">1</i></span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      items: []
    }
  },
  created () {
    this.items = this.data.articles
  },
  props: {
    data: Object
  },
  watch: {
    data: {
      handler (newValue, oldValue) {
        this.items = newValue.articles
      },
      deep: true
    }
  },
  methods: {

  }
}
</script>
<style scoped>
.list-group {
  margin-bottom: 20px;
  overflow: hidden;
  padding: 10px 20px;
  border-radius: 5px;
  background: #fff;
  -webkit-box-shadow: 0px 3px 4px #eee;
  -moz-box-shadow: 0px 3px 4px #eee;
  box-shadow: 0px 3px 4px #eee;
}

.list-group .list-t {
  overflow: hidden;
}

.list-group .title {
  float: left;
  font-size: 20px;
  font-weight: bold;
  line-height: 52px;
}

.list-group .title a {
  color: #555;
  width: 550px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}

.list-group .title a:hover {
  color: #ff7546;
}

.list-group .created {
  float: right;
  font-size: 14px;
  color: #888;
  line-height: 52px;
}

.list-group .list-m {
  overflow: hidden;
  margin-bottom: 15px;
}

.list-group .pic {
  float: left;
  width: 320px;
  margin-right: 20px;
  height: 180px;
}

.list-group .pic img {
  width: 100%;
  display: block;
  object-fit: cover;
  height: 100%;
  border-radius: 10px;
}

.list-group .list-m-r {
  text-align: left;
}

.list-group .desc {
  font-size: 16px;
  color: #666;
  margin-top: 10px;
  line-height: 28px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
}

.list-group .list-b {
  padding-top: 15px;
  border-top: #eee solid 1px;
  overflow: hidden;
}

.list-group .list-b-r {
  float: right;
  color: #888;
}

.list-group .list-b-r .reply {
  float: left;
  color: #888;
  border: #ddd solid 1px;
  padding: 8px 20px;
  border-radius: 5px;
  margin-right: 20px;
  cursor: pointer;
}

.list-group .list-b-r .like {
  float: left;
  border: #ddd solid 1px;
  padding: 8px 20px;
  border-radius: 5px;
  cursor: pointer;
}

</style>

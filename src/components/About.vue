<template>
<div>
 <div class="mdl-grid">
        <div class="mdl-cell mdl-cell--12-col mdl-cell--12-col-phone">
<p>สร้างเพื่อ PWA Hackathon</p>
<p>สามารถดูรายละเอียดหนังได้</p>
<p>กดจอง/ดู ที่นั่ง(Demo)ได้</p>
<p>ออกแบบสำหรับเปิดบนโทรศัพท์</p>
<a href="https://www.themoviedb.org"><img src="/static/img/icons/db-api.png" style="height:20%"/></a>

<button class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect" style="width:100%; margin-top:20px" @click="back()" >
 Back
</button>
</div>

  </div>
</div>
</template>
<script>
export default {
  methods: {
    back () {
      this.$router.push({name: '/'})
    }
  }
}
</script>
<style scoped>
.demo-list-three {
  width: 100%;
}
</style>

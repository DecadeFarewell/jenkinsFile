<template>
  <div class="school-mate-head">
    <div class="head">
      <div class="logo">
        <img
          src="https://dss2.bdstatic.com/6Ot1bjeh1BF3odCf/it/u=2323101524,2568980176&fm=74&app=80&f=JPEG&size=f121,121?sec=1880279984&t=ae933c8d03b29a973d580a8a74d753fb"
          alt
        />
      </div>
      <div class="text">
        <span class="school">湖南文理学院16级同学录</span>
        <span class="tips">{{classesCounts}}个班级，{{members}}位成员</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classList: {
      type: Array,
      required: true,
      defaul: () => []
    }
  },
  computed: {
    classesCounts() {
      return this.classList.length;
    },
    members() {
      return this.classList.reduce((prev, cur) => prev + cur.counts, 0);
    }
  }
};
</script>

<style scoped lang="scss">
.school-mate-head {
  border: 1px solid $border-color;
  .head {
    height: 0.8rem;
    display: flex;
    align-items: center;
    .logo {
      width: 0.8rem;
      height: 0.8rem;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .text {
      flex: 1 1 auto;
      .school {
        font-weight: 600;
        font-size: 0.2rem;
        color: #333;
      }
      .tips {
        color: $text;
      }
    }
  }
}
</style>
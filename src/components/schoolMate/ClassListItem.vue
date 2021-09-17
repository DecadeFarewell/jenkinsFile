<template>
  <div class="class-list-item-com">
    <div class="list-item">
      <!-- <span class="class-name">{{classItem.className}}</span> -->
      <router-link
        class="class-name"
        :to="{path:`/alumni/schoolMate/class/${classItem.classID}`,params:{classID:classItem.classID}}"
      >{{classItem.className}}</router-link>
      <span class="members">
        成员
        <span class="counts">{{classItem.counts}}</span>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    classItem: {
      type: Object,
      required: true,
      default: () => {}
    },
    index: {
      type: Number,
      required: true,
      default: () => -1
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.class-list-item-com {
  padding: 0.1rem 0.15rem;
  .list-item {
    flex-direction: column;
    .class-name {
      color: $active;
      font-size: 0.16rem;
      display: block;
      margin-bottom: 0.05rem;
      cursor: pointer;
      &:hover {
        text-decoration: underline;
      }
      &.exact,
      .active {
        color: red;
        text-decoration: underline;
      }
    }
    .members {
      font-size: 0.12rem;
      color: $text;
      padding: 0.02rem;
      border: 1px solid $border-color;
      cursor: pointer;
      .counts {
        font-weight: 600;
        color: #333;
      }
    }
  }
}
</style>
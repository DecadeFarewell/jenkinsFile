<template>
  <div class="class-detail-com">
    <div class="class-album">
      <ClassAlbum :poster="poster" />
    </div>

    <Search class="search-bar" @filter="filter" />

    <div class="class-members">
      <ClassMember class="member" v-for="(m, index) in members" :info="m" :key="m.id" />
    </div>
  </div>
</template>

<script>
import ClassMember from "@/components/schoolMate/ClassMember.vue";
import ClassAlbum from "@/components/schoolMate/ClassAlbum.vue";
import Search from "@/components/schoolMate/Search.vue";

export default {
  components: {
    ClassMember,
    ClassAlbum,
    Search
  },
  created() {
    this.saveClassMark(this.$route);
    this.getPoster();
    this.getAllByClassID();
  },
  beforeRouteUpdate(to, from, next) {
    this.saveClassMark(to);
    this.getAllByClassID();
    // 路有变化->请求数据,请求数据mounted中也要请求一次，因为首次载入这个钩子不会执行
    this.getPoster();
    next();
  },
  data() {
    return {
      poster: {},
      data: [], //与member一样的一份数据
      members: []
    };
  },
  methods: {
    filter(result) {
      if (result.length === 0) {
        this.members = this.data;
      } else {
        this.members = this.members.filter(m => m.id === result.id);
      }
    },
    saveClassMark(route) {
      const id = route.params.classID;
      const className = route.params.className;
      id &&
        this.$store.commit({
          type: "set_classID",
          classID: parseInt(id)
        });
    },
    getPoster() {
      const id = this.$store.state.classID;
      this.$api
        .getPoster({
          classID: id
        })
        .then(resp => {
          this.poster = resp.data.data;
        });
    },
    getAllByClassID() {
      const id = this.$store.state.classID;
      this.$api
        .getClassMemberInfo({
          classID: id
        })
        .then(resp => {
          console.log(resp, "所有成员");
          this.members = resp.data.data;
          this.data = resp.data.data; //保留一份
        });
    }
  }
};
</script>

<style scoped lang="scss">
.class-detail-com {
  .class-album {
  }
  .search-bar {
    // position: relative;
    // transform: translateX(90%);
    // width: 50%;
    margin: 0.1rem;
  }
  .class-members {
    .member {
      float: left;
      margin-top: 0.1rem;
      margin-left: 0.1rem;
    }
  }
}
</style>
<template>
  <div class="search-com">
    <el-input
      class="input"
      v-model="val"
      placeholder="搜索姓名"
      @input="inputHandle"
      @focus="inputHandle"
    ></el-input>
    <el-button class="btn" type="primary" icon="el-icon-search" @click="inputHandle">搜索</el-button>
    <div class="search-list" v-click-outside="clickOutside" v-if="showResult">
      <ul>
        <li class="none-result" v-if="result.length === 0">暂无结果...</li>
        <SearchListItem
          v-for="item in result"
          :key="item.id"
          @click.native="selectResult(item)"
          :resultItem="item"
          :val="val"
        />
        <!-- <li
          v-for="item in result"
          :key="item.id"
          @click="selectResult(item)"
        >{{item.real_name}}({{item.username}})</li>-->
      </ul>
    </div>
  </div>
</template>

<script>
import directives from "@/utils/directives";
import SearchListItem from "./SearchListItem";
export default {
  components: {
    SearchListItem
  },
  data() {
    return {
      val: "",
      timer: null,
      result: [],
      showResult: false
    };
  },
  directives: {
    clickOutside: directives.clickOutside
  },
  methods: {
    clickOutside() {
      this.result = [];
      this.showResult = false;
    },
    search() {
      if (this.val.trim() === "") {
        this.clickOutside()
        this.$emit("filter", []);
        return;
      }
      console.log("搜索搜索搜索");
      this.$api
        .fuzzyQuery({
          searchWord: this.val
        })
        .then(resp => {
          console.log(resp, "这是模糊查询的结果");
          this.result = resp.data.data;
          this.showResult = true;
        });
    },
    inputHandle() {
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.search();
      }, 500);
    },
    selectResult(resultItem) {
      this.showResult = false;
      this.$emit("filter", resultItem);
    }
  }
};
</script>

<style scoped lang="scss">
.search-com {
  position: relative;
  .input,
  .btn {
    display: inline-block;
  }
  .input {
    width: 80%;
  }
  .search-list {
    position: absolute;
    width: 80%;
    box-sizing: border-box;
    border: 1px solid $border-color;
    background: #fff;
    ul {
      li {
        padding: 0.05rem 0.1rem;
        cursor: pointer;
        color: #333;
        &:hover {
          background: #eee;
        }
        &.none-result {
          color: $subText;
        }
      }
    }
  }
}
</style>
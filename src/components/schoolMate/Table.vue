<template>
  <table class="detail-info" border="1" cellspacing="10">
    <tbody class="tbody">
      <tr class="tr">
        <td class="td">
          <span class="title">真实姓名：</span>
          <span class="value">{{detailInfo.real_name}}</span>
        </td>
        <td class="td">
          <span class="title">昵称：</span>
          <span class="value">{{detailInfo.username}}</span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="title">性别：</span>
          <span class="value">{{detailInfo.sex}}</span>
        </td>
        <td class="td">
          <span class="title">身高：</span>
          <span class="value">{{detailInfo.heihgt}}</span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="title">体重：</span>
          <span class="value">{{detailInfo.weight}}</span>
        </td>
        <td class="td">
          <span class="title">生日：</span>
          <span class="value">{{detailInfo.birthday}}</span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="title">星座：</span>
          <span class="value">{{detailInfo.constellation}}</span>
        </td>
        <td class="td">
          <span class="title">邮箱：</span>
          <span class="value">{{detailInfo.e_mail}}</span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="title">电话：</span>
          <span class="value">{{detailInfo.tel}}</span>
        </td>
        <td class="td">
          <span class="title">QQ：</span>
          <span class="value">{{detailInfo.qq}}</span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="title">微信：</span>
          <span class="value">{{detailInfo.wx}}</span>
        </td>
        <td class="td">
          <span class="title">学院：</span>
          <span class="value">{{detailInfo.depart}}</span>
        </td>
      </tr>
      <tr class="tr">
        <td class="td">
          <span class="title">专业班级：</span>
          <span class="value">{{className}}</span>
        </td>
        <td class="td">
          <span class="title">兴趣爱好：</span>
          <span class="value">{{detailInfo.hobby}}</span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  props: {
    detailInfo: {
      type: Object,
      required: true,
      default: () => {}
    }
  },
  created() {
    this.getClassNameMap();
  },
  data() {
    return {
      classIDMap: []
    };
  },
  computed: {
    className() {
      const classItem = this.classIDMap.find(
        item => item.cID === this.detailInfo.classID
      );
      return classItem ? classItem.className : "";
    }
  },
  methods: {
    getClassNameMap() {
      this.$api.getClassNameMap().then(resp => {
        this.classIDMap = resp.data.data;
      });
    }
  }
};
</script>

<style scoped lang="scss">
.detail-info {
  margin: 0 auto;
  width: 85%;
  border-collapse: collapse;
  border: 1px solid $border-color;
  .tbody {
    .tr {
      .td {
        width: 50%;
        padding: 0.1rem 0.15rem;
        .title {
          font-weight: 600;
          color: #333;
        }
      }
    }
  }
}
</style>
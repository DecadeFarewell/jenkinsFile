<template>
  <div class="notice">
    <UploadNotice class="upload-editor" v-if="isAdmin" @refresh="getNoticeList" />
    <NoticeItem
      v-for="(notice,index) in noticesList"
      :key="notice.id"
      :notice="notice"
      class="notice-item"
      @showDialog="showDialog"
      @refresh="getNoticeList"
    />
    <NoticeDetail
      class="detail-dialog"
      :dialogVisible="dialogVisible"
      :showingNotice="showingNotice"
      @close="dialogVisible = false"
    />
  </div>
</template>

<script>
import NoticeItem from "@/components/notice/NoticeItem";
import UploadNotice from "@/components/notice/UploadNotice";
import NoticeDetail from "@/components/notice/NoticeDetail";
export default {
  components: {
    NoticeItem,
    UploadNotice,
    NoticeDetail
  },
  computed: {
    isAdmin() {
      const role = this.$store.state.roles[0];
      return role === "admin";
    }
  },
  created() {
    this.getNoticeList();
  },
  data() {
    return {
      dialogVisible: false,
      noticesList: [],
      showingNotice: {}
    };
  },
  methods: {
    getNoticeList() {
      this.$api.getAllNotice().then(resp => {
        console.log(resp, "listllllll");
        this.noticesList = resp.data.data;
      });
    },
    showDialog(id) {
      this.dialogVisible = true;
      this.showingNotice = this.noticesList.find(item => item.id === id);
    }
  }
};
</script>

<style scoped lang="scss">
.notice {
  .notice-item {
    cursor: pointer;
    margin: 0.1rem 0;
    // border: 1px solid black;
  }
}
</style>
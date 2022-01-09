<template>
  <iframe
    frameborder="0"
    importance="high"
    allowFullScreen="true"
    width="100%"
    height="100%"
    :src="this.iframeSrc"
  ></iframe>
</template>
<script>
export default {
  data() {
    return {
      iframeSrc: "",
    };
  },
  methods: {
    /**
     * 取得token和url
     */
    getToken: async function () {
      const { data: res } = await this.$http.get("getTokenUrl");
      if (res.state) {
        console.log(res.token);
        this.iframeSrc = 
            res.headerUrl + 
            "#/private/share/E85444BE8DCD2703B8D84062CDB420D4B/dashboard/EE329E28A52CC30AB37E3CD27F8A9524?copyright=false&_k=x07fqs" + 
            "&activeAuth=jwt-param&jwtParam=" + 
            res.token;
        console.log(this.iframeSrc);
      } else {
        this.$message.error("取得token失敗");
      }
    },
  },
  created() {
    this.getToken();
  },
};
</script>
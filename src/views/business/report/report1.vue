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
        await this.$http
          .get(res.url)
          .then((data) => {
            console.log("then");
            console.log(data);
            console.log(res.headerUrl);
            this.iframeSrc = res.headerUrl + "#/preview/9/dashboard/12?copyright=false&_k=x07fqs";
            console.log(this.iframeSrc);
          })
          .catch((response) => {
            console.log("catch");
            console.log(response);
            this.$message.error("登陸失敗");
          });
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
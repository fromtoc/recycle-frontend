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
            "#/private/share/E1CE991EC709AC01F08A11391C7818B0A/dashboard/EA7DC23099080937EC5AEB4696AA7D86D?copyright=false&_k=x07fqs" + 
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
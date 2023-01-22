import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    login() {
      const url = "https://vue3-course-api.hexschool.io/v2/admin/signin";
      axios
        .post(url, this.user)
        .then((res) => {
          const { token, expired } = res.data;
          document.cookie = `loginToken=${token}; expired=${new Date(expired)}`;
          window.location = "product.html";
        })
        .catch((err) => {
          console.log(err.response.data.message);
        });
    },
  },
};

createApp(app).mount("#app");

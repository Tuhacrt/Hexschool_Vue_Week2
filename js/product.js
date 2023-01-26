import { createApp } from "https://unpkg.com/vue@3/dist/vue.esm-browser.js";

const app = {
  data() {
    return {
      baseUrl: "https://vue3-course-api.hexschool.io/v2",
      api_path: "tuhacrt",
      products: [],
      target: {},
    };
  },
  methods: {
    checkAdmin() {
      const url = `${this.baseUrl}/api/user/check`;
      axios
        .post(url)
        .then(() => {
          this.getProduct();
        })
        .catch((err) => {
          alert(err.response.data.message);
          window.location = "login.html";
        });
    },
    getProduct() {
      const url = `${this.baseUrl}/api/${this.api_path}/admin/products`;
      axios
        .get(url)
        .then((res) => {
          this.products = res.data.products;
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    },
    updateProduct(product) {
      this.target = product;
    },
    getToken() {
      const token = document.cookie.replace(
        /(?:(?:^|.*;\s*)loginToken\s*=\s*([^;]*).*$)|^.*$/,
        "$1"
      );
      axios.defaults.headers.common.Authorization = token;
    },
  },
  mounted() {
    this.getToken();
    this.checkAdmin();
  },
};

createApp(app).mount("#app");

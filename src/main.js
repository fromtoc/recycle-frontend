import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import axios from 'axios'
import echarts from 'echarts'
import ZkTable from 'vue-table-with-tree-grid'
import {hasPermission} from './utils/permissionDirect'
import locale from 'element-ui/lib/locale/lang/zh-TW'

Vue.use(ElementUI, { locale })
const Plugins = [hasPermission]

Plugins.map((plugin) => {
    Vue.use(plugin)
})
Vue.use(ZkTable)
Vue.use(echarts)
NProgress.configure({ease: 'ease', speed: 500});
NProgress.configure({minimum: 0.3});

// let BASE_API_URL="http://localhost:8089/";
// let BASE_API_URL="http://211.23.139.11:8089/";
let BASE_API_URL="https://192.168.89.50:8088/api/";
// let BASE_API_URL="https://211.23.139.11:8088/api/";

Vue.prototype.$http = axios
Vue.prototype.BASE_API_URL=BASE_API_URL
axios.defaults.baseURL = BASE_API_URL

// 請求拦截器
axios.interceptors.request.use(config => {
        if (config.url.includes('localhost:8050')){
            return config;
        }
        NProgress.start()
        config.headers.Authorization = LocalStorage.get(LOCAL_KEY_XINGUAN_ACCESS_TOKEN);
        return config;
    }
    , error => {
        return Promise.reject(error)
    });

//响應拦截器
axios.interceptors.response.use(
    function (response) {
        NProgress.done();
        const res = response.data;
        if (res.success) {
            return response;
        }

        if (res.data!=null&&res.data.errorCode === 50001) {
            LocalStorage.clearAll();
            return router.push("/login");
        }
        return response;
    },
    function (error) {
        return Promise.reject(error)
    }
)


/**
 * 自定义權限指令
 */
Vue.config.productionTip = false
Vue.use(ElementUI)
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')

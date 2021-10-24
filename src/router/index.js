import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import( '../views/login.vue'), //登入頁面
    },

    {
        path: '/home',
        component: () => import( '../views/home.vue'), //後台主體框架
        redirect: '/system/welcome',
        children: [
            {
                path: '/system/welcome',
                name: 'Welcome',
                component: () => import( '../views/welcome.vue'), //系统欢迎頁
            }, {
                path: '/system/users',
                name: 'Users',
                component: () => import( '../views/system/user.vue'), //用戶管理
            }, {
                path: '/system/roles',
                name: 'Roles',
                component: () => import( '../views/system/role.vue'), //角色管理
            }
            , {
                path: '/system/menus',
                name: 'Menus',
                component: () => import( '../views/system/menu.vue'), //選單管理
            }
            , {
                path: '/system/departments',
                name: 'Departments',
                component: () => import( '../views/system/dept.vue'), // 公司管理
            },
            {
                path: '/system/files',
                name: 'Files',
                component: () => import('../views/system/file'),   //文件管理
            },
            {
                path: '/system/icon',
                name: 'Icons',
                component: () => import('../views/system/icon'),  //系统圖標
            }
            /**********************************业務模塊的路由******************************/
            , {
                path: '/business/product/list',
                name: 'ProductList',
                component: () => import( '../views/business/product/list.vue'), //廢棄物列表
            }
            , {
                path: '/business/product/in-stocks',
                name: 'ProductInStocks',
                component: () => import( '../views/business/product/in-stock'), //廢棄物入库記錄
            },
            {
                path: '/business/product/out-stocks',
                name: 'ProductOutStocks',
                component: () => import( '../views/business/product/out-stock'), //廢棄物發放記錄
            }
            , {
                path: '/business/product/categories',
                name: 'ProductCategories',
                component: () => import( '../views/business/product/category'), //廢棄物分類
            },
            {
                path: '/business/product/stocks',
                name: 'ProductStocks',
                component: () => import( '../views/business/product/stock'),  //库存明细
            }
            , {
                path: '/business/product/suppliers',
                name: 'ProductSuppliers',
                component: () => import( '../views/business/product/supplier'), //廢棄物供應方
            },
            {
                path: '/business/product/consumers',
                name: 'ProductConsumers',
                component: () => import( '../views/business/product/consumer'), //廢棄物消费方
            }
            , {
                path: '/business/product/add-stocks',
                name: 'ProductAddStocks',
                component: () => import( '../views/business/product/add-stock'), //廢棄物入库
            },
            {
                path: '/business/product/publish',
                name: 'ProductPublish',
                component: () => import( '../views/business/product/publish'),   //廢棄物發放
            },
            /**********************************监控模塊的路由******************************/
            {
                path: '/monitor/logs',
                name: 'Logs',
                component: () => import( '../views/monitor/log'),     //操作日誌
            },
            {
                path: '/monitor/login-log',
                name: 'LoginLogs',
                component: () => import( '../views/monitor/login-log'), //登入日誌
            },
            {
                path: '/monitor/swagger-ui',
                name: 'SwaggerUI',
                component: () => import( '../views/monitor/swagger-ui'), //接口文档
            },
            {
                path: '/monitor/druid',
                name: 'Druid',
                component: () => import( '../views/monitor/druid'), //mysql监控
            },
            /**********************************疫情模塊的路由******************************/
            {
                path: '/covid19/map',
                name: 'Covid19Map',
                component: () => import( '../views/business/covid19/map'), //疫情地圖
            },
            {
                path: '/covid19/health',
                name: 'Health',
                component: () => import( '../views/business/covid19/health'), //健康打卡
            },

            {
                path: "/error/401",
                component: () => import( '../views/error/401'),
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'hash',
    base: process.env.BASE_URL,
    routes
})

import store from '../store'//引入store

//白名單頁面
const whiteList=[
    '/business/product/add-stocks',
    '/business/product/publish'
];

//路由導航守卫
router.beforeEach((to, from, next) => {

    const token = LocalStorage.get(LOCAL_KEY_XINGUAN_ACCESS_TOKEN);
    if (to.path === '/login') {
        if (!token) {
            return next();
        } else {
            return next({path: '/home'})
        }
    }

    if (to.path === '/error/401') {
        return next();
    }

    if (!token) {
        return next('/login');
    } else {
        //判断是否有訪問該路徑的權限
        const urls = store.state.userInfo.url;
        //如果是管理员
        if (store.state.userInfo.isAdmin) {
            return next();
        } else {
            if (urls.indexOf(to.path) > -1|| whiteList.indexOf(to.path)>-1) {
                //則包含該元素
                window.sessionStorage.setItem("activePath", to.path);
                return next();
            } else {
                return next("/error/401");
            }
        }
    }
})

export default router

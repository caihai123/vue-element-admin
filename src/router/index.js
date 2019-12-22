import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '@/layout'

/*相同webpackChunkName的会被打包成一个文件*/
const redirect = () => import(/* webpackChunkName: "index" */'@/pages/redirect/index')
const index = () => import(/* webpackChunkName: "index" */'@/pages/index')
const error404 = () => import(/* webpackChunkName: "404" */'@/pages/404')
const menu1 = () => import(/* webpackChunkName: "menu1" */'@/pages/menu1')
const menu2 = () => import(/* webpackChunkName: "menu2" */'@/pages/menu2')
const menu3_1 = () => import(/* webpackChunkName: "menu3" */'@/pages/menu3/menu3-1')
const menu3_2 = () => import(/* webpackChunkName: "menu3" */'@/pages/menu3/menu3-2/')
const menu3_2_1 = () => import(/* webpackChunkName: "menu3" */'@/pages/menu3/menu3-2/menu3-2-1')
const menu3_2_2 = () => import(/* webpackChunkName: "menu3" */'@/pages/menu3/menu3-2/menu3-2-2')
const menu4 = () => import(/* webpackChunkName: "menu4" */'@/pages/menu4')
const login = () => import(/* webpackChunkName: "login" */'@/pages/login')

Vue.use(VueRouter)

/*
对VueRouter原型链上的push、replace方法进行重写
为了解决某些情况下控制台报 ‘Uncaught (in promise) undefined’的问题
参考地址：https://github.com/vuejs/vue-router/issues/2881
*/
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
    if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
    return originalPush.call(this, location).catch(err => err)
}

/*不需要权限验证的路由*/
const constantRoutes = [
    {
        path: "/",
        component: Layout,
        redirect: '/index',
        children: [
            {
                path: "/index",
                component: index,
                meta: { title: "首页 按钮", icon: "el-icon-s-home" },
            }
        ]
    },
    {
        path: "/login",
        component: login,
        hidden: true,
        meta: { title: "登录页" }
    },
    {
        path: '/redirect',
        component: Layout,
        hidden: true,
        children: [
            {
                path: '/redirect/:path*',
                component: redirect,
            }
        ]
    },
    {
        path: '/404',
        component: error404,
        hidden: true,
    }
]
export default new VueRouter({
    routes: constantRoutes
});

/*需要权限验证的路由*/
export const asyncRoutes = [
    {
        path: "/menu1",
        component: Layout,
        redirect: '/menu1/index',
        children: [
            {
                path: "/menu1/index",
                component: menu1,
                meta: { title: "一级菜单 表格", icon: "el-icon-s-marketing" },
            }
        ],
    }, {
        path: "/menu2",
        component: Layout,
        redirect: '/menu2/index',
        children: [
            {
                path: "/menu2/index",
                component: menu2,
                meta: { title: "一级菜单 输入框", icon: "el-icon-s-data" }
            }]
    }, {
        path: "/menu3",
        component: Layout,
        redirect: '/menu3/menu3-1',
        meta: { title: "一级菜单3", icon: "el-icon-s-home" },
        children: [
            {
                path: "/menu3/menu3-1",
                component: menu3_1,
                meta: { title: "二级菜单 表单", icon: "el-icon-s-cooperation" },
            },
            {
                path: "/menu3/menu3-2",
                component: menu3_2,
                redirect: '/menu3/menu3-2/menu3-2-1',
                meta: { title: "二级菜单3-2", icon: "el-icon-s-platform" },
                children: [
                    {
                        path: "/menu3/menu3-2/menu3-2-1",
                        component: menu3_2_1,
                        meta: { title: "三级菜单3-2-1", icon: "el-icon-s-claim" },
                    },
                    {
                        path: "/menu3/menu3-2/menu3-2-2",
                        component: menu3_2_2,
                        meta: { title: "三级菜单3-2-2", icon: "el-icon-s-marketing" },
                    }
                ]
            }
        ]
    }, {
        path: "/menu4",
        component: Layout,
        redirect: '/menu4/index',
        children: [
            {
                path: "/menu4/index",
                component: menu4,
                meta: { title: "一级菜单4", icon: "el-icon-s-shop" }
            }
        ]
    }, {
        path: '*',
        redirect: '/404',
        hidden: true
    }
]
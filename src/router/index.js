import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout'

Vue.use(VueRouter)

export default new VueRouter({
    routes: [
        {
            path: '/redirect',
            component: Layout,
            hidden: true,
            children: [
                {
                    path: '/redirect/:path*',
                    component: () => import('../pages/redirect/index'),
                }
            ]
        },
        {
            path: "/",
            component: Layout,
            redirect: '/index',
            children: [
                {
                    path: "/index",
                    component: () => import('../pages/index'),
                    meta: { title: "首页 按钮", icon: "el-icon-s-home" },
                }
            ]
        }, {
            path: '/404',
            component: () => import('../pages/404'),
            hidden: true,
        },
        {
            path: "/menu1",
            component: Layout,
            redirect: '/menu1/index',
            children: [
                {
                    path: "/menu1/index",
                    component: () => import('../pages/menu1'),
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
                    component: () => import('../pages/menu2'),
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
                    component: () => import('../pages/menu3/menu3-1'),
                    meta: { title: "二级菜单 表单", icon: "el-icon-s-cooperation" },
                },
                {
                    path: "/menu3/menu3-2",
                    component: () => import('../pages/menu3/menu3-2/'),
                    redirect: "/menu3/menu3-2/menu3-2-1",
                    meta: { title: "二级菜单3-2", icon: "el-icon-s-platform" },
                    children: [
                        {
                            path: "/menu3/menu3-2/menu3-2-1",
                            component: () => import('../pages/menu3/menu3-2/menu3-2-1'),
                            meta: { title: "三级菜单3-2-1", icon: "el-icon-s-claim" },
                        },
                        {
                            path: "/menu3/menu3-2/menu3-2-2",
                            component: () => import('../pages/menu3/menu3-2/menu3-2-2'),
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
                    component: () => import('../pages/menu4'),
                    meta: { title: "一级菜单4", icon: "el-icon-s-shop" }
                }
            ]
        }, {
            path: "/login",
            component: () => import('../pages/login'),
            hidden: true,
            meta: { title: "登录页" }
        }, { path: '*', redirect: '/404', hidden: true }
    ]
})
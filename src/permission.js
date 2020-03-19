import { asyncRoutes } from "@/router";
import { routerList } from "@/api/request/applet.js"

//获取有权限的路由
var getRouters = async function () {
    //在本地环境可以查看所有页面
    if (process.env.NODE_ENV === 'production') {
        await routerList({ id: 1234 }, function (val) {
            var error404;
            let roles = val.data.data;
            error404 = asyncRoutes.splice(asyncRoutes.length - 1, 1)[0];
            roles.forEach(role => {
                signRouter(asyncRoutes, role)
            });
            filtration(asyncRoutes)
            cleanRouter(asyncRoutes)
            // 必须最后注册404页面
            asyncRoutes.push(error404)
        })
    }
    return asyncRoutes
}

//给要保留的路由添加标记
function signRouter(routes, role) {
    routes.forEach(val => {
        if (val.path === role) {
            if (!val.children) {
                val.sign = true;
            } else {
                if (val.redirect) {
                    role = val.redirect;
                }
                signRouter(val.children, role)
            }
        } else if (val.children) {
            signRouter(val.children, role)
        }
    })
}

//删除掉sign为false的根对象
function filtration(routes) {
    for (let i = 0; i < routes.length;) {
        if (!routes[i].children && !routes[i].sign) {
            routes.splice(i, 1)
        } else if (routes[i].children) {
            filtration(routes[i].children);
            i++
        } else {
            i++
        }
    }
}

//删除掉children为[]的目录
function cleanRouter(routes) {
    for (let i = 0; i < routes.length;) {
        if (routes[i].children) {
            if (routes[i].children.length === 0) {
                routes.splice(i, 1)
            } else if (routes[i].children.length > 0) {
                if (routes[i].children.length == 1) {
                    delete routes[i].meta;
                }
                cleanRouter(routes[i].children);
                i++
            }
        } else {
            if (routes[i].sign) {
                delete routes[i].sign;
            }
            i++
        }
    }
}


export default { getRouters }
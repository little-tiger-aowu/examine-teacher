import router from './router'
import { getToken } from '@/utils/auth' // 验权
router.beforeEach((to, from, next) => {
    //判断登录状态简单实例
    var userInfo = getToken();
    if (userInfo) {
        next();

    } else {
        if (to.path === '/login' || to.path === '/register' || to.path === '/password') {
            next();

        }else{
            next('/login');

        }
    }
    // var userRid = getRid();
    // console.log(userRid);
})

router.afterEach(() => {
    // NProgress.done() // 结束Progress
})

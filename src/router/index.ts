import { createRouter, createWebHistory } from "vue-router";
import Layout from "@/layout/index.vue";

/**
 * Note: sub-menu only appear when route children.length >= 1
 * name:'router-name'                                  the name is used by <keep-alive> (must set !!! & cannot be the same !!!)
 * meta : {
    roles: ['admin','editor']                          control the page roles (you can set multiple roles)
    title: 'title'                                     the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name' | 'element-plus/icons name'       the icon show in the sidebar
    breadcrumb: false                                  if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'                        if set path, the sidebar will highlight the path you set
    hidden: true                                       if set true, item will not show in the sidebar(default is false)
    isElIcon: false                                    if set true, item will use el-icon
    redirect: 'noRedirect'                             if set noRedirect will no redirect in the breadcrumb
  }
 */

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/login",
      component: () => import("@/views/login/index.vue"),
      meta: { hidden: true },
    },
    {
      path: "/404",
      component: () => import("@/views/error/404.vue"),
      meta: { hidden: true },
    },
    {
      path: "/",
      name: "Home",
      component: Layout,
      redirect: "/home",
      children: [
        {
          path: "home",
          name: "Home",
          component: () => import("@/views/home/index.vue"),
          meta: { title: "首页", icon: "HomeFilled", isElIcon: true },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)",
      redirect: "/404",
      meta: {
        hidden: true,
      },
    },
  ],
});

export default router;

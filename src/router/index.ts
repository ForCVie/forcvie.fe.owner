import {createRouter, createWebHistory} from 'vue-router'
import {routes} from '@/router/routes'
import commonService from "@/service/common/CommonService";
import {SCREEN} from "@/router/screen";

let tempScreenName = null;

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [...routes],
  scrollBehavior(to, from, savedPosition) {
    return {top: 0, behavior: 'smooth',}
  }
})

function nextFactory(context, middleware, index) {
  const subsequentMiddleware = middleware[index];
  if (!subsequentMiddleware) return context.next;

  return (...parameters) => {
    context.next(...parameters);
    const nextMiddleware = nextFactory(context, middleware, index + 1);
    subsequentMiddleware({...context, next: nextMiddleware});
  };
}

router.beforeEach((to, from, next) => {
  const metaTitle = to.meta.title as string;
  document.title = metaTitle || "계원예술대학교";

  const arrScreenName = [SCREEN.login.name, SCREEN.home.name, SCREEN.notFound.name, SCREEN.internalError.name, SCREEN.unauthorized.name];

  if (to.name && to.meta.parentRoute && !arrScreenName.includes(to.name)) {
    if (to.meta.parentRoute && to.meta.parentRoute !== tempScreenName) {
      saveNavigationHistory(to, from);
      tempScreenName = to.meta.parentRoute;
    }
  }

  if (to.meta.middleware) {
    const middleware = Array.isArray(to.meta.middleware)
      ? to.meta.middleware
      : [to.meta.middleware];
    const context = {from, next, router, to};
    const nextMiddleware = nextFactory(context, middleware, 1);
    return middleware[0]({...context, next: nextMiddleware});
  }

  return next();
});

function saveNavigationHistory(to, from) {
  commonService
    .history(to.meta.parentRoute)
    .then((response: any) => {
    })
    .catch((e: any) => {
      console.error(e);
    })
    .finally(() => {
    });
}

export default router


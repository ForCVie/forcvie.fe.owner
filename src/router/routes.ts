import {SCREEN} from './screen';
import authMiddleware from '@/middleware/auth';
import logMiddleware from '@/middleware/log'
import { developRoute } from './routeItems/developRoute';
import { fqaRoute } from './routeItems/fqaRoute';
import { promotionRoute } from './routeItems/promotionRoute';
import { accountCreationRoute } from './routeItems/accountCreationRoute';
import {storeManagerRoute} from "@/router/routeItems/storeManagerRoute";

const getView = (path: any) => {
  return () => import(`@/views/${path}.vue`);
};

const getRouteItems = (route: any) => {
  return Object.values(route).map((screen:any) => ({
    path: screen.path,
    name: screen.name,
    component: screen.component,
  }))
}

export const routes = [
  {
    path: '/',
    component: () => import('@/layouts/DefaultLayout.vue'),
    meta: {
      title: "ForC Food",
      middleware: [authMiddleware],
    },
    children: [
      {
        path: '/template',
        name: 'template',
        meta: {title: 'TemplateUi'},
        component: getView('TemplateUiYeongsang'),
      },
      ...getRouteItems(developRoute),
      ...getRouteItems(fqaRoute),
      ...getRouteItems(promotionRoute),
      ...getRouteItems(accountCreationRoute),
      ...getRouteItems(storeManagerRoute),
    ],
  },
  // {
  //   path: '/template',
  //   name: 'template',
  //   meta: {title: 'TemplateUi'},
  //   component: getView('TemplateUiYeongsang'),
  // },
  {
    path: SCREEN.login.path,
    name: SCREEN.login.name,
    meta: {
      middleware: [authMiddleware],
    },
    component: getView('LoginView'),
  },
  {
    path: SCREEN.internalError.path,
    name: SCREEN.internalError.name,
    component: getView('InternalError'),
  },
  {
    path: SCREEN.notFound.path,
    name: SCREEN.notFound.name,
    meta: {title: 'Not Found'},
    component: getView('NotFound'),
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: SCREEN.notFound.path,
    component: getView('NotFound'),
  },
  {
    /** 접근권한 없음 */
    path: SCREEN.unauthorized.path,
    name: SCREEN.unauthorized.name,
    component: () => import("@/views/UnauthorizedPage.vue"),
    meta: {
      title: "계원예술대학교",
      auth: false,
    },
  },
];

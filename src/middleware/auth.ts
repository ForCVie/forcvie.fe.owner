import {getUserInfo, setUserInfo} from '@/utils/storage';
import commonService from "@/service/common/CommonService";
import {SCREEN} from "@/router/screen";

export default async function authMiddleware({ to, from, next }) {
  // console.log('auth middleware')
  // // Call loading on store

  // //check token
  // const token = to.query.token
  // const router = useRouter()

  // if(token){
  //   try {
  //     const response = await commonService.getUserInfo(token)

  //     await setUserInfo(response.data.data)
  //     await router.replace('/')
  //   } catch (error) {
  //     console.error("Error during login");
  //   }
  // }
  // // Check userInfo
  // const userInfo = getUserInfo();

  // if(to.name === SCREEN.unauthorized.name){
  //   return next()
  // }
  // // If userInfo is undefined and the target route is not 'Login', redirect to 'Login'
  // if (!userInfo && to.name !== SCREEN.login.name && to.name !== SCREEN.unauthorized.name) {
  //   await commonService.logout()
  //   return next({ name: SCREEN.login.name });
  // }
  // // If userInfo is present and the target route is 'Login', redirect to 'Home'
  // if (userInfo && to.name === SCREEN.login.name) {
  //   return next({ name: SCREEN.home.name });
  // }

  return next();
}

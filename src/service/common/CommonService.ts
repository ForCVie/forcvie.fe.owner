import http from '@/utils/http'

class CommonService {
  login(data: any): Promise<any> {
    return http.post('/auth/login', data)
  }

  logout(): Promise<any> {
    return http.get('/auth/logout')
  }

  menu(): Promise<any> {
    return http.get('/cmmn/menu/nav-tree')
  }

  resetResource(): Promise<any> {
    return http.post('/auth/api/resourceRoleReset')
  }

  history(params): Promise<any> {
    return http.post('/cmm/menu-log', {screenName: params})
  }

  getUserInfo(token): Promise<any> {
    return http.post('/auth/login-by-token', {token})
  }
}

export default new CommonService()

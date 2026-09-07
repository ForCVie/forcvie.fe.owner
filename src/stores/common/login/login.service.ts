import http from '@/utils/http'
import type { LoginLDAPReq } from './login.type'
import { LOGIN_LDAP_CLIENT } from '@/constants/api.const'

export const loginLDAP = (data: LoginLDAPReq) => {
  return http.postByCode(LOGIN_LDAP_CLIENT, data)
}

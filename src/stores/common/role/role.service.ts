import http from '@/utils/http'
import type { RoleSearch } from './role.type'

const url = '/roles'
export const getRoleList = (roleRequests: RoleSearch) => {
  return http.post(`${url}/list`, roleRequests)
}

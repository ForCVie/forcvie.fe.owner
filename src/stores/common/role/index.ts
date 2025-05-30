import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { RoleSearch, RoleList } from './role.type'
import { getRoleList } from './role.service'

export const roleStore = defineStore('roleStore', () => {
  const roleList = ref<RoleList[]>([])
  const status = ref<number>()

  const fetchList = async (data: RoleSearch) => {
    try {
      const response = await getRoleList(data)
      roleList.value = response.data
      status.value = response.status
    } catch (error) {
      alert('API 호출 시 오류가 있습니다')
    }
  }

  return {
    roleList,
    status,
    fetchList
  }
})

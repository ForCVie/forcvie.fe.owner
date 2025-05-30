import http from '@/utils/http'
import type { BankSearchModel } from './bank.type'

export const getListBank = (data: BankSearchModel) => {
  return http.post(`/bank/bank`, data)
}
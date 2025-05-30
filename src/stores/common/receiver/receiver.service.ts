import http from '@/utils/http'
import type { ReceiverSearchModel } from './receiver.type'

export const getListReceiver = (data: ReceiverSearchModel) => {
  return http.post(`/receiver/receiver`, data)
}

import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { ReceiverModel, ReceiverSearchModel } from './receiver.type'
import { getListReceiver } from './receiver.service'

export const receiverCommonStore = defineStore('receiverCommonStore', () => {
  const receiverModel = ref<ReceiverModel>()
  const status = ref<number>()
  const receiverSelected = ref<any>()
  const receiverSelectedRadio = ref<ReceiverModel>()
  const getReceivers = async (params: ReceiverSearchModel) => {
    const response = await getListReceiver(params)
    receiverModel.value = response.data
    status.value = response.status
  }

  const setReceiverSelected = (data: any) => {
    receiverSelected.value = data
  }

  const setReceiverSelectedRadio = (data: any) => {
    receiverSelectedRadio.value = data
  }

  const setPersonType = (person: any) => {
    receiverSelected.value.selectionType = person
  }
  return {
    getReceivers,
    receiverModel,
    status,
    receiverSelected,
    setReceiverSelected,
    receiverSelectedRadio,
    setReceiverSelectedRadio,
    setPersonType
  }
})

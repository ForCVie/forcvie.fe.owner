<template>
    <button type="button" :disabled="disabled" :class="className" @click="addEvent">{{ value }}</button>
    <div v-if="id">
      <InputFileRegSelection
        :referKey="id"
        :mode="'detail'"
        :id="'fileUpload'"
        :name="'fileUpload'"
        :type="fileTypeOffice"
        :ref="childRef"
        :orgName="orgName"
        :category="category"
        :sectionName="sectionName"
      ></InputFileRegSelection>
    </div>
  </template>
  <script lang="ts">
  import { TYPE_BUTTON_GO, TYPE_BUTTON_DOWLOAD, ACCEPTTYPE_OFICE } from '../../../constants/screen.const'
  import { checkFlagStore } from "@/stores/common/checkRole"
  import Swal from "sweetalert2"
  export default {
      props: {
          params: {},
          onCustomEvent: null
      },
      setup() {
        const roleStore = checkFlagStore();
        const {t} = useI18n()

        return {
            roleStore,t
        }
      },
      mounted() {
          if (this.params) {
              this.value = this.params.value
              if (this.params.className) {
                  this.className = this.params.className;
              }
              this.id = this.params.data[this.params.id];
              this.type = this.params.type;
              this.orgName = this.params.orgName;
              this.category = this.params.category;
              this.sectionName = this.params.sectionName;
              this.disabled = this.params.disabled;
          }
      },
      data() {
          return {
              value: '',
              customParam: '',
              sendParam: '',
              listParams: [],
              colorFlag: false,
              className: '',
              type: '',
              typeDowload: TYPE_BUTTON_DOWLOAD,
              typeGotoPage: TYPE_BUTTON_GO,
              fileTypeOffice : ACCEPTTYPE_OFICE,
              childRef : 'childRef',
              orgName : '',
              category: '',
              sectionName: '',
              disabled: false
          }
      },
      methods: {
          addEvent() {
              if (typeof this.params.onCustomEvent === 'function') {
                if (this.roleStore.flag) {
                    this.params.onCustomEvent(this.params.data)
                } else {
                    Swal.fire({
                    text: this.t("common.message.warring"),
                    showCancelButton: false,
                    confirmButtonColor: "#DD6B55",
                    confirmButtonText: "확인",
                    cancelButtonText: "취소",
                    });
                }
              }
              if(this.type == TYPE_BUTTON_DOWLOAD) {
                  const refFile = this.$refs[this.childRef];
                  const fileInfo = refFile.fileUploadedInfo;
                  fileInfo?.forEach(item => {
                      refFile.dowload(item.fileName,item.uploadDirectory);
                  })
              }
          }
      }
  }
  </script>
  
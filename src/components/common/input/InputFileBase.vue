<template>
  <div class="top">
    <form ref="fileForm" v-if="mode != modeDetail" class="file_form_style">
      <button type="button">
        <input
          ref="inputFile"
          type="file"
          :id="id"
          :name="name"
          :disabled="isDisable"
          @change="handleFileChange"
          :accept="acceptType"
          hidden
          :multiple="multiple"
        />
      </button>
    </form>
  </div>
  <div class="attach_filewrap" v-if="!previewFlag">
    <label
      v-if="mode != modeDetail"
      class="btn_round2 btn_white btn_sm"
      :for="id"
    >
      Lựa chọn
    </label>
    <div class="attach_file_list">
      <div class="file_row" v-for="item in fileInfo" :key="item.fileUrl">
        <div class="file_name">
          <p>{{ item.fimOrgName }}</p>
          <i>{{ item.size }} KB</i>
          <button
            type="button"
            class="btn_icon icon_only delete"
            @click="removeFile(item.fileName)"
          >
            삭제
          </button>
        </div>
      </div>
      <template v-if="mode == modeEdit">
        <div
          class="file_row"
          v-for="(item, index) in fileUploadedInfo"
          :key="index"
        >
          <div class="file_name">
            <p>{{ item.fimOrgName }}</p>
            <button
              type="button"
              class="btn_icon icon_only download"
              @click="dowload(item.fileName)"
            >
              다운로드
            </button>
            <button
              type="button"
              class="btn_icon icon_only delete"
              @click="openModal(item)"
            >
              삭제
            </button>
          </div>
        </div>
      </template>
      <template v-if="mode == modeDetail">
        <div
          class="file_row"
          v-for="(item, index) in fileUploadedInfo"
          :key="index"
        >
          <div class="file_name">
            <p>{{ item.fimOrgName }}</p>
            <button
              type="button"
              class="btn_icon icon_only download"
              @click="dowload(item.fileName)"
            >
              다운로드
            </button>
          </div>
        </div>
      </template>
    </div>
  </div>
  <div class="bottom" :class="{ preview_img: previewFlag }">
    <template v-if="previewFlag && mode != modeCreate">
      <div class="add_photo mg_r10" v-for="item in fileUploadedInfo">
        <img :key="item.url" :src="item.url" :class="className" />
        <label class="btn_add_photo" :for="id">
          <p>사진추가</p>
        </label>
        <button
          type="button"
          class="btn_icon icon_only delete previewImg"
          @click="openModal(item)"
        >
          삭제
        </button>
      </div>
    </template>
    <template v-if="previewFlag">
      <div class="add_photo mg_r10" v-for="item in fileInfo">
        <img :key="item.fileUrl" :src="item.fileUrl" :class="className" />
        <label class="btn_add_photo" :for="id">
          <p>사진추가</p>
        </label>
        <button
          type="button"
          class="btn_icon icon_only delete previewImg"
          @click="removeFile(item.fileName)"
        >
          삭제
        </button>
      </div>
      <div class="add_photo">
        <label class="btn_add_photo" :for="id">
          <p>사진추가</p>
        </label>
      </div>
    </template>
  </div>
  <p v-if="showMess && mode != modeDetail && showMessFlag" style="color: red">
    * 파일 교체 시 기존 파일 삭제 후 새로운 파일을 업로드 해주세요.
  </p>
  <p v-if="showMess && mode != modeDetail && !showMessFlag" style="color: red">
    * 등록된 파일이 없습니다.
  </p>
  <p class="file_sub_title" v-if="subTitle">{{ subTitle }}</p>
  <form ref="fileForm" v-if="mode != modeDetail && !defaultFlag">
    <div class="input_file">
      <input
        ref="inputFile"
        type="file"
        :id="id"
        :name="name"
        @change="handleFileChange"
        :accept="acceptType"
        hidden
        :multiple="multiple"
      />
      <label :for="id" class="file_button">{{ label }}</label>
    </div>
  </form>
</template>

<script>
import {
  FILE_TYPE_IMAGE,
  FILE_TYPE_OFFICE,
  FILE_TYPE_VIDEO,
  ACCEPTTYPE_OFICE,
  ACCEPTTYPE_IMG,
  ACCEPTTYPE_VIDEO,
  MODE_CREATE,
  MODE_EDIT,
  MODE_DETAIL,
  SUCCSESS_STATUS,
  ACCEPTTYPE_All,
} from "../../../constants/screen.const";

import { ref, onMounted, onBeforeUnmount, defineProps, defineEmits } from "vue";
import { fileMngStore } from "../../../stores/common/fileMng";
import { storeToRefs } from "pinia";
import { useI18n } from "vue-i18n";
import commonService from "@/service/common/CommonService";
import Swal from "sweetalert2";
export default {
  props: {
    modelValue: [],
    maxFile: {
      type: Number,
      default: 1,
    },
    id: String,
    name: String,
    type: String,
    previewFlag: {
      type: Boolean,
      default: false,
    },
    multiple: {
      type: Boolean,
      default: false,
    },
    orgName: String,
    category: String,
    sectionName: String,
    mode: String,
    referKey: Number,
    label: {
      type: String,
      default: "첨부파일",
    },
    defaultFlag: {
      type: Boolean,
      default: true,
    },
    showMess: {
      type: Boolean,
      default: true,
    },
    subTitle: String,
    className: String,
    maxSize: {
      type: Number,
      default: 10,
    },
  },
  setup() {
    const { t } = useI18n();
    const isShow = ref(false);
    const store = fileMngStore();
    return {
      t,
      isShow,
      store,
    };
  },
  mounted() {
    switch (this.type) {
      case FILE_TYPE_IMAGE:
        this.acceptType = ACCEPTTYPE_IMG;
        break;
      case FILE_TYPE_OFFICE:
        this.acceptType = ACCEPTTYPE_OFICE;
        break;
      case FILE_TYPE_VIDEO:
        this.acceptType = ACCEPTTYPE_VIDEO;
        break;
      default:
        this.acceptType = ACCEPTTYPE_All;
        break;
    }
    if (this.mode != MODE_CREATE) {
      this.getFileUploaded();
    }
  },
  data() {
    return {
      selectedFile: null,
      fileName: "",
      fileUrl: "",
      totalFile: [],
      fileInfo: [],
      acceptType: "",
      fileArray: [],
      modeCreate: MODE_CREATE,
      modeEdit: MODE_EDIT,
      modeDetail: MODE_DETAIL,
      fileUploadedInfo: [],
      modalIdModify: "modalIdModify",
      modalOpenModify: false,
      isDisable: false,
      showMessFlag: false,
    };
  },
  methods: {
    async dowload(fileName) {
      let params = {};
      params.encodedFileName = fileName;
      await this.store.getFileDowload(params);
      if (this.store.status && this.store.status == SUCCSESS_STATUS) {
        let data = this.store.fileDowload;
        const url = window.URL.createObjectURL(
          new Blob([data], { type: this.store.type })
        );
        const fileNameFromServer = "downloadedFile.zip";

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileNameFromServer);
        document.body.appendChild(link);
        link.click();
        link.remove();
        window.URL.revokeObjectURL(url);
      }
    },

    closeModalModify() {
      this.modalOpenModify = false;
    },
    openModal(data) {
      // this.selectedFile = data;
      // this.modalOpenModify = true;
      Swal.fire({
        text: this.t("common.message.deleteFile"),
        showCancelButton: true,
        confirmButtonText: this.t("common.delete"),
        cancelButtonText: this.t("common.cancel"),
      }).then((result) => {
        if (result.isConfirmed) {
          this.deleteFile(data.fileName, data.id);
        }
      });
    },
    async getFileUploaded() {
      let params = {};
      params.fimFileCategory = this.category;
      params.fimFileOrgName = this.orgName;
      params.fimSectionName = this.sectionName;
      params.fimReferKeyId = this.referKey;
      await this.store.getListFileUpload(params);
      if (this.store.status == SUCCSESS_STATUS) {
        let datas = this.store.fileUploadedInfoList;
        datas.forEach((item) => {
          let fileUploaded = {};
          fileUploaded.fileName = item.fimFileName;
          fileUploaded.uploadDirectory = item.fimFilePath;
          fileUploaded.id = item.id;
          fileUploaded.url = item.urlFile;
          fileUploaded.fimOrgName = item.fimOrgName;
          fileUploaded.size = (item.size / 1024).toFixed(2);
          this.fileUploadedInfo.push(fileUploaded);
        });
        if (this.maxFile === 1) {
          if (this.fileUploadedInfo.length >= 1) {
            this.isDisable = true;
          }
        }
        if (this.fileUploadedInfo.length == 0) {
          this.showMessFlag = false;
        } else {
          this.showMessFlag = true;
        }
        this.fileArray = [...this.fileArray,...this.fileUploadedInfo];
        this.$emit("update:modelValue", this.fileArray);
      }
    },
    async upLoadFile(referKeyId) {
      if (!referKeyId || this.fileArray.length == 0) {
        return;
      }
      const formData = new FormData();

      formData.append("orgName", this.orgName);
      formData.append("category", this.category);
      formData.append("sectionName", this.sectionName);
      formData.append("referKeyId", referKeyId);
      this.fileArray.forEach((item) => {
        formData.append("files", item.file);
      });
      await this.store.addfile(formData);
      if (this.store.status == SUCCSESS_STATUS) {
      }
    },
    handleFileChange(event) {
      this.totalFile = Array.from(event.target.files);

      this.isShow = true;
      // if(!this.multiple) {
      //     this.fileInfo = [];
      //     this.fileArray = []
      //     this.totalFile.forEach(item => {
      //     let file = {};
      //     let fileUpload = {};
      //     file.fileName = item.name;
      //     file.fileUrl = window.URL.createObjectURL(item)
      //     fileUpload.name = item.name;
      //     fileUpload.file = item;
      //     this.fileInfo.push(file);

      //     this.fileArray.push(fileUpload);
      // })
      // this.$emit('update:modelValue', this.fileArray)
      //     return;
      // }
      if (
        this.totalFile.length > this.maxFile ||
        this.fileInfo.length > this.maxFile ||
        (!this.multiple && this.fileInfo.length > 0) ||
        this.fileInfo.length + this.totalFile.length > this.maxFile ||
        (!this.multiple && this.fileUploadedInfo.length > 0) ||
        (this.multiple &&
          this.fileUploadedInfo.length + this.totalFile.length > this.maxFile)
      ) {
        return;
      }
      const allowedExtensions = this.acceptType;

      this.totalFile.forEach((item) => {
        const fileExtension = "." + item.name.split(".").pop();
        if (allowedExtensions.includes(fileExtension)) {
          let file = {};
          let fileUpload = {};
          file.fileName = item.name;
          file.fimOrgName = item.name;
          file.fileUrl = window.URL.createObjectURL(item);
          file.size = (item.size / 1024).toFixed(2);
          fileUpload.name = item.name;
          fileUpload.file = item;

          if (item.size > this.maxSize * 1024 * 1024) {
            this.errorMessage = `${this.maxSize}mb 이하의 파일 등록가능합니다.`;
            Swal.fire({
              text: `${this.maxSize}mb 이하의 파일 등록가능합니다.`,
              showCancelButton: false,
              confirmButtonText: this.t("common.confirm"),
            });
            event.target.value = "";
            return;
          }
          this.fileInfo.push(file);
          this.fileArray.push(fileUpload);
        }
      });
      if (this.maxFile === 1) {
        if (this.fileArray.length >= 1) {
          this.isDisable = true;
        }
      }
      if (this.fileArray.length == 0) {
        this.showMessFlag = false;
      } else {
        this.showMessFlag = true;
      }
      this.$emit("update:modelValue", this.fileArray);
    },
    removeFile(fileName) {
      this.fileInfo = this.fileInfo.filter((item) => item.fileName != fileName);
      this.fileArray = this.fileArray.filter((item) => item.name != fileName);
      this.$refs.fileForm.reset();
      if (this.fileInfo.length == 0) {
        this.isShow = false;
      }
      this.isDisable = false;
      if (this.fileArray.length == 0) {
        this.showMessFlag = false;
      } else {
        this.showMessFlag = true;
      }
      this.$emit("update:modelValue", this.fileArray);
    },
    async deleteFile(fileName, id) {
      this.fileUploadedInfo = this.fileUploadedInfo.filter(
        (item) => item.fileName != fileName
      );
      this.fileArray = this.fileArray.filter(
        (item) => {
          if (item.fileName) {
            if (item.fileName != fileName) {
              return true;
            }
            return false;
          } 
          return true;
        }
      );
      await this.store.deleteFileMng(fileName);
      await Swal.fire({
        text: this.t("common.message.deleteFileOk"),
        showCancelButton: false,
        confirmButtonText: this.t("common.confirm"),
      });
      if (this.fileUploadedInfo.length == 0) {
        this.showMessFlag = false;
      } else {
        this.showMessFlag = true;
      }
      this.isDisable = false;
      this.$emit("update:modelValue", this.fileArray);
    },
  },
};
</script>
<style scoped>
.img_base_preview {
  width: 200px !important;
  height: 200px !important;
}

.show_file_input_base {
  display: flex !important;
}

.btn_close_file_base {
  margin-top: -15px !important;
  width: 12px !important;
}

.btn_close_preview_img {
}

.btn_icon .icon_only {
}

.file_form_style {
  display: flex;
}

.file_sub_title {
  color: red;
  padding-top: 5px;
}

.input_file {
  position: relative;
  display: inline-block;
}

.file_button {
  display: inline-block;
  padding: 7px 20px;
  background-color: var(--white-color);
  color: black;
  border: 1px solid var(--gray-lavender);
  cursor: pointer;
  border-radius: 4px;
}

.file_button:hover {
  background-color: var(--light-gray);
}

/* Ẩn input[type="file"] */
.input_file input[type="file"] {
  position: absolute;
  top: 0;
  left: 0;
  width: 0;
  height: 0;
  opacity: 0;
  overflow: hidden;
}

.flex_input {
  flex-direction: column;
}

.preview_img {
  display: flex !important;
  flex-wrap: wrap;
  gap: 10px;
}
.btn_icon.icon_only.delete.previewImg {
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  z-index: 1;
}
.attach_filewrap {
  padding-left: 0px;
}
</style>

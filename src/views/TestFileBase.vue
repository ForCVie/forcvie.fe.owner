<template>
  <section id="content" class="content_wrapper grid_content" tabindex="0">
    <div class="box dp_block">
      <div class="box_inner">
        <h3 class="box_title">Dashboard</h3>
      </div>
      <InputFileBase
          :referKey="'20'"
          :mode="modefile"
          id="imageFile"
          name="imageFile"
          :type="fileTypeImage"
          v-model="fileImage"
          :maxFile="1"
          ref="imageRef"
          :orgName="'image'"
          :category="'story'"
          previewFlag="true"
          :sectionName="sectionName"
          :maxSize="2"
          :subTitle="'Chosse file'"
      />
      <p>Show file</p>
      <InputFileBase
          :referKey="'20'"
          :mode="'edit'"
          id="imageFile"
          name="imageFile"
          :type="fileTypeImage"
          v-model="fileImage"
          :maxFile="1"
          ref="imageRef"
          :orgName="'image'"
          :category="'story'"
          :sectionName="sectionName"
          :maxSize="2"
          :subTitle="'Chosse file'"
      />

      <a href="http://localhost:8080/api/v1/files/story/20240625/5c8a6322be946457985b9faf144266997a17ce5a35526eff1e5fd58543ea2477.png" download>121212</a>
      <button @click="sendFile">Send</button>
      <div class="box_section">
        <div class="search_box">
          <ul>
            <li>
              <span>{{data}}</span>
            </li>
          </ul>
        </div>
      </div>
      <div class="box_section">
        <div class="search_box col_4">
        <ul>
          <li>
            <button
              type="button"
              class="btn_lg btn_blue btn_login"
              @click="test()"
            >
              Call API
            </button>
          </li>

            <li>
              <button
                type="button"
                class="btn_lg btn_blue btn_login"
                @click="logout()"
              >
                Logout
              </button>
            </li>
        </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import LoaddingComponent from '@/components/common/loading/LoaddingComponent.vue'
import commonService from '@/service/common/CommonService'
import { removeUserInfo } from '@/utils/storage'
import router from '@/router'
import { commonStore } from '@/stores/common'
import InputFileBase from "@/components/common/input/InputFileBase.vue";
import {FILE_TYPE_IMAGE, MODE_CREATE} from "@/constants/screen.const";

export default {
  components: {
    InputFileBase,
    LoaddingComponent,
  },
  data() {
    return {
      isLoad: false,
      data:null,
      modefile: MODE_CREATE,
      fileTypeImage: FILE_TYPE_IMAGE,
    }
  },
  setup(props, ctx) {
    const store = commonStore()
    const sectionName = ref('STORY')
    const fileImage = ref(null)
    const imageRef = ref(null)
    return {
      store,
      sectionName,
      fileImage,
      imageRef
    }
  },
  methods: {
    test() {
      this.store.setLoading(true)
      commonService
        .test()
        .then((response) => {
          this.store.setLoading(false)
          if (response.status == 200 && response.data.data){
            console.log('response data when login: ',response.data.data)
            this.data = response.data.data
          }
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.store.setLoading(false)
        })
    },
    logout(){
      this.store.setLoading(true)
      commonService
        .logout()
        .then(async (response) => {
          this.isLoad = false
          if (response.status == 200){
            await this.store.setLoading(false)
            await removeUserInfo()
            router.push({name:"Login"})
          }
        })
        .catch((e) => {
          console.log(e)
        })
        .finally(() => {
          this.store.setLoading(false)
        })
    },
    sendFile(){
      this.$refs?.imageRef?.upLoadFile('20')
    }
  }
}
</script>

<style scoped>

</style>

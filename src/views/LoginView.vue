<template>
  <div class="login_wrap">
    <div class="login_top">
      <img src="@/assets/images/login/logo_login.png" alt="계원예술대학교"/>
    </div>
    <div class="login_box">
      <div class="login_header">
        <img src="@/assets/images/login/img_login_play.png" alt="play"/>
<!--        <h3 class="login_logo"><strong>역량기반 교육과정</strong><br/>관리시스템</h3>-->
        <h3 class="login_logo">
          <strong>역량기반 교육과정</strong><br />관리시스템<span class="color_txt">관리자 사이트</span>
          <!--
          <span class="color_txt">관리자 사이트</span>
           <span class="color_txt">교수 사이트</span>
           -->
        </h3>
      </div>
      <div class="login_input">
        <strong>아이디</strong>
        <input type="text" class="form_style wd_p100" placeholder="아이디를 입력하세요" v-model="username"/>
      </div>
      <div class="login_input">
        <strong>비밀번호</strong>
        <input type="password" class="form_style wd_p100" placeholder="비밀번호를 입력하세요" v-model="password"/>
      </div>
      <div class="login_btn_area">
        <button type="button" class="btn_primary btn_login" @click="login">LOGIN</button>
      </div>
      <div class="remember_id">
        <div class="check_row">
          <input type="checkbox" name="join_check" id="join_check1" class="hidden"/>
          <label for="join_check1">아이디 저장</label>
        </div>
      </div>
    </div>
  </div>
  <loadding-component v-if="store.loading"></loadding-component>
</template>

<script lang="ts">
import commonService from '@/service/common/CommonService'
// import { userInfoStore } from '../stores/userInfo'
import LoaddingComponent from '@/components/common/loading/LoaddingComponent.vue'
import {setUserInfo} from '@/utils/storage'
import router from '@/router'
import {commonStore} from '@/stores/common'

export default {
  components: {
    LoaddingComponent,
  },
  data() {
    return {
      username: '',
      password: '',
      isLoad: false,
      isSubmitted: false,
      openModal: [
        {id: 'findId', status: false},
        {id: 'reset', status: false}
      ],
      isRememberId: false,
      modalOpenConfirm: false,
      messModalConfirm: null,
      isDisabled: true,
      errorMessage: '',
    }
  },
  setup() {
    const store = commonStore()

    return {
      store
    }
  },
  mounted() {
    this.store.setLoading(false)
  },
  methods: {
    login() {
      let obj = {
        userId: this.username,
        password: this.password,
        loginDiv: "admin",
      }
      if (obj.userId && obj.password) {
        this.store.setLoading(true)
        this.errorMessage = ''
        commonService
            .login(obj)
            .then((response) => {
              this.store.setLoading(false)
              if (response.status == 200 && response.data.data) {
                setUserInfo(response.data.data)
                router.push({name: "Home"})
              }
            })
            .catch((e) => {
              console.log(e)
              this.errorMessage = e.message
            })
            .finally(() => {
              this.store.setLoading(false)
            })
      }
    },
  }
}
</script>

<style scoped lang="scss">
.box-login {
  margin: 20px auto;
  padding: 28px;
  width: 400px;
  border: solid silver 1px;
  background: white;
}

.imageLogin2 {
  position: absolute;
  top: 0;
  right: 0;
  width: auto;
  height: calc(100vh - 40px);
}

.imageLogin1 {
  position: absolute;
  top: 27%;
  z-index: 1;
}

.span-custom:hover {
  text-decoration: underline;
}
</style>

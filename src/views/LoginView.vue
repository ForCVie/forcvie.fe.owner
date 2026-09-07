<template>
  <div class="body min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8">
    <div class="login-container w-full max-w-5xl bg-white rounded-2xl overflow-hidden flex flex-col md:flex-row">
        
        <!-- Left Side: Image/Branding (Hidden on small screens) -->
        <div class="hidden md:flex md:w-1/2 food-bg relative">
            <div class="overlay absolute inset-0 flex flex-col justify-center p-12 text-white">
                <div class="mb-8">
                    <!-- Brand Logo Desktop -->
                    <div class="flex items-center mb-6">
                        <h1 class="text-6xl font-bold text-white tracking-tight">For</h1>
                        <div class="bg_orange text-white px-3 py-1 rounded-xl ml-1 shadow-lg flex items-center justify-center">
                            <span class="text-5xl font-bold">C</span>
                        </div>
                    </div>
                    <p class="text-xl font-light opacity-90">Mạng xã hội dành cho những tâm hồn ăn uống.</p>
                </div>
                
                <div class="space-y-4">
                    <div class="flex items-center space-x-3">
                        <i class="fa-solid fa-check font_primary"></i>
                        <span>Khám phá hàng ngàn quán ăn ngon.</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <i class="fa-solid fa-check font_primary"></i>
                        <span>Đặt bàn nhanh chóng, dễ dàng.</span>
                    </div>
                    <div class="flex items-center space-x-3">
                        <i class="fa-solid fa-check font_primary"></i>
                        <span>Chia sẻ review, kết nối bạn bè.</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="w-full md:w-1/2 p-8 sm:p-12 flex flex-col justify-center relative">
            
            <!-- Mobile Logo (Shows only on mobile) -->
            <div class="md:hidden flex items-center justify-center mb-8">
                <h1 class="text-4xl font-bold text-forc-dark tracking-tight">For</h1>
                <div class="bg_orange text-white px-2 py-0.5 rounded-lg ml-1 shadow-md flex items-center justify-center">
                    <span class="text-3xl font-bold">C</span>
                </div>
            </div>

            <!-- Shared Custom Alert Box -->
            <div id="alertBox" class="hidden mb-6 p-4 rounded-lg flex items-center gap-3">
                <i id="alertIcon" class="fas fa-info-circle"></i>
                <span id="alertMessage" class="text-sm font-medium"></span>
            </div>

            <!-- ================= LOGIN VIEW ================= -->
            <div id="loginView" v-if="currentView == 'login'" class="block">
                <div class="text-center md:text-left mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Chào mừng trở lại! 👋</h2>
                    <p class="text-gray-500">Đăng nhập để tiếp tục hành trình ẩm thực của bạn.</p>
                </div>

                <!-- Login Form -->
                <form id="loginForm" class="space-y-5" onsubmit="handleLogin(event)">
                    
                    <!-- Email Input -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700 mb-1">Email hoặc Số điện thoại</label>
                        <div class="relative">
                            <input type="text" id="email" name="email" v-model="loginForm.username"
                                class="input-field block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-forc-primary focus:border-forc-primary sm:text-sm" 
                                placeholder="Nhập email hoặc số điện thoại" required>
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div>
                        <div class="flex items-center justify-between mb-1">
                            <label for="password" class="block text-sm font-medium text-gray-700">Mật khẩu</label>
                            <a href="#" class="text-sm font_primary  font-medium transition-colors" @click="showForgotPassword()">Quên mật khẩu?</a>
                        </div>
                        <div class="relative">
                            <input id="password" name="password" :type="passwordVisibility.login ? 'text' : 'password'" v-model="loginForm.password"
                                class="input-field block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-forc-primary focus:border-forc-primary sm:text-sm" 
                                placeholder="••••••••" required>
                            
                            <!-- Toggle Password Visibility -->
                            <button type="button" @click="toggleVisibility('login')" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                                <i id="togglePasswordIcon" :class="!passwordVisibility.login ? 'fa-regular fa-eye':'fa-regular fa-eye-slash'"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Remember Me -->
                    <div class="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" 
                            class="h-4 w-4 font_primary focus:ring-forc-primary border-gray-300 rounded cursor-pointer accent-forc-primary">
                        <label for="remember-me" class="ml-2 block text-sm text-gray-700 cursor-pointer">
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <!-- Submit Button -->
                    <div>
                        <button type="button" id="submitBtnLogin" @click="handleLogin()"
                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg_orange hover:bg_orange-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forc-primary transition-all duration-200">
                            <span>Đăng nhập</span>
                        </button>
                    </div>
                </form>

                <div class="mt-8">
                    <div class="relative">
                        <div class="absolute inset-0 flex items-center">
                            <div class="w-full border-t border-gray-200"></div>
                        </div>
                        <div class="relative flex justify-center text-sm">
                            <span class="px-2 bg-white text-gray-500">Hoặc đăng nhập với</span>
                        </div>
                    </div>

                    <!-- Social Login Buttons -->
                    <div class="mt-6 grid grid-cols-2 gap-4">
                        <button @click="socialLogin('Google')" class="w-full flex items-center justify-center py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                            <svg class="h-5 w-5 mr-2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
                            Google
                        </button>
                        <button @click="socialLogin('Facebook')" class="w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm bg-[#1877f2] text-sm font-medium text-white hover:bg-[#166fe5] transition-colors">
                            <i class="fa-brands fa-facebook-f text-lg mr-2"></i> Facebook
                        </button>
                    </div>
                </div>

                <div class="mt-8 text-center text-sm">
                    <p class="text-gray-600">
                        Chưa có tài khoản? 
                        <a href="#" class="font-semibold font_primary  transition-colors" @click="switchView('signup')">Đăng ký ngay</a>
                    </p>
                </div>
            </div>

            <!-- ================= SIGN UP VIEW ================= -->
            <div id="signupView" v-if="currentView != 'login'">
                <div class="text-center md:text-left mb-8">
                    <h2 class="text-2xl font-bold text-gray-900 mb-2">Tạo tài khoản mới ✨</h2>
                    <p class="text-gray-500">Tham gia ForC để bắt đầu hành trình của bạn.</p>
                </div>

                <!-- Signup Form -->
                <form id="signupForm" class="space-y-4" onsubmit="handleSignup(event)">
                    
                    <!-- Full Name -->
                    <div>
                        <label for="fullname" class="block text-sm font-medium text-gray-700 mb-1">Họ và tên</label>
                        <div class="relative">
                            <input type="text" id="fullname" name="fullname" 
                                class="input-field block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-forc-primary focus:border-forc-primary sm:text-sm" 
                                placeholder="Vd: Nguyễn Văn A" required>
                        </div>
                    </div>

                    <!-- Email Input -->
                    <div>
                        <label for="signupEmail" class="block text-sm font-medium text-gray-700 mb-1">Email</label>
                        <div class="relative">
                            <input type="text" id="signupEmail" name="signupEmail" 
                                class="input-field block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-forc-primary focus:border-forc-primary sm:text-sm" 
                                placeholder="Nhập email" required>
                        </div>
                    </div>

                    <!-- Email Input -->
                    <div>
                        <label for="signupEmail" class="block text-sm font-medium text-gray-700 mb-1">Số điện thoại</label>
                        <div class="relative">
                            <input type="text" id="signupEmail" name="signupEmail" 
                                class="input-field block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-forc-primary focus:border-forc-primary sm:text-sm" 
                                placeholder="Nhập số điện thoại" required>
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div>
                        <label for="signupPassword" class="block text-sm font-medium text-gray-700 mb-1">Mật khẩu</label>
                        <div class="relative">
                            <input :type="passwordVisibility.signup ? 'text' : 'password'" id="signupPassword" name="signupPassword" 
                                class="input-field block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-forc-primary focus:border-forc-primary sm:text-sm" 
                                placeholder="Tạo mật khẩu (ít nhất 6 ký tự)" required minlength="6">
                            <button type="button" @click="toggleVisibility('signup')" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                                <i id="toggleSignupPassIcon" :class="!passwordVisibility.signup ? 'fa-regular fa-eye':'fa-regular fa-eye-slash'"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Confirm Password Input -->
                    <div>
                        <label for="confirmPassword" class="block text-sm font-medium text-gray-700 mb-1">Xác nhận mật khẩu</label>
                        <div class="relative">
                            <input :type="passwordVisibility.confirm ? 'text' : 'password'" id="confirmPassword" name="confirmPassword" 
                                class="input-field block w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg text-gray-900 focus:outline-none focus:ring-1 focus:ring-forc-primary focus:border-forc-primary sm:text-sm" 
                                placeholder="Nhập lại mật khẩu" required minlength="6">
                            <button type="button" @click="toggleVisibility('confirm')" class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none">
                                <i id="toggleConfirmPassIcon" :class="!passwordVisibility.confirm ? 'fa-regular fa-eye':'fa-regular fa-eye-slash'"></i>
                            </button>
                        </div>
                    </div>

                    <!-- Submit Button -->
                    <div class="pt-2">
                        <button type="submit" id="submitBtnSignup"
                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg_orange hover:bg_orange-hover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-forc-primary transition-all duration-200">
                            <span>Đăng ký tài khoản</span>
                        </button>
                    </div>
                </form>

                <div class="mt-6 text-center text-sm">
                    <p class="text-gray-600">
                        Đã có tài khoản? 
                        <a href="#" class="font-semibold font_primary  transition-colors" @click="switchView('login')">Đăng nhập tại đây</a>
                    </p>
                </div>
            </div>
            
        </div>
    </div>
  </div>
  <LoaddingComponent v-if="store.loading"></LoaddingComponent>
</template>

<script setup lang="ts">
import { useAlert, useConfirm } from '@/components/common/composables/useAlert';
import LoaddingComponent from '@/components/common/loading/LoaddingComponent.vue';
import { commonStore } from '@/stores/common';
import { loginLDAP } from '@/stores/common/login/login.service';
import type { LoginLDAPReq } from '@/stores/common/login/login.type';
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const alert = useAlert();
const confirm = useConfirm();
const { t } = useI18n();
const store = commonStore();

/* =========================
 * View
 * ========================= */

const currentView = ref('login');

const switchView = (viewName: string) => {
    currentView.value = viewName;

    if (viewName === 'signup') {
        resetSignupForm();
    } else {
        resetLoginForm();
    }
};

/* =========================
 * Forms
 * ========================= */

const loginForm = ref<LoginLDAPReq>({
    username: '',
    password: ''
});

const signupForm = reactive({
    fullname: '',
    email: '',
    password: '',
    confirmPassword: ''
});

const resetLoginForm = () => {
    loginForm.value.username = '';
    loginForm.value.password = '';
};

const resetSignupForm = () => {
    signupForm.fullname = '';
    signupForm.email = '';
    signupForm.password = '';
    signupForm.confirmPassword = '';
};

/* =========================
 * Password Visibility
 * ========================= */

const passwordVisibility = reactive({
    login: false,
    signup: false,
    confirm: false
});

const toggleVisibility = (field: any) => {
  console.log("fadsfdsa");
  
    passwordVisibility[field] = !passwordVisibility[field];
};

/* =========================
 * Alert
 * ========================= */

const showAlert = (message, type = 'error') => {
    alert(message)
};

const hideAlert = () => {
};

/* =========================
 * Handle Login
 * ========================= */

const handleLogin = async () => {
    if (!loginForm.value.username || !loginForm.value.password) {
        showAlert('Vui lòng nhập đầy đủ thông tin.', 'error');
        return;
    }

    store.setLoading(true);

    try {
        const req = {
            username: loginForm.value.username,
            password: loginForm.value.password
        } as LoginLDAPReq;
        await loginLDAP(req).then((res) => {
            console.log(res);
            if (res.data.status === 400) {
                alert(
                    res.data.message,
                    t("common.alertTitle")
                );
            }
        //   alert(
        //     t("common.message.deleteSuccess"),
        //     t("common.alertTitle"),
        //     () => {
        //       back();
        //     }
        //   );
        });
    } finally {
        store.setLoading(false);
    }
};

/* =========================
 * Handle Signup
 * ========================= */

const handleSignup = async () => {
    hideAlert();

    const {
        fullname,
        email,
        password,
        confirmPassword
    } = signupForm;

    if (!fullname || !email || !password || !confirmPassword) {
        showAlert('Vui lòng nhập đầy đủ thông tin.', 'error');
        return;
    }

    if (password !== confirmPassword) {
        showAlert(
            'Mật khẩu xác nhận không khớp. Vui lòng kiểm tra lại.',
            'error'
        );

        return;
    }

    store.setLoading(true);

    try {
        // Giả lập API
        await new Promise(resolve => setTimeout(resolve, 1500));

        showAlert(
            'Tạo tài khoản thành công! Bạn có thể đăng nhập ngay bây giờ.',
            'success'
        );

        // Chuyển sang màn hình login sau 2 giây
        setTimeout(() => {
            currentView.value = 'login';

            loginForm.email = email;
            loginForm.password = '';

            resetSignupForm();
        }, 2000);

    } finally {
        store.setLoading(false);
    }
};

/* =========================
 * Social Login
 * ========================= */

const socialLogin = (provider: string) => {
    store.setLoading(true);
    switch (provider) {
        case "Google":
            window.location.href = import.meta.env.VITE_API_LOGIN_GOOGLE;
            break;
        case "Facebook":
            window.location.href = import.meta.env.VITE_API_LOGIN_FACEBOOK;
            break;
        default:
            alert("Hệ thống không đáp ứng đăng nhập bằng " + provider);
            break;
    }
};

/* =========================
 * Forgot Password
 * ========================= */

const showForgotPassword = () => {
    showAlert(
        'Chức năng khôi phục mật khẩu đang được phát triển.',
        'info'
    );
};
</script>

<style scoped lang="scss">
.body {
  background-color: #f5f6fa;
}
        .login-container {
            box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
        }

        .input-field {
            transition: all 0.3s ease;
        }

        .input-field:focus {
            box-shadow: 0 0 0 3px rgba(255, 107, 107, 0.2);
        }

        /* Decorative image styling for desktop */
        .food-bg {
            background-image: url('https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80'); /* Tasty food image */
            background-size: cover;
            background-position: center;
        }
        
        .overlay {
            background: linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.2));
        }

        /* Animation for error message */
        @keyframes shake {
            0%, 100% { transform: translateX(0); }
            10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
            20%, 40%, 60%, 80% { transform: translateX(5px); }
        }
        .shake-error {
            animation: shake 0.5s;
        }
</style>

import { getCurrentInstance } from "vue";

export const useAlert = () => {
  const instance = getCurrentInstance();
  return (instance?.proxy as any).$alert;
};

export const useConfirm = () => {
  const instance = getCurrentInstance();
  return (instance?.proxy as any).$confirm;
};

export const useToast = () => {
  const instance = getCurrentInstance();
  return (instance?.proxy as any).$toast;
};

// Thêm useNotice vào đây
export const useNotice = () => {
  const instance = getCurrentInstance();
  return (instance?.proxy as any).$notice;
};
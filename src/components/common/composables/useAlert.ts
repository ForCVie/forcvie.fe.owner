import { getCurrentInstance } from "vue";

export const useAlert = () => {
  const instance = getCurrentInstance();
  return instance.proxy.$alert;
};

export const useConfirm = () => {
  const instance = getCurrentInstance();
  return instance.proxy.$confirm;
};

export const useToast = () => {
  const instance = getCurrentInstance();
  return instance.proxy.$toast;
};

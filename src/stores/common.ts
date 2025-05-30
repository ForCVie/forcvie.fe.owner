import { ref } from 'vue'
import { defineStore } from 'pinia'
import Swal from 'sweetalert2'

export const commonStore = defineStore('common', () => {
  const loading = ref<boolean>(false)
  const check = ref<boolean>(true)
  const arrRequired = ref<[string]>([])
  const baseMysuitURL = import.meta.env.VITE_API_MYSUIT;

  const setLoading = (isLoading: boolean) => {
    loading.value = isLoading
  }
  const setRequired = async (id:string) => {
    arrRequired.value.push(id)
    await checkRequired()
  }
  const removeRequired = async (id: string) => {
    arrRequired.value = arrRequired.value.filter((vId: string) => vId !== id)
    await checkRequired()
    return arrRequired.value
  }

  const checkRequired = () => {
    let arr = []

    arrRequired.value.forEach(id => {
      const inputElement = document.getElementById(id);
      if (inputElement ) {
        arr = [...arr, {
          id: id,
          count: inputElement.value.length,
          value : inputElement.value
        }]
      }
    });

    const existNull = arr.some(item => item.count === 0 || item.value == '선택');

    if (existNull) {
      check.value = true
    } else {
      check.value = false
    }
    // if(check.value){
    //   Swal.fire({
    //     title: "Are you sure?",
    //     text: "you want to Cancel Operation!",
    //     showCancelButton: false,
    //     showConfirmButton:false,
    //     icon: "error",
    //   })
    // }
  }

  const fn_viewer_open = (formName: any, _datasetList: any, _paramList: any) =>{
    var _params = {
      "projectName": "kaywon"
      ,"formName": formName
    };
    for (var datasetValue in _datasetList) {
      _params[datasetValue] = encodeURIComponent(_datasetList[datasetValue]);
    }
    for (var paramValue in _paramList) {
      _params[paramValue] = _paramList[paramValue];
    }
    var _url = baseMysuitURL + "/UView5/index.jsp"; // MySuit Viewer URL
    var d = new Date();
    var n = d.getTime();
    var name = "UBF_" + n;
    //팝업 오픈 Option 해당 설정은 window.open 설정을 참조
    var windowoption = 'width=1280px,height=650px';
    var form = document.createElement("form");
    form.setAttribute("method", "post");
    form.setAttribute("action", _url);
    for (var i in _params) {
      if (_params.hasOwnProperty(i)) {
        var param = document.createElement('input');
        param.type = 'hidden';
        param.name = i;
        param.value = encodeURIComponent (_params[i]);
        form.appendChild(param);
      }
    }
    document.body.appendChild(form);
    form.setAttribute("target", name);
    window.open("", name, windowoption);
    form.submit();
    document.body.removeChild(form);
  }

  return {
    loading,
    setLoading,
    check,
    checkRequired,
    setRequired,
    removeRequired,
    arrRequired,
    fn_viewer_open
  }
})

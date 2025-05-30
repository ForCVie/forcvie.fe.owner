<template>
  <div class="modal__sign__body">
    <div class="modal__sign_button_header">
      <span type="file">
        <RadiobuttonBase class="pb-3" v-for="item in listRadio1" :mode="'show'" :value="item.name" v-model="isDrawing"
          :id="item.id" :name="item.id" :key="item.id" :checked="item.name == isDrawing" :label="item.name">
          Checkbox 1
        </RadiobuttonBase>
        <div class="attach_filebox pb-3" v-show="isDrawing == '서명파일 등록'">
          <label for="file" class="relative flex items-center">
            <button @click="clearFileInput"
              class="clear-button absolute bottom-0 top-0 text-red-600 font-extrabold text-1xl right-0 hover:text-red-400 p-4">
              X
            </button>

            <input ref="signatureFileInput" type="file" :id="'signatureFileInput'" :name="name"
              @change="loadSignatureFile" :accept="acceptType" hidden :multiple="multiple" />
            <label :for="'signatureFileInput'"
              class="py-2 px-4 rounded-full text-sm font-semibold bg-violet-50 text-cyan-700 hover:bg-violet-100">첨부파일</label>
            <a href="#" class="ml-3">{{ fileName }}</a>
          </label>
        </div>
      </span>
    </div>
    <div class="drawing-board">
      <canvas ref="canvas" :width="width" :height="height" class="canvas"></canvas>
    </div>
    <p class="font_point text-right">{{ errorMessage }}</p>
  </div>
</template>
<script>
export default {
  name: 'InputDrawBase',
  props: {
    width: Number,
    height: Number
  },
  data() {
    return {
      isDrawing: '그리기',
      canvas: null,
      context: null,
      drawing: false,
      listRadio1: [
        { id: '그리기', name: '그리기' },
        { id: '서명파일 등록', name: '서명파일 등록' }
      ],
      fileName: '프로필 사진 선택',
      dataInput: Blob,
      errorMessage: ''
    }
  },
  mounted() {
    this.initializeCanvas()
  },
  methods: {
    initializeCanvas() {
      this.canvas = this.$refs.canvas
      this.context = this.canvas.getContext('2d')

      // Add event listeners
      this.canvas.addEventListener('mousedown', this.startPosition)
      this.canvas.addEventListener('mouseup', this.endPosition)
      this.canvas.addEventListener('mousemove', this.draw)
      // this.$refs.signatureFileInput.addEventListener("change", this.);
    },
    startPosition(e) {
      this.drawing = true
      this.draw(e)
    },
    endPosition() {
      this.drawing = false
      this.context.beginPath()
    },
    draw(e) {
      if (!this.drawing || this.isDrawing !== '그리기') {
        this.canvas.style.cursor = 'default'
        return
      }

      this.canvas.style.cursor = 'crosshair'

      this.context.lineWidth = 5
      this.context.lineCap = 'round'
      this.context.strokeStyle = '#000'
      const rect = this.canvas.getBoundingClientRect()
      this.context.lineTo(e.clientX - rect.left, e.clientY - rect.top)

      this.context.stroke()
      this.context.beginPath()
      this.context.moveTo(e.clientX - rect.left, e.clientY - rect.top)

      var image = this.canvas.toDataURL('image/png')
      // Chuyển đổi data URL thành Blob
      var byteString = atob(image.split(',')[1])
      var mimeString = image.split(',')[0].split(':')[1].split(';')[0]
      var arrayBuffer = new ArrayBuffer(byteString.length)
      var uint8Array = new Uint8Array(arrayBuffer)

      for (var i = 0; i < byteString.length; i++) {
        uint8Array[i] = byteString.charCodeAt(i)
      }

      var blob = new Blob([arrayBuffer], { type: mimeString })

      this.dataInput = blob
    },
    loadSignatureFile() {
      const fileInput = this.$refs.signatureFileInput
      const files = fileInput.files
      if (files && files.length > 0) {
        if (files[0].type === 'image/png') {
          this.fileName = files[0].name
          this.errorMessage = ''
          const img = new Image()
          img.onload = () => {
            this.drawFile(img)
          }
          img.onerror = this.failed
          img.src = URL.createObjectURL(files[0])
        } else {
          this.errorMessage = '*서명파일은 배경한 투명한 .png 파일을 이용해주세요.';
          this.clearFileInput();
          this.clearSignature();
        }
      }
    },
    drawFile(img) {
      if (this.canvas) {
        this.canvas.width = img.width || 0
        this.canvas.height = img.height || 0
        const ctx = this.canvas.getContext('2d')
        if (ctx) {
          ctx.drawImage(img, 0, 0)
        }
      }
    },
    clearFileInput() {
      this.$refs.signatureFileInput.value = null
      this.fileName = '프로필 사진 선택'
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    },
    clearSignature() {
      this.isDrawing = '그리기'
      this.drawing = false
      this.$refs.signatureFileInput = null
      this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
    }
  }
}
</script>
<style scoped>
.drawing-board {
  border: 2px solid var(--taupe-gray);
  overflow: hidden;
}

.canvas {
  display: block;
  background-color: var(--black-color);
}
</style>

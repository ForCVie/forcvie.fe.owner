<template>
  <div class="mx-auto w-full max-w-4xl rounded-2xl border border-slate-200/80 bg-white p-6 shadow-sm sm:p-8">

    <!-- ==================== HEADER ==================== -->
    <div class="mb-8 flex items-start justify-between gap-4 border-b border-slate-100 pb-5">
      <slot
        name="header-title"
        :current-step="modelValue"
        :total-steps="totalSteps"
      >
        <div>
          <div class="inline-flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-600">
            Bước {{ modelValue + 1 }} / {{ totalSteps }}
          </div>
          <h2 class="mt-2 text-xl font-bold tracking-tight text-slate-800 sm:text-2xl">
            {{ normalizedSteps[modelValue]?.title }}
          </h2>
          <p
            v-if="normalizedSteps[modelValue]?.subtitle"
            class="mt-1 text-sm text-slate-500"
          >
            {{ normalizedSteps[modelValue]?.subtitle }}
          </p>
        </div>
      </slot>

      <!-- Progress Badge / Mini Bar -->
      <div class="flex shrink-0 items-center gap-3">
        <div class="hidden h-2 w-28 overflow-hidden rounded-full bg-slate-100 sm:block">
          <div
            class="h-full rounded-full bg-gradient-to-r from-orange-500 to-amber-500 transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          />
        </div>
        <span class="text-xs font-bold tabular-nums text-slate-600">
          {{ progressPercentage }}%
        </span>
      </div>
    </div>


    <!-- ==================== STEPPER TRACK ==================== -->
    <div class="mb-8 px-2">
      <div class="relative flex items-center justify-between">
        <template
          v-for="(step, index) in normalizedSteps"
          :key="step.key ?? index"
        >
          <!-- Step Circle + Title Container -->
          <div class="relative z-10 flex flex-col items-center">
            <button
              type="button"
              class="group flex flex-col items-center focus:outline-none"
              :disabled="!canNavigateTo(index)"
              @click="goToStep(index)"
            >
              <!-- Circle -->
              <div
                class="flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-all duration-300"
                :class="getStepCircleClass(index)"
              >
                <svg
                  v-if="isCompleted(index)"
                  class="h-5 w-5 stroke-[2.5]"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                </svg>

                <span v-else class="tabular-nums">
                  {{ index + 1 }}
                </span>
              </div>

              <!-- Title -->
              <div class="mt-2 text-center">
                <span
                  class="block text-xs font-semibold transition-colors duration-200"
                  :class="getStepTextClass(index)"
                >
                  {{ step.title }}
                </span>
              </div>
            </button>
          </div>

          <!-- Connector Line -->
          <div
            v-if="index < totalSteps - 1"
            class="relative flex-1 px-3"
            style="top: -14px;"
          >
            <div
              class="h-[2px] w-full transition-colors duration-500"
              :class="isCompleted(index) ? 'bg-orange-500' : 'bg-slate-200'"
            />
          </div>
        </template>
      </div>
    </div>


    <!-- ==================== CONTENT BODY ==================== -->
    <div class="min-h-[200px]">
      <slot
        :name="`step-${modelValue}`"
        :current-step="modelValue"
        :total-steps="totalSteps"
        :next="next"
        :previous="previous"
      />
    </div>

  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: { type: Number, default: 0 },
  steps: { type: Array, default: () => [] },
  linear: { type: Boolean, default: true }
})

const emit = defineEmits(['update:modelValue', 'change'])

const normalizedSteps = computed(() => {
  return props.steps.map((step, index) => ({ key: index, title: `Step ${index + 1}`, ...step }))
})
const totalSteps = computed(() => normalizedSteps.value.length)

const progressPercentage = computed(() => {
  if (totalSteps.value <= 1) return 100
  return Math.round((props.modelValue / (totalSteps.value - 1)) * 100)
})

const isCompleted = (index) => index < props.modelValue
const isCurrent = (index) => index === props.modelValue

const canNavigateTo = (index) => {
  if (!props.linear) return true
  return index <= props.modelValue
}

const getStepCircleClass = (index) => {
  if (isCompleted(index)) return 'bg-orange-500 text-white shadow-sm ring-4 ring-orange-100'
  if (isCurrent(index)) return 'bg-white text-orange-500 border-2 border-orange-500 ring-4 ring-orange-100'
  return 'bg-slate-100 text-slate-400 border border-slate-200'
}

const getStepTextClass = (index) => {
  if (isCompleted(index)) return 'text-slate-700'
  if (isCurrent(index)) return 'text-orange-600 font-bold'
  return 'text-slate-400'
}

// Hàm chuyển bước cho Nút Next / Back (Không bị chặn bởi canNavigateTo)
const previous = () => {
  if (props.modelValue <= 0) return
  const prevStep = props.modelValue - 1
  emit('update:modelValue', prevStep)
  emit('change', { from: props.modelValue, to: prevStep })
}

const next = () => {
  if (props.modelValue >= totalSteps.value - 1) return
  const nextStep = props.modelValue + 1
  emit('update:modelValue', nextStep)
  emit('change', { from: props.modelValue, to: nextStep })
}

// Hàm dành riêng cho việc CLICK VÀO VÒNG TRÒN SỐ trên Header
const goToStep = (index) => {
  // Chỉ kiểm tra khi click nhảy cóc trên thanh Header
  if (!canNavigateTo(index) || index === props.modelValue) return
  
  emit('update:modelValue', index)
  emit('change', { from: props.modelValue, to: index })
}
</script>
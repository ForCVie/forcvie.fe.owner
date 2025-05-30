<template>
  <VueApexCharts
      v-if="dataset.length > 0"
      :height="chartHeight"
      :series="dataset"
      :options="chartOptions"
  ></VueApexCharts>
  <VueApexCharts
      v-else
      :height="chartHeight"
      :series="[1]"
      :options="chartOptionsNull"
  ></VueApexCharts>
</template>
<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {onMounted, reactive, ref, toRefs} from 'vue'
import type { labelsPosition as ChartLabelsPosition } from '@/types/chart/ChartTypes'
import { COLOR } from '@/constants/common.const'

const props = defineProps({
  dataset: {
    type:Object,
    required:true
  },
  color: {
    type: [String],
    default:COLOR
  },
  labelsPosition: {
    type:Object as ChartLabelsPosition,
    default: () => ({
      position: 'right',
      horizontalAlign: 'center'
    })
  },
  show: {
    type:Boolean ,
    default:false
  },
  category: {
    type:[String],
    required:true
  },
  chartHeight: {
    type: Number,
    default: 300,
  },
})
const { dataset,color,labelsPosition ,show,category,chartHeight} = toRefs(props)

const chartOptions = reactive({
  chart: {
    type: 'donut',
  },
  labels: category,
  colors: color.value || '',
  legend: {
    ...labelsPosition.value,
    show: show.value
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom',
      }
    }
  }],
  plotOptions: {
    pie: {
      dataLabels: {
        offset: -2,
      },
      expandOnClick: true
    }
  },
})

const chartOptionsNull = reactive({
  chart: {
    type: 'donut',
  },
  labels: ['No Data'],
  colors: ['#747474'],
  legend: {
    ...labelsPosition.value,
    show: show.value
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200,
        color: ['#000000', '#8400ff'],
      },
      legend: {
        position: 'bottom',
      }
    }
  }],
  plotOptions: {
    pie: {
      expandOnClick: false,
      dataLabels: {
        offset: -2,
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    enabled: false,
  },
})
</script>

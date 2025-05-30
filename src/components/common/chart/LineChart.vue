<template>
  <div id="chart-wrapper">
    <div id="chart-container">
      <VueApexCharts
          :height="chartHeight"
          :series="dataset"
          :options="chartOptions"
      ></VueApexCharts>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from 'vue3-apexcharts'
import {reactive, toRefs} from 'vue'
import type {labelsPosition as ChartLabelsPosition} from '@/types/chart/ChartTypes';
import {COLOR} from '@/constants/common.const'

const props = defineProps({
  dataset: {
    type: Object,
    required: true
  },
  color: {
    type: [String],
    default: COLOR
  },
  labelsPosition: {
    type: Object as ChartLabelsPosition,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  chartHeight: {
    type: Number,
    default: 250,
  }
})

const {dataset, color, labelsPosition, title, category, chartHeight} = toRefs(props)

const chartOptions = reactive({
  chart: {
    height: 350,
    type: 'line',
    dropShadow: {
      enabled: true,
      color: '#000',
      top: 18,
      left: 7,
      blur: 10,
      opacity: 0.2
    },
    zoom: {
      enabled: false
    },
    toolbar: {
      show: false
    }
  },
  colors: color,
  dataLabels: {
    enabled: true,
  },
  stroke: {
    curve: 'smooth'
  },
  title: {
    text: title,
    align: 'left'
  },
  grid: {
    borderColor: '#e7e7e7',
    row: {
      colors: ['#ffffff', 'transparent'], // takes an array which will be repeated on columns
      opacity: 0.5
    },
  },
  markers: {
    size: 1
  },
  xaxis: {
    categories: category,
  },
  yaxis: {
    min: 0,
    max: 5
  },
  legend: labelsPosition
})
</script>

<style lang="scss" scoped>
#chart-wrapper {
  max-width: 1760px;
  overflow-x: auto; /* Only allow horizontal scrolling */
  overflow-y: hidden; /* Disable vertical scrolling */
  height: 100%;
  width: 100%;
}

#chart-container {
  width: 100%; /* This ensures the inner container is 1000px wide */
  height: 100%;
}

#chart-container .apexcharts-canvas {
  height: 100% !important;
}

@media screen and (max-width: 1024px) {
  #chart-container {
    width: 1000px;
  }
}
</style>
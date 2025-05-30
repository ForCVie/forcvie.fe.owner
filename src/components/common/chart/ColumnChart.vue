<template>
  <div id="chart-wrapper">
    <div id="chart-container">
      <span v-if="titleChart">{{ titleChart }}</span>
      <VueApexCharts :height="chartHeight || 210" :options="chartOptions" :series="dataset"></VueApexCharts>
    </div>
  </div>
</template>
<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import type {barChartDataset, labelsPosition as ChartLabelsPosition} from '@/types/chart/ChartTypes'
import {reactive, toRefs} from 'vue'
import {COLOR} from '@/constants/common.const'

const props = defineProps({
  titleChart:{
    type: String,
    required: false
  },
  title: {
    type: String,
    required: false
  },
  dataset: {
    type: Object as barChartDataset[],
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  tooltip: {
    function() {
      return String
    },
    required: false
  },
  labelsPosition: {
    type: Object as ChartLabelsPosition,
    required: true
  },
  color: {
    type: [String],
    default: COLOR
  },
  chartHeight: {
    type: Number,
    default: 250,
  },
  isShowToolbar: {
    type: Boolean,
    default: false,
  }
})
const {titleChart, title, chartHeight, dataset, category, tooltip, labelsPosition, color, isShowToolbar} = toRefs(props)


const chartOptions = reactive({
  chart: {
    type: 'bar',
    toolbar: {
      show: isShowToolbar,
    }
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    },
  },
  dataLabels: {
    enabled: true,
    position: 'center',
    offsetY: 0,
    style: {
      fontSize: '12px',
      colors: ['#333']
    }
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: category,
  },
  yaxis: {
    title: {
      text: title
    }
  },
  legend: labelsPosition.value || {
    position: 'bottom',
    horizontalAlign: 'center'
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: tooltip
    }
  },
  colors: color.value || '',
})
document.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style');
  style.textContent = `
      body::-webkit-scrollbar {
        width: 5px;
        height: 5px;
      }
      body::-webkit-scrollbar-thumb {
        background: var(--sky-blue);
        border-radius: 10px;
      }
      body::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0);
      }
    `;
  document.head.append(style);
});
</script>

<style lang="scss" scoped>
#chart-wrapper {
  max-width: 1760px;
  overflow-x: auto; /* Only allow horizontal scrolling */
  overflow-y: hidden; /* Disable vertical scrolling */
  height: 100%;
  width: 100%;
  /* Optional: to ensure the chart wrapper takes full height and width */
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

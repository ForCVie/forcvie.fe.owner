<template>
  <div id="chart">
    <VueApexCharts ref="semiChart" type="donut" :height="210" :options="chartOptions" :series="dataset"></VueApexCharts>
    <div class="underline"></div>
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import {COLOR} from "@/constants/common.const";
import type {labelsPosition as ChartLabelsPosition} from "@/types/chart/ChartTypes";
import {toRefs} from "vue";

const props = defineProps({
  dataset: {
    type:Object,
    required:true
  },
  color: {
    type: [String],
    default:COLOR
  },
  colorLabelsPosition: {
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
const semiChart = ref(null)
const { dataset,color,labelsPosition ,show,category,chartHeight,colorLabelsPosition} = toRefs(props)
const chartOptions = ref ({
  chart: {
    type: 'donut',
    events: {
      click: function(event, chartContext, config) {
        event.preventDefault();
        return
      },
    },
  },
  labels:category,
  colors: color.value || '',
  legend: {
    ...labelsPosition.value,
    show: show.value
  },
  dataLabels: {
    enabled: true,
    position: 'center',
    offsetY: 0,
    style: {
      fontSize: '12px',
      colors: colorLabelsPosition.value
    }
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 10
    }
  },
  grid: {
    padding: {
      bottom: -80
    }
  },
  tooltip: {
    enabled: false,
  },
  responsive: [{
    breakpoint: 480,
    options: {
      chart: {
        width: 200
      },
      legend: {
        position: 'bottom'
      }
    }
  }],
  states: {
    active:{
      filter:'none'
    }
  }
})

</script>

<style scoped>
#chart {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.underline {
  width: 250px;
  border-bottom: 2px dashed var(--white-color);
  position: absolute;
  bottom: 33%;
}

</style>
<template>
  <div id="chart-wrapper">
    <div id="chart-container">
      <span v-if="titleChart">{{ titleChart }}</span>
      <VueApexCharts type="bar" :height="chartHeight || 210" :options="chartOptions" :series="dataset"></VueApexCharts>
    </div>
  </div>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import type { barChartDataset, labelsPosition as ChartLabelsPosition } from '@/types/chart/ChartTypes';
import { reactive, toRefs } from 'vue';
import { COLOR } from '@/constants/common.const';

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
    type: Object,
    required: true
  },
  category: {
    type: [String],
    required: true
  },
  tooltip: {
    function() {
      return String;
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
    default: 250
  },
  horizontal: {
    type:Boolean,
    default:false
  }
});

const { titleChart, title, chartHeight, dataset, category, tooltip, labelsPosition, color ,horizontal} = toRefs(props);

const chartOptions = reactive({
  chart: {
    type: 'bar',
    height: 350,
    toolbar: {
      show: false,
    }
  },
  plotOptions: {
    bar: {
      horizontal: horizontal,
      barHeight: '70%',
      distributed: true,
      dataLabels: {
        position: 'center'
      },
    }
  },
  stroke: {
    width: 1,
    colors: ['#fff']
  },
  dataLabels: {
    enabled: true,
    position: 'center',
    offsetY: 0,
    style: {
      fontSize: '12px',
      colors: ['#ffffff']
    }
  },
  xaxis: {
    categories: category,
  },
  yaxis: {
    min: 0,
    max: 100,
    tickAmount: 11,
    stepSize:10,
    forceNiceScale:true,
    reversed: false,
    axisTicks: {
      show: true
    },
    labels :{
      show: false,
    },
  },
  grid: {
    xaxis: {
      lines: {
        show: true
      }
    },
    yaxis: {
      lines: {
        show: false
      }
    }
  },
  tooltip: {
    y: {
      formatter: tooltip
    }
  },
});
</script>

<style lang="scss" scoped>
#chart-container > span {
  font-size: 20px;
  line-height: 1.3em;
  font-weight: bold;
  padding-left: 24px;
}
</style>


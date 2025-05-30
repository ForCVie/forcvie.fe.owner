<template>
  <VueApexCharts
    type="bar"
    :height="chartHeight"
    class="bar_chart"
    :options="chartOptions"
    :series="props.dataset"
  ></VueApexCharts>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import type { barChartDataset } from "@/types/chart/ChartTypes";

interface Props {
  chartHeight?: number;
  dataset: barChartDataset[];
  colorset: string[];
  labels: string[];
}
const props = withDefaults(defineProps<Props>(), {
  chartHeight: 210,
});
const chartOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    offsetX: -10,
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      distributed: true,
      horizontal: true,
    },
  },
  colors: props.colorset,
  legend: {
    position: "top",
    horizontalAlign: "right",
    fontSize: "12px",
    labels: {
      colors: "#222",
    },
    markers: {
      width: 8,
      height: 8,
      radius: 0,
    },
  },
  xaxis: {
    categories: props.labels,
    labels: {
      style: {
        colors: "#898D9C",
        fontSize: "12px",
        fontWeight: 500,
      },
    },
    stepSize: 50,
    tickAmount: 6,
    axisTicks: {
      height: 0,
    },
  },
  yaxis: {
    min: 0,
    max: 300,
    tickAmount: 6,
    labels: {
      show: false,
    },
  },
  grid: {
    strokeDashArray: 1,
    xaxis: {
      lines: {
        show: true,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
};
</script>

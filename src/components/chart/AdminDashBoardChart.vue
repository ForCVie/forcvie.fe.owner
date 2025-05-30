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
  chartHeight: 400,
});
const chartOptions = {
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    offsetX: -27,
  },
  plotOptions: {
    bar: {
      borderRadius: 0,
      distributed: true,
      horizontal: true,
      barHeight: "30px",
      // columnWidth: "20px",
    },
  },
  colors: props.colorset,
  legend: {
    position: "bottom",
    horizontalAlign: "center",
    fontSize: "14px",
    fontWeight: 500,
    labels: {
      colors: "#222",
    },
    itemMargin: {
      horizontal: 10,
      vertical: 20,
    },
    markers: {
      width: 14,
      height: 14,
      radius: 2,
    },
  },
  xaxis: {
    categories: props.labels,
    labels: {
      style: {
        colors: "#898D9C",
        fontSize: "14px",
        fontWeight: 500,
      },
      formatter: function (val) {
        if (val === 100) {
          return val + " (점)";
        }
        return val;
      },
    },
    stepSize: 50,
    tickAmount: 10,
    axisTicks: {
      height: 0,
    },
  },
  yaxis: {
    min: 0,
    max: 100,
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
  tooltip: {
    style: {
      fontSize: "12px",
      fontWeight: "600",
    },
    y: {
      formatter: function (val) {
        return val + "점";
      },
    },
  },
};
</script>

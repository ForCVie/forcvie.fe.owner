<template>
  <VueApexCharts
    :height="chartHeight"
    class="donut_chart"
    :series="props.dataset.series"
    :options="chartOptions"
  ></VueApexCharts>
</template>

<script setup lang="ts">
import VueApexCharts from "vue3-apexcharts";
import type { PieChartDataset } from "@/types/chart/ChartTypes";

interface Props {
  chartHeight?: number;
  dataset: PieChartDataset;
}

const props = withDefaults(defineProps<Props>(), {
  chartHeight: 250,
});

const chartOptions = {
  chart: {
    width: 250,
    type: "donut",
  },
  labels: props.dataset.label,
  legend: {
    position: "bottom",
    offsetY: 0,
    fontSize: "14px",
    markers: {
      width: 10,
      height: 10,
      radius: 2,
      fillColors: ["#FF8F66", "#FFF"],
    },
    itemMargin: {
      horizontal: 10,
      vertical: 0,
    },
    labels: {
      colors: "#898D9C",
      useSeriesColors: false,
    },
  },
  fill: {
    colors: ["#FF8F66", "#FFF"],
  },
  stroke: {
    show: false,
  },
  dataLabels: {
    textAnchor: "start",
    dropShadow: {
      enabled: false,
    },
    style: {
      fontSize: "14px",
      fontWeight: "600",
      fontFamily: "NotoSansKR",
      colors: ["#FFF", "#F27367"],
    },
  },
  grid: {
    padding: {
      bottom: -90,
    },
  },
  plotOptions: {
    pie: {
      startAngle: -90,
      endAngle: 90,
      offsetY: 0,
      donut: {
        size: "60%",
      },
    },
  },
  tooltip: {
    fillSeriesColor: false,
    theme: "light",
    style: {
      fontSize: "12px",
      fontWeight: "600",
    },
    y: {
      formatter: function (val) {
        return val + "점";
      },
    },
    custom: function ({ series, seriesIndex, dataPointIndex, w }) {
      return '<div class="donutchart_tooltip"><span>' + series[seriesIndex] + "%</span></div>";
    },
  },
};
</script>

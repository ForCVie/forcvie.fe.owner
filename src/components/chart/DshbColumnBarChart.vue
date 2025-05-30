<template>
  <VueApexCharts
    type="bar"
    :height="chartHeight"
    class="bar_chart"
    :options="chartOptions"
    :series="props.dataset"
    :key="key"
  ></VueApexCharts>
</template>

<script setup lang="ts">
import {ref} from "vue"
import VueApexCharts from "vue3-apexcharts";
import type { ColumnChartDataset } from "@/types/chart/ChartTypes";

interface Props {
  chartHeight?: number;
  dataset: ColumnChartDataset[];
  colorset: string[];
  labels: string[];
}
const props = withDefaults(defineProps<Props>(), {
  chartHeight: 235,
});
const chartOptions = ref({
  chart: {
    type: "bar",
    toolbar: {
      show: false,
    },
    offsetX: 0,
    offsetY: 5,
  },
  fill: {
    opacity: 1,
  },
  stroke: {
    show: false,
  },
  plotOptions: {
    bar: {
      borderRadiusApplication: "end",
      borderRadius: 0,
      columnWidth: "44px",
      distributed: true,
      dataLabels: {
        position: "top",
      },
    },
  },
  legend: {
    show: false,
  },
  colors: props.colorset,
  grid: {
    xaxis: {
      lines: {
        show: false,
      },
    },
    yaxis: {
      lines: {
        show: false,
      },
    },
  },
  xaxis: {
    categories: props.labels,
    labels: {
      style: {
        colors: "#222",
        fontFamily: "NotoSansKR",
        fontSize: "1.6rem",
        fontWeight: 500,
      },
      rotate: 0,
      offsetX: 0,
      offsetY: 3,
      trim: true,
    },
    axisBorder: {
      show: false,
    },
    axisTicks: {
      height: 0,
    },
    tickPlacement: "between",
  },
  yaxis: {
    labels: {
      show: false,
    },
  },
  dataLabels: {
    enabled: true,
    offsetY: -10,
    textAnchor: "middle",
    style: {
      colors: ["#222222"],
      fontSize: "2.2rem",
      fontFamily: "Gotham",
      fontWeight: 600,
    },
  },
  /* stroke: {
    colors: ["transparent"],
    width: props.stroke,
  }, */
  /* responsive: [
    {
      breakpoint: 768,
      options: {
        plotOptions: {
          bar: {
            columnWidth: "80%",
          },
        },
        title: {
          offsetY: 15,
          style: {
            fontSize: "1.8rem",
          },
        },
        xaxis: {
          labels: {
            style: {
              fontSize: "12px",
            },
            offsetY: 0,
          },
        },
        dataLabels: {
          style: {
            fontSize: "12px",
          },
        },
        stroke: {
          width: 6,
        },
      },
    },
    {
      breakpoint: 480,
      options: {
        title: {
          floating: false,
          margin: 20,
        },
        legend: {
          fontSize: "12px",
          itemMargin: {
            horizontal: 5,
            vertical: 0,
          },
          markers: {
            width: 10,
            height: 10,
          },
        },
        stroke: {
          width: 4,
        },
      },
    },
  ], */
});
const key = ref(0)

watch(() => props.labels, (newLabels) => {
  if (newLabels) {
    chartOptions.value.xaxis.categories = newLabels;
    key.value++
  }
});
</script>

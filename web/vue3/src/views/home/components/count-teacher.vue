<template>
  <div class="count-views count-teacher">
    <div class="card">
      <div class="card__header">
        <span class="label">授课教师总量</span>
        <span class="value">1</span>
      </div>

      <div class="card__container">
        <v-chart :option="chartOption" autoresize />
      </div>

      <div class="card__footer flex-center">
        <div>
          <span class="label">日增教师</span>
          <span class="value">0</span>
        </div>
        <div>
          <span class="label">派遣率</span>
          <span class="value">0%</span>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { reactive } from "vue";
export default {
  setup() {
    const chartOption = reactive({
      grid: {
        left: "10%",
        top: 0,
        right: "10%",
        bottom: 0,
      },
      xAxis: {
        type: "category",
        data: [
          "00:00",
          "2:00",
          "4:00",
          "6:00",
          "8:00",
          "10:00",
          "12:00",
          "14:00",
        ],
        boundaryGap: false,
      },
      yAxis: {
        type: "value",
        splitLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      series: [
        {
          barWidth: 18,
          name: "付款笔数",
          type: "bar",
          data: [81, 24, 77, 13, 87, 92, 68, 55],
          itemStyle: {
            normal: {
              color: "#4165d7",
            },
          },
        },
        {
          type: "bar",
          barWidth: 18,
          xAxisIndex: 0,
          barGap: "-100%",
          data: [100, 100, 100, 100, 100, 100, 100, 100],
          itemStyle: {
            normal: {
              color: "#f1f1f9",
            },
          },
          zlevel: -1,
        },
      ],
    });
    return {
        chartOption
    }
  },
};
</script>

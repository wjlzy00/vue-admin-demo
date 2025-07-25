<template>
  <div class="dashboard">
    <div class="title">
      <h1>仪表盘</h1>
    </div>
    
    <!-- 统计卡片 -->
    <a-row :gutter="16" style="margin-bottom: 24px">
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总用户数"
            :value="1128"
            :value-style="{ color: '#3f8600' }"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总订单数"
            :value="2456"
            :value-style="{ color: '#1890ff' }"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="总商品数"
            :value="892"
            :value-style="{ color: '#722ed1' }"
          />
        </a-card>
      </a-col>
      <a-col :span="6">
        <a-card>
          <a-statistic
            title="今日销售额"
            :value="12580"
            prefix="¥"
            :value-style="{ color: '#cf1322' }"
          />
        </a-card>
      </a-col>
    </a-row>

    <!-- 图表区域 -->
    <a-row :gutter="16">
      <a-col :span="12">
        <a-card title="销售趋势">
          <v-chart 
            class="chart" 
            :option="lineChartOption" 
            autoresize
          />
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card title="商品分类占比">
          <v-chart 
            class="chart" 
            :option="pieChartOption" 
            autoresize
          />
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="16" style="margin-top: 16px">
      <a-col :span="24">
        <a-card title="月度销售数据">
          <v-chart 
            class="chart-large" 
            :option="barChartOption" 
            autoresize
          />
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'

// 折线图配置
const lineChartOption = reactive({
  title: {
    text: '最近7天销售趋势'
  },
  tooltip: {
    trigger: 'axis'
  },
  xAxis: {
    type: 'category',
    data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
  },
  yAxis: {
    type: 'value'
  },
  series: [{
    data: [820, 932, 901, 934, 1290, 1330, 1320],
    type: 'line',
    smooth: true,
    itemStyle: {
      color: '#1890ff'
    }
  }]
})

// 饼图配置
const pieChartOption = reactive({
  title: {
    text: '商品分类分布',
    left: 'center'
  },
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b}: {c} ({d}%)'
  },
  legend: {
    orient: 'vertical',
    left: 'left'
  },
  series: [{
    name: '商品分类',
    type: 'pie',
    radius: '50%',
    data: [
      { value: 335, name: '电子产品' },
      { value: 310, name: '服装鞋帽' },
      { value: 234, name: '家居用品' },
      { value: 135, name: '图书音像' },
      { value: 148, name: '其他' }
    ],
    emphasis: {
      itemStyle: {
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    }
  }]
})

// 柱状图配置
const barChartOption = reactive({
  title: {
    text: '月度销售对比'
  },
  tooltip: {
    trigger: 'axis'
  },
  legend: {
    data: ['2023年', '2024年']
  },
  xAxis: {
    type: 'category',
    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },
  yAxis: {
    type: 'value'
  },
  series: [
    {
      name: '2023年',
      type: 'bar',
      data: [2000, 4900, 7000, 2300, 2500, 7600, 7600, 7600, 9000, 14500, 18000, 21000],
      itemStyle: {
        color: '#1890ff'
      }
    },
    {
      name: '2024年',
      type: 'bar',
      data: [2600, 5900, 9000, 2640, 2800, 7000, 8500, 9200, 11000, 17000, 21000, 25000],
      itemStyle: {
        color: '#52c41a'
      }
    }
  ]
})
</script>

<style scoped>
.dashboard {
  padding: 24px;
}

.title {
  margin-bottom: 24px;
}

.chart {
  height: 300px;
}

.chart-large {
  height: 400px;
}

:deep(.ant-card-head-title) {
  font-size: 16px;
  font-weight: 600;
}
</style>

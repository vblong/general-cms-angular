import { EChartsOption } from 'echarts';

export let pageViewsChartOption: EChartsOption = {
  xAxis: {
    show: false,
    type: 'category',
    data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  },
  yAxis: {
    show: false,
    type: 'value'
  },
  series: [
    {
      data: [120, 200, 150, 80, 70, 110, 130],
      type: 'bar',
      showBackground: false,
      backgroundStyle: {
        color: 'rgba(255, 255, 255, 0.2)'
      },
      color: '#ffffff'
    }
  ],
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  tooltip: {
    show: true
  }
};

export let salesChartOption: EChartsOption = {
  title: {
    text: 'Dynamic Data & Time Axis',
    show: false
  },
  tooltip: {
    trigger: 'axis',
    formatter: function (params) {
      params = params[0];
      var date = new Date(params.name);
      return (
        date.getDate() +
        '/' +
        (date.getMonth() + 1) +
        '/' +
        date.getFullYear() +
        ' : ' +
        params.value[1]
      );
    },
    axisPointer: {
      animation: false
    }
  },
  xAxis: {
    show: false,
    type: 'time',
    splitLine: {
      show: false
    },
    boundaryGap: false
  },
  yAxis: {
    show: false,
  },
  series: [
    {
      type: 'line',
      showSymbol: false,
      data: [],
      color: '#ffffff',
      areaStyle: {}
    }
  ],
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
};

export let demographicChartOption: EChartsOption = {
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: 'User distribution',
      type: 'pie',
      label: {
        show: false
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        { value: 40, name: 'USA' },
        { value: 38, name: 'United Kingdom' },
        { value: 32, name: 'Germany' },
        { value: 30, name: 'France' },
        { value: 26, name: 'Switzerland' },
      ]
    }
  ],
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
};

export let userChartOption: EChartsOption = {
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  grid: {
    left: 0,
    top: 0,
    right: 0,
    bottom: 0
  },
  xAxis: {
    type: 'value',
    boundaryGap: [0, 0.01],
    splitLine: {
        show: false
    }
  },
  yAxis: {
    splitLine: {
        show: false
    },
    data: ['Student/Employed', 'Adult/Children', 'Male/Female']
  },
  series: [
    {
      type: 'bar',
      data: [104970, 131744, 630230]
    },
    {
      type: 'bar',
      data: [121594, 134141, 681807]
    }
  ]
};

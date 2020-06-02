<script>
  import { Line } from 'vue-chartjs'
  import Printable from './Printable.js'
  export default {
    extends: Line,
    mixins: [Printable],
    props: {
      chartData: {
        type: Array | Object,
        required: false
      },
      chartLabels: {
        type: Array,
        required: true
      }
    },
    data () {
      return {
        gradient: null,
        options: {
          showScale: true,
          scales: {
            yAxes: [{
              ticks: {
                beginAtZero: false,
                callback: (value, index, values) => {
                  return this.formatNumber(value)
                },
              },
              gridLines: {
                display: true,
                color: 'rgb(230,230,230)',
                borderDash: [5, 15]
              },
              scaleLabel:{
                labelString: 'Equity ($)',
                display: true,
                fontSize: 14
              }
            }],
            xAxes: [ {
              gridLines: {
                display: true,
                color: 'rgb(230,230,230)',
                borderDash: [5, 15]
              }
            }]
          },
          tooltips: {
            backgroundColor: '#08182b',
            titleFontStyle: 'normal',
            titleFontSize: 18,
            bodyFontFamily: "'Proxima Nova', sans-serif",
            cornerRadius: 3,
            bodyFontColor: '#20C4C8',
            bodyFontSize: 14,
            xPadding: 14,
            yPadding: 14,
            displayColors: false,
            mode: 'index',
            intersect: false,
            callbacks: {
              title: tooltipItem => {
                return `🗓 ${tooltipItem[0].xLabel}`
              },
              label: (tooltipItem, data) => {
                let dataset = data.datasets[tooltipItem.datasetIndex]
                let currentValue = dataset.data[tooltipItem.index]
                return `$ ${currentValue.toLocaleString()}`
              }
            }
          },
          legend: {
            display: false
          },
          responsive: true,
          maintainAspectRatio: false
        }
      }
    },
    mounted () {
      this.gradient = this.$refs.canvas
        .getContext('2d')
        .createLinearGradient(0, 0, 0, 450)
      // this.gradient.addColorStop(0, 'rgb(8, 24, 60, 1)')
      // this.gradient.addColorStop(0.5, 'rgb(8, 24, 60, 0.75)')
      // this.gradient.addColorStop(1, 'rgb(8, 24, 60, 0.5)')
      this.renderChart({
        labels: this.chartLabels,
        datasets: [
          {
            label: 'equity',
            borderColor: '#249EBF',
            pointBackgroundColor: 'rgba(0,0,0,0)',
            pointBorderColor: 'rgba(0,0,0,0)',
            pointHoverBorderColor: '#08182b',
            pointHoverBackgroundColor: '#fff',
            pointHoverRadius: 4,
            pointHitRadius: 30,
            pointHoverBorderWidth: 1,
            borderWidth: 1,
            backgroundColor: this.gradient,
            data: this.chartData
          }
        ]
      }, this.options)
      setTimeout(() => {
        this.download()
      }, 500)
    },
    methods: {
      formatNumber (num) {
        let numString = Math.round(num).toString()
        let numberFormatMapping = [[6, 'M'], [3, 'K']]
        for (let [numberOfDigits, replacement] of numberFormatMapping) {
          if (numString.length > numberOfDigits) {
            let decimal = ''
            if (numString[numString.length - numberOfDigits] !== '0') {
              decimal = '.' + numString[numString.length - numberOfDigits]
            }
            numString = '$' + numString.substr(0, numString.length - numberOfDigits+3) + decimal + replacement
            break
          }
        }
        return numString
      }
    }
  }
</script>
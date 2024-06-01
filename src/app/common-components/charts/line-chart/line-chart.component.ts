import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit,OnChanges{
  @Input() id;
  @Input() data;
  @Input() chartColors: any[];
  @Input() labels:  any[];
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    this.drawDougnutChart();
  }

  ngOnInit(): void {
    // if(this.data) this.data[0].fillColor = '#CEDBFE';
    this.drawDougnutChart();
  }

  public drawDougnutChart() {
    Highcharts.setOptions({
      colors: this.chartColors
    });
    const options: any = {
      chart : {
        type: 'line',
         plotBorderWidth: null,
         plotShadow: false
      },
      title: {
        text: '',
        style: {
          fontSize: '24px'
        }
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: this.labels,
        title: {
          text: ''
      }
      },
      yAxis: {
        title: {
            text: ''
        }
    },
    legend:{
      verticalAlign : 'top',
    },
    plotOptions: {
      series: {
        pointWidth: 15
      },
      line: {
          dataLabels: {
              enabled: true
          },
         enableMouseTracking: true
      },
    },
      series : this.data
   };

    Highcharts.chart(this.id, options);
  }

}

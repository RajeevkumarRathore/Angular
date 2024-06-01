import { Component, Input, OnChanges, OnInit } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.scss']
})
export class BarChartComponent implements OnInit  , OnChanges{
  @Input() id;
  @Input() data;
  @Input() chartColors: any[];
  @Input() labels:  any[];

  ngOnChanges(): void {
    this.drawFbaStockDefaultChart();
  }


  ngOnInit(): void {
    this.drawFbaStockDefaultChart();
  }

  public drawFbaStockDefaultChart() {
    Highcharts.setOptions({
      colors: this.chartColors,
    })
    const options: any = {
      chart: {
        height: 200,
        type: 'column'
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        // categories: [334,46,576,77],
        categories: this.labels,
        crosshair: true
      },
      yAxis: {
        min: 0,
        title: {
          text: ''
        }
      },
      tooltip: {
        pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b> ({point.percentage:.0f}%)<br/>',
        shared: true
      },
      legend:{
        verticalAlign : 'top',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0
        }
      },
      series: this.data
    };
    Highcharts.chart(this.id, options);
  }
}

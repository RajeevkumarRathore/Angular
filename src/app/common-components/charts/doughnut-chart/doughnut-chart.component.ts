import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import * as Highcharts from 'highcharts';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.scss']
})
export class DoughnutChartComponent implements OnInit , OnChanges{
  @Input() id;
  @Input() data;
  @Input() chartColors;
  @Input() innerSize;
  @Input()totalCalls;
  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.drawDougnutChart();
  }

  ngOnInit(): void {
    this.drawDougnutChart();
  }

  public drawDougnutChart() {
    Highcharts.setOptions({
      colors: this.chartColors
    });
    const options: any = {
      chart : {
         plotBorderWidth: null,
         plotShadow: false
      },
      
      title: {
        text:  'Total</br>' + this.totalCalls,
        style: {
          fontSize: '14px'
        },
        verticalAlign: 'middle',
        floating: true,
        
        
      },
      credits: {
        enabled: false
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      plotOptions : {
        pie: {
           shadow: false,
           center: ['50%', '50%'],
           size:'100%',
           innerSize: this.innerSize
        }
      },
      series : [
        {
         type: 'pie',
         name: '',
         radius: '55%',
         innerRadius: '38%',
         data: this.data,
         dataLabels: {
          format: '<span style="opacity: 0.5">{point.percentage:.1f}%</span>',
          style: {
              fontWeight: 'normal'
          }
      },
        }
      ]
   };

    Highcharts.chart(this.id, options);
  }

}

import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['../../app.component.scss', './dashboard.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
  labels = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
  AnalysisAreaChartColors = [
    {
      backgroundColor: '#2196f3',
    },
    {
      backgroundColor: '#19d895'
    }
  ];
  AnalysisAreaChartData = [
    {
      label: 'Product',
      data: [3, 3, 8, 5, 7, 4, 6, 4, 6, 3]
    },
    {
      label: 'Product',
      data: [7, 5, 14, 7, 12, 6, 10, 6, 11, 5]
    }
  ];
  AnalysisAreaChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [{
        gridLines: {
          color: "#F2F6F9"
        },
        ticks: {
          beginAtZero: true,
          min: 0,
          max: 20,
          stepSize: 5,
        }
      }],
      xAxes: [{
        gridLines: {
          color: "#F2F6F9"
        },
        ticks: {
          beginAtZero: true
        }
      }]
    },
    legend: {
      display: false
    },
    elements: {
      point: {
        radius: 2
      }
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },
    stepsize: 1
  }

  conversionBarChartData = [
    {
      label: 'Amount Due',
      data: [39, 19, 25, 16, 31, 39, 12, 18, 33, 24]
    }
  ];
  conversionBarChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },

    scales: {
      yAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0, 0, 0, 0.03)',
        }
      }],
      xAxes: [{
        display: false,
        barPercentage: 0.4,
        gridLines: {
          display: false,
        }
      }]
    },
    legend: {
      display: false
    }
  }
  conversionBarChartColors = [
    {
      backgroundColor: '#2196f3',
    }
  ];
  revenueBarChartData = [{
    label: 'Amount Due',
    data: [4, 3, 10, 9, 4, 3, 8, 6, 7, 8]
  }];
  revenueBarChartColors = [
    {
      backgroundColor: '#fff',
    }
  ];
  revenueChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    },

    scales: {
      yAxes: [{
        display: false,
        gridLines: {
          color: 'rgba(0, 0, 0, 0.03)',
        }
      }],
      xAxes: [{
        display: false,
        categoryPercentage: 1.0,
        barPercentage: 0.1,
        gridLines: {
          display: false,
        }
      }]
    }
  }


  UsersDoughnutChartData = [
    {
      label: ['Request', 'Email', 'null'],
      data: [80, 34, 100]
    }
  ];
  UsersDoughnutChartOptions = {
    cutoutPercentage: 70,
    animationEasing: "easeOutBounce",
    animateRotate: true,
    animateScale: false,
    responsive: true,
    maintainAspectRatio: true,
    showScale: true,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 0,
        bottom: 0
      }
    }
  }
  UsersDoughnutChartColors = [{
    backgroundColor: ['#19d895', '#2196f3', '#e6eef2'],
    borderColor: ['#19d895', '#2196f3', '#e6eef2']
  }
  ];
}

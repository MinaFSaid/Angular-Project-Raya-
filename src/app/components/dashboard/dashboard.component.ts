import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { AuthService } from './../../services/auth.service';


@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  chart: any = []
  chart1: any = []

  constructor(public _AuthService:AuthService) { Chart.register(...registerables) }

  ngOnInit(): void {
    this.chart = new Chart("myChart", {

      type: 'bar',

      data: {

        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'july', 'August'],

        datasets: [{

          label: 'products',

          backgroundColor: [

            'rgba(255, 99, 132, 0.7)',

            'rgba(255, 159, 64, 0.7)',

            'rgba(255, 205, 86, 0.7)',

            'rgba(75, 192, 192, 0.7)',

            'rgba(28, 80, 8, 0.7)',

            'rgba(155, 119, 20, 0.8)',

            'rgba(228, 69, 21, 0.7)',

            'rgba(109, 43, 89, 0.7)'

          ],

          borderColor: [

            'rgb(228, 69, 21)',

            'rgb(71, 124, 50)',

            'rgb(255, 205, 86)',

            'rgb(75, 192, 192)',

            'rgb(54, 162, 235)',

            'rgb(153, 102, 255)',

            'rgb(201, 203, 207)'

          ],

          data: [82, 15, 35, 19, 20, 30, 45, 76],

        }]

      }

    })


    this.chart1 = new Chart("myChart1", {

      type: 'doughnut',
      data: {
        labels: [
          'Red',
          'Blue',
          'Yellow'
        ],
        datasets: [{
          label: 'My First Dataset',
          data: [300, 50, 100],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 4
        }]

      }
    })
  }
}


import React, { Component } from "react";
import ReactEcharts from "echarts-for-react";

import './mapProcess.js';
import Menu from './Menu'


class App extends Component
{

  constructor(props)
  {
    super(props)
    this.state = {
      min: Infinity,
      max: -Infinity,
      data: [1, 2, 3]
    };
  }

  generateRandomPoints(center, radius, count) {
    var points = [];
    for (var i = 0; i < count; i++) {
      points.push(this.generateRandomPoint(center, radius));
    }
    return points;
  }



  generateRandomPoint(center, radius) {
    var x0 = center.lng;
    var y0 = center.lat;
    // Convert Radius from meters to degrees.
    var rd = radius / 111300;

    var u = Math.random();
    var v = Math.random();

    var w = rd * Math.sqrt(u);
    var t = 2 * Math.PI * v;
    var x = w * Math.cos(t);
    var y = w * Math.sin(t);

    var xp = x / Math.cos(y0);

    // Resulting point.
    return { value: [xp + x0, y + y0, Math.floor(Math.random() * 30) + 1 ]};
  }

  preprocessData(raw_data)
  {
    var tempMin = this.state.min
    var tempMax = this.state.max

    console.log("--- preprocessing data ---")
    for (const item of raw_data)
    {
      
      if (item.value[2] < tempMin)
      {
        tempMin = item.value[2]
      }

      if (item.value[2] > tempMax)
      {
        tempMax = item.value[2]
      }
    }

    this.setState({
      min: tempMin,
      max: tempMin
    })

    console.log("tempMin: " + tempMin)
    console.log("tempMax: " + tempMax)
    console.log("--------------------------")
  }

  generateOptions(processed_data)
  {
    return {
      backgroundColor: '#404a59',
      title: {
        text: 'Test map',
        subtext: 'Test map',
        left: 'center',
        top: 'top',
        textStyle: {
          color: '#fff'
        }
      },
      tooltip: {
        trigger: 'item',
        formatter: function (params) {
          return "param"
        }
      },
      visualMap: {
        show: false,
        min: 0,
        max: this.state.max,
        inRange: {
          symbolSize: [1, 20]
        }
      },
      geo: {
        name: 'Test map',
        type: 'map',
        map: 'world',
        roam: true,
        label: {
          emphasis: {
            show: false
          }
        },
        itemStyle: {
          normal: {
            areaColor: '#323c48',
            borderColor: '#111'
          },
          emphasis: {
            areaColor: '#2a333d'
          }
        }
      },
      series: [
        {
          type: 'scatter',
          coordinateSystem: 'geo',
          data: processed_data
        }
      ]
    }
  }

  render() {
    console.log("rendertime state data:")
    console.log(this.state.data)
    return (
      <div>
      <ReactEcharts
        option={this.generateOptions(this.state.data)}
        style={{ height: '500px', width: '100%' }}
        className='react_for_echarts'></ReactEcharts>

      <Menu slice="A" data={[1, 2, 3]}></Menu>
      </div>
    );
  }

  componentDidMount()
  {
    var data_gen = this.generateRandomPoints({ 'lat': 50.23, 'lng': 23.12 }, 100000, 10)
    this.preprocessData(data_gen)
    this.setState({data: data_gen });
    
  }
}
export default App;
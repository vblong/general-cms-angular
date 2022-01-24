import { Component, OnDestroy, OnInit, AfterViewInit  } from '@angular/core';

import { EChartsOption } from 'echarts';

import * as L from 'leaflet';

import { statesData } from './sample-data/geo-data';
// import { populationData } from './sample-data/geo-population-data';
import { populationData } from './sample-data/population-data-tiny';
import { pageViewsChartOption, demographicChartOption, salesChartOption, userChartOption } from './sample-data/chart-options';

@Component({
  selector: 'app-ecommerce',
  templateUrl: './ecommerce.component.html',
  styleUrls: ['./ecommerce.component.scss']
})
export class EcommerceComponent implements OnInit, OnDestroy, AfterViewInit  {
  data = [];
  now = new Date(1997, 9, 3);
  oneDay = 24 * 3600 * 1000;
  value = Math.random() * 1000;

  updateHandler: any;
  pageViewsChartOption: EChartsOption = pageViewsChartOption;
  salesChartOption: EChartsOption = salesChartOption;
  demographicChartOption: EChartsOption = demographicChartOption;
  userChartOption: EChartsOption = userChartOption;

  // statesData = statesData;
  populationData = populationData;
  geoJson: any;
  selectedCountry: string = "DEU";

  selectedCountryDetail: any = {

  };

  constructor() {
    this.data = [];
    for (var i = 0; i < 100; i++) {
      this.data.push(this.randomData());
    }
    this.salesChartOption.series = [
      {
        type: 'line',
        showSymbol: false,
        data: this.data,
        color: '#ffffff',
        areaStyle: {}
      }
    ];
  }

  private map;

  private initMap(): void {
    this.map = L.map('map', {
      // center: [ 39.8282, -98.5795 ], // USA
      center: [ 51.1657, 10.4515 ], // Germany
      zoom: 5
    });

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    this.geoJson = L.geoJson(populationData, {
      style: (feature) => (this.style(feature)),
      onEachFeature: (feature, layer) => (
        layer.on({
          mouseover: (e) => (this.highlightFeature(e)),
          mouseout: (e) => (this.resetFeature(e)),
          click: (e) => (this.zoomToFeature(e))
        })
      )
    }).addTo(this.map);

    tiles.addTo(this.map);

    //  Default Germany to selected country
    this.geoJson.eachLayer((layer) => {
      if(layer.feature.properties.sov_a3 === this.selectedCountry) {
        this.selectedCountryDetail = layer.feature.properties;
      }
    });
  }

  getColor(d) {
    return d > 1000000000 ? '#800026' :
           d > 500000000  ? '#BD0026' :
           d > 200000000  ? '#E31A1C' :
           d > 100000000  ? '#FC4E2A' :
           d > 50000000   ? '#FD8D3C' :
           d > 20000000   ? '#FEB24C' :
           d > 10000000   ? '#FED976' :
                            '#FFEDA0';
  }

  style(feature) {
    // let color = this.getColor(feature.properties.density);
    let color = this.getColor(feature.properties.pop_est); // when using population data
    let country = feature.properties.sov_a3;
    return {
        fillColor: color,
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: (country === this.selectedCountry ? 0.7 : 0.0)
    };
  }

  private highlightFeature(e) {
    const layer = e.target;

    layer.setStyle({
      weight: 1,
      opacity: 1.0,
      color: '#DFA612',
      fillOpacity: 1.0,
      fillColor: '#FAE042'
    });
  }

  private resetFeature(e) {
    this.geoJson.resetStyle(e.target);
  }

  private zoomToFeature(e) {
    //  This get the states data { "geometry", "id", "properties { "name", "density" }"... }
    // console.log(e.sourceTarget.feature);
    this.selectedCountryDetail = e.sourceTarget.feature.properties;
    this.selectedCountry = e.sourceTarget.feature.properties.sov_a3;
    this.geoJson.eachLayer((layer) => {
      if(layer.feature.properties.sov_a3 !== this.selectedCountry) {
        layer.setStyle({fillOpacity : 0.0 })
      }
    });
    // this.map.fitBounds(e.target.getBounds());
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  ngOnInit(): void {
    // this.updateHandler = setInterval(() => {
    //   for (let i = 0; i < 5; i++) {
    //     this.data.shift();
    //     this.data.push(this.randomData());
    //   }
    //   this.salesChartOption.series = [
    //     {
    //       data: this.data,
    //       type: 'line',
    //       areaStyle: {},
    //       color: '#ffffff'
    //     }
    //   ];
    // }, 1000);
  }

  ngOnDestroy(): void {
    // clearInterval(this.updateHandler);
  }

  randomData() {
    this.now = new Date(+this.now + this.oneDay);
    this.value = this.value + Math.random() * 21 - 10;
    return {
      name: this.now.toString(),
      value: [
        [this.now.getFullYear(), this.now.getMonth() + 1, this.now.getDate()].join('/'),
        Math.round(this.value)
      ]
    };
  }

}

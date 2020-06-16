import {AfterViewInit, Component, OnInit} from '@angular/core';
import OlMap from 'ol/Map';
import OlXYZ from 'ol/source/XYZ';
import OlTileLayer from 'ol/layer/Tile';
import OlView from 'ol/View';
import OSM from 'ol/source/OSM';

import { fromLonLat } from 'ol/proj';

@Component({
  selector: 'app-garbage-truck-routes-map',
  templateUrl: './garbage-truck-routes-map.component.html',
  styleUrls: ['./garbage-truck-routes-map.component.css']
})
export class GarbageTruckRoutesMapComponent implements OnInit {
  map: OlMap;
  source: OlXYZ;

  layer: OlTileLayer;
  view: OlView;

  ngOnInit() {
    this.source = new OlXYZ({
      url: 'http://tile.osm.org/{z}/{x}/{y}.png'
    });

    this.layer = new OlTileLayer({
      // source: this.source
      source: new OSM()
    });

    this.view = new OlView({
      center: fromLonLat([20.8730272, 52.179797]),
      zoom: 11
    });

    this.map = new OlMap({
      target: 'map',
      layers: [this.layer],
      view: this.view
    });
  }
}

import {Injectable} from '@angular/core';
import {fromLonLat} from 'ol/proj';
import OlMap from 'ol/Map';
import OlView from 'ol/View';
import OlStyle from 'ol/style/Style';
import OlIcon from 'ol/style/Icon';
import OlStroke from 'ol/style/Stroke';
import OlVectorSource from 'ol/source/Vector';
import OSM from 'ol/source/OSM';
import OlFeature from 'ol/Feature';
import OlPoint from 'ol/geom/Point';
import OlLineString from 'ol/geom/LineString';
import {Tile as TileLayer, Vector as VectorLayer} from 'ol/layer';

import OlPopup from 'ol-popup';

import {LatLng} from "../garbage-truck-routes-list/garbage-truck-routes-list.model";

@Injectable({
  providedIn: 'root'
})
export class GarbageTruckRoutesMapService {
  map: OlMap;
  layer: TileLayer;
  view: OlView;

  ignoredWastesMarkersVectorSource = new OlVectorSource({wrapX: false});
  unloadingMarkersVectorSource = new OlVectorSource({wrapX: false});
  improvedLineVectorSource = new OlVectorSource({wrapX: false});
  templateLineVectorSource = new OlVectorSource({wrapX: false});

  ignoredWastesMarkerStyle: OlStyle;
  ignoredWastesMarkerLayer: VectorLayer;

  unloadingMarkerStyle: OlStyle;
  unloadingMarkerLayer: VectorLayer;

  improvedLineStyle: OlStyle;
  improvedLineLayer: VectorLayer;

  templateLineStyle: OlStyle;
  templateLineLayer: VectorLayer;



  constructor() {
    this.layer = new TileLayer({
      source: new OSM()
    });

    this.view = new OlView({
      center: fromLonLat([20.8730272, 52.179797]),
      zoom: 11
    });


    this.ignoredWastesMarkerStyle = new OlStyle({
      image: new OlIcon(({
        src: 'assets/red_circle.svg'
      }))
    });
    this.ignoredWastesMarkerLayer = new VectorLayer({
      source: this.ignoredWastesMarkersVectorSource,
      style: this.ignoredWastesMarkerStyle
    });


    this.unloadingMarkerStyle = new OlStyle({
      image: new OlIcon(({
        src: 'assets/black_circle.svg'
      }))
    });
    this.unloadingMarkerLayer = new VectorLayer({
      source: this.unloadingMarkersVectorSource,
      style: this.unloadingMarkerStyle
    });


    this.improvedLineStyle = new OlStyle({
      stroke: new OlStroke({
        color: 'blue',
        width: 2
      })
    });
    this.improvedLineLayer = new VectorLayer({
      source: this.improvedLineVectorSource,
      style: this.improvedLineStyle
    });


    this.templateLineStyle = new OlStyle({
      stroke: new OlStroke({
        color: 'darkmagenta',
        width: 2
      })
    });
    this.templateLineLayer = new VectorLayer({
      source: this.templateLineVectorSource,
      style: this.templateLineStyle
    });

  }

  addIgnoredWastesMarker(lon: number, lat: number, code: string) {
    const iconFeature = new OlFeature({
      geometry: new OlPoint(fromLonLat([lon, lat])),
      name: 'kod: ' + code
    });

    this.ignoredWastesMarkersVectorSource.addFeature(iconFeature);
  }

  addUnloadingMarker(lon: number, lat: number) {
    const iconFeature = new OlFeature({
      geometry: new OlPoint(fromLonLat([lon, lat]))
    });

    this.unloadingMarkersVectorSource.addFeature(iconFeature);
  }

  createTemplateLine(points: LatLng[]) {
    const lineString = new OlLineString(points.map(point => [point.lon, point.lat]));
    lineString.transform('EPSG:4326', 'EPSG:3857');
    const iconFeature = new OlFeature({
      geometry: lineString
    });

    this.templateLineVectorSource.addFeature(iconFeature);
  }

  createImprovedLine(points: LatLng[]) {
    const lineString = new OlLineString(points.map(point => [point.lon, point.lat]));
    lineString.transform('EPSG:4326', 'EPSG:3857');
    const iconFeature = new OlFeature({
      geometry: lineString
    });

    this.improvedLineVectorSource.addFeature(iconFeature);
  }

  destroyPopup(feature) {
    feature.popup.destroy();
    feature.popup = null;
  }
}

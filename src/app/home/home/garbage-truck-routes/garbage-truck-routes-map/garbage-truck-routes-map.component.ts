import {AfterViewInit, Component} from '@angular/core';
import OlMap from 'ol/Map';
import OlPoint from 'ol/geom/Point';
import OlOverlay from 'ol/Overlay';
import Select from 'ol/interaction/Select';
import 'ol/ol.css';
import {GarbageTruckRoutesMapService} from "./garbage-truck-routes-map.service";

@Component({
    selector: 'app-garbage-truck-routes-map',
    templateUrl: './garbage-truck-routes-map.component.html',
    styleUrls: ['./garbage-truck-routes-map.component.css']
})
export class GarbageTruckRoutesMapComponent implements AfterViewInit {
    map: OlMap;
    selectSingleClick = new Select();

    constructor(private garbageTruckRoutesMapService: GarbageTruckRoutesMapService) {
    }

    ngAfterViewInit(): void {


        // this.map.addLayer(this.garbageTruckRoutesMapService.ignoredWastesMarkerLayer);
        const container = document.getElementById('popup');
        const content = document.getElementById('popup-content');
        const closer = document.getElementById('popup-closer');

        const overlay = new OlOverlay({
            element: container,
            autoPan: true,
            autoPanAnimation: {
                duration: 250
            }
        });
        this.map = new OlMap({
            target: 'map',
            layers:
                [
                    this.garbageTruckRoutesMapService.layer,
                    this.garbageTruckRoutesMapService.ignoredWastesMarkerLayer,
                    this.garbageTruckRoutesMapService.unloadingMarkerLayer,
                    this.garbageTruckRoutesMapService.templateLineLayer,
                    this.garbageTruckRoutesMapService.improvedLineLayer,
                ],
            overlays: [overlay],
            view: this.garbageTruckRoutesMapService.view
        });

        this.selectSingleClick.on('select', function(e) {

            const feature = e.selected[0];
            const name = feature.values_.name;
            console.log(feature);

            let point: OlPoint = <OlPoint>feature.getGeometry();
            if(name) { content.innerHTML = `<p>${name}</code>`;
                overlay.setPosition(point.getCoordinates());}
        });


        closer.onclick = function () {
            overlay.setPosition(undefined);
            closer.blur();
            return false;
        };

        this.map.addInteraction(this.selectSingleClick);
    }
}

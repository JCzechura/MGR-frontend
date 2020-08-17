export interface GarbageTruckRoutesListEntry {
    id: number;
    driverCode: string;
    truckCode: string;
    date: Date;
}

export interface PageChange {
    pageIndex: number;
    pageSize: number;
}

export type GarbageTruckRoutesColumn = keyof GarbageTruckRoutesListEntry;

export interface GarbageTruckRouteDetails {
    id: number,
    referenceRoute: ReferenceRoute,
    linePoints: LatLng[];
    templateLinePoints: LatLng[],
    ignoredWastes: IgnoredWastesWebObject[]
    unloadingLocations: LatLng[]
}

export interface ReferenceRoute {
    id: number,
    templateCode: string,
    date: string,
    driverLogin: string,
    truckCode: string,
}

export interface LatLng {
    lat: number,
    lon: number
}

export interface IgnoredWastesWebObject {
    code: string,
    location: LatLng
}

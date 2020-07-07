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
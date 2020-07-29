export interface PlansEntry {
    index?: number;
    totalNumber?: number;
    weekday: number;
    templateCode: string;
    driverLogin: string;
    truckCode: string;
}

export type PlansEntryFieldName = keyof PlansEntry;

export interface PageChange {
    pageIndex: number;
    pageSize: number;
}

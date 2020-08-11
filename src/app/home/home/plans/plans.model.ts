export interface PlansEntry {
    weekday: number;
    templateCode: string;
    driverLogin: string;
    truckCode: string;
}

export interface PlansWebObject {
    totalNumber: number;
    webObject: PlansEntry[];
}

export type PlansEntryFieldName = keyof PlansEntry;

export interface PageChange {
    pageIndex: number;
    pageSize: number;
}

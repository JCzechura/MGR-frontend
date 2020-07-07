export interface GarbageTruckRoutesFilter {
    driverLogin?: string | null;
    routeId?: number | null;
    truckCode?: string | null;
    dateFrom?: Date | null;
    dateTo?: Date | null;
}

export type GarbageTruckRoutesFilterFieldName = keyof GarbageTruckRoutesFilter;
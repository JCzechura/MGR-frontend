export interface Metadata {
    tableName: string;
    attrib_01_Desc: string;
    attrib_01_Type: string;
    attrib_02_Desc: string;
    attrib_02_Type: string;
    attrib_03_Desc: string;
    attrib_03_Type: string;
    attrib_04_Desc: string;
    attrib_04_Type: string;
    attrib_05_Desc: string;
    attrib_05_Type: string;
    attrib_06_Desc: string;
    attrib_06_Type: string;
}

export interface DatabaseEntry {
    tableName: string;
    attrib01: string;
    attrib02: string;
    attrib03: string;
    attrib04: string;
    attrib05: string;
    attrib06: string;
}

export type DatabaseEntryFieldName = keyof DatabaseEntry;

export interface PageChange {
    pageIndex: number;
    pageSize: number;
}
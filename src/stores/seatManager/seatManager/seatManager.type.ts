export type OwnerFloorResDTO = {
    floorSeq: string;
    floorName: string;
    description: string;
    foodStoreSeq: string;
    storeTables: StoreTableResDTO[];
}
export type StoreTableResDTO = {
    tableSeq: string;
    tableName: string;
    capacity: number;
    description: string;
}

export type OwnerFloorRequest = {
    floorSeq: string;
    floorName: string;
    description: string;
    foodStoreSeq: string;
    storeTables: StoreTableRequest[];
}

export type StoreTableRequest = {
    tableSeq: string;
    tableName: string;
    capacity: number;
    status: string;
    floorSeq: string;
    description: string;
    foodStoreSeq: string;
    categorySeq: string;
}
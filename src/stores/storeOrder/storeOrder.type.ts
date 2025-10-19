export type StoreOrderDetailResponse = {
    isActive: String;
    floors: OwnerFloorResDTO[];
}

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
    status: string;

}

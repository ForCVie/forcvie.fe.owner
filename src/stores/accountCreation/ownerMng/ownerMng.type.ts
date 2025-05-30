export type AdOwnerResDTO = {
    id: string;
    rowNum: number;
    userName: string;
    fullName: string;
}

export type AdOwnerFilterRequest = {
    userName: string;
    page: number;
    size: number;
    sort: string;   
}

export type AdOwnerDetailDTO = {
    id: string;
    userName: string;
    password: string;
    fullName: string;
    date: string;
    phone: string;
    email: string;
    address: string;
    nationality: string;
    avatar: string;
    lockYn: string;
    foodStores: AdFoodStoreDetailDTO[];
}

export type AdFoodStoreDetailDTO = {
    foodStoreSeq: string;
    nm: string;
    code: string;
    ownerSeq: string;
    address: string;
    phoneOwner: string;
    phoneSp: string;
    isShowPhoneOwner: string;
    isBadge: string;
    avatar: string;
    isActivity: string;
    openCollapse: boolean;
}

export type AdOwnerRequest = {
    id: string;
    userName: string;
    password: string;
    fullName: string;
    date: string;
    phone: string;
    email: string;
    address: string;
    nationality: string;
    avatar: string;
    lockYn: string;
    foodStores: AdFoodStoreRequest[];
}

export type AdFoodStoreRequest = {
    foodStoreSeq: string;
    nm: string;
    ownerSeq: string;
    address: string;
    phoneOwner: string;
    phoneSp: string;
    isShowPhoneOwner: string;
    isBadge: string;
    avatar: string;
    isActivity: string;
}
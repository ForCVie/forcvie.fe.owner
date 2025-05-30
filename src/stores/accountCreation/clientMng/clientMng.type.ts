export type AdClientFilterRequest = {
    userName: string;
    fullName: string;
    page: number;
    size: number;
    sort: string;   
}

export type AdClientResDTO = {
    id: string;
    rowNum: number;
    userName: string;
    fullName: string;
}

export type AdClientDetailDTO = {
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
    listAddress: AdUserAddressDTO[];
}

export type AdClientMngRequest = {
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
}

export type AdUserAddressDTO = {
    userAddressSeq: string;
    content: string;
    isDefault: string;
}
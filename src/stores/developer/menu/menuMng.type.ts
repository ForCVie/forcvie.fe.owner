export type AdMenuResDTO = {
    menuId: string;
    rowNum: number;
    siteType: string;
    nm: string;
    useYn: string;
    parent: string;
};

export type AdMenuFilterRequest = {
    siteType: string;
    nm: string;
    parentId: string;
    useYn: string;
    page: number;
    size: number;
    sort: string;
}

export type AdMenuDetailDTO = {
    menuId: string;
    siteType: string;
    name: string;
    route: string;
    parentId: string;
    displayOrder: string;
    useYn: string;
    nm: string;
}

export type AdMenuRequest = {
    menuId: string;
    siteType: string;
    name: string;
    route: string;
    parentId: string;
    displayOrder: string;
    delYn: string;
    useYn: string;
    nm: string;
}
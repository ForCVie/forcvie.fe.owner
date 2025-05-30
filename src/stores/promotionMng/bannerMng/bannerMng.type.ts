export type AdBannerResDTO = {
    bannerSeq: string;
    bannerNm: string;
    useYn: string;
    url: string;
    typeNm: string;
    rowNum: number;
}

export type AdBannerFilterReq = {
    typeCd: string;
    bannerNm: string;
    useYn: string;
    url: string;
    page: number;
    size: number;
    sort: string;
}

export type AdBannerDetailDTO = {
    bannerSeq: string;
    bannerNm: string;
    useYn: string;
    url: string;
    bannerType: string;
}

export type AdBannerReq = {
    bannerSeq: string;
    bannerNm: string;
    useYn: string;
    url: string;
    bannerType: string;
}
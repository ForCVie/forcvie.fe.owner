export type AdBannerTeeResDTO = {
    bannerTeeSeq: string;
    title: string;
    url: string;
    useYn: string;
    startDate: string;
    endDate: string;
    rowNum: number;
    action: string;
}

export type AdBannerTeeFilterReq = {
    title: string;
    url: string;
    useYn: string;
    startDate: Date | null;
    endDate: Date | null;
    page: number;
    size: number;
    sort: string;
}

export type AdBannerTeeDetailDTO = {
    bannerTeeSeq: string;
    title: string;
    url: string;
    content: string;
    useYn: string;
    startDate: Date | null;
    endDate: Date | null;
}

export type AdBannerTeeReq = {
    bannerTeeSeq: string;
    title: string;
    url: string;
    content: string;
    useYn: string;
    startDate: Date | null;
    endDate: Date | null;
}
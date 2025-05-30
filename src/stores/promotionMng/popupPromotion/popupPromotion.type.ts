export type AdPopupNoticeResDTO = {
    popupNoticeSeq: string;
    title: string;
    url: string;
    useYn: string;
    startDate: string;
    endDate: string;
    rowNum: number;
    action: string;
}

export type AdPopupNoticeFilterReq = {
    title: string;
    url: string;
    useYn: string;
    startDate: Date|null;
    endDate: Date|null;
    page: number;
    size: number;
    sort: string;
}

export type AdPopupNoticeDetailDTO = {
    popupNoticeSeq: string;
    title: string;
    url: string;
    useYn: string;
    startDate: Date|null;
    endDate: Date|null;
}

export type AdPopupNoticeReq = {
    popupNoticeSeq: string;
    title: string;
    url: string;
    useYn: string;
    startDate: Date;
    endDate: Date;
}
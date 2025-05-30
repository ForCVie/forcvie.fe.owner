export type AdNoticeResDTO = {
    noticeSeq: string;
    title: string;
    postCd: string;
    topFixCd: string;
    roleId: string;
    rowNum: number;
}

export type AdNoticeDetailDTO = {
    noticeSeq: string;
    title: string;
    content: string;
    postCd: string;
    topFixCd: string;
    readCnt: number;
    roleId: string;
}

export type AdNoticeFilterReq = {
    title: string;
    postCd: string;
    topFixCd: string;
    roleId: string;
    page: number;
    size: number;
    sort: string;
}

export type AdNoticeReq = {
    noticeSeq: string;
    title: string;
    content: string;
    postCd: string;
    topFixCd: string;
    readCnt: number;
    roleId: string;
}
export type AdQuestionAnswerFilterReq = {
    title: string;
    userQuestion: string;
    userAnswer: string;
    status: string;
    page: number;
    size: number;
    sort: string;
}

export type AdQuestionAnswerReq = {
    qaSeq: string;
    answer: string;
}

export type AdQuestionAnswerDetailDTO = {
    qaSeq: string;
    title: string;
    question: string;
    answer: string;
    questionDate: Date;
    answerDate: Date;
    userQuestion: string;
    userAnswer: string;
}

export type AdQuestionAnswerResDTO = {
    rowNum: number;
    qaSeq: string;
    title: string;
    questionDate: string;
    userQuestion: string;
    userAnswer: string;
}
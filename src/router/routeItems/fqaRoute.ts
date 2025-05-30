export const fqaRoute = {
  noticeManagement: {
    path: "/faq/notice",
    name: "noticeManagement",
    component: import('@/views/fqaMng/notice/NoticeMng.vue'),
},
  noticeManagementForm: {
    path: "/faq/notice/form",
    name: "noticeManagementForm",
    component: import('@/views/fqaMng/notice/NoticeForm.vue'),
},
  questionAnswerMng: {
    path: "/faq/question-answer",
    name: "questionAnswerMng",
    component: import('@/views/fqaMng/questionAnswer/QuestionAnswerMng.vue'),
},
  questionAnswerMngForm: {
    path: "/faq/question-answer/form",
    name: "questionAnswerMngForm",
    component: import('@/views/fqaMng/questionAnswer/QuestionAnswerForm.vue'),
},
};

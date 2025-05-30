const listClassificationSystemDataNCS = [
    {
        id: "NCS",
        module: "NCS",
        child: [
            {
                title: "01_1",
                id: "NCS_01_1",
                child: [
                    {
                        title: "01_1_1",
                        id: "NCS_01_1_1",
                        child: [
                            {
                                title: "01_1_1_1",
                                id: "NCS_01_1_1_1",
                                child: [
                                    {
                                        title: "01_1_1_1_1",
                                        id: "NCS_01_1_1_1_1",
                                    },
                                    {
                                        title: "01_1_1_1_2",
                                        id: "NCS_01_1_1_1_2",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: "02_1",
                id: "NCS_02_1",
                child: [
                    {
                        title: "02_1_1",
                        id: "NCS_02_1_1",
                        child: [
                            {
                                title: "02_1_1_1",
                                id: "NCS_02_1_1_1",
                                child: [
                                    {
                                        title: "02_1_1_1_1",
                                        id: "NCS_02_1_1_1_1",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
]
const listClassificationSystemDataKCS = [
    {
        id: "KCS",
        module: "KCS",
        child: [
            {
                title: "01_1",
                id: "KCS_01_1",
                child: [
                    {
                        title: "01_1_1",
                        id: "KCS_01_1_1",
                        child: [
                            {
                                title: "01_1_1_1",
                                id: "KCS_01_1_1_1",
                                child: [
                                    {
                                        title: "01_1_1_1_1",
                                        id: "KCS_01_1_1_1_1",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            },
            {
                title: "02_1",
                id: "KCS_02_1",
                child: [
                    {
                        title: "02_1_1",
                        id: "KCS_02_1_1",
                        child: [
                            {
                                title: "02_1_1_1",
                                id: "KCS_02_1_1_1",
                                child: [
                                    {
                                        title: "02_1_1_1_1",
                                        id: "KCS_02_1_1_1_1",
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
]

const listUnitCapacityData = [
    {
        idClassificationSystem: "NCS_01_1_1_1_1",
        unitCapacity: [
            {
                id: "unitCapacity1",
                unit: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
                module: "Module1",
                usedStatus:false
            },
            {
                id: "unitCapacity2",
                unit: "unitCapacity2",
                module: "Module2",
                usedStatus:false
            },
            {
                id: "unitCapacity3",
                unit: "unitCapacity3",
                module: "Module3",
                usedStatus:true
            },
            {
                id: "unitCapacity4",
                unit: "unitCapacity4",
                module: "Module4",
                usedStatus:true
            },
            {
                id: "unitCapacity5",
                unit: "unitCapacity5",
                module: "Not",
                usedStatus:null
            },
            {
                id: "unitCapacity6",
                unit: "unitCapacity6",
                module: "Module6",
                usedStatus:true
            }
        ]
    },
    {
        idClassificationSystem: "NCS_01_1_1_1_2",
        unitCapacity: [
            {
                id: "unitCapacity7",
                unit: "unitCapacity7",
                module: "Module7",
                usedStatus:true

            },
            {
                id: "unitCapacity8",
                unit: "unitCapacity8",
                module: "Module7",
                usedStatus:true
            }
        ]
    }
]

export {listClassificationSystemDataNCS, listClassificationSystemDataKCS, listUnitCapacityData}

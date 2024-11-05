import request from './request';

export function getDataApi() {
    return request({
        method: 'get',
        url: '/os/antvdemo/assets/data/f2/series-line.json'
    })
}

export function getHistoricalDailyProfiApi(params) {
    // return request({
    //     method: 'get',
    //     params,
    //      url: '' // 待补充
    // })
    return {
        code: 200,
        data: [{ day: 1, profit: -45.6, ratio: 0.45 }, { day: 2, profit: 45.6, ratio: -0.45 }, { day: 3, profit: 45.6, ratio: 0.45 }, { day: 4, profit: 45.6, ratio: 0.45 }, { day: 5, profit: 45.6, ratio: 0.45 }, { day: 6, profit: 45.6, ratio: 0.45 }, { day: 7, profit: 45.6, ratio: 0.45 }, { day: 8, profit: 45.6, ratio: 0.45 }, { day: 9, profit: 45.6, ratio: 0.45 }, { day: 10, profit: 45.6, ratio: 0.45 }, { day: 11, profit: 45.6, ratio: 0.45 }, { day: 12, profit: 45.6, ratio: 0.45 }, { day: 13, profit: 45.6, ratio: 0.45 }, { day: 14, profit: 45.6, ratio: 0.45 }, { day: 15, profit: 45.6, ratio: 0.45 }, { day: 16, profit: 45.6, ratio: 0.45 }, { day: 17, profit: 45.6, ratio: 0.45 }, { day: 18, profit: 45.6, ratio: 0.45 }, { day: 19, profit: 45.6, ratio: 0.45 }, { day: 20, profit: 45.6, ratio: 0.45 }, { day: 21, profit: 45.6, ratio: 0.45 }, { day: 22, profit: 45.6, ratio: 0.45 }, { day: 23, profit: 45.6, ratio: 0.45 }, { day: 24, profit: 45.6, ratio: 0.45 }, { day: 25, profit: 45.6, ratio: 0.45 }, { day: 26, profit: 45.6, ratio: 0.45 }, { day: 27, profit: 45.6, ratio: 0.45 }, { day: 28, profit: 45.6, ratio: 0.45 }, { day: 29, profit: 45.6, ratio: 0.45 }, { day: 30, profit: 45.6, ratio: 0.45 }, { day: 31, profit: 45.6, ratio: 0.45 }]
    }
}


export function getHistoricalYearlyProfitApi(params) {
    // return request({
    //     method: 'get',
    //     params,
    //      url: '' // 待补充
    // })

    return {
        code: 200,
        data: [
            {
                year: 2019,
                profit: 1233.45,
                ratio: 14.234
            },
            {
                year: 2020,
                profit: 2123.45,
                ratio: 51.234
            },
            {
                year: 2021,
                profit: 4123.45,
                ratio: 1.234
            },
            {
                year: 2022,
                profit: -1423.45,
                ratio: -41.234
            },
            {
                year: 2023,
                profit: 1323.45,
                ratio: -11.234
            },

            {
                year: 2024,
                profit: -1233.45,
                ratio: -31.234
            },
        ]
    }
}

export function getLineChartDataApi(params) {
    // return request({
    //     method: 'get',
    //     params,
    //      url: '' // 待补充
    // })
    return {
        code: 200,
        data: [{ ts: 1729767600.0, price: -102.12, profit: -0.74 }, { ts: 1729771200.0, price: 96.93, profit: 1.67 }, { ts: 1729774800.0, price: 102.53, profit: 2.09 }, { ts: 1729778400.0, price: 101.19, profit: 0.6 }, { ts: 1729782000.0, price: 90.33, profit: 1.88 }, { ts: 1729785600.0, price: 105.77, profit: 0.57 }, { ts: 1729789200.0, price: 98.0, profit: 1.67 }, { ts: 1729792800.0, price: 96.38, profit: 0.54 }, { ts: 1729796400.0, price: 108.74, profit: 2.0 }, { ts: 1729800000.0, price: 97.96, profit: 0.97 }, { ts: 1729803600.0, price: 101.04, profit: 0.9 }, { ts: 1729807200.0, price: 94.78, profit: 0.53 }, { ts: 1729810800.0, price: 106.39, profit: 0.95 }, { ts: 1729814400.0, price: 108.36, profit: 1.56 }, { ts: 1729818000.0, price: 91.88, profit: 2.01 }, { ts: 1729821600.0, price: 93.75, profit: 1.77 }, { ts: 1729825200.0, price: 90.27, profit: 0.71 }, { ts: 1729828800.0, price: 103.42, profit: 2.31 }, { ts: 1729832400.0, price: 101.3, profit: 0.56 }, { ts: 1729836000.0, price: 93.92, profit: 0.7 }, { ts: 1729839600.0, price: 99.72, profit: 1.85 }, { ts: 1729843200.0, price: 108.82, profit: 2.43 }, { ts: 1729846800.0, price: 99.28, profit: 2.32 }, { ts: 1729850400.0, price: 101.32, profit: 1.54 }, { ts: 1729854000.0, price: 90.28, profit: 1.37 }, { ts: 1729857600.0, price: 95.72, profit: 1.63 }, { ts: 1729861200.0, price: 98.25, profit: 2.48 }, { ts: 1729864800.0, price: 107.25, profit: 1.5 }, { ts: 1729868400.0, price: 102.25, profit: 1.34 }, { ts: 1729872000.0, price: 107.83, profit: 2.33 }, { ts: 1729875600.0, price: 107.25, profit: 1.12 }, { ts: 1729879200.0, price: 92.31, profit: 2.12 }, { ts: 1729882800.0, price: 90.82, profit: 0.55 }, { ts: 1729886400.0, price: 103.71, profit: 1.05 }, { ts: 1729890000.0, price: 93.55, profit: 2.39 }, { ts: 1729893600.0, price: 92.1, profit: 1.72 }, { ts: 1729897200.0, price: 108.8, profit: 0.58 }, { ts: 1729900800.0, price: 106.41, profit: 1.18 }, { ts: 1729904400.0, price: 109.96, profit: 1.93 }, { ts: 1729908000.0, price: 106.67, profit: 0.51 }]
    }
}


// 传【年】过去，获取所有月份的profit
export function getHistoricalMonthlyProfitApi() {
    // return request({
    //     method: 'get',
    //     params,
    //      url: '' // 待补充
    // })

    return {
        code: 200,
        data: [
            {"month": 1, "profit": -19.06, "ratio": -0.11},
            {"month": 2, "profit": 18.82, "ratio": 0.19},
            {"month": 3, "profit": 12.45, "ratio": 0.19},
            {"month": 4, "profit": -15.13, "ratio": -0.12},
            {"month": 5, "profit": 13.31, "ratio": 0.12},
            {"month": 6, "profit": 16.2, "ratio": 0.19},
            {"month": 7, "profit": 15.48, "ratio": 0.12},
            {"month": 8, "profit": 13.9, "ratio": 0.16},
            {"month": 9, "profit": 18.07, "ratio": 0.18},
            {"month": 10, "profit": 17.33, "ratio": 0.14},
            {"month": 11, "profit": 19.57, "ratio": 0.2},
            {"month": 12, "profit": 17.8, "ratio": 0.2}
        ]
        
    }
}

export function getMarketHoursApi() {
    // return request({
    //     method: 'get',
    //     params,
    //      url: '' // 待补充
    // })
    return {
        code: 200,
        data: {
            "preMarket": {
              "start": 1729767600.0,
              "end": 1729776600.0
            },
            "regularMarket": {
              "start": 1729776600.0,
              "end": 1729800000.0
            },
            "postMarket": {
              "start": 1729800000.0,
              "end": 1729814400.0
            },
          }
    }
}
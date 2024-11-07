<template>
    <div class="profit_table">
        <div class="title">收益曲线（{{currentTimeStr}}）</div>
        <div class="chart_header">
            <div class="chart_item stock_profit">
                <div class="title">当前股价</div>
                <div class="price">
                    {{ chartData.currentStock.toFixed(2) }}
                </div>
            </div>
            <div class="chart_item mine_profit">
                <div class="title">当前收益</div>
                <div
                    class="price"
                    :class="[getPriceClass(chartData.currentProfit)]"
                >
                    {{
                        getPriceType(chartData.currentProfit) +
                        chartData.currentProfit.toFixed(2)
                    }}
                </div>
            </div>
        </div>
        <div class="chart-wrapper">
            <canvas id="mountNode"></canvas>
        </div>
    </div>
</template>

<script>
import { getLineChartDataApi, getMarketHoursApi } from "../../utils/api";

export default {
    data() {
        return {
            chartData: {
                currentStock: 0,
                currentProfit: 0,
            },
            chartTableData: [],
            profitTableTime: {
                year: new Date().getFullYear(),
                month: new Date().getMonth() + 1,
                day: new Date().getDate()
            },
            chart: null,
        }
    },
    computed: {
        getPriceType() {
            return function (price) {
                if (price > 0) {
                    return "+";
                } else if (price < 0) {
                    return "-";
                }
                return "";
            };
        },
        getPriceClass() {
            return function (price) {
                if (price > 0) {
                    return "red";
                } else if (price < 0) {
                    return "green";
                }
                return "grey";
            };
        },
        currentTimeStr() {
            return `${this.profitTableTime.year}-${this.profitTableTime.month}-${this.profitTableTime.day}`
        }
    },
    mounted() {
        this.getInitChartData();
        this.$eventBus.$on('changeProfitTableTime', (profitTableTime) => {
            this.profitTableTime = profitTableTime;
            this.chartData = {
                currentStock: 0,
                currentProfit: 0,
            };
            this.chartTableData = [];
            if(this.chart) {
                this.chart.destroy();
            }
            clearInterval(this.interval);
            this.getInitChartData();
        })
    },
    methods: {
        async getInitChartData() {
            try {
                const res = await getLineChartDataApi({
                    target_date: this.currentTimeStr
                });
                if (res.code === 200) {
                    this.chartTableData = res.data.map((item) => {
                        return {
                            time: item.ts * 1000,
                            price: item.price,
                            profit: item.profit,
                            ts: item.ts
                        };
                    });
                    this.initChart();
                } else {
                    this.$showToast();
                }
            } catch (error) {
                console.log("error", error);
            }
        },
        async initChart() {
            // let startMarkLine = {};
            // let endMarkLine = {};
            // try {
            //     const res = await getMarketHoursApi({
            //         target_date: this.currentTimeStr
            //     });
            //     if(res.code === 200) {
            //         if(res.preMarket?.start) {
            //             startMarkLine.start = res.preMarket?.start;
            //             startMarkLine.end = res.preMarket?.start;
            //         }
            //         if(res.postMarket?.start) {
            //             startMarkLine.start = res.postMarket?.start;
            //             startMarkLine.end = res.postMarket?.start;
            //         }
            //     } else {
            //         this.$showToast();
            //     }
            // } catch (error) {
            //     console.log(error)
            // }
            const data = this.chartTableData;
            this.chartData.currentProfit = data[data.length - 1].profit;
            this.chartData.currentStock = data[data.length - 1].price;
            this.chart = new F2.Chart({
                id: "mountNode",
                pixelRatio: window.devicePixelRatio,
            });
            const chart = this.chart;
            chart.source(data, {
                price: {
                    tickCount: 5,
                },
                profit: {
                    tickCount: 5,
                },
                time: {
                    type: 'timeCat',
                    mask: 'MM-DD HH:mm', // 根据需要显示的时间格式来设置
                    tickCount: 3,
                },
            });
            chart.tooltip({
                alwaysShow: true,
                custom: true, // 自定义 tooltip 内容框
                triggerOn: ["touchstart", "touchmove"], // tooltip 出现的触发行为，可自定义，用法同 legend 的 triggerOn
                triggerOff: "touchend", // 消失的触发行为，可自定义
                showXTip: true, // 是否展示 X 轴的辅助信息
                showYTip: true, // 是否展示 Y 轴的辅助信息
                crosshairsType: "xy",
                snap: true,
                showTitle: true,
                showItemMarker: false,
                onChange: (obj) => {
                    this.chartData.currentProfit = Number(obj.items[1].value);
                    this.chartData.currentStock = Number(obj.items[0].value);
                },
                onHide: () => {
                    this.chartData.currentProfit = data[data.length - 1].profit;
                    this.chartData.currentStock = data[data.length - 1].price;
                },
                crosshairsStyle: {
                    lineDash: [2],
                },
                xTipBackground: {
                    fill: "#1976fb",
                },
                yTipBackground: {
                    fill: "#1976fb",
                },
            });
            chart.axis("time", {
                label: function label(text, index, total) {
                    console.log('text', text)
                    var textCfg = {};
                    if (index === 0) {
                        textCfg.textAlign = "left";
                    } else if (index === total - 1) {
                        textCfg.textAlign = "right";
                    }
                    return textCfg;
                },
                ticks: ['上午6点', '下午12点', '下午6点'] // 自定义刻度值
            });

            // 绘制股价折线图
            chart.line().position("time*price").color("#187afb").shape("line");
            // 绘制收益折线图
            chart.line().position("time*profit").color("#f0a12c").shape("line");

            // chart.guide().line({
            //     start: [1729846800 * 1000, 'min'],
            //     end: [1729846800 * 1000, 'max'],
            //     lineStyle: {
            //         lineDash: [0, 2, 2 ], // 虚线样式
            //         stroke: '#d8505a',       // 虚线颜色
            //         lineWidth: 1            // 虚线宽度，可选，默认为 1
            //     }
            // });
            // chart.guide().line({
            //     start: [1729886400 * 1000, 'min'],
            //     end: [1729886400 * 1000, 'max'],
            //     lineStyle: {
            //         lineDash: [0, 2, 2 ], // 虚线样式
            //         stroke: '#00ff00',       // 虚线颜色
            //         lineWidth: 1            // 虚线宽度，可选，默认为 1
            //     }
            // });


            chart.render();

            this.setintervalJoinChartData(chart);
        },
        setintervalJoinChartData(chart) {
            this.interval = setInterval(() => {
                this.getNextTimeChartData(chart);
            }, 1000 * 60)
        },
        async getNextTimeChartData(chart) {
            try {
                const res = await getLineChartDataApi({
                    target_date: this.currentTimeStr,
                    from_ts: this.chartTableData[this.chartTableData.length - 1].ts
                });
                if (res.code === 200) {
                    if(!res?.data?.length) {
                        return clearInterval(this.interval);
                    }
                    const charDataList = res.data.map((item) => {
                        return {
                            time: item.ts * 1000,
                            price: item.price,
                            profit: item.profit,
                        };
                    });
                    this.chartTableData = [...this.chartTableData, ...charDataList];

                    this.chartData.currentProfit = this.chartTableData[this.chartTableData.length - 1].profit;
                    this.chartData.currentStock = this.chartTableData[this.chartTableData.length - 1].price;

                    chart.changeData(this.chartTableData);
                } else {
                    clearInterval(this.interval);
                    this.$showToast();
                }
            } catch (error) {
                console.log("error", error);
            }
        }
    },
}
</script>

<style>
.profit_table {
    height: 9.5rem;
    border-radius: 0.4rem;
    background-color: #fff;
    padding: 0.2rem;
}
.profit_table .title {
    margin-bottom: 0.2rem;
    font-size: 0.4rem;
    font-weight: bold;
    color: #333;
}
</style>
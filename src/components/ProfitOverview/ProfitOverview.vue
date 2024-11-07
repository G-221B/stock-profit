<template>
    <div class="profit_overview">
        <div class="title">收益总览</div>
        <div class="profit_detail">
            <div class="prifit_time_wrapper">
                <div class="profit_title">当日收益（元）</div>
                <div
                    class="profit_value"
                    :class="getPriceClass(profitData.currentDay_price)"
                >
                    {{
                        (profitData.currentDay_price > 0 ? "+" : "") +
                        profitData.currentDay_price.toFixed(2)
                    }}
                </div>
            </div>
            <div class="prifit_time_wrapper" style="text-align: right">
                <div class="profit_title">当月收益（元）</div>
                <div
                    class="profit_value"
                    :class="getPriceClass(profitData.currentMonth_price)"
                >
                    {{
                        (profitData.currentMonth_price > 0 ? "+" : "") +
                        profitData.currentMonth_price.toFixed(2)
                    }}
                </div>
            </div>
            <div class="prifit_time_wrapper">
                <div class="profit_title">本年收益（元）</div>
                <div
                    class="profit_value"
                    :class="getPriceClass(profitData.currentYear_price)"
                >
                    {{
                        (profitData.currentYear_price > 0 ? "+" : "") +
                        profitData.currentYear_price.toFixed(2)
                    }}
                </div>
            </div>
            <div class="prifit_time_wrapper" style="text-align: right">
                <div class="profit_title">年化收益率</div>
                <div
                    class="profit_value"
                    :class="getPriceClass(profitData.currentYear_profit)"
                >
                    {{
                        (profitData.currentYear_profit > 0 ? "+" : "") +
                        profitData.currentYear_profit +
                        "%"
                    }}
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    props: {
        profitData: {
            default: () => {
                return {
                    currentDay_price: 0,
                    currentMonth_price: 0,
                    currentYear_price: 0,
                    currentYear_profit: 0,
                };
            },
        },
    },
    data() {
        return {
        };
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
    },
};
</script>

<style lang="scss">
.profit_overview {
    height: 4rem;
    border-radius: 0.4rem;
    background-color: #fff;
    padding: 0.2rem;
}
.profit_overview .title {
    font-size: 0.4rem;
    font-weight: bold;
    color: #333;
}
.profit_detail {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    color: #959595;
    font-size: 0.34rem;
    margin-top: 0.2rem;
    padding: 0.25rem;
    .prifit_time_wrapper {
        width: 50%;
        margin-bottom: 0.2rem;
    }
}
.chart-wrapper {
    width: 100%;
}
.chart_header {
    display: flex;
    justify-content: space-around;
}
.chart_item {
    position: relative;
    .title {
        color: #333;
    }
    .price {
        font-size: 0.3rem;
        color: #999;
        &.red {
            color: #bb4755;
        }
        &.green {
            color: #3a987a;
        }
    }
}
.profit_value {
    &.red {
        color: #bb4755;
    }
    &.green {
        color: #3a987a;
    }
}
.stock_profit::before {
    position: absolute;
    top: 0.2rem;
    left: -0.3rem;
    display: inline-block;
    content: "";
    width: 0.2rem;
    height: 0.1rem;
    background-color: #187afb;
}
.mine_profit::before {
    position: absolute;
    top: 0.2rem;
    left: -0.3rem;
    display: inline-block;
    content: "";
    width: 0.2rem;
    height: 0.1rem;
    background-color: #f0a12c;
}
#mountNode {
    width: 100%;
}
</style>

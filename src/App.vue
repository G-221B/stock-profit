<template>
    <div id="app">
        <div class="bg_box"></div>
        <div class="profit_overview_wrapper">
            <ProfitOverview :profitData="profitData" />
        </div>
        <div class="profit_table_wrapper">
            <ProfitTable/>
        </div>
        <div class="profit_calendar_wrapper">
            <ProfitCalendar />
        </div>
    </div>
</template>

<script>
import ProfitOverview from "./components/ProfitOverview/ProfitOverview.vue";
import ProfitCalendar from "./components/ProfitCalendar/ProfitCalendar.vue";
import ProfitTable from './components/ProfitTable/ProfitTable.vue';

import { getHistoricalDailyProfiApi, getHistoricalYearlyProfitApi } from "../src/utils/api";

export default {
    name: "App",
    components: {
        ProfitOverview,
        ProfitCalendar,
        ProfitTable
    },
    data() {
        return {
            profitData: {
                currentDay_price: 0,
                currentMonth_price: 0,
                currentYear_price: 0,
                currentYear_profit: 0,
            },
            profitDataOfYears: [],
        };
    },
    computed: {
        years() {
            const nowYear = new Date().getFullYear();
            const startYear = nowYear - 5;
            const yearList = [];
            for(let i = startYear; i <= nowYear; i++) {
                yearList.push(i);
            }
            return yearList;
        }
    },
    created() {
        this.getInitDataOfMonth();
        this.getInitDataOfYear();
    },
    methods: {
        async getInitDataOfYear() {
            try {
                const res = await getHistoricalYearlyProfitApi({
                    years: this.years
                });
                if(res.code === 200) {
                    const data = res.data;
                    this.profitData.currentYear_price = data[data.length - 1].profit;
                    this.profitData.currentYear_profit = data[data.length - 1].ratio;
                } else {
                    this.$showToast();
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getInitDataOfMonth() {
            try {
                const nowYear = new Date().getFullYear();
                const nowMonth = new Date().getMonth() + 1;
                const currentDay = new Date().getDate();
                const res = await getHistoricalDailyProfiApi({
                    year: nowYear,
                    month: nowMonth,
                });
                if (res.code === 200) {
                    const data = res.data.map((item) => {
                        item.profit = Number(item.profit || 0);
                        item.ratio = Number(item.ratio || 0);
                        return item;
                    });
                    const currentDay_data = data.find(
                        (item) => item.day === currentDay
                    );
                    console.log('currentDay_data', currentDay_data)
                    const totalPrice = data.reduce((pre, item) => {
                        return pre + item.profit;
                    }, 0);
                    this.profitData.currentDay_price =
                        currentDay_data.profit || 0;
                    this.profitData.currentMonth_price = totalPrice;
                } else {
                    this.$showToast();
                }
            } catch (error) {
                console.log("error", error);
            }
        },
    },
};
</script>

<style>
#app {
    width: 100%;
    height: 100vh;
    background: #f5f5f5;
    overflow: scroll;
}
.bg_box {
    width: 100%;
    height: 1.5rem;
    background: #1778fd;
    border-bottom-right-radius: 0.5rem;
    border-bottom-left-radius: 0.5rem;
}
.profit_overview_wrapper {
    z-index: 1;
    position: relative;
    top: -1rem;
    padding: 0 0.3rem;
}
.profit_table_wrapper {
    z-index: 1;
    position: relative;
    top: -.6rem;
    padding: 0 0.3rem;
}
.profit_calendar_wrapper {
    z-index: 1;
    position: relative;
    top: -0.2rem;
    padding: 0 0.3rem;
}
</style>

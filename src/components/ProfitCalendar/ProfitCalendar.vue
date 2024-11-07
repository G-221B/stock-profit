<template>
    <div class="profit_calendar">
        <div class="title">收益分布</div>
        <div class="time_tab">
            <div 
                class="tab_item" 
                :class="activeTabKey === item.key ? 'active_tab' : ''"
                v-for="item in tabList" 
                :key="item.key"
                @click="changeTab(item)"
            >{{ item.label }}</div>
        </div>
        <div class="profit_type_wrapper">
            <div class="profit_type_switch">
                <div 
                    class="type_item" 
                    :class="{active_type_item: profitType === PROFIT_TYPE.PRICE}" 
                    @click="changeProfitType(PROFIT_TYPE.PRICE)">$</div>
                <div 
                    class="type_item" 
                    :class="{active_type_item: profitType === PROFIT_TYPE.RATIO}"  
                    @click="changeProfitType(PROFIT_TYPE.RATIO)">%</div>
            </div>
        </div>
        <div class="second_time_wrapper">
            <div 
                v-show="TAB_TYPE.YEAR !== activeTabKey"
                class="left_arrow_wrapper" 
                @click="goPreTime" 
                :class="{disablePreBtn}"
            >
                <ArrowSvg class-name="left_arrow"/>
            </div>
            <div class="sencond_time_value" :class="getProfitClass(totalProfit)">
                <div class="sencond_time_title">{{ timeTitle }}</div>
                <div class="sencond_time_profit">{{ getPriceType(totalProfit) + totalProfit.toFixed(2) + profitSymbol }}</div>
            </div>
            <div 
                v-show="TAB_TYPE.YEAR !== activeTabKey"
                class="right_arrow_wrapper" 
                @click="goNextTime" 
                :class="{disableNextBtn}">
                <ArrowSvg class-name="right_arrow"/>
            </div>
        </div>
        <CalendarOfDay
            v-show="TAB_TYPE.DAY === activeTabKey"
            :currentYear="currentYear" 
            :currentMonth="currentMonth"
            :profitData="profitDataListOfDay"
            :profitType="profitType"
            :profitSymbol="profitSymbol"
        />
        <CalendarOfWeek
            v-show="TAB_TYPE.WEEK === activeTabKey"
            :currentYear="currentYear" 
            :currentMonth="currentMonth"
            :profitData="profitDataListOfDay"
            :profitDataListOfWeek="profitDataListOfWeek"
            :profitType="profitType"
            :profitSymbol="profitSymbol"
        />
        <CalendarOfMonth
            v-show="TAB_TYPE.MONTH === activeTabKey"
            :currentYear="currentYear" 
            :currentMonth="currentMonth"
            :profitData="profitDataListOfMonth"
            :profitType="profitType"
            :profitSymbol="profitSymbol"
        />
        <CalendarOfYear
            v-show="TAB_TYPE.YEAR === activeTabKey"
            :currentYear="currentYear" 
            :currentMonth="currentMonth"
            :profitData="profitDataListOfYear"
            :profitType="profitType"
            :profitSymbol="profitSymbol"
        />

    </div>
</template>

<script>
import ArrowSvg from '../ArrowSvg/ArrowSvg.vue';
import CalendarOfDay from './CalendarOfDay.vue';
import CalendarOfWeek from './CalendarOfWeek.vue';
import CalendarOfMonth from './CalendarOfMonth.vue';
import CalendarOfYear from './CalendarOfYear.vue';

import { getHistoricalMonthlyProfitApi, getHistoricalDailyProfiApi, getHistoricalYearlyProfitApi, getHistoricalWeeklyProfitApi } from '../../utils/api';
import { PROFIT_TYPE } from '../../utils/constants';
import { getCurrentTimeInET } from '../../utils/index';

const TAB_TYPE = {
    DAY: 'day',
    WEEK: 'week',
    MONTH: 'month',
    YEAR: 'year'
}


export default {
    components: {
        ArrowSvg,
        CalendarOfDay,
        CalendarOfWeek,
        CalendarOfMonth,
        CalendarOfYear,
    },
    data() {
        return {
            activeTabKey: TAB_TYPE.DAY,
            currentYear: getCurrentTimeInET().getFullYear(),
            currentMonth: getCurrentTimeInET().getMonth() + 1,
            TAB_TYPE,
            profitDataListOfDay: [],
            profitDataListOfMonth: [],
            profitDataListOfYear: [],
            profitDataListOfWeek: [],
            PROFIT_TYPE,
            profitType: PROFIT_TYPE.PRICE
        }
    },
    computed: {
        profitSymbol() {
            return this.profitType === PROFIT_TYPE.PRICE ? '' : '%';
        },
        getPriceType() {
            return function(profit) {
                if(profit > 0) {
                    return '+';
                } else if(profit < 0) {
                    return '-';
                }
                return '';
            }
        },
        getProfitClass() {
            return function(profit) {

                if(profit >= 0) {
                    return 'red';
                } else if(profit < 0) {
                    return 'green';
                }
                return 'grey';
            }
        },  
        totalProfit() {
            if(this.activeTabKey === TAB_TYPE.YEAR) {
                return this .profitDataListOfYear.reduce((pre, item) => {
                    if(this.profitType === PROFIT_TYPE.PRICE) {
                        return pre + item.profit;
                    }
                    return pre + item.ratio;
                }, 0);
            }
            if(this.activeTabKey === TAB_TYPE.MONTH) {
                return this.profitDataListOfMonth.reduce((pre, item) => {
                    if(this.profitType === PROFIT_TYPE.PRICE) {
                        return pre + item.profit;
                    }
                    return pre + item.ratio;
                }, 0);
            }
            return this.profitDataListOfDay.reduce((pre, item) => {
                    if(this.profitType === PROFIT_TYPE.PRICE) {
                        return pre + item.profit;
                    }
                    return pre + item.ratio;
            }, 0);
        },
        timeTitle() {
            if(this.activeTabKey === TAB_TYPE.YEAR) {
                return `近6年`;
            }
            if(this.activeTabKey === TAB_TYPE.MONTH) {
                return `${this.currentYear}年`;
            }
            return `${this.currentYear}年${this.currentMonth}月`;
        },
        tabList() {
            return [
                {
                    key: TAB_TYPE.DAY,
                    label: '日'
                },
                {
                    key: TAB_TYPE.WEEK,
                    label: '周'
                },
                {
                    key: TAB_TYPE.MONTH,
                    label: '月'
                },
                {
                    key: TAB_TYPE.YEAR,
                    label: '年'
                },
            ]
        },
        disablePreBtn() {
            const nowYear = getCurrentTimeInET().getFullYear();
            const nowMonth = getCurrentTimeInET().getMonth() + 1;
            return nowYear - 1 === this.currentYear && nowMonth === this.currentMonth;
        },
        disableNextBtn() {
            const nowYear = getCurrentTimeInET().getFullYear();
            const nowMonth = getCurrentTimeInET().getMonth() + 1;

            if(
                this.activeTabKey === TAB_TYPE.YEAR ||
                this.activeTabKey === TAB_TYPE.MONTH
            ) {
                
                return nowYear === this.currentYear;
            }

            return nowYear === this.currentYear && nowMonth === this.currentMonth;
        }
    },
    mounted() {
        this.initDataByTabKey(this.activeTabKey);
    },
    methods: {
        changeProfitType(profitType) {
            this.profitType = profitType;
        },
        initDataByTabKey(tabKey) {
            if(tabKey === TAB_TYPE.DAY ) {
                this.getDataOfDay();
                return;
            }
            if(tabKey === TAB_TYPE.WEEK) {
                this.getDataOfWeek();
                return;
            }
            if(tabKey === TAB_TYPE.MONTH) {
                this.getDataOfMonth();
                return;
            }
            if(tabKey === TAB_TYPE.YEAR) {
                this.getDataOfYear();
                return;
            }
        },
        async getDataOfDay() {
            try {
                const res = await getHistoricalDailyProfiApi({
                    year: this.currentYear,
                    month: this.currentMonth,
                });
                if(res.code === 200) {
                    const data = res.data.map((item) => {
                        item.profit = Number(item.profit || 0);
                        item.ratio = Number(item.ratio || 0);
                        return item;
                    });
                    this.profitDataListOfDay = data;
                } else {
                    this.$showToast();
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getDataOfMonth() {
            try {
                const res = await getHistoricalMonthlyProfitApi({
                    year: this.currentYear
                });
                if(res.code === 200) {
                    const data = res.data.map((item) => {
                        item.profit = Number(item.profit || 0);
                        item.ratio = Number(item.ratio || 0);
                        return item;
                    });
                    this.profitDataListOfMonth = data;
                } else {
                    this.$showToast();
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getDataOfWeek() {
            try {
                const res = await getHistoricalWeeklyProfitApi({
                    year: this.currentYear
                });
                if(res.code === 200) {
                    const data = res.data.map((item) => {
                        item.profit = Number(item.profit || 0);
                        item.ratio = Number(item.ratio || 0);
                        return item;
                    });
                    this.profitDataListOfWeek = data;
                } else {
                    this.$showToast();
                }
            } catch (error) {
                console.log(error)
            }
        },
        async getDataOfYear() {
            try {
                const res = await getHistoricalYearlyProfitApi({
                    year: this.currentYear
                });
                if(res.code === 200) {
                    const data = res.data.map((item) => {
                        item.profit = Number(item.profit || 0);
                        item.ratio = Number(item.ratio || 0);
                        return item;
                    });
                    this.profitDataListOfYear = data;
                } else {
                    this.$showToast();
                }
            } catch (error) {
                console.log(error)
            }
        },
        changeTab(tab) {
            this.activeTabKey = tab.key;
            this.initDataByTabKey(this.activeTabKey);
        },
        goPreTime() {
            if(this.disablePreBtn){
                return;
            }
            this.initDataByTabKey();
            if(
                this.activeTabKey === TAB_TYPE.YEAR ||
                this.activeTabKey === TAB_TYPE.MONTH
            ) {
                this.handleGoPreTimeOfYear();
                return;
            }
            this.handleGoPreTime();
        },
        goNextTime() {
            if(this.disableNextBtn) {
                return;
            }
            this.initDataByTabKey();
            if(
                this.activeTabKey === TAB_TYPE.YEAR ||
                this.activeTabKey === TAB_TYPE.MONTH
            ) {
                this.handleGoNextTimeOfYear();
                return;
            }
            this.handleGoNextTime();
        },
        handleGoPreTimeOfYear() {
            this.currentYear -= 1;
        },
        handleGoNextTimeOfYear() {
            this.currentYear += 1;
        },
        handleGoNextTime() {
            let month = this.currentMonth + 1;
                if(month === 13) {
                    month = 1;
                    this.currentYear += 1;
                }
                this.currentMonth = month;
        },
        handleGoPreTime() {
            let month = this.currentMonth - 1;
                if(month === 0) {
                    month = 12;
                    this.currentYear -= 1;
                }
                this.currentMonth = month;
        }
    }
}
</script>

<style lang="scss">
.profit_calendar {
    height: 11.3rem;
    border-radius: 0.4rem;
    background-color: #fff;
    padding: 0.2rem;
    .profit_type_wrapper {
        display: flex;
        justify-content: flex-end;
        margin: 0.1rem 0;
    }
    .profit_type_switch{
        display: flex;
        background-color: #999;
        border-radius: 0.1rem;
    }
    .type_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        width: 1rem;
        height: 100%;
        font-size: 0.5rem;
        color: #fff;
    }
    .active_type_item {
        color: #367dd7;
        background-color: #fff;
        // border-radius: 0.5rem;
    }
}
.profit_calendar .title {
    font-size: 0.4rem;
    font-weight: bold;
    color: #333;
}
.time_tab {
    display: flex;
    width: 100%;
    margin-top: 0.3rem;
}
.tab_item {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 0.75rem;
    font-size: 0.36rem;
    color: #a0a0a0;
}
.active_tab {
    background-color: #e8f2fe;
    color: #367dd7;
    border-radius: 0.5rem;
}
.second_time_wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 0.3rem;
}

.left_arrow_wrapper, .right_arrow_wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1rem;
    height: 1.2rem;
    border: 1px solid #f5f5f5;
}
.left_arrow_wrapper {
    border-top-left-radius: 0.6rem;
    border-bottom-left-radius: 0.6rem;
    .left_arrow {
        width: .5rem;
        height: .5rem;
        fill: #b2b2b2;
    }
    &.disablePreBtn{
        border-color: transparent;
    }

    &.disablePreBtn .left_arrow{
        fill: #eeeeee;
    }
}

.right_arrow_wrapper {
    border-top-right-radius: 0.6rem;
    border-bottom-right-radius: 0.6rem;
    &.disableNextBtn{
        border: none;
            .right_arrow{
            fill: #eeeeee;
        }
    }
    .right_arrow {
        width: .5rem;
        height: .5rem;
        fill: #b2b2b2;
        transform: rotate(-180deg);
    }
}
.sencond_time_value {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 1.2rem;
    width: 3.5rem;
    border-radius: 0.1rem;
    border: 1px solid #f5f5f5;
    margin: 0 0.1rem;
    font-size: 0.35rem;
    color: #333;
    &.red{
        background-color: #d8505a;
        color: #fff;
    }
    &.green{
        background-color: #3a987a;
        color: #fff;
    }
}

</style>
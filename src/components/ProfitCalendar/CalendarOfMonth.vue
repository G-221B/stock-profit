<template>
    <div class="calendayOfMonth">
        <div class="month_list">
            <div class="month_item" :class="[getMonthItemClass(item)]" v-for="item in monthList" :key="item.title">
                <div class="title">{{ item.title }}</div>
                <div class="profit">{{ getPriceType(item.profit) + item.profit.toFixed(2) + profitSymbol }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { PROFIT_TYPE } from '../../utils/constants';
import { getCurrentTimeInET } from '../../utils/index';

export default {
    props: {
        currentYear: {
            default: () => getCurrentTimeInET().getFullYear()
        },
        currentMonth: {
            default: () => getCurrentTimeInET().getMonth() + 1
        },
        profitData: {
            default: () => []
        },
        profitType: {
            default: () => PROFIT_TYPE.PRICE
        },
        profitSymbol: {
            default: () => ''
        },
    },
    data() {
        return {

        }
    },
    computed: {
        getPriceType() {
            return function(price) {
                if(price > 0) {
                    return '+';
                } else if(price < 0) {
                    return '-';
                }
                return '';
            }
        },
        getMonthItemClass() {
            return function(item) {
                if(item.profit > 0) {
                    return 'red';
                } else if(item.profit < 0) {
                    return 'green';
                }
                return 'grey';
            }
        },  
        monthList() {
            const nowYear = getCurrentTimeInET().getFullYear();
            const nowMonth = getCurrentTimeInET().getMonth() + 1;

            let maxMonthSize = 12;
            const monthList = [];
            if(nowYear === this.currentYear) {
                maxMonthSize = nowMonth;
            }
            for(let i = 1; i <= maxMonthSize; i++) {
                let title = `${i}月`;
                if( nowYear === this.currentYear && i === maxMonthSize) {
                    title = '本月'
                }
                monthList.push({
                    title,
                    profit: this.profitType === PROFIT_TYPE.PRICE ? (this.profitData[i - 1]?.profit || 0) : (this.profitData[i - 1]?.ratio || 0)
                })
            }
            return monthList;
        }
    }
}
</script>

<style lang="scss">
.calendayOfMonth {
    padding: .25rem;
    .month_list {
        display: flex;
        flex-wrap: wrap;
    }
    .month_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 23.4%;
        margin: 0 .1rem .1rem 0;
        background-color: #f5f5f5;
        height: 2rem;
        border-radius: .4rem;
        .profit {
            font-size: 0.3rem;
        }
        .title {
            font-weight: 500;
            margin-bottom: .1rem;
        }
        &.red{
        background-color: #fbebec;
            .profit {
                color: #bb4755;
            }
        }
        &.green{
            background-color: #d7f5ed;
            .profit {
                color: #3a987a;
            }
        }
    }
}
</style>
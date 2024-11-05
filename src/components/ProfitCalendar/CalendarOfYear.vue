<template>
    <div class="calendarOfYear">
        <div class="year_list">
            <div class="year_item" :class="[getYearItemClass(item)]" v-for="item in yearList" :key="item.title">
                <div class="title">{{ item.title }}</div>
                <div class="profit">{{ getPriceType(item.profit) + item.profit.toFixed(2) + profitSymbol }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { PROFIT_TYPE } from '../../utils/constants';

export default {
    props: {
        currentYear: {
            default: () => new Date().getFullYear()
        },
        currentMonth: {
            default: () => new Date().getMonth() + 1
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
        getYearItemClass() {
            return function(item) {
                if(item.profit > 0) {
                    return 'red';
                } else if(item.profit < 0) {
                    return 'green';
                }
                return 'grey';
            }
        },  
        yearList() {
            const nowYear = new Date().getFullYear();
            const startYear = nowYear - 5;
            const yearList = [];

            let profitIndex= 0;

            for(let i = startYear; i <= nowYear; i++) {
                let title = `${i}年`;
                if(i === nowYear) {
                    title = '本年'
                }
                yearList.push({
                    title,
                    profit: this.profitType === PROFIT_TYPE.PRICE ? (this.profitData[profitIndex++]?.profit || 0) : (this.profitData[profitIndex++]?.ratio || 0),
                })
            }
            return yearList;
        }
    }
}
</script>

<style lang="scss">
.calendarOfYear {
    padding: .25rem;
    .year_list {
        display: flex;
        flex-wrap: wrap;
    }
    .year_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 31.4%;
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
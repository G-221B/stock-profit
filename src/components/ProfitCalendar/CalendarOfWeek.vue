<template>
    <div class="calendayOfWeek">
        <div class="week_list">
            <div class="week_item" :class="[getDayItemClass(item), item.isOutOfNow ? 'outof_item' : '']" v-for="(item,index) in weekList" :key="index + item.key">
                <div class="title">{{ item.title }}</div>
                <div class="profit" v-if="!item.isOutOfNow">{{ getPriceType(item.profit) +  item.profit.toFixed(2) + profitSymbol }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getDaysInMonth, isDateInRange, isDateOutOfTargetDay} from '../../utils/index';
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
        return {}
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
        getDayItemClass() {
            return function(item) {
                if(item.profit > 0) {
                    return 'red';
                } else if(item.profit < 0) {
                    return 'green';
                }
                return 'grey';
            }
        }, 
        weekProfitList() {
            let weekProfitList = [];
            let curWeekProfit = 0;
            let size = 0;
            for(let i = 0; i < this.profitData.length; i++) {
                size++;
                curWeekProfit += Number(this.profitType === PROFIT_TYPE.PRICE ? (this.profitData[i]?.profit || 0) : (this.profitData[i]?.ratio || 0) );
                if(size === 7 || i === this.profitData.length - 1) {
                    weekProfitList.push(curWeekProfit);
                    size = 0;
                    curWeekProfit = 0;
                }
            }
            return weekProfitList;
        },  
        weekList() {
            const formatMoth = this.currentMonth.toString().padStart(2, '0');
            
            const maxDayOfMonth = getDaysInMonth(this.currentYear, this.currentMonth);
            const formatMaxDay = maxDayOfMonth.toString().padStart(2, '0');

            let weekList = [];

            let weekProfitIndex = 0;
            for(let i = 1; i <= 28; i += 7 ) {
                const startDay = i.toString().padStart(2, '0');
                const endDay = (i + 6).toString().padStart(2, '0');

                const profit = Number(this.weekProfitList[weekProfitIndex++]);

                weekList.push(                {
                    key: `${this.currentYear}${formatMoth}.${startDay}-${formatMoth}-${endDay}`,
                    title: isDateInRange(this.currentYear, this.currentMonth, startDay, endDay) ? '本周': `${formatMoth}.${startDay}-${formatMoth}-${endDay}`,
                    profit,
                    isOutOfNow: !isDateInRange(this.currentYear, this.currentMonth, startDay, endDay) && isDateOutOfTargetDay(this.currentYear, this.currentMonth,i + 7)
                })
            }
            if(maxDayOfMonth === 29) {
                weekList.push({
                    key: `${this.currentYear}${formatMoth}.29`,
                    title: isDateInRange(this.currentYear, this.currentMonth, 29, 29) ? '本周': `${formatMoth}.29`,
                    profit: this.weekProfitList[this.weekProfitList.length - 1] || 0,
                    isOutOfNow: !isDateInRange(this.currentYear, this.currentMonth, 29, 29) && isDateOutOfTargetDay(this.currentYear, this.currentMonth, 30)
                })
            }
            if(maxDayOfMonth > 29) {
                weekList.push({
                    key: `${this.currentYear}${formatMoth}.29-${formatMoth}.${formatMaxDay}`,
                    title: isDateInRange(this.currentYear, this.currentMonth, 29, formatMaxDay) ? '本周': `${formatMoth}.29-${formatMoth}.${formatMaxDay}`,
                    profit: this.weekProfitList[this.weekProfitList.length - 1] || 0,
                    isOutOfNow: !isDateInRange(this.currentYear, this.currentMonth, 29, formatMaxDay) && isDateOutOfTargetDay(this.currentYear, this.currentMonth, maxDayOfMonth + 1)
                })
            }
            return weekList;
        }
    }
}
</script>

<style lang="scss">
.calendayOfWeek {
    padding: 0.25rem;
    .week_list {
        display: flex;
        flex-wrap: wrap;
    }
    .week_item {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
        width: 32%;
        height: 1.5rem;
        background-color: #f5f5f5;
        font-size: 0.3rem;
        color: #333;
        margin: 0 0.1rem 0.1rem 0;
        border-radius: .2rem;
        .title {
            font-size: 0.32rem;
            margin-bottom: .1rem;
            font-weight: 500;
        }
        &.red {
            background-color: #fbebec;
            .profit {
                color: #dc6d74;
            }
        }
        &.green {
            background-color: #d7f5ed;
            .profit {
                color: #45a487;
            }
        }
        &.outof_item {
            background: #fff;
        }
    }
    
}
</style>
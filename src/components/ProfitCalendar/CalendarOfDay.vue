<template>
    <div class="calendarOfDay">
        <div class="week_name_list">
            <div class="week_name_item" v-for="item in weekNameList" :key="item">{{ item }}</div>
        </div>
        <div class="day_list_wrapper">
            <div 
                class="day_item" 
                :class="getDayItemClass(item)" 
                v-for="item in dayList" 
                :key="item.key"
                @click="changeDay(item)"
            >
                <div class="title">{{ item.title }}</div>
                <div class="profit" v-if="!item.isOutOfNow">{{ getPriceType(item.profit) + formatPrice(item.profit) + profitSymbol }}</div>
            </div>
        </div>
    </div>
</template>

<script>
import { getWeekday, getDaysInMonth, formatPrice, isDateOutOfTargetDay, isToday } from '../../utils/index';
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
            selectTimeData: {
                year: 0,
                month: 0,
                day: 0
            }
        }
    },
    mounted() {
        this.selectTimeData = {
            year: new Date().getFullYear(),
            month: new Date().getMonth() + 1,
            day: new Date().getDate()
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
        getDayItemClass() {
            return function(item) {
                const classArray = [item.hidden ? 'hidden': '' , item.isOutOfNow ? 'outOfNow' : ''];
                if(item.profit > 0) {
                    classArray.push('red')
                } else if(item.profit < 0) {
                    classArray.push('green')
                } else {
                    classArray.push('grey')
                }

                if(
                    this.selectTimeData.year === this.currentYear && 
                    this.selectTimeData.month === this.currentMonth &&
                    this.selectTimeData.day === item.day
                ) {
                    classArray.push('select_day_item')
                }

                return classArray;
            }
        },  
        weekNameList() {
            return ['日','一', '二', '三', '四', '五', '六']
        },
        dayList() {
            let dayList = [];
            const days = getDaysInMonth(this.currentYear, this.currentMonth);
            const weekday = getWeekday(this.currentYear, this.currentMonth, 1);
            for(let i = 0; i < weekday; i++) {
                dayList.push({
                    hidden: true,
                    key: i + 'empty',
                    profit: 0
                })
            }
            for(let i = 0; i < days; i++) {
                let title = i + 1;
                if(isToday(this.currentYear, this.currentMonth, i+1)) {
                    title = '今';
                }

                dayList.push({
                    title,
                    profit: this.profitType === PROFIT_TYPE.PRICE ? (this.profitData[i]?.profit || 0) : (this.profitData[i]?.ratio || 0),
                    key: i + 1 + 'val',
                    day: i+1,
                    isOutOfNow: isDateOutOfTargetDay(this.currentYear, this.currentMonth, i+1)
                })
            }
            return dayList;
        }
    },
    methods: {
        formatPrice,
        changeDay(item) {
            this.selectTimeData = {
                year: this.currentYear,
                month: this.currentMonth,
                day: item.day
            }
            this.$eventBus.$emit('changeProfitTableTime', this.selectTimeData)
        }
    }
}
</script>

<style lang="scss">
.calendarOfDay {
    padding: .25rem;
    .week_name_list {
        display: flex;
        margin-bottom: 0.2rem;
    }
    .week_name_item {
        display: flex;
        justify-content: center;
        width: 13%;
        font-size: 0.4rem;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
    }
    .day_list_wrapper {
        display: flex;
        flex-wrap: wrap;
    }
    .day_item {
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
        width: 13%;
        height: 1rem;
        background-color: #f5f5f5;
        margin-right: 0.1rem;
        margin-top: 0.1rem;
        border-radius: 0.2rem;
        .profit {
            height: 0.2rem;
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
        &.outOfNow, &.grey {
            background-color: #f5f5f5;
        }
        .title {
            font-size: 0.3rem;
            color: #333;
            font-weight: 500;
        }
    }
    .select_day_item {
        box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
        .title {
            color: #fff;
        }
        &.red{
            background-color: #d7505a;
            .profit {
                color: #fff;
            }
        }
        &.green{
            background-color: #2b8971;
            .profit {
                color: #fff;
            }
        }
        &.outOfNow, &.grey {
            background-color: #999999;
            .profit {
                color: #fff;
            }
        }
    }
    .day_item.hidden {
        visibility: hidden;
    }
    .day_item .profit {
        color: #999;
        font-size: 0.25rem;
        margin-top: 0.05rem;
    }
}

</style>
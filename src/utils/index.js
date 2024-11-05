export function getWeekday(year, month, day) {
    // 创建Date对象，注意：月份是从0开始的，所以实际月份需要减1
    var date = new Date(year, month - 1, day);
    
    // 获取星期几，返回值是0（周日）到6（周六）
    var weekday = date.getDay();
    
    
    // 返回对应的星期几
    return [weekday];
  }
  
 export function getDaysInMonth(year, month) {
    // 传入的月份是从1开始的，Date对象中月份是从0开始的
    month = month - 1;
    
    // 创建一个Date对象，设置为下一个月的第一天，时间为0时0分0秒
    var date = new Date(year, month + 1, 0);
    
    // 返回这个月的总天数
    return date.getDate();
  }

 export function formatPrice(price) {
    // 首先检查price是否为数字类型
    if (typeof price === 'number' && !isNaN(price)) {
      // 如果price大于10000，则转换为“万”为单位
      if (price > 10000 || price < -10000) {
        return (price / 10000).toFixed(2) + '万';
      }
      return price.toFixed(2);
    }
    // 如果price不是数字或者小于等于10000，直接返回price
    return '0.00';
  }

  export function isDateInRange(year, month, startDay, endDay) {
    // 获取今天的日期
    const today = new Date();
  
    // 构建输入的起始日期和结束日期
    const startDate = new Date(year, month - 1, startDay); // 注意月份是从0开始的
    const endDate = new Date(year, month - 1, endDay);
  
    // 检查年份、月份和日期是否在范围内
    return today >= startDate && today <= endDate;
  }

  export function isDateOutOfTargetDay(year, month, day) {
    // 获取今天的日期
    const today = new Date();
    const targetDate = new Date(year, month - 1, day);

    return targetDate > today;
  }

  export function isToday(year, month, day) {
    // 获取今天的日期
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth() + 1; // getMonth() 返回0-11，所以加1
    const currentDay = today.getDate();
  
    // 比较传入的日期和今天的日期
    return currentYear === year && currentMonth === month && currentDay === day;
  }
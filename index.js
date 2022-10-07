// 计算重生天数
function showRebirthDays() {
    let rebirthTime = '2022/10/01 00:00:00';// 重生时间
    let dateBegin = new Date(rebirthTime);  // 重生时间数据
    let dateEnd = new Date();   // 当前时间数据
    let dateDiff = dateEnd.getTime() - dateBegin.getTime();// 时间差（getTime()返回距1970年1月1日之间的毫秒数）
    let dayDiff = Math.ceil(dateDiff / (24 * 3600 * 1000));// 重生天数
    let oRebirthDays = document.getElementById('rebirth-days');
    oRebirthDays.innerText = dayDiff;   // 挂载到页面
}


// ***************** 实时显示时间 *****************
// 显示当前日期
function showCurrentDate() {
    let currentTime = new Date();   // 获取当前时间
    // 月
    let oDateMonth = document.getElementById('date-month');
    let month = currentTime.getMonth() + 1;
    if(month < 10) { month = '0' + month }
    oDateMonth.innerText = month;
    // 日
    let oDateDay = document.getElementById('date-day');
    let day = currentTime.getDate();
    if(day < 10) { day = '0' + day }
    oDateDay.innerText = day;
    // 周
    let oDateWeek = document.getElementById('date-week');
    let weeks = '日一二三四五六'.split('');
    let week = weeks[currentTime.getDay()];
    oDateWeek.innerText = week;
}

// 显示当前时间
function showCurrentTime() {
    let currentTime = new Date();   // 获取当前时间
    // 时
    let oTimeHour = document.getElementById('time-hour');
    let hour = currentTime.getHours();
    if(hour < 10) { hour = '0' + hour }
    oTimeHour.innerText = hour;
    // 分
    let oTimeMinute = document.getElementById('time-minute');
    let minute = currentTime.getMinutes();
    if(minute < 10) { minute = '0' + minute }
    oTimeMinute.innerText = minute;
}

// 闪烁时间分隔符
function showTimeSeparator(flag) {
    let oTimeSeparator = document.getElementById('time-separator');
    if(flag) {
        oTimeSeparator.style.opacity = '1';
    } else {
        oTimeSeparator.style.opacity = '0';
    }
}

// 显示当前时间和日期信息
function showRealTime() {
    showCurrentTime();   // 时间
    showCurrentDate();   // 日期
}




// ***************** 编辑标语 *****************
function editSlogan() {
    let oEdit = document.getElementById('edit');
    let oSlogan = document.getElementById('slogan');
    oEdit.onclick = function() {
        oSlogan.disabled = false;
        oSlogan.focus();
    }
    oSlogan.onblur = function() {
        oSlogan.disabled = true;
    }
}


// ***************** 计算并显示累计时间 *****************
// 开始计时
function startCalcTime() {
    let time = new Date();  // 获取当前时间
    timeBegin = time.getTime();
}
// 结束计时
function stopCalcTime() {
    let time = new Date();  // 获取当前时间
    timeEnd = time.getTime();
}

// 显示今天累计学习时间
function showTodayTime() {
    let key = getTodayKey();// 获取今日key值
    let totalSeconds = JSON.parse(localStorage.getItem(key));// 总秒数
    let totalMinutes = Math.round(totalSeconds / 60);// 总分数
    let todayHours = Math.floor(totalMinutes / 60);// 时
    let todayMinutes;   // 分
    if(todayHours < 1) {
        todayMinutes = totalMinutes;
    } else {
        todayMinutes = totalMinutes - (todayHours * 60);
    }
    let oTimeToday = document.getElementById('time-today');
    oTimeToday.innerText = todayHours + '小时' + todayMinutes + '分钟';
}

// 格式化key
function formatKey(num) {
    let key;
    if(num < 10) {
        key = '0000' + num; 
    } else if(num < 100) {
        key = '000' + num;
    } else if(num < 1000) {
        key = '00' + num;
    } else if(num < 10000) {
        key = '0' + num;
    }
    return key;
}


// 本周累计学习时间
function showWeekTime() {
    let key = getTodayKey();// 获取今日key值
    // 本周已过天数
    let date = new Date();
    let weeks = date.getDay() + 1;
    if(weeks === 0) { weeks = 7 }
    // 累计本周各天时间(总秒数)
    let totalSeconds = 0;
    let dayNum = Number(key);
    for(let i = 0; i < weeks; i++) {
        let newKey = formatKey(dayNum);
        let seconds = localStorage.getItem(newKey);
        totalSeconds += JSON.parse(seconds);
        dayNum--;
    }
    let totalMinutes = Math.round(totalSeconds / 60);// 周总分数
    let weekHours = Math.floor(totalMinutes / 60);// 周时
    let weekMinutes;   // 周分
    if(weekHours < 1) {
        weekMinutes = totalMinutes;
    } else {
        weekMinutes = totalMinutes - (weekHours * 60);
    }
    let oTimeWeek = document.getElementById('time-week');
    oTimeWeek.innerText = weekHours + '小时' + weekMinutes + '分钟';
}
// 本月累计学习时间
function showMonthTime() {
    let key = getTodayKey();// 获取今日key值
    // 本月已过天数
    let date = new Date();
    let days = date.getDate();
    // 累计本月各天时间(总秒数)
    let totalSeconds = 0;
    let dayNum = Number(key);
    for(let i = 0; i < days; i++) {
        let newKey = formatKey(dayNum);
        let seconds = localStorage.getItem(newKey);
        totalSeconds += JSON.parse(seconds);
        dayNum--;
    }
    let totalMinutes = Math.round(totalSeconds / 60);// 月总分数
    let monthHours = Math.floor(totalMinutes / 60);// 月时
    let monthMinutes;   // 月分
    if(monthHours < 1) {
        monthMinutes = totalMinutes;
    } else {
        monthMinutes = totalMinutes - (monthHours * 60);
    }
    let oTimeMonth = document.getElementById('time-month');
    oTimeMonth.innerText = monthHours + '小时' + monthMinutes + '分钟';
}

// 获取今日key值（从2022/10/01开始的天数序列号）
function getTodayKey() {
    let oRebirthDays = document.getElementById('rebirth-days');
    let days = JSON.parse(oRebirthDays.innerText);
    let key;
    if(days < 10) {
        key = '0000' + days;
    } else if(days < 100) {
        key = '000' + days;
    } else if(days < 1000) {
        key = '00' + days;
    } else if(days < 10000) {
        key = '0' + days;
    }
    return key;
}

// 保存计时数据（今天）
function saveTimeData() {
    // 获取今日key值
    let key = getTodayKey();
    // 获取今天已积累时间
    let totalTime = JSON.parse(localStorage.getItem(key));
    // 今天最新累计时间value（秒数）
    let timeDiff = timeEnd - timeBegin;
    let timeData = Math.round(timeDiff / 1000); // 四舍五入
    totalTime += timeData;
    let value = JSON.stringify(totalTime);
    // 更新localstorage数据
    localStorage.setItem(key, value);    
}



// ***************** 创建特定localStorage *****************
function createLocalStorage() {
    let key;
    let value = '0';
    for(let i = 1; i <= 2000; i++) {
        if(i < 10) {
            key = '0000' + i;
        } else if(i < 100) {
            key = '000' + i;
        } else if(i < 1000) {
            key = '00' + i;
        } else if(i < 10000) {
            key = '0' + i;
        }
        localStorage.setItem(key, value);
    }
}



// ***************** 开始执行 *****************
// 创建特定localStorage
// createLocalStorage();

// 显示实时时间
showRealTime();
let flag = 0;
setInterval(function() {
    flag = !flag;
    showCurrentTime();   // 时间
    showTimeSeparator(flag); // 分隔符
}, 1000);

// 显示重生天数
showRebirthDays();
// 编辑标语
editSlogan();
// 计算并显示累计时间
let timeBegin;  // 开始计时
let timeEnd;    // 结束计时

showTodayTime(); // 显示今天学习时间
showWeekTime();  // 显示本周学习时间
showMonthTime(); // 显示本月学习时间

let oBtnTimer = document.getElementById('btn-timer');
oBtnTimer.onclick = function() {
    let tab = oBtnTimer.innerText;
    if(tab === '开始学习') {
        startCalcTime();// 开始计时
        oBtnTimer.innerText = '结束学习';
    } else if (tab === '结束学习') {
        stopCalcTime();  // 结束计时
        saveTimeData();  // 保存计时数据
        oBtnTimer.innerText = '开始学习';
        showTodayTime(); // 显示今天学习时间
        showWeekTime();  // 显示本周学习时间
        showMonthTime(); // 显示本月学习时间
    }
}
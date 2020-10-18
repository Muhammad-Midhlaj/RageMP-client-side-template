
var updateGameTime = true;
var setTimeCMDused = false;

var nowTime = { Hour: 0, Minute: 0 };
var nowDate = { Day: 7, Month: 4, Year: 2018 };
var nowWeather = "EXTRASUNNY";

mp.events.add('Enviroment_Time', (data) => {
    if (data == undefined) return;
    if (updateGameTime) mp.game.time.setClockTime(data[0], data[1], 0);

    nowTime.Hour = data[0];
    nowTime.Minute = data[1];

    mp.gui.emmit(`window.hud.updateServerInfo("servertime", '${global.formatIntZero(data[0], 2)}:${global.formatIntZero(data[1], 2)}')`, false);
})

mp.events.add('Enviroment_Date', (data) => {
    if (data == undefined) return;

    nowDate.Day = data[0];
    nowDate.Month = data[1];
    nowDate.Year = data[2];

    mp.gui.emmit(`window.hud.updateServerInfo("serverdate", '${global.formatIntZero(data[0], 2)}.${global.formatIntZero(data[1], 2)}.${data[2]}')`, false);
})

mp.events.add('Enviroment_Weather', (weather) => {
    if (updateGameTime) mp.game.gameplay.setWeatherTypeTransition(nowWeather, weather, 0.5);
	else if(setTimeCMDused) mp.game.gameplay.setWeatherTypeNow(weather);
    nowWeather = weather;
})

mp.events.add('Enviroment_Start', (timeData, dateData, weather) => {
    mp.game.time.setClockTime(timeData[0], timeData[1], 0);
    
    nowTime.Hour = timeData[0];
    nowTime.Minute = timeData[1];

    mp.gui.emmit(`window.hud.updateServerInfo("servertime", '${global.formatIntZero(nowTime.Hour, 2)}:${global.formatIntZero(nowTime.Minute, 2)}')`);

    nowDate.Day = dateData[0];
    nowDate.Month = dateData[1];
    nowDate.Year = dateData[2];

    mp.gui.emmit(`window.hud.updateServerInfo("serverdate", '${global.formatIntZero(nowDate.Day, 2)}.${global.formatIntZero(nowDate.Month, 2)}.${nowDate.Year}')`, false);

    mp.game.gameplay.setWeatherTypeTransition(nowWeather, weather, 0.5);
    nowWeather = weather;
})

setInterval(() => {
    if (updateGameTime) {
        mp.game.gameplay.setWeatherTypeNow(nowWeather);
    }
}, 1000);
mp.events.add('setTimeCmd', (hour, minute, second) => {
	if(hour == -1 && minute == -1 && second == -1) {
		setTimeCMDused = false;
		updateGameTime = true;
		mp.game.gameplay.setWeatherTypeNow(nowWeather);
		mp.game.time.setClockTime(nowTime.Hour, nowTime.Minute, 0);
	} else {
		setTimeCMDused = true;
		updateGameTime = false;
		mp.game.time.setClockTime(hour, minute, second);
	}
})
mp.events.add('stopTime', () => {
    updateGameTime = false;

    mp.game.gameplay.setWeatherTypeNow('EXTRASUNNY');
    mp.game.time.setClockTime(0, 0, 0);
})
mp.events.add('resumeTime', () => {
    updateGameTime = true;

    mp.game.gameplay.setWeatherTypeNow(nowWeather);
    mp.game.time.setClockTime(nowTime.Hour, nowTime.Minute, 0);
})
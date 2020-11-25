import colors from 'colors'
import axios, { AxiosResponse } from 'axios'
const { program } = require('commander');

program
  .version('0.1.0')
  .option('-c, --city [name,extensions]', 'Add city name')
program.parse(process.argv);

if (process.argv.slice(2).length === 0) {
  program.outputHelp(colors.red);
  process.exit();
}

interface weatherResponseTypes {
  status: string,
  count: string,
  info: string,
  lives: livesTypes[],
}
interface livesTypes {
  province: string,
  city: string,
  adcode: string,
  weather: string,
  temperature: string,
  winddirection: string,
  windpower: string,
  humidity: string,
  reporttime: string
}
interface forecastsTypes {
  date: string,
  week: string,
  dayweather: string,
  nightweather: string,
  daytemp: string,
  nighttemp: string,
  daywind: string,
  nightwind: string,
  daypower: string,
  nightpower: string,
}
const URL = "https://restapi.amap.com/v3/weather/weatherInfo";
const USER_KEY = "09795c47eefea2940fef4c70f0d43ec7";
const log = console.log;
// **  promise write
// axios
//   .get(`${URL}?city=${encodeURI(program.city)}&key=${USER_KEY}`)
//   .then((res: AxiosResponse<weatherResponseTypes>) => {
//     const lives = res.data.lives[0];
//     log(colors.yellow(lives.reporttime));
//     log(colors.white(`${lives.province} ${lives.city}`));
//     log(colors.green(`${lives.weather} ${lives.temperature} 度`));
//   })
//   .catch(() => {
//     log(colors.red('天气服务异常'));
//   })

// ** async await write
const getWeather = async (reqData: string) => {
  try {
    const params: string[] = reqData.split(',');
    const [city, extensions] = params;
    let url
    if (extensions) {
      url = `${URL}?city=${encodeURI(city)}&key=${USER_KEY}&extensions=all`;
    } else {
      url = `${URL}?city=${encodeURI(city)}&key=${USER_KEY}`;
    }
    const response = await axios.get(url);
    if (extensions) {
      logForecasts(response);
    } else {
      logLives(response);
    }
  } catch (error) {
    log(colors.red('天气服务异常'));
  }
}
getWeather(program.city);

const logLives = (response: any) => {
  const lives = response.data.lives[0];
  log(colors.yellow(lives.reporttime));
  log(colors.white(`${lives.province} ${lives.city}`));
  log(colors.green(`${lives.weather} ${lives.temperature} 度`));
}
const logForecasts = (response: any) => {
  const forecasts = response.data.forecasts[0];
  const { casts } = forecasts;
  log(colors.red(`${forecasts.province} ${forecasts.city}`))
  casts.forEach((item: forecastsTypes) => {
      log(colors.yellow(`${item.date} 周${item.week}`))
      log(colors.white(`白天：${item.dayweather} 夜晚：${item.nightweather}`))
      log(colors.green(`白天：${item.daytemp} 夜晚：${item.nighttemp}`))
  })
}
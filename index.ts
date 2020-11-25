import colors from 'colors'
import axios, { AxiosResponse } from 'axios'
const { program } = require('commander');

program
  .version('0.1.0')
  .option('-c, --city [name]', 'Add city name')
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
const getWeather = async (city: string) => {
  try {
    const url = `${URL}?city=${encodeURI(city)}&key=${USER_KEY}`;
    const response = await axios.get(url);
    const lives = response.data.lives[0];
    log(colors.yellow(lives.reporttime));
    log(colors.white(`${lives.province} ${lives.city}`));
    log(colors.yellow(`${lives.weather} ${lives.temperature} 度`));
  } catch (error) {
    log(colors.red('天气服务异常'));
  }
}
getWeather(program.city)
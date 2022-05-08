import { useState, useEffect } from "react";
import { Icon } from "@iconify/react";
import { Tooltip } from "@mui/material";
import moment from "moment";
import Lottie from "react-lottie";
import Loading from "./assets/loading.json";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  useParams,
} from "react-router-dom";

const getTime = () => {
  const currentTime = new Date();
  const hours = currentTime.getHours();

  if (5 <= hours && hours < 11) return "Morning";
  if (12 <= hours && hours <= 16) return "Afternoon";
  if (17 <= hours && hours <= 20) return "Evening";
  if ((21 <= hours && hours <= 23) || (0 <= hours && hours <= 4))
    return "Night";
};

const Weather = () => {
  const [data, setdata] = useState();
  const [query, setquery] = useState("");
  const [results, setresult] = useState([]);

  const { place } = useParams();

  useEffect(() => {
    setquery("");
    fetch(
      `http://api.weatherapi.com/v1/forecast.json?key=${
        import.meta.env.VITE_API_KEY
      }&q=${place || "Johor Bahru"}&days=3&aqi=no&alerts=no`
    )
      .then((res) => res.json())
      .then((e) => setdata(e))
      .then(console.log(data));
  }, [place]);

  useEffect(() => {
    setresult([]);
    if (query) {
      fetch(
        `http://api.weatherapi.com/v1/search.json?key=${
          import.meta.env.VITE_API_KEY
        }&q=${query}}`
      )
        .then((res) => res.json())
        .then((d) => setresult(d));
    }
  }, [query]);

  return data ? (
    <div className="flex h-screen flex-col lg:flex-row">
      <div className="relative bg-gradient-to-l from-[#53bfc9] to-cyan-400 lg:w-1/2 h-full flex flex-col justify-center p-16 text-white">
        <p className="text-xl ml-0.5">
          {moment(data.location.localtime_epoch * 1000).format("ddd, MMM D")}
        </p>
        <h2 className="text-4xl mt-6 tracking-wider">
          Good {getTime()}, Jiahuiiiii
        </h2>
        <p className="text-cyan-100 mt-4 font-light text-xl tracking-wide">
          Here&apos;s your weather telecast for today
        </p>
        <div className="flex justify-between lg:items-center lg:flex-row flex-col items-start">
          <div className="flex-row">
            <img src={data.current.condition.icon} className="w-20" />
            <p className="flex items-center gap-2 mt-4">
              <Icon icon="carbon:location-filled" />
              {data.location.name}
            </p>
            <p className="font-medium mt-2">{data.current.condition.text}</p>
            <p className="font-extralight mt-2">
              Feels like{" "}
              <span className="font-semibold">
                {data.current.feelslike_c}°C
              </span>
            </p>
          </div>
          <p className="font-semibold text-6xl">{data.current.temp_c}°C</p>
        </div>

        <Icon
          icon="ant-design:cloud-filled"
          className="w-32 h-32 animate-pulse text-white opacity-20 absolute top-8 left-12"
        />
        <Icon
          icon="ant-design:cloud-filled"
          className="w-64 h-64 animate-pulse text-white opacity-20 absolute top-16 right-12"
        />
        <Icon
          icon="ant-design:cloud-filled"
          className="w-48 h-48 animate-pulse text-white opacity-20 absolute bottom-16 left-20"
        />
        <Icon
          icon="ant-design:cloud-filled"
          className="w-40 h-40 animate-pulse text-white opacity-20 absolute bottom-24 right-12"
        />
        <svg
          className="absolute bottom-0 left-0 text-cyan-700 opacity-60"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
        >
          <path
            fill="currentColor"
            fill-opacity="1"
            d="M0,224L288,160L576,224L864,288L1152,64L1440,160L1440,320L1152,320L864,320L576,320L288,320L0,320Z"
          ></path>
        </svg>
      </div>

      <div className="lg:w-1/2 h-full mx-10 pt-12 flex flex-col ">
        <div className="flex justify-between w-full items-center relative">
          <input
            type="text"
            placeholder="Location"
            value={query}
            onChange={(e) => setquery(e.target.value)}
            className=" border-b-2 border-zinc-300 pb-2 text-xl focus:outline-none w-full "
          />
          <Icon icon="uil:search" className="w-6 h-6 mb-5" />
          <div className="absolute bottom-0 rounded-b-md left-0 flex w-full z-10 flex-col translate-y-full bg-white shadow-lg divide-y">
            {query && !results.length ? (
              <div className="py-3 px-4 text-zinc-800 text-center">
                No results
              </div>
            ) : (
              results.map((result) => (
                <Link className="py-3 px-4 text-zinc-800 text-center" to={`/${result.url}`}>
                  {[result.name, result.region, result.country]
                    .filter((e) => e)
                    .join(", ")}
                </Link>
              ))
            )}
          </div>
        </div>
        <div className="mt-8">
          <h2 className="font-medium text-2xl py-4">Weather Details</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <Tooltip title=" the fraction of the sky obscured by clouds on average when observed from a particular location">
                <span className="font-light text-zinc-700">Cloud</span>
              </Tooltip>
              <span>{data.current.cloud}%</span>
            </div>
            <div className="flex items-center justify-between">
              <Tooltip title="The amount of water vapor in the air">
                <span className="font-light text-zinc-700">Humidity</span>
              </Tooltip>
              <span>{data.current.humidity}%</span>
            </div>
            <div className="flex items-center justify-between">
              <Tooltip title="Wind is moving air and is caused by differences in air pressure within our atmosphere">
                <span className="font-light text-zinc-700">Pressure</span>
              </Tooltip>
              <span>{data.current.pressure_mb}mb</span>
            </div>
            <div className="flex items-center justify-between">
              <Tooltip title="The force exerted on a surface by the air above it as gravity pulls it to Earth">
                <span className="font-light text-zinc-700">Wind</span>
              </Tooltip>
              <span className="flex flex-row justify-center items-center gap-2">
                <span>
                  <Icon
                    icon="fa-solid:location-arrow"
                    className="origin-center"
                    style={{
                      transform: `rotate(${data.current.wind_degree - 45}deg)`,
                    }}
                  />
                </span>
                {data.current.wind_dir} @ {data.current.wind_kph}km/h
              </span>
            </div>
            <div className="flex items-center justify-between">
              <Tooltip title="The distance one can see as determined by light and weather conditions">
                <span className="font-light text-zinc-700">Visibility</span>
              </Tooltip>
              <span>{data.current.vis_km}km</span>
            </div>
            <div className="flex items-center justify-between">
              <Tooltip title="A brief increase in the speed of the wind, usually less than 20 seconds">
                <span className="font-light text-zinc-700">Wind Gust</span>
              </Tooltip>
              <span>{data.current.gust_kph}km/h</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-medium text-2xl py-4">Weather Forecast</h2>
          <div className="flex flex-col gap-3">
            {data.forecast.forecastday.map((day) => (
              <div className="flex justify-between items-center">
                <span className="font-light text-zinc-700">
                  {moment(day.date_epoch * 1000).format("ddd, MMM D")}
                </span>
                <img src={day.day.condition.icon} className="w-8 h-8" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center h-screen w-full">
      <Lottie
        options={{
          loop: true,
          autoplay: true,
          animationData: Loading,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
        height={400}
        width={400}
      />
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Weather />} />
        <Route path="/:place" element={<Weather />} />
      </Routes>
    </Router>
  );
}
export default App;

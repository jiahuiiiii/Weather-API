import "animate.css";
import Icon_ from "./assets/icon.png";
import ReactTooltip from "react-tooltip";
import { Icon } from "@iconify/react";

const App = () => {
  return (
    <div className="flex h-screen ">
      <div className="relative bg-[#53bfc9] w-1/2 h-full flex flex-col justify-center p-16 text-white">
        <p className="text-xl ml-0.5">Sun, May 7</p>
        <h2 className="text-4xl mt-6 tracking-wider">
          Good afternoon, Jiahuiiiii
        </h2>
        <p className="text-cyan-100 mt-4 font-light text-xl tracking-wide">
          Here&apos;s your weather telecast for today
        </p>
        <div className="flex justify-between items-center">
          <div>
            <img src={Icon_} className="w-20" />
            <p className="flex items-center gap-2 mt-4">
              <Icon icon="carbon:location-filled" />
              Johor Bahru
            </p>
            <p className="font-medium mt-2">Sunny</p>
            <p className="font-extralight mt-2">
              Feels like <span className="font-semibold">30.8°C</span>
            </p>
          </div>
          <p className="font-semibold text-6xl">28.0°C</p>
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

      <div className="w-1/2 h-full mx-10 pt-12 flex flex-col">
        <div className="flex justify-between w-full items-center">
          <input
            type="text"
            placeholder="Loaction"
            className=" border-b-2 border-zinc-300 pb-2 text-xl focus:outline-none w-full"
          />
          <Icon icon="uil:search" className="w-6 h-6 mb-5" />
        </div>
        <div className="mt-8">
          <h2 className="font-medium text-2xl py-4">Weather Details</h2>
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <ReactTooltip>
                <span className="font-light text-zinc-700">Cloud</span>
              </ReactTooltip>
              <span>75%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-light text-zinc-700">Humidity</span>
              <span>84%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-light text-zinc-700">Wind</span>
              <span>7.8km/h</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-light text-zinc-700">Pressure</span>
              <span>1006mb</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-light text-zinc-700">Visibility</span>
              <span>9km</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="font-light text-zinc-700">Wind Gust</span>
              <span>11km/h</span>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h2 className="font-medium text-2xl py-4">Next days</h2>
          <div className="flex flex-col gap-3">
            <div className="flex justify-between items-center">
              <span className="font-light text-zinc-700">Sun, May 8</span>
              <img
                src="//cdn.weatherapi.com/weather/64x64/night/116.png"
                className="w-8 h-8"
              />
            </div>
            <div className="flex justify-between items-center">
              <span className="font-light text-zinc-700">Sun, May 9</span>
              <img
                src="//cdn.weatherapi.com/weather/64x64/night/356.png"
                className="w-8 h-8"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;

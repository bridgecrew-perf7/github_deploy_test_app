import React from "react";
import RouletteWheel from "./RouletteWheel";
import ChooseRestaurant from "./ChooseRestaurant";
import CheckChoosedRestaurant from "./CheckChoosedRestaurant";
import "./css/RoulettePage.css";

const Header = () => {
  const today = new Date();
  const day_in_kor = ["일", "월", "화", "수", "목", "금", "토"];
  const header = `당신의 ${day_in_kor[today.getDay()]}요일 ${
    today.getHours() < 15 ? "점심" : "저녁"
  } 운명은 여기에 달려있어...!!`;

  return (
    <div id="titleDiv">
      <p id="dateParag">{today.toDateString()}</p>
      {header}
    </div>
  );
};

const RoulettePage = () => {
  return (
    <div id="rouletteContainer">
      <Header />
      <RouletteWheel />
      <ChooseRestaurant />
      <CheckChoosedRestaurant />
    </div>
  );
};

export default RoulettePage;

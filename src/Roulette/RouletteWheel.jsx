import { useState } from "react";

import { Wheel } from "react-custom-roulette";
import { observer } from "mobx-react";
import RouletteStore from "./store";

const store = RouletteStore;

const RouletteWheel = observer(() => {
  const [message, setMessage] = useState("룰렛을 onClick으로 돌려봐♥");

  function endRoulette() {
    const today = new Date();
    setMessage(
      `${today.getHours() < 15 ? "점심" : "저녁"}은 ${
        store.choosedRestaurantList[store.prizeNumber].option
      }!!!`
    );
    store.setPrizeNumber();
    store.setSpin(false);
  }

  return (
    <div id="roulette" onClick={() => store.setSpin(true)}>
      <Wheel
        mustStartSpinning={store.spin}
        data={store.choosedRestaurantList}
        prizeNumber={store.prizeNumber}
        textColors={["#ffffff"]}
        onStopSpinning={endRoulette}
      />
      <div
        id="popupDiv"
        className={
          (store.spin === true) | (store.popup === false) ? "hide" : ""
        }
      >
        {message}
      </div>
    </div>
  );
});

export default RouletteWheel;

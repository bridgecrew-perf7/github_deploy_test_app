import { observable, reaction } from "mobx";
import RestaurantList from "./RestaurantList.json";

function formedRestList(ele) {
  let randomColor = [
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
    Math.floor(Math.random() * 256),
  ];

  randomColor = `rgba(${randomColor[0]},${randomColor[1]},${randomColor[2]})`;
  return {
    option: ele,
    style: { backgroundColor: randomColor },
  };
}

function randomRestList(region) {
  let random_region_num = region === 3 ? Math.floor(Math.random() * 3) : region;
  let rest_list_len = RestaurantList.payco[random_region_num].list.length;
  let random_rest_num = Math.floor(Math.random() * rest_list_len);

  return RestaurantList.payco[random_region_num].list[random_rest_num];
}

const RouletteStore = observable({
  spin: false,
  setSpin(boolean) {
    this.spin = boolean;
  },
  popup: true,
  setPopup(boolean) {
    this.popup = boolean;
  },
  region: 0,
  setRegion(region) {
    this.region = region;
  },
  prizeNumber: Math.floor(Math.random() * 2),
  setPrizeNumber() {
    this.prizeNumber = Math.floor(
      Math.random() * this.choosedRestaurantList.length
    );
  },
  choosedRestaurantList: [
    formedRestList(randomRestList(3)),
    formedRestList(randomRestList(3)),
  ],

  setChoosedRestaurantList(newRestList) {
    const res = newRestList.map((ele) => {
      if (typeof ele === "string") ele = formedRestList(ele);
      return ele;
    });

    this.choosedRestaurantList = res;
  },

  setChoosedRestaurantListRandom(count, region) {
    let temp_list = [];
    for (var i = 0; i < count; i++) {
      temp_list.push(formedRestList(randomRestList(region)));
    }
    this.choosedRestaurantList = temp_list;
  },
});

reaction(
  () => RouletteStore.choosedRestaurantList,
  (value, reaction) => {
    console.log(`값이 ${value}로 바뀜`);
    RouletteStore.setPopup(false);
  }
);

reaction(
  () => RouletteStore.spin,
  (value, reaction) => {
    console.log(`값이 ${value}로 바뀜`);
    if (value === false) {
      RouletteStore.setPopup(true);
    } else {
      RouletteStore.setPopup(false);
    }
  }
);

export default RouletteStore;

import { useState } from "react";
import { observer } from "mobx-react";
import RouletteStore from "./store";

const store = RouletteStore;

const region_options = [
  { value: 0, label: "오리" },
  { value: 1, label: "미금" },
  { value: 2, label: "수내" },
  { value: 3, label: "전체" },
];

const Header = () => {
  return (
    <>
      <p className="subTitle"># 룰렛 항목을 볼까?</p>
      <p className="descriptionTitle">
        빼고싶은 항목을 눌러서 제거 할 수 있어! 고민하는 너를 위해 준비한
      </p>
    </>
  );
};

const Dropdown = observer((props) => {
  const [open, setOpen] = useState(false);

  const dropdownLists = region_options.map((ele) => {
    return (
      <div
        id={ele.value}
        onClick={
          store.spin === false
            ? (e) => {
                store.setRegion(e.target.id);
                setOpen(false);
              }
            : null
        }
      >
        {ele.label}
      </div>
    );
  });

  return (
    <div id={props.id} className={props.className}>
      <div id="resultsDiv" onClick={() => setOpen(!open)}>
        {region_options[store.region].label}
        <span id="dropdownArrow">{open === true ? "▲" : "▼"}</span>
        <div id="dropdownLists" className={open === true ? null : "closed"}>
          {dropdownLists}
        </div>
      </div>
      {props.children}
    </div>
  );
});

const DropdownAndButton = observer((props) => {
  return (
    <Dropdown id="choosingAreaDropdown" className={props.className}>
      <div
        id="chooseOneButton"
        className={props.className}
        onClick={props.buttonClick}
      >
        추천 식당
      </div>
    </Dropdown>
  );
});

const CheckChoosedRestaurant = observer(() => {
  let data = store.choosedRestaurantList;

  function minusRestaurant(data) {
    let temp_data = [];
    store.choosedRestaurantList.map((ele) => {
      if (ele.option !== data || store.choosedRestaurantList.length === 1) {
        temp_data.push(ele);
      }
      return 0;
    });
    store.setChoosedRestaurantList(temp_data);
  }

  function chooseOneRestaurant(region) {
    // mobx에서 random 로직 진행
    store.setChoosedRestaurantListRandom(1, region);
  }

  const restaurantList = data.map((ele) => {
    return (
      <li
        onClick={
          store.spin === false ? () => minusRestaurant(ele.option) : null
        }
      >
        {ele.option}
      </li>
    );
  });

  return (
    <div id="checkRestaurant">
      <Header />
      <DropdownAndButton
        className="dropdownAndButton"
        buttonClick={
          store.spin === false ? () => chooseOneRestaurant(store.region) : null
        }
      />
      <ul id="checkRestaurantList">{restaurantList}</ul>
    </div>
  );
});

export default CheckChoosedRestaurant;

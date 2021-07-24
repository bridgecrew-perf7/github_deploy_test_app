import { useRef } from "react";
import RestaurantList from "./store/RestaurantList.json";
import RouletteStore from "./store";
import { observer } from "mobx-react";

const store = RouletteStore;

function addRegionRestaurants(data) {
  data.list.map((ele) => {
    store.setChoosedRestaurantList([...store.choosedRestaurantList, ele]);
    return 0;
  });
}

function addRestaurant(data) {
  store.setChoosedRestaurantList([...store.choosedRestaurantList, data]);
  return 0;
}

const MenuTemplate = observer((props) => {
  const data = props.data;
  return (
    <tr>
      <th
        className="region"
        onClick={store.spin === false ? () => addRegionRestaurants(data) : null}
      >
        {data.name}
      </th>
      {data.list.map((element) => {
        return (
          <td
            className="restaurants"
            onClick={store.spin === false ? () => addRestaurant(element) : null}
          >
            {element}
          </td>
        );
      })}
    </tr>
  );
});

const PaycoRestaurantTable = (props) => {
  const payco = props.paycoData;
  return (
    <>
      <p className="subTitle"># 페이코 식당은 여기 다 있지롱~</p>
      <p className="descriptionTitle">
        '오리', '미금', '수내'를 누르면 어떻게 될까?
      </p>
      <table id="paycoDiv">
        {payco.map((ele) => {
          return <MenuTemplate data={ele} />;
        })}
      </table>
    </>
  );
};

const AddCustomRestaurant = observer(() => {
  const inputRef = useRef();
  return (
    <>
      <p className="descriptionTitle">테이블에 없는 식당을 추가하고 싶다면?</p>
      <input id="inputDiv" ref={inputRef}></input>
      <button
        id="addRestaurantButton"
        onClick={
          store.spin === false
            ? () => addRestaurant(inputRef.current.value)
            : null
        }
      >
        +
      </button>
    </>
  );
});

const ChooseRestaurant = () => {
  const payco = RestaurantList.payco;

  return (
    <div id="restaurantDiv">
      <PaycoRestaurantTable paycoData={payco} />
      <AddCustomRestaurant />
    </div>
  );
};

export default ChooseRestaurant;

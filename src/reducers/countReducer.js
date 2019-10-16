import { INCREMENT_COUNT, DECREMENT_COUNT } from "../constants/actionTypes";

const countReducer = (
  state = {
    count: 0,
    drinks: [
      {
        id: 1,
        header: "Rødvin",
        description: "Rund og mild",
        price: 179,
        count: 0
      },
      { id: 2, header: "Hvitvin", description: "Søt", price: 152, count: 0 },
      {
        id: 3,
        header: "Øl",
        description: "En god juleøl",
        price: 89,
        count: 0
      },
      {
        id: 4,
        header: "Cider",
        description: "Skikkelig digg",
        price: 79,
        count: 0
      },
      { id: 5, header: "Vodka", description: "Nam nam", price: 349, count: 0 }
    ]
  },
  action
) => {
  switch (action.type) {
    case INCREMENT_COUNT:
      return {
        ...state,
        count: state.count + 1,
        drinks: state.drinks.map(el => {
          if (action.payload.id === el.id.toString()) {
            return { ...el, count: el.count + 1 };
          }
          return el;
        })
      };
    case DECREMENT_COUNT:
      return {
        ...state,
        count: state.count - 1,
        drinks: state.drinks.map(el => {
          if (action.payload.id === el.id.toString()) {
            return { ...el, count: el.count - 1 };
          }
          return el;
        })
      };
    default:
      return state;
  }
};

export default countReducer;

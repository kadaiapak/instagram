import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = {};

const notifyReducer = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.ALERT:
      return action.payload;
    default:
      return state;
  }
};

export default notifyReducer;

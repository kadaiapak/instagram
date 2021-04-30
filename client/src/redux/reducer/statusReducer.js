import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = false;

const status = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.STATUS:
      return action.payload;
    default:
      return state;
  }
};

export default status;

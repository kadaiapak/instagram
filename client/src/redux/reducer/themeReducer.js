import { GLOBALTYPES } from "../actions/globalTypes";

const initialState = false;

const theme = (state = initialState, action) => {
  switch (action.type) {
    case GLOBALTYPES.THEME:
      return action.payload;
    default:
      return state;
  }
};

export default theme;

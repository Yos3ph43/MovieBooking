import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import bookingReducer from "features/Booking/redux/bookingSlice";
import loginReducer from "features/Login/redux/loginSlice";

const reducer = combineReducers({
  booking: bookingReducer,
  user: loginReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

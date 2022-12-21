import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import bookingReducer from "features/Booking/redux/bookingSlice";
import loginReducer from "features/Login/redux/loginSlice";
import adminReducer from "features/Admin/redux/adminSlice";

const reducer = combineReducers({
  booking: bookingReducer,
  user: loginReducer,
  admin: adminReducer,
});

const store = createStore(reducer, composeWithDevTools(applyMiddleware(thunk)));

export default store;

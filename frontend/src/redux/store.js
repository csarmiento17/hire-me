// import { createStore, applyMiddleware, compose } from "redux";
// import rootReducer from "./rootReducer";
// import createSagaMiddleware from "redux-saga";
// import rootSaga from "./rootSaga";

// const sagaMiddleware = createSagaMiddleware();
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const middlewares = [sagaMiddleware];
// const enhancer = composeEnhancers(applyMiddleware(...middlewares));

// export const store = createStore(rootReducer, enhancer);

// sagaMiddleware.run(rootSaga);

// // module.exports = store;

import { createStore, applyMiddleware } from "redux";
import rootReducer from "./rootReducer";
import createSagaMiddleware from "redux-saga";
import rootSaga from "./rootSaga";
import { composeWithDevTools } from "redux-devtools-extension";

const initialState = {};
const sagaMiddleware = createSagaMiddleware();

// const store = compose(applyMiddleware(sagaMiddleware))(createStore)(rootReducer)
const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(sagaMiddleware))
);

sagaMiddleware.run(rootSaga);

export default store;

import {combineReducers} from 'redux';
import game from './components/Board/reducer';
import inputs from './components/Input/reducer';

const rootReducer = combineReducers({game, inputs});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;

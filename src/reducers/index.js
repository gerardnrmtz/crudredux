import {combineReducers}from 'redux';
import productosReducer from './productosReducer';
import alertaReducer from './alertaReducer';

//todos los reducer que se necesiten
export default combineReducers({
    productos:productosReducer,
    alerta:alertaReducer
})
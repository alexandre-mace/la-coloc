import { combineReducers } from 'redux';
import list from './list';
import doneList from './doneList';
import create from './create';
import update from './update';
import del from './delete';
import show from './show';

export default combineReducers({ list, doneList, create, update, del, show });

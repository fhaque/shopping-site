import { combineEpics } from 'redux-observable';
import { getItemsEpic } from './get-items.epic';

export const rootEpic = combineEpics(getItemsEpic);
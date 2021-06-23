import { getHash } from '../../utils/index';
const initState = getHash();

export default function visibility(state = initState, action) {
  switch (action.type) {
    case 'SET_VISIBILITY':
      return action.payload;
    default:
      return state;
  }
}

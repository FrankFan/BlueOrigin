export default function remaining(state = 0, action) {
  switch (action.type) {
    case 'SET_REMAINING':
      return action.payload;
    default:
      return state;
  }
}

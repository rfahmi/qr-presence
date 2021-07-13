const initialState = {
  isLogin: 0,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        isLogin: action.value,
      };
    default:
      return state;
  }
};

export default authReducer;

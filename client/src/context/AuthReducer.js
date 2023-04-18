const AuthReducer = (state, action) => {
    switch (action.type) {
      case "CHECK_IN": {
        return {
          currentUser: action.payload,
        };
      }
      
      case "CHECK_OUT": {
        return {
          currentUser: null,
        };
      }

      case "LOGIN": {
        return {
          currentUser: action.payload,
        };
      }
      case "LOGOUT": {
        return {
          currentUser: null,
        };
      }
      default:
        return state;
    }
  };
  
  export default AuthReducer;
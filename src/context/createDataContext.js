import React, {useReducer} from 'react';

export default (reducer, action, initialState) => {
  const Context = React.createContext();

  const Provider = ({children}) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    //action === {addBlogPost: (dispatch) => {return () => {} } }
    const boundAction = {};
    for (let key in action) {
      boundAction[key] = action[key](dispatch);
    }

    return (
      <Context.Provider value={{state: state, ...boundAction}}>
        {children}
      </Context.Provider>
    );
  };

  return {Context, Provider};
};

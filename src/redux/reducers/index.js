const initialState = {
    main:{
        count: 0,
        aziende: [],
    }
}

const mainReducer = (state = initialState,action) =>{
  switch(action.type){

    case "INCREMENT" :
        return{
            ...state,
            main : {
                ...state.main,
                count : state.main.count + action.payload,
                aziende : state.main.aziende.concat(action.counterAziende) 
            }
        }
        

    case "DECREMENT" :
        return{
            ...state,
            main : {
                ...state.main,
                count : state.main.count + action.payload
            }
        }
        default : return state
  }
}
export default mainReducer;
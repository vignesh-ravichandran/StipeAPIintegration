

import {
    GET_SECRET, SET_LOADING, REMOVE_SECRET
    } from './Types'


 export default (state,action)=>{
     switch(action.type){
         case GET_SECRET:
             return{
                 ...state,
                 clientsecret:action.payload,
                 loading:false
             }
        case SET_LOADING:
            return{
                ...state,
                loading:true
            }   
        case REMOVE_SECRET:
            return {
                ...state,
                clientsecret:null
            }    
     }
 }    
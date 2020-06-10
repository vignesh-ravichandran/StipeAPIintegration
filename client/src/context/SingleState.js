import React, {useReducer} from 'react';
import axiox from 'axios'
import singleContext from './singleContext'
import singleReducer from './singleReducer'
import {
GET_SECRET,
SET_LOADING,
REMOVE_SECRET
} from './Types'



const SingleState = props =>{
  
    const initialState={
        clientsecret:null,
        loading:false

    }

    const [state, dispatch] = useReducer(singleReducer, initialState);


    const getSecret=async (order)=>{
          
        setLoading();
       

        try {

            console.log(order);
            const config = {
                headers: {
                    'Content-Type':'application/json'
                }
            }

            const res= await axiox.post('/secret',order,config);
           console.log('got data');

            dispatch({type:GET_SECRET,payload:res.data});
      
        } catch (err) {
      
         console.log(err);
            
        }
    }

  const setLoading=()=>{
    dispatch({type:SET_LOADING});
  }

  const removeSecret=()=>{
      dispatch({type:REMOVE_SECRET});
  }

    return(
        <singleContext.Provider
         value ={
             {
                clientsecret:state.clientsecret,
                 loading:state.loading,
                 setLoading,
                 getSecret,
                 removeSecret
             }
         }
        
        >
            {props.children}
        </singleContext.Provider>
    )
    
    
    }
    
    export default SingleState;


import React, {useContext, useState} from 'react'
import SingleContext from './context/singleContext'


function Productpage() {

    const [order, setOrder]=useState({
        product:'',
        quantity:'',
        price:''
    });

     var product;
     var quantity;
     var price;
      const singleContext=useContext(SingleContext);
      const {getSecret}=singleContext;
      const onChange=(e)=> setOrder({...order, [e.target.name]:e.target.value});
      const onSubmit=(e)=>{
        e.preventDefault();
         
        if(order.price!=null && order.quantity!=null){

            console.log('submit post req');
            getSecret(order);

        }



      }

     

    return (
        <div>
            <form onSubmit={onSubmit}>
          <h2 className="text-primary">{'Order details'}</h2>
          <input type="text" placeholder="Product" name="product" value={product} onChange={onChange}/>
          <input type="text" placeholder="Quantity" name="quantity" value={quantity} onChange={onChange}/>
          <input type="text" placeholder="Price" name="price" value={price} onChange={onChange}/>
          <div>
              <input type="submit" value={'Proceed to checkout'} className="btn btn-primary btn-block"/>
          </div>
         
         
          
           
             
        </form>
           
        </div>
    )
}

export default Productpage

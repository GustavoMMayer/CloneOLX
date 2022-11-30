import React from "react";
import { Link } from "react-router-dom";
import {Item} from './styled'






const AdItem = (props)=>{
    let price='';
    if(props.data.priceNegotiable){
        price = "Preço negociavel"
    } else{
        price =parseInt(props.data.price).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }


    return (
        <Item className='aditem'>
            <Link to={`/ad/${props.data.id}`}>
                <div className='itemImage'>
                    <img src={props.data.image} alt='' />
                </div>
                <div className='itemName'>{props.data.title}</div>
                <div className='itemPrice'>{price}</div>            
            </Link>
        </Item>
    );
}

export default AdItem;
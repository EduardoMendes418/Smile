import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './styled';


export default (props) => {

    //preco do produto
    let price = '';

    if(props.data.priceNegotiable){
        price = 'Preço Negociável';
    }else{
        price = `R$ ${props.data.price}`;
    }

    return(
        //Produtos
        <Item className='aditem'>
            <Link to={`/ad/${props.data.id}`}>
                <div className="itemImage">
                    <img src={props.data.image}  alt=""/>
                </div>
                <div className="itemName">
                        {props.data.title}      
                </div>
                <div className="itemPrice">
                    {price}
                </div>
            </Link>
        </Item>
    
    );
}
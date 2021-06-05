import React from 'react';
import { Link } from 'react-router-dom';
import { Item } from './styled';

export default (props) =>{
    let price = '';
    let image = 'http://alunos.b7web.com.br:501/media/'+props.data.images[0].url;

    if(props.data.priceNegotiable){
        price = 'Preço Negociável';
    } else {
        price = `R$ ${props.data.price}`;
    }

    const handleModal=()=>{
        props.setVisible(true);
        props.setId(props.data.id);
    }



    return(
        <Item className="aditem"  onClick={handleModal}>
            <button  >
                <div className="itemImage">
                    <img src={image} alt="" />
                </div>
                <div className="itemName">{props.data.title}</div>
                <div className="itemPrice">{price}</div>
            </button>
        </Item>
    );
}
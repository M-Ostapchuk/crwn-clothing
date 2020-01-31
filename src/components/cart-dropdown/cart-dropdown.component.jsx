import React from 'react';
import './cart-dropdown.styles.scss';
import CustomButton from '../custom-button/custom-button.component';
import CartItem from '../cart-item/cart-item.component';
import {selectCartItems} from '../../redux/cart/cart.selectors'

import {connect} from 'react-redux';

const CartDropdown = ({cartItems}) => {
    return(
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.map(mapItem => <CartItem key={mapItem.id} item={mapItem} />)
                }
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = (state) => ({
    cartItems: selectCartItems(state)
})

export default connect(mapStateToProps, null)(CartDropdown);
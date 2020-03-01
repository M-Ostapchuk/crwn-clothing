import React from 'react';
import { ReactComponent as Logo } from '../../assets/crown.svg';
import {connect} from 'react-redux';
import CartIcon from '../cart-icon/cart-icon.component'; 

// Memoized
import {createStructuredSelector} from 'reselect';
import {selectCartHidden} from '../../redux/cart/cart.selectors';
import {selectCurrentUser} from '../../redux/user/user.selectors';

import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink, OptionDiv } from './header.styles';
import { signOutStart } from '../../redux/user/user.actions';


const Header = ({currentUser, hidden, signOutStart}) => {        
    return (
        <HeaderContainer>
            <LogoContainer to='/'>
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">SHOP</OptionLink>
                <OptionLink to="/contacts">CONTACT</OptionLink>
                {
                currentUser? 
                <OptionDiv onClick={signOutStart}>SIGN OUT</OptionDiv> 
                : <OptionLink to="/signin"> SIGN IN</OptionLink>
            }

            <CartIcon />
            </OptionsContainer>
            
            {
                hidden?  null: <CartDropdown />
                
            }

        </HeaderContainer>
    )
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser,
    hidden: selectCartHidden
})

const mapDispatchToProps = (dispatch) => ({
    signOutStart: () => dispatch(signOutStart())
})


export default connect(mapStateToProps, mapDispatchToProps)(Header);
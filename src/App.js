// React native
import React, { Component } from 'react';
import './App.css';

// React Route
import { Route, Switch, Redirect} from 'react-router-dom';

// Pages
import CheckOutPage from './pages/checkout/checkout.component';
import ShopPage from './pages/shop/shop.component';
import HomePage from './pages/homepage/homepage.component';

// Components
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utiles';

// Redux
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions';

// Memoize
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';


class App extends Component {

  unsubscribeFromAuth = null;
  componentDidMount() {
    const {setCurrentUser} = this.props;

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
    const userRef = await createUserProfileDocument(authUser)
      if (authUser) {
        userRef.onSnapshot( snapShot => {
          setCurrentUser({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })          
        });
        
      } else {
        setCurrentUser(authUser)
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() { 
    return ( 
      <div>
      <Header />
      <Switch>
         <Route exact path='/' component={HomePage} />
         <Route path='/shop' component={ShopPage} />
         <Route exact path='/signin' render={() => this.props.currentUser? (<Redirect to='/' />) : <SignInAndSignUp />} />
         <Route exact path='/checkout' component={CheckOutPage} />

      </Switch>
    </div>
     );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
 
export default connect(mapStateToProps, mapDispatchToProps )(App);

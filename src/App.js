// React native
import React, { useEffect } from 'react';
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
// import {auth, createUserProfileDocument} from './firebase/firebase.utiles';

// Redux
import {connect} from 'react-redux';
import { checkUserSession } from './redux/user/user.actions';

// import {setCurrentUser} from './redux/user/user.actions';

// Memoize
import {createStructuredSelector} from 'reselect';
import {selectCurrentUser} from './redux/user/user.selectors';


const App = ({checkUserSession, currentUser}) => {

  // const unsubscribeFromAuth = null;

  useEffect(() => {
      checkUserSession()
  }, [checkUserSession]);

    // this.unsubscribeFromAuth = auth.onAuthStateChanged(async authUser => {
    // const userRef = await createUserProfileDocument(authUser)
    //   if (authUser) {
    //     userRef.onSnapshot( snapShot => {
    //       setCurrentUser({
    //         currentUser: {
    //           id: snapShot.id,
    //           ...snapShot.data()
    //         }
    //       })          
    //     });
        
    //   } else {
    //     setCurrentUser(authUser)
    //   }
    // });
    return ( 
      <div>
      <Header />
      <Switch>
         <Route exact path='/' component={HomePage} />
         <Route path='/shop' component={ShopPage} />
         <Route exact path='/signin' render={() => currentUser? (<Redirect to='/' />) : <SignInAndSignUp />} />
         <Route exact path='/checkout' component={CheckOutPage} />

      </Switch>
    </div>
     );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps )(App);

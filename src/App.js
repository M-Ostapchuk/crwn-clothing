import React, { Component } from 'react';
import './App.css';
import HomePage from './pages/homepage/homepage.component';
import { Route, Switch, Redirect} from 'react-router-dom';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import {auth, createUserProfileDocument} from './firebase/firebase.utiles';
import {connect} from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'

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
      </Switch>
    </div>
     );
  }
}

const mapStateToProps = ({user}) => ({
  currentUser: user.currentUser
})

const mapDispatchToProps = (dispatch) => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})
 
export default connect(mapStateToProps, mapDispatchToProps )(App);

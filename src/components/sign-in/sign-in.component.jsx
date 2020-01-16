import React, { Component } from 'react';
import './sign-in.styles.scss';
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component';
import {signInWithGoogle} from '../../firebase/firebase.utiles';

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            email: '',
            password: ''
         }
    }
    handleSubmit = event => {
        event.preventDefault();
        this.setState({email: '', password: ''})
    }

    handleChange = event => {
        const {name, value } = event.target;

        this.setState({[name]: value})
    }

    render() { 
        return ( 
            <div className="sign-in">
                <h2>I already have an account</h2>
                <span>Sign in with your email and password</span>
                <form onSubmit={this.handleSubmit}>
                    <FormInput handleChange={this.handleChange} label="email" type="email" name="email" value={this.state.email} required/>
                    <FormInput handleChange={this.handleChange} label="password" type="password" name="password" value={this.state.password} required/>
                    <div className="buttons">
                        <CustomButton  type='submit'>Sign in</CustomButton>
                        <CustomButton  onClick={signInWithGoogle} isGoogleSignIn>Sign in with Google</CustomButton>
                    </div>
                </form>
            </div>
         );
    }
}
 
export default SignIn;
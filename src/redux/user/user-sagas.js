import { auth, createUserProfileDocument, provider, getCurrentUser } from "../../firebase/firebase.utiles";

import { put, takeLatest, call, all } from 'redux-saga/effects';

import { userActionTypes } from './user.types';
import { signInSuccess, signInFailure, signOutSuccess ,signOutFailure } from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth) {
    try{
        const userRef = yield call(createUserProfileDocument, userAuth);
        const userSnapshot = yield userRef.get();       
        yield put(signInSuccess({
            id: userSnapshot.id,
            ...userSnapshot.data()
        
        }));
    } catch(error) {
        yield put(signInFailure(error));
    }
}


export function* signInWithGoogle() {
    try {
        const { user } = yield auth.signInWithPopup(provider);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error));
    }
}

export function* signInWithEmail({payload: {email, password}}) {
    try{
        const { user } = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);
    } catch(error) {
        yield put(signInFailure(error));
    }

}

export function* isUserAuthtenticated() {
    try {
       const userAuth = yield getCurrentUser();
       if(!userAuth) return;
       
       yield getSnapshotFromUserAuth(userAuth)
    } catch(error) {

    }
}

export function* signOut() {
    try{
        yield auth.signOut()
        yield put(signOutSuccess())
    } catch(error) {
        yield signOutFailure(error)
    }
}

export function* onEmailSignInStart() {
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

export function* onGoogleSignInStart() {
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

export function* onSignOutStart() {
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOut)
}

export function* onCheckUserSession() {
    yield takeLatest(userActionTypes.CHECK_USER_SESSION, isUserAuthtenticated)
}

export function* userSagas() {
   yield all([
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(isUserAuthtenticated),
        call(onSignOutStart)
    ])
}
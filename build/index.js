import "firebase";

export class FirebaseLogin {
    initialize (config) {
        firebase.initializeApp(config);
    }
    get googleProvider () {
        return new firebase.auth.GoogleAuthProvider();
    }
    get facebookProvider () {
        return new firebase.auth.FacebookAuthProvider();
    }
    get githubProvider () {
        return new firebase.auth.GithubAuthProvider();
    }
    get twitterProvider () {
        return new firebase.auth.TwitterAuthProvider();
    }
    signIn (provider) {
        firebase.auth().signInWithPopup(this[`${provider}Provider`])
            .then((result) => {
                let token = result.credential.accessToken;
                let secret = result.credential.secret;
                let user = result.user;
                let method = provider.charAt(0).toUpperCase() + provider.slice(1) + 'AuthProvider';
                let credential = firebase.auth[method].credential(token, secret);
                firebase.auth().signInWithCredential(credential)
                    .then((user) => {
                        this.continue();
                    })
                    .catch((error) => {
                        throw {
                            msg: error.message,
                            code: error.code
                        }
                    });
            })
            .catch((error) => {
                throw {
                    msg: error.message,
                    code: error.code
                }
            });
    }
    continue () {
        throw {
            msg: "Not implemented!",
            code: "error - on mixing this class you must override this callback"
        }
    }
}
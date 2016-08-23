# Ng-Harmony
============

## Development

![Harmony = 6 + 7;](logo.png "Harmony - Fire in my eyes")

Firebase is a cool Backend-as-you-go ... haha
Anyway, I wanted an abstraction that integrates with the ng-harmony-lib

## Concept

This extra lib to ng-harmony will serve the purpose of simplifying firebase.
Since you might not want to use angular-fire but use firebase rather by hand
and integrate them with your app the ng-harmony way, I thought it useful
to abstract the firebase lib in this module.

Use it in conjunction with

* [literate-programming](http://npmjs.org/packages/literate-programming "click for npm-package-homepage") to write markdown-flavored literate JS, HTML and CSS
* [jspm](https://www.npmjs.com/package/jspm "click for npm-package-homepage") for a nice solution to handle npm-modules with ES6-Module-Format-Loading ...

## Files

This serves as literate-programming compiler-directive

[build/index.js](#Compilation "save:")

You can extend these literate-programming directives here ... the manual is (on jostylr@github/literate-programming)[https://github.com/jostylr/literate-programming]

## Compilation

Let's import google's firebase js lib

```javascript
import "firebase";
```

Let's start off with a Login-Class (Mixin)

```javascript
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
```

## CHANGELOG

*v0.1.0* A Basic Firebase-Signin-Mixin

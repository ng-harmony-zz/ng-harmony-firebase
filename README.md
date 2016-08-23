![Harmony = 6 + 7;](src/logo.png "Harmony - Fire in my eyes")

# ng-harmony-firebase

## Synopsis

So, since google now offers free basic firebase app-backends,
it's only natural to write a decently ng-harmony-integrated wrapper.

## Code Example

```javascript
import { Controller } from "ng-harmony/ng-harmony";
import { FirebaseLogin } from "ng-harmony/ng-harmony-firebase";


class LoginController extends Controller.mixin(FirebaseLogin) {
    constructor (...args) {
        super(...args);
        this.initialize({/* firebase app-config here */});
    }
    "#googleLogin::click" () {
        this.signIn("google");
    }
    "#facebookLogin::click" () {
        this.signIn("facebook");
    }
    continue () {
        this.$state.go("home");
    }
}
LoginController.$inject("$state");
```

## Motivation

I wanted to provide a dynamic page on github.io.
So I didn't want to host an API-backend on a server only,
when there was the possibility to utilize firebase freely as well.

## Installation

I recommend the usage of jspm.
This way, just base your project upon jspm and start using this lib as in the code example above.

```bash
jspm i github:ng-harmony/ng-harmony-firebase
```

## API Reference

### `FirebaseLogin` (Root-Class)

`initialize`: initialize googles firebase background-lib with your apps config
`signIn`: use firebase with your social login-service of choice


## Contributors

Drop me an email at <johannes.neugschwentner> at <gmail> dot <com>

## License

MIT

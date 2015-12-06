# Pocket Combine #

Pocket Combine is a small Android app using the SWCombine.com Web Service.

## Build process ##

To build this project, you'll first need a current [Node.js][nodejs]
installation on your machine.

[nodejs]: https://nodejs.org/en/download/

### Global dependencies ###

Using the Node package manager, you can now install the global dependencies,
namely Cordova, Grunt CLI and the TypeScript Definition manager.

    npm install -g cordova grunt-cli tsd

If you are on a Linux machine, you may have to execute the command as root
using `sudo`.

### Local dependencies ###

The local dependencies can be installed by simply doing

    npm install

in the project directory (containing the `package.json`)

### TypeScript type definitions ###

The library type definitions used in this project are installed from the
[DefinitelyTyped][DefinitelyTyped] Github repository via

    tsd install

[DefinitelyTyped]: http://definitelytyped.org/

### Cordova project ###

To reconstruct the Cordova project, execute the following:

    cordova prepare

This installs all necessary Cordova plugins and adds the supported platforms.

### SWCombine App credentials ###

To build a working app, you'll need to register it with SWCombine. For this,
you must first have a [player account][swcombine]. Login to SWCombine and
[register your app][register-app]. You'll receive a set of app credentials.

Create the configuration file via

    grunt config

and enter your app credentials into the file (the officially released APKs
contain my app credentials).

The app credentials are obfuscated during the build process and are hard, but
not impossible, to extract from the APK. You cannot store the app credentials
in a cryptographically safe way, because the app must be able to access them
on its own. So the key to the cypher must always be stored inside the APK, too,
thus compromising security.

[swcombine]: http://www.swcombine.com/
[register-app]: http://www.swcombine.com/ws/registration/

### Build the project ###

Now, everything is prepared to build the app. But to package it into an APK,
you'll additionally have to setup the `Android Stand-alone SDK Tools` for
Cordova to use (see the [Cordova documentation][cordova-android] for
instructions). Finally, execute

    cordova build

and in the `./platforms` directory, you should find the folders for the
supported platforms, respectively, and inside, the ready to use app.

[cordova-android]: https://cordova.apache.org/docs/en/latest/guide/platforms/android/index.html

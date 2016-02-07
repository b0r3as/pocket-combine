# Pocket Combine #

Pocket Combine is a small Android app using the SWCombine.com Web Service.

## Build process ##

To build this project, you'll first need a current [Node.js][nodejs]
installation on your machine.

[nodejs]: https://nodejs.org/en/download/

### Global dependencies ###

Using the Node package manager, you can now install the global dependencies,
namely Cordova and Grunt CLI.

    npm install -g cordova grunt-cli

If you are on a Linux machine, you may have to execute the command as root
using `sudo`.

### Local dependencies ###

The local dependencies can be installed by simply doing

    npm install

in the project directory (containing the `package.json`)

### Initialize project folder ###

The remaining initialization is done via

    grunt init

This downloads the library type definitions used in this project via
[Typings][Typings], installs all necessary Cordova plugins, adds the supported
platforms and creates a configuration file, where you can enter your app
credentials before build.

[Typings]: https://github.com/typings/typings

### SWCombine App credentials ###

To build a working app, you'll need to register it with SWCombine. For this,
you must first have a [player account][swcombine]. Login to SWCombine and
[register your app][register-app]. You'll receive a set of app credentials.

Enter your app credentials into the config file created by the init task
(the officially released APKs contain my app credentials).

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

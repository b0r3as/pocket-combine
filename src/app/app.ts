import {Test} from './main/main';
import {can} from 'libs';
import {cordova} from 'libs';
import {$} from 'libs';
import config from 'config';

module PocketCombineApp {
    "use strict";

    export module Application {
        export function initialize(): void {
            document.addEventListener('deviceready', onDeviceReady, false);
        }

        function onDeviceReady(): void {
            // Handle the Cordova pause and resume events
            document.addEventListener('pause', onPause, false);
            document.addEventListener('resume', onResume, false);

            // TODO: Cordova has been loaded. Perform any initialization that requires Cordova here.
            console.log(require('./main/test.stache'), new Test(), cordova.version, config.registrationInfo);
            console.log($('body'), can.VERSION);
        }

        function onPause(): void {
            // TODO: This application has been suspended. Save application state here.
        }

        function onResume(): void {
            // TODO: This application has been reactivated. Restore application state here.
        }
    }

    window.onload = function (): void {
        Application.initialize();
    }
}

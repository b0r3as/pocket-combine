import IConfig = app.config.IConfig;
import IRegistrationInfo = app.config.IRegistrationInfo;

var registrationInfoBase64: string = require('./registration-info.json');

var base64Decode = window.atob;
var JSONParse = JSON.parse;

const config: IConfig = {
    registrationInfo: <IRegistrationInfo>JSONParse(base64Decode(registrationInfoBase64))
};

export default config;

declare module app.config {
    interface IConfig {
        registrationInfo: IRegistrationInfo;
    }

    interface IRegistrationInfo {
        clientId: string;
        clientSecret: string;
        redirectUri: string;
    }
}

declare var config: app.config.IConfig;

declare module 'config' {
    export default config;
}

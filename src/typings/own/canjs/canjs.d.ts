
interface CanJS {
    VERSION: string;
    // TODO
}

declare var can: CanJS;

declare module 'can' {
    export = can;
}

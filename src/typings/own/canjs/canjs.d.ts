
interface CanJS {
    VERSION: string;
    // TODO
}

declare var can: CanJS;

declare module 'can' {
    export = can;
}

// this is only for the wrapper module setting the __esModule flag
declare module 'canjs' {
    export = can;
}

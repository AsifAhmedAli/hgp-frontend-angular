export declare type nullUndefined = null | undefined;

export declare type optionalString = nullUndefined | string;

export declare type optionalNumber = nullUndefined | number;

export declare type optional = optionalString | number;

export declare type pageCallback = (title: optionalString, content: string, errorMessage: optionalString) => void;

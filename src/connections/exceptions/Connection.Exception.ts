import { Exception } from '@trapize/core';


/**
 *
 *
 * @export
 * @class ConnectionException
 * @extends {Exception}
 */
export class ConnectionException extends Exception {
    protected _source: string = 'Core.Connection';

    public ToJSON(): {[key: string]: any} {
        return {
            code: this._code,
            error: {
                message: this.Message,
                inner: this.InnerException ? this.InnerException.ToJSON() : undefined,
                data: this.Data
            }
        }
    }
}
import { IConnection } from './IConnection';


/**
 *
 *
 * @export
 * @interface IPool
 */
export interface IPool {
    /**
     *
     *
     * @type {*}
     * @memberof IPool
     */
    framework: any;
    /**
     *
     *
     * @template T
     * @param {string} queryString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof IPool
     */
    query<T = any>(queryString: string, input: any[]): Promise<T>;
    /**
     *
     *
     * @template T
     * @param {string} procedureString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof IPool
     */
    procedure<T = any>(procedureString: string, input: any[]): Promise<T>;
    /**
     *
     *
     * @returns {Promise<IConnection>}
     * @memberof IPool
     */
    getConnection(): Promise<IConnection>;
    /**
     *
     *
     * @param {IConnection} connection
     * @memberof IPool
     */
    release(connection: IConnection): void;
    /**
     *
     *
     * @param {string} key
     * @param {string} query
     * @memberof IPool
     */
    cacheQuery(key: string, query: string): void;
    /**
     *
     *
     * @param {string} key
     * @returns {(string | undefined)}
     * @memberof IPool
     */
    getQuery(key: string): string | undefined;
}
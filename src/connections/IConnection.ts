

/**
 *
 *
 * @export
 * @interface IConnection
 */
export interface IConnection {
    /**
     *
     *
     * @type {*}
     * @memberof IConnection
     */
    framework: any;
    /**
     *
     *
     * @template T
     * @param {string} queryString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof IConnection
     */
    query<T = any>(queryString: string, input: any[]): Promise<T>;
    /**
     *
     *
     * @template T
     * @param {string} procedureString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof IConnection
     */
    procedure<T = any>(procedureString: string, input: any[]): Promise<T>;
    /**
     *
     *
     * @param {string} key
     * @param {string} query
     * @memberof IConnection
     */
    cacheQuery(key: string, query: string): void;
    /**
     *
     *
     * @param {string} key
     * @returns {(string | undefined)}
     * @memberof IConnection
     */
    getQuery(key: string): string | undefined;
}
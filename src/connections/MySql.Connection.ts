import { IConnection } from './IConnection';
import { PoolConnection } from 'mysql';
import { MySqlException } from './exceptions/MySql.Exception';


/**
 * MySql implementation for Connection
 *
 * @export
 * @class MySqlConnection
 * @implements {IConnection}
 */
export class MySqlConnection implements IConnection {


    /**
     *Creates an instance of MySqlConnection.
     * @param {PoolConnection} framework
     * @param {Map<string,string>} cache
     * @memberof MySqlConnection
     */
    public constructor(public framework: PoolConnection, private cache: Map<string,string>) {}


    /**
     *
     *
     * @template T
     * @param {string} queryString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof MySqlConnection
     */
    public query<T = any>(queryString: string, input: any[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.framework.query(queryString, input, (err, values) => {
                if(err) {
                    reject(new MySqlException.QueryException(err.message, err));
                } else {
                    resolve(values);
                }
            })
        })
    }


    /**
     *
     *
     * @template T
     * @param {string} procedureString
     * @param {any[]} input
     * @returns {Promise<T>}
     * @memberof MySqlConnection
     */
    public procedure<T>(procedureString: string, input: any[]): Promise<T> {
        return new Promise<T>((resolve, reject) => {
            this.framework.query(procedureString, input, (err, values) => {
                if(err) {
                    reject(new MySqlException.ProcedureException(err.message, err));
                } else {
                    resolve(values);
                }
            })
        })
    }


    /**
     *
     *
     * @param {string} key
     * @param {string} query
     * @memberof MySqlConnection
     */
    public cacheQuery(key: string, query: string): void {
        this.cache.set(key, query);
    }


    /**
     *
     *
     * @param {string} key
     * @returns {(string | undefined)}
     * @memberof MySqlConnection
     */
    public getQuery(key: string): string | undefined {
        return this.cache.get(key);
    }

}
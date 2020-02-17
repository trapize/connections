import { ConnectionException } from './Connection.Exception';


/**
 *
 *
 * @class MySqlQueryException
 * @extends {ConnectionException}
 */
class MySqlQueryException extends ConnectionException {}


/**
 *
 *
 * @class MySqlProcedureException
 * @extends {ConnectionException}
 */
class MySqlProcedureException extends ConnectionException {}


/**
 *
 *
 * @class MySqlConnectionConfigurationException
 * @extends {ConnectionException}
 */
class MySqlConnectionConfigurationException extends ConnectionException {}


/**
 *
 *
 * @class MySqlConnectionException
 * @extends {ConnectionException}
 */
class MySqlConnectionException extends ConnectionException {}

export const MySqlException = Object.freeze({
    QueryException: MySqlQueryException,
    ProcedureException: MySqlProcedureException,
    ConnectionConfigurationException: MySqlConnectionConfigurationException,
    MySqlConnectionException: MySqlConnectionException
});
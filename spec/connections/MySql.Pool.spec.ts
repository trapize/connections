import 'reflect-metadata';
import { MySqlPool } from '../../src/connections/MySql.Pool';
import { MySqlConnection } from '../../src/connections/MySql.Connection';

const pool = <any>{
    query: jest.fn(),
    getConnection: jest.fn(),
    releaseConnection: jest.fn()
};

beforeEach(() => {
    pool.query.mockReset();
    pool.getConnection.mockReset();
    pool.releaseConnection.mockReset();
});

describe('MySql Pool', () => {
    it('Should Reject (Query)', (done) => {
        const query = 'SELECT * FROM table';
        const inputs:any[] = [];
        pool.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(new Error('TestMessage'));
        });

        const mySqlPool = new MySqlPool(pool, new Map<string,string>());
        mySqlPool.query(query, inputs)
            .then(res => {
                done('It should have errored');
            })
            .catch(err => {
                expect(err).toBeDefined();
                done();
            });
    });

    it('Should Reject (Procedure)', (done) => {
        const query = 'SELECT * FROM table';
        const inputs:any[] = [];
        pool.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(new Error('TestMessage'));
        });

        const mySqlPool = new MySqlPool(pool, new Map<string,string>());
        mySqlPool.procedure(query, inputs)
            .then(res => {
                done('It should have errored');
            })
            .catch(err => {
                expect(err).toBeDefined();
                done();
            });
    });

    it('Should query', (done) => {
        const query = 'SELECT * FROM table';
        const inputs:any[] = [];
        pool.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(undefined, []);
        });

        const mySqlPool = new MySqlPool(pool, new Map<string,string>());
        mySqlPool.query(query, inputs)
            .then(res => {
                expect(res).toBeDefined();
                expect(res).toHaveLength(0);
                done();
            })
            .catch(done);
    });

    it('Should Procedure', (done) => {
        const query = 'SELECT * FROM table';
        const inputs:any[] = [];
        pool.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(undefined, []);
        });

        const mySqlPool = new MySqlPool(pool, new Map<string,string>());
        mySqlPool.procedure(query, inputs)
            .then(res => {
                expect(res).toBeDefined();
                expect(res).toHaveLength(0);
                done();
            })
            .catch(done);
    });

    it('Should return a connection', (done) => {
        pool.getConnection.mockImplementation((callback: (err?: any, conn?: any) => void) => {
            callback(undefined, {});
        });
        const mySqlPool = new MySqlPool(pool, new Map<string,string>());
        mySqlPool.getConnection()
            .then(conn => {
                expect(conn).toBeInstanceOf(MySqlConnection);
                done();
            })
            .catch(done);

    });
    
    it('Should Reject on Connection', (done) => {
        pool.getConnection.mockImplementation((callback: (err?: any, conn?: any) => void) => {
            callback(new Error('testError'));
        });
        const mySqlPool = new MySqlPool(pool, new Map<string,string>());
        mySqlPool.getConnection()
            .then(conn => {
                done('It should have thrown an error');
            })
            .catch(err => {
                done();
            });
    });

    it('Should release', (done) => {
        pool.getConnection.mockImplementation((callback: (err?: any, conn?: any) => void) => {
            callback(undefined, {});
        });
        const mySqlPool = new MySqlPool(pool, new Map<string,string>());
        mySqlPool.getConnection()
            .then(conn => {
                expect(conn).toBeInstanceOf(MySqlConnection);
                mySqlPool.release(conn);
                expect(pool.releaseConnection).toHaveBeenCalledTimes(1);
                done();
            })
            .catch(done);
    });

    it('Should set the cache', () => {
        const cache = new Map<string,string>();
        const mySqlPool = new MySqlPool(pool, cache);
        mySqlPool.cacheQuery('key', 'select * from table');
        expect(cache.get('key')).toBe('select * from table');
        expect(mySqlPool.getQuery('key')).toBe('select * from table');
    });
})
import 'reflect-metadata';
import { MySqlConnection } from '../../src/connections/MySql.Connection';

const connection = <any>{
    query: jest.fn()
};

beforeEach(() => {
    connection.query.mockReset();
});

describe('MySql Connection', () => {
    it('Should Reject (Query)', (done) => {
        const query = 'SELECT * FROM table';
        const inputs:any[] = [];
        connection.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(new Error('TestMessage'));
        });

        const mySqlConnection = new MySqlConnection(connection, new Map<string,string>());
        mySqlConnection.query(query, inputs)
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
        connection.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(new Error('TestMessage'));
        });

        const mySqlConnection = new MySqlConnection(connection, new Map<string,string>());
        mySqlConnection.procedure(query, inputs)
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
        connection.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(undefined, []);
        });

        const mySqlConnection = new MySqlConnection(connection, new Map<string,string>());
        mySqlConnection.query(query, inputs)
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
        connection.query.mockImplementation((q: string, i: any[], callback:(err?: any, results?: any) => void) => {
            expect(q).toBe(query);
            expect(i).toHaveLength(0);
            callback(undefined, []);
        });

        const mySqlConnection = new MySqlConnection(connection, new Map<string,string>());
        mySqlConnection.procedure(query, inputs)
            .then(res => {
                expect(res).toBeDefined();
                expect(res).toHaveLength(0);
                done();
            })
            .catch(done);
    });


    it('Should set the cache', () => {
        const cache = new Map<string,string>();
        const mySqlConnection = new MySqlConnection(connection, cache);
        mySqlConnection.cacheQuery('key', 'select * from table');
        expect(cache.get('key')).toBe('select * from table');
        expect(mySqlConnection.getQuery('key')).toBe('select * from table');
    });
})
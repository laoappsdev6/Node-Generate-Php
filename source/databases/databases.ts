import e from "express";
import { Connect, Query } from "./mysql";
import { EDB } from '../config/config';

export class DataBases {

    public static tableListAll(): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let sql = `SELECT table_name FROM information_schema.tables WHERE table_schema ='${EDB.name}'`;
                await Connect().then(async (connection) => {
                    await Query(connection, sql).then((result) => {

                        if (result) {
                            let myTable = [];
                            let rows: any = result;
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                myTable.push(element.table_name)
                            }

                            resolve(myTable)

                        } else {
                            resolve([]);
                        }

                    })
                })
            } catch (error) {
                reject(error);
            }
        })
    }

    public static columnTable(tableName: string): Promise<any> {
        return new Promise<any>(async (resolve, reject) => {
            try {
                let sql = `SHOW COLUMNS FROM ${tableName}`;
                await Connect().then(async (connection) => {
                    await Query(connection, sql).then((result) => {

                        if (result) {
                            let myColumn = [];
                            let rows: any = result;
                            for (let index = 0; index < rows.length; index++) {
                                const element = rows[index];
                                const field = element.Field;

                                if (field !== 'id') {
                                    myColumn.push(field);
                                }
                            }
                            resolve(myColumn);

                        } else {
                            resolve([]);
                        }
                    })
                })
            } catch (error) {
                reject(error);
            }
        })
    }
}
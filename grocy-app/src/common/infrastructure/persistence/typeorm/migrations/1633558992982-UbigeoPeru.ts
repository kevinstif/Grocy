import {MigrationInterface, QueryRunner} from "typeorm";
import { SqlReader } from 'node-sql-reader';

export class UbigeoPeru1633558992982 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const folder = __dirname;
        const path = folder + '/ubigeo-peru-inei-2016.sql';
        console.log(path);
        let queries = SqlReader.readSqlFile(path);
        for (let query of queries) {
            await queryRunner.query(query);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }
}
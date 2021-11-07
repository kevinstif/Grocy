import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636317475270 implements MigrationInterface {
    name = 'InitialSchema1636317475270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` varchar(10) NOT NULL, \`price\` int NOT NULL, \`purchase_date\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`orders\``);
    }

}

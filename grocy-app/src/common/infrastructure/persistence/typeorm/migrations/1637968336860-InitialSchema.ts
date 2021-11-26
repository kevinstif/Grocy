import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637968336860 implements MigrationInterface {
    name = 'InitialSchema1637968336860'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`payment\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`customerId\` int NOT NULL, \`cartId\` int NOT NULL, \`date\` datetime NOT NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(10) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`payment\``);
    }

}

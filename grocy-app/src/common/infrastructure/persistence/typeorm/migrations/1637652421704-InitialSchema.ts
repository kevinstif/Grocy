import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637652421704 implements MigrationInterface {
    name = 'InitialSchema1637652421704'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`phone\` varchar(9) NOT NULL, \`address\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}

import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1635276230500 implements MigrationInterface {
    name = 'InitialSchema1635276230500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`grocy\`.\`suppliers\` 
        (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
         \`first_name\` varchar(75) NOT NULL,
         \`last_name\` varchar(75) NOT NULL,
         \`phone\` varchar(9) NOT NULL,
         \`ruc\` varchar(11) NOT NULL,
         UNIQUE INDEX \`UQ_suppliers_ruc\` (\`ruc\`),
         PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_suppliers_ruc\` ON \`grocy\`.\`suppliers\``);
        await queryRunner.query(`DROP TABLE \`grocy\`.\`suppliers\``);
    }

}

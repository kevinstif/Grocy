import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1635276230500 implements MigrationInterface {
    name = 'InitialSchema1635276230500'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`grocy\`.\`suppliers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`dni\` varchar(8) NOT NULL, UNIQUE INDEX \`UQ_suppliers_dni\` (\`dni\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_suppliers_dni\` ON \`grocy\`.\`suppliers\``);
        await queryRunner.query(`DROP TABLE \`grocy\`.\`suppliers\``);
    }

}

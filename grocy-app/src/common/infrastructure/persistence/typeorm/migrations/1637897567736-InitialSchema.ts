import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637897567736 implements MigrationInterface {
    name = 'InitialSchema1637897567736'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`offers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`due_date\` datetime NOT NULL, \`status\` enum ('Done', 'Cancel') NOT NULL DEFAULT 'Done', \`amount\` decimal(10,2) NULL, \`currency\` varchar(10) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`offers\``);
    }

}

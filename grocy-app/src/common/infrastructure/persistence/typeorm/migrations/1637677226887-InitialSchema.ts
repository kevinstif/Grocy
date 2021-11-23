import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637677226887 implements MigrationInterface {
    name = 'InitialSchema1637677226887'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` ADD \`customer_id\` bigint UNSIGNED NULL`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_242205c81c1152fab1b6e848470\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_242205c81c1152fab1b6e848470\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP COLUMN \`customer_id\``);
    }

}

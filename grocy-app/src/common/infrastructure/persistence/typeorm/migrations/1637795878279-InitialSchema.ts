import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637795878279 implements MigrationInterface {
    name = 'InitialSchema1637795878279'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`price\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`amount\` decimal(10,2) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`currency\` varchar(10) NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` enum ('Done', 'Cancel') NOT NULL DEFAULT 'Done'`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`purchase_date\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`purchase_date\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`purchase_date\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`purchase_date\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`status\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`status\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`currency\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP COLUMN \`amount\``);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD \`price\` decimal NOT NULL`);
    }

}

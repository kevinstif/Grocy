import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637625299643 implements MigrationInterface {
    name = 'InitialSchema1637625299643'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`product_supplier\` (\`supplier_id\` bigint UNSIGNED NOT NULL, \`product_id\` bigint UNSIGNED NOT NULL, INDEX \`IDX_353b46c09d15ba84ed15bdc356\` (\`supplier_id\`), INDEX \`IDX_7028669781acd8f4acd459b647\` (\`product_id\`), PRIMARY KEY (\`supplier_id\`, \`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`product_supplier\` ADD CONSTRAINT \`FK_353b46c09d15ba84ed15bdc3568\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_supplier\` ADD CONSTRAINT \`FK_7028669781acd8f4acd459b6475\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_supplier\` DROP FOREIGN KEY \`FK_7028669781acd8f4acd459b6475\``);
        await queryRunner.query(`ALTER TABLE \`product_supplier\` DROP FOREIGN KEY \`FK_353b46c09d15ba84ed15bdc3568\``);
        await queryRunner.query(`DROP INDEX \`IDX_7028669781acd8f4acd459b647\` ON \`product_supplier\``);
        await queryRunner.query(`DROP INDEX \`IDX_353b46c09d15ba84ed15bdc356\` ON \`product_supplier\``);
        await queryRunner.query(`DROP TABLE \`product_supplier\``);
    }

}

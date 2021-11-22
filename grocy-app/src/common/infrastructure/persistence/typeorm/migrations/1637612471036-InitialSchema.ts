import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637612471036 implements MigrationInterface {
    name = 'InitialSchema1637612471036'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_suppliers_dni\` ON \`suppliers\``);
        await queryRunner.query(`CREATE TABLE \`shoppingCarts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`state\` varchar(10) NOT NULL, \`customerId\` int NOT NULL, \`productId\` int NOT NULL, \`quantity\` int NOT NULL, \`creation_date\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`suppliers\` ADD UNIQUE INDEX \`IDX_06e38b0da6538e00b099d70f1f\` (\`dni\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_customers_dni\` ON \`suppliers\` (\`dni\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_customers_dni\` ON \`suppliers\``);
        await queryRunner.query(`ALTER TABLE \`suppliers\` DROP INDEX \`IDX_06e38b0da6538e00b099d70f1f\``);
        await queryRunner.query(`DROP TABLE \`shoppingCarts\``);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_suppliers_dni\` ON \`suppliers\` (\`dni\`)`);
    }

}

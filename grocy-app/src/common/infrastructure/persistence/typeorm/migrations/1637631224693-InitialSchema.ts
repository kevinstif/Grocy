import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637631224693 implements MigrationInterface {
    name = 'InitialSchema1637631224693'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`ruc\` varchar(11) NOT NULL, \`phone\` varchar(9) NOT NULL, UNIQUE INDEX \`UQ_customers_ruc\` (\`ruc\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` varchar(255) NOT NULL, \`price\` decimal NOT NULL, \`purchase_date\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`price\` int NOT NULL, \`stock\` int NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(30) NOT NULL, \`last_name\` varchar(30) NOT NULL, \`phone\` varchar(9) NOT NULL, \`address\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shoppingCarts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`state\` varchar(10) NOT NULL, \`customerId\` int NOT NULL, \`productId\` int NOT NULL, \`quantity\` int NOT NULL, \`creation_date\` varchar(30) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`shoppingCarts\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_ruc\` ON \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
    }

}

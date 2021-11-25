import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1637882243198 implements MigrationInterface {
    name = 'InitialSchema1637882243198'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`customers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`phone\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`first_name\` varchar(75) NULL, \`last_name\` varchar(75) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`orders\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`status\` enum ('Done', 'Cancel') NOT NULL DEFAULT 'Done', \`purchase_date\` datetime NOT NULL, \`cart_id\` bigint UNSIGNED NULL, \`customer_id\` bigint UNSIGNED NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(10) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cart\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`state\` varchar(255) NOT NULL, \`quantity\` int NOT NULL, \`creation_date\` varchar(255) NOT NULL, \`customer_id\` bigint UNSIGNED NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`products\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`type\` enum ('E', 'P') NOT NULL DEFAULT 'P', \`stock\` int NOT NULL, \`amount\` decimal(10,2) NULL, \`currency\` varchar(10) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`suppliers\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`first_name\` varchar(75) NOT NULL, \`last_name\` varchar(75) NOT NULL, \`ruc\` varchar(11) NOT NULL, \`phone\` varchar(9) NOT NULL, UNIQUE INDEX \`UQ_customers_ruc\` (\`ruc\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_cart\` (\`product_id\` bigint UNSIGNED NOT NULL, \`cart_id\` bigint UNSIGNED NOT NULL, INDEX \`IDX_7e1ab60d5bc931ef26a1b825d1\` (\`product_id\`), INDEX \`IDX_cac311a56f904d99846892a9da\` (\`cart_id\`), PRIMARY KEY (\`product_id\`, \`cart_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`product_supplier\` (\`supplier_id\` bigint UNSIGNED NOT NULL, \`product_id\` bigint UNSIGNED NOT NULL, INDEX \`IDX_353b46c09d15ba84ed15bdc356\` (\`supplier_id\`), INDEX \`IDX_7028669781acd8f4acd459b647\` (\`product_id\`), PRIMARY KEY (\`supplier_id\`, \`product_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_f42b1d95404c45b10bf2451d814\` FOREIGN KEY (\`cart_id\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`orders\` ADD CONSTRAINT \`FK_772d0ce0473ac2ccfa26060dbe9\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cart\` ADD CONSTRAINT \`FK_242205c81c1152fab1b6e848470\` FOREIGN KEY (\`customer_id\`) REFERENCES \`customers\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_cart\` ADD CONSTRAINT \`FK_7e1ab60d5bc931ef26a1b825d14\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_cart\` ADD CONSTRAINT \`FK_cac311a56f904d99846892a9da3\` FOREIGN KEY (\`cart_id\`) REFERENCES \`cart\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`product_supplier\` ADD CONSTRAINT \`FK_353b46c09d15ba84ed15bdc3568\` FOREIGN KEY (\`supplier_id\`) REFERENCES \`suppliers\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`product_supplier\` ADD CONSTRAINT \`FK_7028669781acd8f4acd459b6475\` FOREIGN KEY (\`product_id\`) REFERENCES \`products\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`product_supplier\` DROP FOREIGN KEY \`FK_7028669781acd8f4acd459b6475\``);
        await queryRunner.query(`ALTER TABLE \`product_supplier\` DROP FOREIGN KEY \`FK_353b46c09d15ba84ed15bdc3568\``);
        await queryRunner.query(`ALTER TABLE \`product_cart\` DROP FOREIGN KEY \`FK_cac311a56f904d99846892a9da3\``);
        await queryRunner.query(`ALTER TABLE \`product_cart\` DROP FOREIGN KEY \`FK_7e1ab60d5bc931ef26a1b825d14\``);
        await queryRunner.query(`ALTER TABLE \`cart\` DROP FOREIGN KEY \`FK_242205c81c1152fab1b6e848470\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_772d0ce0473ac2ccfa26060dbe9\``);
        await queryRunner.query(`ALTER TABLE \`orders\` DROP FOREIGN KEY \`FK_f42b1d95404c45b10bf2451d814\``);
        await queryRunner.query(`DROP INDEX \`IDX_7028669781acd8f4acd459b647\` ON \`product_supplier\``);
        await queryRunner.query(`DROP INDEX \`IDX_353b46c09d15ba84ed15bdc356\` ON \`product_supplier\``);
        await queryRunner.query(`DROP TABLE \`product_supplier\``);
        await queryRunner.query(`DROP INDEX \`IDX_cac311a56f904d99846892a9da\` ON \`product_cart\``);
        await queryRunner.query(`DROP INDEX \`IDX_7e1ab60d5bc931ef26a1b825d1\` ON \`product_cart\``);
        await queryRunner.query(`DROP TABLE \`product_cart\``);
        await queryRunner.query(`DROP INDEX \`UQ_customers_ruc\` ON \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`suppliers\``);
        await queryRunner.query(`DROP TABLE \`products\``);
        await queryRunner.query(`DROP TABLE \`cart\``);
        await queryRunner.query(`DROP TABLE \`orders\``);
        await queryRunner.query(`DROP TABLE \`customers\``);
    }

}

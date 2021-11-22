
import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636317475270 implements MigrationInterface {
    name = 'InitialSchema1636317475270'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shoppingCarts\`
        (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT,
         \`customerId\` int NOT NULL,
         \`productId\` int NOT NULL,
         \`quantity\` int NOT NULL,
         \`state\` varchar(10) NOT NULL,
         \`creation_date\` varchar(30) NOT NULL,
          PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`shoppingCarts\``);
    }
}
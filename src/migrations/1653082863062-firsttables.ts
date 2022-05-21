import { MigrationInterface, QueryRunner } from "typeorm";

export class firsttables1653082863062 implements MigrationInterface {
    name = 'firsttables1653082863062'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "price" integer NOT NULL, "img_url" character varying, "type" character varying(120) NOT NULL, "quantity_stock" integer NOT NULL, "rating" integer, "label" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, "userId" character varying, CONSTRAINT "PK_b5f695a59f5ebb50af3c8160816" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "buys" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "total" double precision NOT NULL, "userId" uuid, CONSTRAINT "PK_34ecbce508fa8a98d0f23d9372a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "user_name" character varying NOT NULL, "birth_date" character varying NOT NULL, "is_adm" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cartId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "address" ("id" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "cep" character varying NOT NULL, "neighborhood" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying NOT NULL, "userId" uuid, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "carts_products_products" ("cartsId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_88c6c87a047a1483387693e891a" PRIMARY KEY ("cartsId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6d4a98ce8aefd303215e05d6c8" ON "carts_products_products" ("cartsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_8689ca568058fafcbfc0fcd753" ON "carts_products_products" ("productsId") `);
        await queryRunner.query(`CREATE TABLE "buys_products_products" ("buysId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_7283360b4cbb13b5848e0135b7a" PRIMARY KEY ("buysId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_97ac7f3f3a5f957bd4a76727e4" ON "buys_products_products" ("buysId") `);
        await queryRunner.query(`CREATE INDEX "IDX_e54a8e7d76477d7c0bc89d6b54" ON "buys_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "buys" ADD CONSTRAINT "FK_3bb64d577595984a95f14ea0f71" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "carts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "address" ADD CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "carts_products_products" ADD CONSTRAINT "FK_6d4a98ce8aefd303215e05d6c8c" FOREIGN KEY ("cartsId") REFERENCES "carts"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "carts_products_products" ADD CONSTRAINT "FK_8689ca568058fafcbfc0fcd7539" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buys_products_products" ADD CONSTRAINT "FK_97ac7f3f3a5f957bd4a76727e4e" FOREIGN KEY ("buysId") REFERENCES "buys"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "buys_products_products" ADD CONSTRAINT "FK_e54a8e7d76477d7c0bc89d6b54a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "buys_products_products" DROP CONSTRAINT "FK_e54a8e7d76477d7c0bc89d6b54a"`);
        await queryRunner.query(`ALTER TABLE "buys_products_products" DROP CONSTRAINT "FK_97ac7f3f3a5f957bd4a76727e4e"`);
        await queryRunner.query(`ALTER TABLE "carts_products_products" DROP CONSTRAINT "FK_8689ca568058fafcbfc0fcd7539"`);
        await queryRunner.query(`ALTER TABLE "carts_products_products" DROP CONSTRAINT "FK_6d4a98ce8aefd303215e05d6c8c"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "address" DROP CONSTRAINT "FK_d25f1ea79e282cc8a42bd616aa3"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`ALTER TABLE "buys" DROP CONSTRAINT "FK_3bb64d577595984a95f14ea0f71"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_e54a8e7d76477d7c0bc89d6b54"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_97ac7f3f3a5f957bd4a76727e4"`);
        await queryRunner.query(`DROP TABLE "buys_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_8689ca568058fafcbfc0fcd753"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6d4a98ce8aefd303215e05d6c8"`);
        await queryRunner.query(`DROP TABLE "carts_products_products"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "address"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "buys"`);
        await queryRunner.query(`DROP TABLE "carts"`);
        await queryRunner.query(`DROP TABLE "products"`);
    }

}
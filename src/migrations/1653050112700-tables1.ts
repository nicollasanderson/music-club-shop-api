import { MigrationInterface, QueryRunner } from "typeorm";

export class tables11653050112700 implements MigrationInterface {
    name = 'tables11653050112700'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" character varying NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "cep" character varying NOT NULL, "neighborhood" character varying NOT NULL, "country" character varying NOT NULL, "complement" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(120) NOT NULL, "price" integer NOT NULL, "img_url" character varying, "type" character varying(120) NOT NULL, "quantity_stock" integer NOT NULL, "rating" integer, "label" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_4c9fb58de893725258746385e16" UNIQUE ("name"), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "subtotal" double precision NOT NULL, CONSTRAINT "PK_c524ec48751b9b5bcfbf6e59be7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(256) NOT NULL, "email" character varying(256) NOT NULL, "user_name" character varying NOT NULL, "birth_date" character varying NOT NULL, "is_adm" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "create_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "cartId" uuid, CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "UQ_074a1f262efaca6aba16f7ed920" UNIQUE ("user_name"), CONSTRAINT "REL_89502c44bd22c06e714c31c1e9" UNIQUE ("cartId"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "order" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "userId" uuid NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cart_product_products" ("cartId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_89b8f9e9030960216be03763620" PRIMARY KEY ("cartId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_7886808a95f0fa24bbcb86ae56" ON "cart_product_products" ("cartId") `);
        await queryRunner.query(`CREATE INDEX "IDX_a1014e74a9238e6d244be495bc" ON "cart_product_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_89502c44bd22c06e714c31c1e93" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "order" ADD CONSTRAINT "FK_caabe91507b3379c7ba73637b84" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "cart_product_products" ADD CONSTRAINT "FK_7886808a95f0fa24bbcb86ae566" FOREIGN KEY ("cartId") REFERENCES "cart"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "cart_product_products" ADD CONSTRAINT "FK_a1014e74a9238e6d244be495bc1" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cart_product_products" DROP CONSTRAINT "FK_a1014e74a9238e6d244be495bc1"`);
        await queryRunner.query(`ALTER TABLE "cart_product_products" DROP CONSTRAINT "FK_7886808a95f0fa24bbcb86ae566"`);
        await queryRunner.query(`ALTER TABLE "order" DROP CONSTRAINT "FK_caabe91507b3379c7ba73637b84"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_89502c44bd22c06e714c31c1e93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_a1014e74a9238e6d244be495bc"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_7886808a95f0fa24bbcb86ae56"`);
        await queryRunner.query(`DROP TABLE "cart_product_products"`);
        await queryRunner.query(`DROP TABLE "order"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "cart"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
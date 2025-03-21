import { MigrationInterface, QueryRunner } from 'typeorm';

export class MinhaNovaAlteracao1742516159207 implements MigrationInterface {
  name = 'MinhaNovaAlteracao1742516159207';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastLogin"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loginAttempts"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" text NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "lastLogin" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loginAttempts" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36"`,
    );
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "code"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "loginAttempts"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "lastLogin"`);
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "roles"`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "loginAttempts" integer NOT NULL DEFAULT '0'`,
    );
    await queryRunner.query(`ALTER TABLE "users" ADD "lastLogin" TIMESTAMP`);
    await queryRunner.query(
      `ALTER TABLE "users" ADD "roles" text NOT NULL DEFAULT 'user'`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD "code" character varying NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "users" ADD CONSTRAINT "UQ_1f7a2b11e29b1422a2622beab36" UNIQUE ("code")`,
    );
  }
}

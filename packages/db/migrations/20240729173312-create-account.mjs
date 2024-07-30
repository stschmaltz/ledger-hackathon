export async function up(db) {
  console.log("Applying migration: create-account");
  await db.schema
    .createTable("accounts")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("type", "varchar(255)", (col) => col.notNull())
    .addColumn("balance", "decimal", (col) => col.defaultTo(0))
    .execute();
  console.log("Applied migration: create-account");
}

export async function down(db) {
  console.log("Reverting migration: create-account");
  await db.schema.dropTable("accounts").execute();
  console.log("Reverted migration: create-account");
}

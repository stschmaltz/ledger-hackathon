export async function up(db) {
  console.log("Applying migration: create-entries");
  await db.schema
    .createTable("entries")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("amount", "decimal", (col) => col.notNull())
    .addColumn("entry_type", "varchar(255)", (col) => col.notNull())
    .addColumn("transaction_id", "integer", (col) =>
      col.references("transactions.id").notNull()
    )
    .addColumn("account_id", "integer", (col) =>
      col.references("accounts.id").notNull()
    )
    .execute();
  console.log("Applied migration: create-entries");
}

export async function down(db) {
  console.log("Reverting migration: create-entries");
  await db.schema.dropTable("entries").execute();
  console.log("Reverted migration: create-entries");
}

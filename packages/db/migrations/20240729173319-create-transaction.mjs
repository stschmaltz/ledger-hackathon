export async function up(db) {
  console.log("Applying migration: create-transactions");

  await db.schema
    .createTable("transactions")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("date", "timestamp", (col) => col.notNull().defaultTo("now()"))
    .addColumn("description", "varchar(255)", (col) => col.notNull())
    .execute();
  console.log("Applied migration: create-transactions");
}

export async function down(db) {
  console.log("Reverting migration: create-transactions");
  await db.schema.dropTable("transactions").execute();
  console.log("Reverted migration: create-transactions");
}

exports.up = function(knex) {
    return knex.schema.createTable("users", tbl => {
        tbl.increments();

        tbl.text("username", 128)
        .unique()
        .notNullable();

        tbl.text("password", 128)
        .notNullable();
        
        tbl.text("Number")
        .notNullable();
    })

    .createTable("foods", tbl => {
        tbl.increments();
        
        tbl.text("name", 225)
        .notNullable();

        tbl.text("ingredients")
        .notNullable();

        tbl.text("image");

        tbl.boolean("dessert");

        tbl.integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onDelete('CASCADE')
        .onUpdate('CASCADE');
    })
  
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists("foods")

    .dropTableIfExists("users");
};
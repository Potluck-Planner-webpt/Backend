exports.seed = function(knex) {
    // Deletes ALL existing entries
    return knex('foods').truncate()
      .then(function () {
        // Inserts seed entries
        return knex('foods').insert([
          {name: 'Pumpkin Pie',
          ingredients: 'Pumpkin, Eggs, Heavy Cream, Cornstarch', 
          image:'https://cdn.sallysbakingaddiction.com/wp-content/uploads/2014/10/sallys-baking-addiction-pumpkin-pie-2.jpg', 
          dessert: true, 
          user_id: 2},
          {name: 'Green Bean Casserole', ingredients: 'Mushroom Soup, Milk, Soy Sauce, Green beans, French Fried Onions', image:'https://www.campbells.com/wp-content/uploads/2020/06/ClassicGreenbeanCasserole_Collection_Hero-1-2048x541.jpg', dessert: false, user_id: 3},
          {name: 'Deviled Eggs', ingredients: 'Eggs, Butter, Garlic, Mayonnaise', image:'https://images-gmi-pmc.edge-generalmills.com/bbc78492-a1ae-4e7f-8af6-7947e8fb379c.jpg', dessert: false, user_id: 4},
        ]);
      });
  };
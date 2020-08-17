exports.seed = function (knex, Promise) {
  // Deletes ALL existing entries and resets ids
  return knex('users')
    .truncate()
    .then(function () {
      return knex('users').insert([
        {
          username: 'Ares',
          password: "Greek"
        },
        {
          username: 'Apollo',
          password: "Greek"

        },
        {
          username: 'Zeus',
          password: "Greek"

        },
        {
          username: 'Athena',
          password: "Greek"
        },
      ]);
    });
};

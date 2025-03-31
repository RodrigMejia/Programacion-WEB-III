
const db = require('../db');

module.exports = {
  getAll(callback) {
    db.query('SELECT * FROM users', callback);
  },

  getById(id, callback) {
    db.query('SELECT * FROM users WHERE id = ?', [id], callback);
  },

  create(user, callback) {
    db.query('INSERT INTO users (name, email) VALUES (?, ?)', [user.name, user.email], callback);
  },

  update(id, user, callback) {
    db.query('UPDATE users SET name = ?, email = ? WHERE id = ?', [user.name, user.email, id], callback);
  },

  delete(id, callback) {
    db.query('DELETE FROM users WHERE id = ?', [id], (err) => {
      if (err) return callback(err);

      this.reorderIds(callback);
    });
  },

  reorderIds(callback) {
    db.query('SET @count = 0;', (err) => {
      if (err) return callback(err);

      db.query('UPDATE users SET id = @count := @count + 1;', (err) => {
        if (err) return callback(err);

        db.query('SELECT MAX(id) AS maxId FROM users', (err, result) => {
          if (err) return callback(err);

          const maxId = result[0].maxId;


          db.query('ALTER TABLE users AUTO_INCREMENT = ?', [maxId + 1], callback);
        });
      });
    });
  }
};

module.exports.generateSql = () => (
  `CREATE TABLE IF NOT EXISTS todos (
    id SERIAL PRIMARY KEY NOT NULL,
    description VARCHAR(100) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT false
  );`
);
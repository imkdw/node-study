import mysql from "mysql";

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "1234",
  database: "twitter_book",
});

type insertUserParams = {
  newUser: {
    name: string;
    email: string;
    password: string;
    profile: string;
  };
};
async function insertUser(newUser: insertUserParams) {
  const query = `INSERT INTO users(name, email, profile, password) VALUES `;
}

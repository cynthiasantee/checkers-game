import { client } from "./player";

class PlayerDAO {
  async addPlayer(email, password) {
    try {
      await client.connect();
      console.log("connected!");
      const players = await client.query(
        `INSERT INTO player VALUES (DEFAULT, ${email}, ${password}`
      );
      console.table(players.rows);
    } catch (err) {
      console.log(err);
    } finally {
      await client.end();
    }

    return { email, password };
  }

  removePlayer(email) {
    //DELETE FROM player WHERE email = email;
  }

  updatePassword(email, password) {
    //UPDATE playe SET password = password WHERE email = email;
  }
}
//
const playerDao = new PlayerDAO();

const main = async () => {
  const result = await playerDao.addPlayer("email", "password");
  return result;
};

main();

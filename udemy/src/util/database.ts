import { MongoClient, ServerApiVersion } from "mongodb";

let _db;

export const mongoConnect = (callback: any) => {
  const uri = "mongodb+srv://root:zz11xx22@cluster0.gtcw5zo.mongodb.net/shop?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  client
    .connect()
    .then((client) => {
      _db = client.db();
      callback(client);
    })
    .catch((err) => console.error(err));
};

export const getDb = () => {
  if (_db) {
    return _db;
  }

  throw "Cannot Found Database";
};

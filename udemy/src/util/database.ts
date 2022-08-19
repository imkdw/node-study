import { MongoClient, ServerApiVersion } from "mongodb";

export const mongoConnect = (callback) => {
  const uri =
    "mongodb+srv://root:1234@cluster0.gtcw5zo.mongodb.net/?retryWrites=true&w=majority";
  const client = new MongoClient(uri, { serverApi: ServerApiVersion.v1 });
  client
    .connect()
    .then((result) => {
      console.log(result);
      callback(result);
    })
    .catch((err) => console.error(err));
};

import { WebSocketServer } from "ws";
import Chat from "./models/Chat.js";

function handleOnlinePeople(wss, connection, req) {
  const clientProtocol = req.headers["sec-websocket-protocol"];
  connection._id = clientProtocol.split(", ")[1];
  connection.userID = clientProtocol.split(", ")[2];
  console.log([...wss.clients].map((c) => c.userID));

  [...wss.clients].forEach((client) => {
    client.send(
      JSON.stringify({
        online: [...wss.clients].map((c) => ({
          _id: c._id,
          userID: c.userID,
        })),
      })
    );
  });
}

async function handleSendMessage(message, wss, connection) {
  const messageData = JSON.parse(message.toString());
  console.log(messageData);
  const { receiver, text } = messageData;
  if (receiver && text) {
    console.log("Connection ID is: ", connection._id);
    const messageDoc = await Chat.create({
      sender: connection._id,
      receiver,
      text,
    });
    console.log("Created success!");
    [...wss.clients]
      .filter((client) => client._id == receiver)
      .forEach((c) =>
        c.send(
          JSON.stringify({
            text,
            sender: connection._id,
            receiver,
            _id: messageDoc._id,
          })
        )
      );
  }
  console.log("Receiver and text are : ", receiver, " ", text);
}

function runServerChat(serverApp) {
  console.log("Chat Server is running!");
  const wss = new WebSocketServer({ server: serverApp });

  wss.on("connection", (connection, req) => {
    console.log("+1 connection");

    handleOnlinePeople(wss, connection, req);

    connection.on("message", (message) =>
      handleSendMessage(message, wss, connection)
    );
  });
}

export default runServerChat;

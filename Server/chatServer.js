import { WebSocketServer } from "ws";
import Chat from "./models/Chat.js";

function handleOnlinePeople(wss, connection, req) {
  const clientProtocol = req.headers["sec-websocket-protocol"];
  connection.studentID = clientProtocol.split(", ")[1];
  connection.fullname = clientProtocol.split(", ")[2];
  console.log([...wss.clients].map((c) => c.fullname));

  [...wss.clients].forEach((client) => {
    client.send(
      JSON.stringify({
        online: [...wss.clients].map((c) => ({
          userId: c.studentID,
          username: c.fullname,
        })),
      })
    );
  });
}

async function handleSendMessage(message, wss, connection) {
  const messageData = JSON.parse(message.toString());
  const { receiver, text } = messageData;
  if (receiver && text) {
    console.log("Connection.studentID is : ", connection.studentID);
    const messageDoc = await Chat.create({
      sender: connection.studentID,
      receiver,
      text,
    });
    console.log("Created success!");
    [...wss.clients]
      .filter((client) => client.studentID == receiver)
      .forEach((c) =>
        c.send(
          JSON.stringify({
            text,
            sender: connection.studentID,
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

  wss.on("Connection", (connection, req) => {
    console.log("+1 connection");

    handleOnlinePeople(wss, connection, req);

    connection.on("Message", (message) =>
      handleSendMessage(message, wss, connection)
    );
  });
}

export default runServerChat;

import { readDB, writeDB } from "../../../../backendLibs/dbLib";
import { v4 as uuidv4 } from "uuid";

export default function roomIdMessageRoute(req, res) {
  if (req.method === "GET") {
    const rooms = readDB();
    const id = req.query.roomId;

    const roomIdIdx = rooms.findIndex((x) => x.roomId === id);

    if (roomIdIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid Room ID" });
    }

    const chatHistory = rooms[roomIdIdx].messages;

    return res.json({ ok: true, messages: chatHistory });
    /*
    
    const chatHistory = rooms
      .filter((x) => x.roomId === id)
      .map((y) => ({ messages: y.messages }));
      
      cannot use : [message: {message:[{Obj},{Obj}]}];

    */
  } else if (req.method === "POST") {
    const rooms = readDB();
    const id = req.query.roomId;

    const roomIdIdx = rooms.findIndex((x) => x.roomId === id);

    if (roomIdIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid Room ID" });
    }

    //read request body
    const text = req.body.text;

    if (typeof text !== "string")
      return res.status(400).json({ ok: false, message: "Invalid Text Input" });

    //create new id
    const newId = uuidv4();

    const newMessage = { messageId: newId, text: text };

    rooms.push(newMessage);

    writeDB(rooms);

    return res.json({ ok: true, message: newMessage });
  }
}

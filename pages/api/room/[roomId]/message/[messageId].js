import { writeDB, readDB } from "../../../../../backendLibs/dbLib";

export default function roomIdMessageIdRoute(req, res) {
  if (req.method === "DELETE") {
    const rooms = readDB();

    const roomId = req.query.roomId;
    const roomIdIdx = rooms.findIndex((x) => x.roomId === roomId);

    if (roomIdIdx === -1) {
      return res.status(404).json({ ok: false, message: "Invalid Room ID" });
    }

    const chatHistory = rooms[roomIdIdx].messages;

    const messageId = req.query.messageId;
    const messageIdIdx = chatHistory.findIndex(
      (x) => x.messageId === messageId
    );

    if (messageIdIdx === -1) {
      return res.status(404).json({
        ok: false,
        message: "Invalid Message ID",
      });
    }

    chatHistory.splice(messageIdIdx, 1);

    rooms[roomIdIdx].messages = chatHistory;

    return res.json({ ok: true });
  }

  //read value from URL
  const roomId = req.query.roomId;
  const messageId = req.query.messageId;
}

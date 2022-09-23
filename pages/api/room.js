import { readDB } from "../../backendLibs/dbLib";

export default function roomRoute(req, res) {
  const rooms = readDB();
  const roomsData = rooms.map((x) => ({
    roomId: x.roomId,
    roomName: x.roomName,
  })); //[];

  /*for (const room of rooms) {
    roomsData.push({
      roomId: room.roomId,
      roomName: room.roomName,
    });
  }*/

  return res.json({ ok: true, room: roomsData });
}

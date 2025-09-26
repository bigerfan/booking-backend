export const formatedRooms = (rooms: Map<string, Set<string>>) => {
  const formated = Array.from(rooms.entries())
    .filter(([roomName, sockets]) => roomName.startsWith("table:"))
    .map(([roomName, sockets]) => ({
      tableId: roomName.split(":")[1], // extract id
      users: Array.from(sockets), // list of socket IDs
      count: sockets.size, // number of users in this table
    }));
  return formated;
};

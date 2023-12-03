const { WAITING_USER, PLAYING_USER } = require("./constants");

const renderJoinTable = (tablesState, tableId, username) => {
  return tablesState.map((t) => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: [
            ...t.waitingUsers,
            {
              ...WAITING_USER,
              username,
            },
          ],
        };
  });
};

const renderSitUser = (tablesState, tableId, seatId, username) => {
  return tablesState.map((t) => {
    return t.id !== tableId
      ? t
      : {
          ...t,
          waitingUsers: t.waitingUsers.filter((wu) => wu.username !== username),
          seats: t.seats.map((s) => {
            return s.id !== seatId
              ? s
              : {
                  id: seatId,
                  user: {
                    ...PLAYING_USER,
                    username,
                  },
                };
          }),
        };
  });
};

module.exports = { renderJoinTable, renderSitUser };

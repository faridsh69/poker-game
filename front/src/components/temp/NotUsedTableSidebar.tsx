import { TypeTable } from 'src/interfaces/type-game'

export const NotUsedTableSidebar = (props: { table: TypeTable }) => {
  const { table } = props

  // const handleLeaveSeat = useCallback(
  //   (tableId: number) => {
  //     socket.emit(CLIENT_CHANNELS.leaveSeat, { tableId, username })
  //   },
  //   [socket, username],
  // )

  // const handleLeaveGame = useCallback(
  //   (tableId: number) => {
  //     socket.emit(CLIENT_CHANNELS.leaveGame, { tableId, username })
  //   },
  //   [socket, username],
  // )

  return (
    <div className='home-runtable-main-sidebar'>
      <div className='home-runtable-main-sidebar-waitinglist'>
        {/* {(isAuthUserSeatedTable || isAuthUserSeatedoutTable) && (
          // <Button variant='outlined' color='error' onClick={() => handleLeaveSeat(table.id)}>
          //   Leave seat
          // </Button>
        )} */}
        <br />
        <br />
        {/* {isAuthUserSeatedTable && (
          <Button variant='outlined' color='error' onClick={() => handleLeaveGame(table.id)}>
            Leave Game || Sit out = Checkbox
          </Button>
        )} */}
        <br />
        <br />
        {/* {isAuthUserSeatedoutTable && (
          <Button variant='outlined' color='success' onClick={() => handleJoinGame(table.id)}>
            Join Game || Ready
          </Button>
        )} */}
        <br />
        <br />
        Waiting List:
        <ul>
          {table.waitingUsers.map((u, uIndex) => {
            return <li key={uIndex}>{u.username}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

import { makeUniqueArrayByPropery } from "src/helpers/common"

const Test = () => {
  const events: TypeEvent[] = [
    { id: 1, s: 1, e: 4 },
    { id: 2, s: 2, e: 5 },
    { id: 3, s: 3, e: 6 },
    { id: 17, s: 4, e: 7 },
    { id: 4, s: 7, e: 8 },
    { id: 5, s: 8, e: 9 },
    { id: 6, s: 10, e: 12 },
    { id: 7, s: 11, e: 13 },
    { id: 8, s: 15, e: 30 },
    { id: 9, s: 16, e: 32 },
    { id: 10, s: 17, e: 33 },
    { id: 11, s: 18, e: 34 },
    { id: 12, s: 19, e: 35 },
    { id: 13, s: 20, e: 36 },
    { id: 14, s: 21, e: 36 },
    { id: 15, s: 22, e: 36 },
    { id: 16, s: 23, e: 36 },
  ]
  const eventsWithOverlaps = getEventsWithOverlaps(events)

  return (
    <div className='grid-container'>
      {eventsWithOverlaps.map(event => {
        const styles = getEventStyles(event)

        const style = {
          gridRowStart: event.s,
          gridRowEnd: event.e,

          ...styles,
        }

        return (
          <div key={event.id} style={style}>
            {event.id}
          </div>
        )
      })}
    </div>
  )
}

type TypeEvent = {
  id: number
  s: number
  e: number
  overlappedEvents?: TypeEvent[]
  indexInOverlaps?: number
}

const getEventStyles = (event: TypeEvent) => {
  const overlapsCount = (event.overlappedEvents?.length || 0) + 1
  const columnWidth = 2520 / overlapsCount
  const gridColumnStart = 1 + (event.indexInOverlaps || 0) * columnWidth
  const gridColumnEnd = gridColumnStart + columnWidth

  return { gridColumnStart, gridColumnEnd }
}

const getEventsWithOverlaps = (events: TypeEvent[]) => {
  const eventsWithOverlaps = events.map(event1 => {
    const overlappedEvents = []
    for (const event2 of events) {
      if (event1.id !== event2.id && event2.s < event1.e && event2.e > event1.s) {
        overlappedEvents.push(event2)
      }
    }

    return {
      ...event1,
      overlappedEvents,
    }
  })

  const eventsWithAllOverlaps = eventsWithOverlaps.map(event1 => {
    let overlappedEvents: TypeEvent[] = event1.overlappedEvents
    for (const overlappedEvent of event1.overlappedEvents) {
      const overlappedFullDataEvent = eventsWithOverlaps.find(e => e.id === overlappedEvent.id) || {overlappedEvents: []}
      
      overlappedEvents = [
        ...overlappedEvents,
        ...overlappedFullDataEvent.overlappedEvents
      ]
    }


    return {
      ...event1,
      overlappedEvents: makeUniqueArrayByPropery(overlappedEvents, 'id').filter(ev => ev.id !== event1.id),
    }
  })

  const showedEventIds: number[] = []
  return eventsWithAllOverlaps.map(event => {
    const indexInOverlaps = getCountConflictsShowed(showedEventIds, event.overlappedEvents)
    showedEventIds.push(event.id)

    return {
      ...event,
      indexInOverlaps,
    }
  })
}

const getCountConflictsShowed = (showedEventIds: number[], overlappedEvents: TypeEvent[]) => {
  let count = 0
  for (const showedEventId of showedEventIds) {
    if (overlappedEvents.find(ev => ev.id === showedEventId)) {
      count++
    }
  }

  return count
}

export default Test

// const getMaximumColumns = events => {
//   let maximum = 1
//   for (const event of events) {
//     if (maximum < event.overlappedEvents.length + 1) {
//       maximum = event.overlappedEvents.length + 1
//     }
//   }

//   return maximum
// }

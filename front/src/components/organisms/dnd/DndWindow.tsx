import { useState } from 'react'
import { DndContext } from '@dnd-kit/core'
import type { Coordinates } from '@dnd-kit/utilities'

import { DraggableWindow } from 'src/components/organisms/dnd/DraggableWindow'
import { TypeDndWindowProps } from 'src/interfaces'

export const DndWindow = (props: TypeDndWindowProps) => {
  const { topbar, body } = props

  const [{ x, y }, setCoordinates] = useState<Coordinates>({
    x: 0,
    y: 0,
  })

  return (
    <DndContext
      onDragEnd={({ delta }) => {
        setCoordinates(({ x, y }) => {
          return {
            x: x + delta.x,
            y: y + delta.y,
          }
        })
      }}
    >
      <DraggableWindow top={y} left={x} topbar={topbar} body={body} id='draggable-window' />
    </DndContext>
  )
}

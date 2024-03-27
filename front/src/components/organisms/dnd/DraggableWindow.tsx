import { useDraggable } from '@dnd-kit/core'
import classNames from 'classnames'
import { TypeDraggableWindowProps } from 'src/interfaces'

export const DraggableWindow = (props: TypeDraggableWindowProps) => {
  const { top, left, id, topbar, body } = props

  const positionsStyle = { top, left }

  const { attributes, isDragging, listeners, setNodeRef, transform } = useDraggable({
    id,
  })

  return (
    <div
      className={classNames('dnd', isDragging && 'dragging')}
      style={{
        ...positionsStyle,
        // @ts-ignore
        '--translate-x': `${transform?.x ?? 0}px`,
        '--translate-y': `${transform?.y ?? 0}px`,
      }}
    >
      <div className='dnd-window' {...attributes} ref={setNodeRef}>
        <div className='dnd-window-topbar' {...listeners}>
          {topbar}
        </div>
        <div className='dnd-window-body'>{body}</div>
      </div>
    </div>
  )
}

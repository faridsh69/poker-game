import { useEffect } from 'react'
import { useAtom } from 'jotai'
import classNames from 'classnames'

import BackRabbitCardImage from 'src/components/game/molecules/cards/back/back-rabbit.svg'
import { rabbitCardHoveredAtom } from 'src/contexts/rabbitCardHoveredAtom'

export const RabbitGameCard = (props: { isRabbitcard: boolean }) => {
  const { isRabbitcard } = props
  const [rabbitCardHovered, setRabbitCardHovered] = useAtom(rabbitCardHoveredAtom)

  useEffect(() => {
    setRabbitCardHovered(false)
  }, [])

  if (!isRabbitcard) return null

  return (
    <div
      onClick={() => setRabbitCardHovered(true)}
      className={classNames(
        'card-game-rabbitcard',
        rabbitCardHovered && 'card-game-rabbitcardhovered',
      )}
    >
      <img src={BackRabbitCardImage} alt='rabit card' />
    </div>
  )
}

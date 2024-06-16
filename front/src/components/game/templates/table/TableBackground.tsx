import { ImageLoader } from 'src/components/cms/molecules/ImageLoader'
import TableImage from 'src/images/game/table.png'

export const TableBackground = (props: any) => {
  const { height = 549, loadingColor = '#1c1c1c', ...rest } = props

  return (
    <ImageLoader
      src={TableImage}
      alt='poker-table'
      className='popup-table-backgroundimg'
      height={height}
      loadingColor={loadingColor}
      {...rest}
    />
  )
}

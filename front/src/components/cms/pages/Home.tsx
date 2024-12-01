import { ImageLoader } from '../molecules/ImageLoader'
import { PageLayout } from '../templates/layouts/PageLayout'

import Home2Image from 'src/images/game/home2.png'
import HomeImage from 'src/images/game/home.png'

const Home = () => {
  return (
    <PageLayout>
      <ImageLoader src={HomeImage} />
      <ImageLoader src={Home2Image} />
    </PageLayout>
  )
}

// eslint-disable-next-line import/no-default-export
export default Home

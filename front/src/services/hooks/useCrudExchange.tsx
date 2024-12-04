import { useQuery } from '@tanstack/react-query'

import { API_KEY_MAP } from 'src/configs/service'
import { API_URLS } from 'src/services/apis'

export const useCrudExchange = () => {
  const MODEL_SLUG = API_URLS.exchange
  const { listApi } = API_KEY_MAP[API_URLS.exchange]

  const { data } = useQuery({
    queryKey: [MODEL_SLUG],
    queryFn: async () => {
      try {
        const response = await listApi?.()

        // @ts-ignore
        return response?.data?.irr
      } catch (error: any) {
        // errorHandler(error, 'listApi useCrudExchange')
      }
    },
    placeholderData: [],
  })

  const x = {
    usd: 0.000015,
  }

  return data || x
}

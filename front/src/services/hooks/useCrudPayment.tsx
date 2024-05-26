import { REACT_QUERY_CLIENT } from 'src/configs/service'
import { getAuthId } from 'src/helpers/auth'
import { useCrud } from 'src/hooks/useCrud'
import { API_URLS } from 'src/services/apis'

export const useCrudPayment = () => {
  return useCrud(API_URLS.payments, undefined, () => {
    REACT_QUERY_CLIENT.invalidateQueries({ queryKey: [API_URLS.profile, getAuthId()] })
  })
}

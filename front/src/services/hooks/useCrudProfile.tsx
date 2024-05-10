import { getAuthId } from 'src/helpers/auth'
import { useCrud } from 'src/hooks/useCrud'
import { API_URLS } from 'src/services/apis'

export const useCrudProfile = () => {
  return useCrud(API_URLS.profile, getAuthId())
}

import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { API_KEY_MAP } from 'src/configs/service'
import { isArray } from 'src/helpers/common'
import { errorHandler } from 'src/helpers/errorHandler'
import { TypeApis, TypeModel, TypeUseCrud } from 'src/interfaces'

export const useCrud: TypeUseCrud = (MODEL_SLUG, modelId = 0) => {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const { listApi, showApi, createApi, updateApi, deleteApi } = API_KEY_MAP[MODEL_SLUG] as TypeApis

  const { data: listApiData, isFetching } = useQuery({
    queryKey: [MODEL_SLUG],
    queryFn: async () => {
      try {
        if (!listApi) return []

        const response = await listApi()
        const list = response.data

        return isArray(list) ? list : []
      } catch (error: any) {
        errorHandler(error, 'listApi useCrud: ' + MODEL_SLUG)
      }
    },
    placeholderData: [],
  })

  const list = useMemo(() => {
    return listApiData || []
  }, [listApiData])

  const { data: single } = useQuery({
    queryKey: [MODEL_SLUG, modelId],
    queryFn: async () => {
      try {
        if (!showApi || !modelId) return undefined

        const response = await showApi(modelId)
        const single = response.data

        return single
      } catch (error: any) {
        errorHandler(error, 'showApi useCrud: ' + MODEL_SLUG)
      }
    },
    placeholderData: {},
  })

  const createMutation = useMutation({
    mutationFn: createApi,
    onSuccess: response => {
      const createdModel = response.data
      queryClient.setQueryData([MODEL_SLUG], (list: TypeModel[]) => {
        if (list) {
          return [...list, createdModel]
        }

        return [createdModel]
      })

      toast.success(t(MODEL_SLUG + ' created successfully'))
    },
  })

  const updateMutation = useMutation({
    mutationFn: updateApi,
    onMutate: updatingItem => {
      queryClient.setQueryData([MODEL_SLUG], (list: TypeModel[]) =>
        list.map(item =>
          item.id !== updatingItem.id
            ? item
            : {
                ...item,
                ...updatingItem,
              },
        ),
      )
    },
    onSuccess: () => {
      toast.success(t(MODEL_SLUG + ' updated successfully'))
    },
  })

  const deleteMutation = useMutation({
    mutationFn: deleteApi,
    onSuccess: (_, id) => {
      toast.success(t(MODEL_SLUG + ' deleted successfully'))
      queryClient.setQueryData([MODEL_SLUG], (list: TypeModel[]) => {
        if (list) {
          return list.filter(item => item.id !== id)
        }

        return []
      })
    },
  })

  return {
    list,
    single,
    isFetching,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}

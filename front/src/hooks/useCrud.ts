import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { API_KEY_MAP } from 'src/configs/service'
import { TypeApis, TypeModel, TypeUseCrud } from 'src/interfaces'
import { errorHandler } from 'src/helpers/errorHandler'

export const useCrud: TypeUseCrud = (MODEL_SLUG, modelId = 0) => {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const { listApi, showApi, createApi, updateApi, deleteApi } = API_KEY_MAP[MODEL_SLUG] as TypeApis

  const {
    data: listApiData,
    error: listApiError,
    isFetching,
  } = useQuery({
    queryKey: [MODEL_SLUG],
    queryFn: async () => {
      const response = await listApi()

      return response.data
    },
    placeholderData: [],
  })

  const list = useMemo(() => {
    return listApiData || []
  }, [listApiData])

  const { data: single, error: showApiError } = useQuery({
    queryKey: [MODEL_SLUG, modelId],
    queryFn: async () => {
      console.log('1 modelId', modelId)
      if (!modelId) return {}

      const response = await showApi(modelId)
      console.log('1 response', response)
      return response.data
    },
    placeholderData: {},
  })

  useEffect(() => {
    if (listApiError) {
      errorHandler(listApiError as Error)
    }
    if (showApiError) {
      errorHandler(showApiError as Error)
    }
  }, [listApiError, showApiError])

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

  useQuery({ queryKey: ['oldUpdatedItem'], queryFn: () => null })

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

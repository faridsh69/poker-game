import { useEffect, useMemo } from 'react'
import { toast } from 'react-toastify'
import { useTranslation } from 'react-i18next'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

import { API_KEY_MAP } from 'src/configs/service'
import { TypeApis, TypeModel, TypeUseCrud } from 'src/interfaces'
import { errorHandler } from 'src/helpers/errorHandler'

export const useCrud: TypeUseCrud = MODEL_SLUG => {
  const queryClient = useQueryClient()

  const { t } = useTranslation()

  const { listApi, createApi, updateApi, deleteApi } = API_KEY_MAP[MODEL_SLUG] as TypeApis

  const { data, error, isFetching } = useQuery({
    queryKey: [MODEL_SLUG],
    queryFn: async () => {
      const response = await listApi()

      return response.data
    },
    placeholderData: [],
  })

  useEffect(() => {
    if (!error) return

    errorHandler(error as Error)
  }, [error])

  const createMutation = useMutation({
    mutationFn: createApi,
    onSuccess: response => {
      queryClient.setQueryData([MODEL_SLUG], (list: TypeModel[]) => {
        if (list) {
          return [...list, response]
        }

        return [response]
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

  const list = useMemo(() => {
    return data || []
  }, [data])

  return {
    list,
    isFetching,
    createMutation,
    updateMutation,
    deleteMutation,
  }
}

import { api } from '@/api/api'
import { UpdateDemandFormData } from '@/app/demands/EditDemandModal'
import { IDemand } from '@/app/demands/page'
import { queryClient } from '@/lib/react-query'
import { useMutation } from '@tanstack/react-query'

export function useUpdateDemandMutation() {
  const useUpdateDemand = async (params: UpdateDemandFormData) => {
    const { data } = await api.put<IDemand>('/demands', {
      ...params,
    })

    return data
  }

  return useMutation({
    mutationFn: useUpdateDemand,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ['getDemands'] }),
  })
}

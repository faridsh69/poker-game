export type TypeModel = { id: number }

export type TypeUseCrud = (key: string) => {
  list: TypeModel[]

  createMutation: {
    mutate: (data: unknown) => void
  }

  updateMutation: {
    mutate: (data: unknown) => void
  }

  deleteMutation: {
    mutate: (data: unknown) => void
  }
}

import { MODEL_FORMS } from 'src/configs/forms'
import { MODEL_SCHEMAS } from 'src/configs/schemas'
import { TypeFormInput, TypeModelFormKeys, TypeSchema } from 'src/interfaces'

export const getFormInputs = (modelName: TypeModelFormKeys): TypeFormInput[] =>
  MODEL_FORMS[modelName]

export const getFormSchema = (modelName: TypeModelFormKeys): TypeSchema => MODEL_SCHEMAS[modelName]

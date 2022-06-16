export const yupLocale = {
  mixed: {
    default: {
      key: 'validations:invalid'
    },
    required: {
      key: 'validations:required'
    },
    notType: ({ type }: any) => ({
      key: 'validations:invalidType',
      values: { type }
    }),
    oneOf: ({ label, values }: any) => ({
      key: 'validations:oneOf',
      values: { label, values }
    })
  },
  string: {
    email: {
      key: 'validations:email'
    },
    min: ({ min }: any) => ({
      key: 'validations:stringMin',
      values: { min }
    }),
    max: ({ max }: any) => ({
      key: 'validations:stringMax',
      values: { max }
    })
  },
  number: {},
  boolean: {}
};

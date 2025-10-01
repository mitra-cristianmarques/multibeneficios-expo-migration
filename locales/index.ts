import ptLabels from './pt/labels.json'
import ptMessages from './pt/messages.json'

export const localesResources: any = {
  pt: {
    labels: ptLabels,
    messages: ptMessages,
    buttons: {},
    common: {},
    errors: {},
  },
}

export const LocalResourcesBackend = {
  type: 'backend' as const,
  init: () => {},
  read: (
    language: string,
    namespace: string,
    callback: (err: any, data: any) => void,
  ) => {
    if (localesResources[language] && localesResources[language][namespace]) {
      callback(null, localesResources[language][namespace])
    } else {
      callback(null, {})
    }
  },
  create: () => {},
}
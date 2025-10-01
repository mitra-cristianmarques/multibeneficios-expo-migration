import ptLabels from './pt/labels.json'

export const localesResources: any = {
  pt: {
    labels: ptLabels,
    // You can import and add other namespaces here as you create them
    // e.g., buttons: ptButtons
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

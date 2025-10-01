import { Tabs } from 'expo-router'
import { useTranslation } from 'react-i18next'

export default function HomeLayout() {
  const { t } = useTranslation(['labels'])
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: t('Navigation.Tabs.home'),
        }}
      />
      <Tabs.Screen
        name="benefits"
        options={{
          title: t('Navigation.Tabs.benefits'),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: t('Navigation.Tabs.cards'),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: t('Navigation.Tabs.options'),
        }}
      />
    </Tabs>
  )
}

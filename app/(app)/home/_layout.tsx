import {
  faCog,
  faCreditCard,
  faGift,
  faHouse,
} from '@fortawesome/pro-light-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
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
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHouse} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="benefits"
        options={{
          title: t('Navigation.Tabs.benefits'),
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faGift} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="cards"
        options={{
          title: t('Navigation.Tabs.cards'),
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCreditCard} size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="options"
        options={{
          title: t('Navigation.Tabs.options'),
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faCog} size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  )
}

import { useTranslation } from "react-i18next";
import { Text, View } from "react-native";

export default function Index() {
  const {t} = useTranslation(['labels'])
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Edit app/index.tsx to edit this screen.</Text>
      <Text>{t('Common.test')}</Text>
    </View>
  );
}

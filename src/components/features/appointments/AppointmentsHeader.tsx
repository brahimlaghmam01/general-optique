import { Text, View } from 'react-native';

/** Plain screen title for Rendez-vous — replaces the old gradient hero banner. */
export function AppointmentsHeader() {
  return (
    <View className="gap-1">
      <Text className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider">
        Atelier &amp; Optométrie
      </Text>
      <Text
        className="text-text-primary text-3xl"
        style={{ fontFamily: 'InstrumentSerif_400Regular' }}
      >
        Mes rendez-vous
      </Text>
    </View>
  );
}

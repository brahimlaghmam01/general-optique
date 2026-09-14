import { Text, View } from 'react-native';

import type { Prescription } from '@/types/prescription';

export interface PrescriptionTableProps {
  prescription: Prescription;
}

const MONO_FONT = { fontFamily: 'JetBrainsMono_400Regular' };

/** Clinical OD/OG refraction table — monospace values on a soft clinical background. */
export function PrescriptionTable({ prescription }: PrescriptionTableProps) {
  return (
    <View className="gap-3 rounded-xl bg-background-primary p-4">
      <View className="flex-row">
        <HeaderCell label="Œil" flex={1.2} />
        <HeaderCell label="Sphère" />
        <HeaderCell label="Cylindre" />
        <HeaderCell label="Axe" />
      </View>

      {prescription.eyes.map((eye) => (
        <View key={eye.eyeLabel} className="flex-row items-center">
          <Text className="text-text-primary text-xs font-semibold" style={{ flex: 1.2 }}>
            {eye.eyeLabel}
          </Text>
          <DataCell value={eye.sphere} />
          <DataCell value={eye.cylinder} />
          <DataCell value={eye.axis} />
        </View>
      ))}

      <View className="flex-row flex-wrap items-center gap-x-4 gap-y-1 border-t border-border-light pt-3">
        <Text className="text-text-secondary text-xs">
          ADD <Text style={MONO_FONT}>{prescription.addition}</Text>
        </Text>
        <Text className="text-text-secondary text-xs">
          ÉP <Text style={MONO_FONT}>{prescription.pupillaryDistance}</Text>
        </Text>
        <Text className="text-text-secondary text-xs">{prescription.lensType}</Text>
      </View>
    </View>
  );
}

function HeaderCell({ label, flex = 1 }: { label: string; flex?: number }) {
  return (
    <Text
      className="text-text-tertiary text-[10px] font-semibold uppercase tracking-wider"
      style={{ flex }}
    >
      {label}
    </Text>
  );
}

function DataCell({ value }: { value: string }) {
  return (
    <Text className="text-text-primary flex-1 text-sm" style={MONO_FONT}>
      {value}
    </Text>
  );
}

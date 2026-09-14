import { Text, View } from 'react-native';

export interface BookingProgressProps {
  /** 0-indexed current step. */
  currentStep: number;
  labels: string[];
}

function formatStepNumber(index: number): string {
  return String(index + 1).padStart(2, '0');
}

/** Minimal "01 Motif — 02 Magasin — ..." progress row — deliberately not a giant stepper header. */
export function BookingProgress({ currentStep, labels }: BookingProgressProps) {
  return (
    <View
      className="flex-row items-center"
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 1, max: labels.length, now: currentStep + 1 }}
      accessibilityLabel={`Étape ${currentStep + 1} sur ${labels.length} : ${labels[currentStep]}`}
    >
      {labels.map((label, index) => {
        const isActive = index === currentStep;
        const isDone = index < currentStep;

        return (
          <View key={label} className="flex-1 flex-row items-center">
            <Text
              className={
                isActive
                  ? 'text-primary-500 text-[10px] font-semibold uppercase tracking-wider'
                  : isDone
                    ? 'text-text-secondary text-[10px] font-semibold uppercase tracking-wider'
                    : 'text-text-tertiary text-[10px] font-semibold uppercase tracking-wider'
              }
              numberOfLines={1}
            >
              {formatStepNumber(index)} {label}
            </Text>
            {index < labels.length - 1 && (
              <View
                className={isDone ? 'mx-2 h-px flex-1 bg-primary-500' : 'mx-2 h-px flex-1 bg-border-light'}
              />
            )}
          </View>
        );
      })}
    </View>
  );
}

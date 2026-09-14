import { create } from 'zustand';

import { mockNextAppointment, mockStores, mockVisitMotifs } from '@/constants/mockData';
import { resolveSlotDateTime } from '@/lib/utils/bookingDate';
import type { Appointment } from '@/types/appointment';
import type { TimeSlot } from '@/types/booking';

export interface WaitlistEntry {
  storeId: string;
  motifId: string;
  peopleAhead: number;
}

export interface ConfirmBookingInput {
  motifId: string;
  storeId: string;
  slot: TimeSlot;
}

interface AppointmentState {
  appointment: Appointment | null;
  storeId: string;
  waitlist: WaitlistEntry | null;
  cancelAppointment: () => void;
  confirmBooking: (input: ConfirmBookingInput) => void;
  joinWaitlist: (input: { storeId: string; motifId: string; peopleAhead: number }) => void;
  leaveWaitlist: () => void;
}

/**
 * Owns the member's single upcoming appointment (and any waitlist entry) so
 * the main Rendez-vous screen and its detail/booking routes stay in sync —
 * same pattern as authStore, scoped to this session's mock data (no backend).
 */
export const useAppointmentStore = create<AppointmentState>((set) => ({
  appointment: mockNextAppointment,
  storeId: mockStores[0].id,
  waitlist: null,

  cancelAppointment: () => set({ appointment: null, waitlist: null }),

  confirmBooking: ({ motifId, storeId, slot }) =>
    set((state) => {
      const motif = mockVisitMotifs.find((item) => item.id === motifId) ?? mockVisitMotifs[0];
      const store = mockStores.find((item) => item.id === storeId) ?? mockStores[0];
      return {
        appointment: {
          id: state.appointment?.id ?? `apt_${Date.now()}`,
          date: resolveSlotDateTime(slot.dayLabel, slot.time),
          motif: motif.label,
          practitioner: slot.practitioner,
          store: store.fullName,
          status: 'confirmed',
        },
        storeId,
        waitlist: null,
      };
    }),

  joinWaitlist: ({ storeId, motifId, peopleAhead }) => set({ waitlist: { storeId, motifId, peopleAhead } }),
  leaveWaitlist: () => set({ waitlist: null }),
}));

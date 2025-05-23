import { createSlice, createSelector, PayloadAction } from '@reduxjs/toolkit';

type SorterType = 'cheapest' | 'fastest' | 'optimal';

const allTransfers = [0, 1, 2, 3] as const;

type TransferType = (typeof allTransfers)[number];

interface TicketsState {
  selectedSorter: SorterType;
  visibleTickets: number;
  selectedTransfers: TransferType[];
}

const initialState: TicketsState = {
  selectedSorter: 'cheapest',
  visibleTickets: 5,
  selectedTransfers: [...allTransfers],
};

const ticketSlice = createSlice({
  name: 'tickets',
  initialState,
  reducers: {
    setSorter: (state, action: PayloadAction<SorterType>) => {
      state.selectedSorter = action.payload;
    },
    showMoreTickets: (state) => {
      state.visibleTickets += 5;
    },
    toggleTransfer: (state, action: PayloadAction<TransferType | -1>) => {
      const value = action.payload;

      if (value === -1) {
        state.selectedTransfers =
          state.selectedTransfers.length === allTransfers.length
            ? []
            : [...allTransfers];
      } else {
        if (state.selectedTransfers.includes(value)) {
          state.selectedTransfers = state.selectedTransfers.filter(
            (t) => t !== value
          );
        } else {
          state.selectedTransfers.push(value);
        }

        if (state.selectedTransfers.length === allTransfers.length) {
          state.selectedTransfers = [...allTransfers];
        } else if (state.selectedTransfers.length === 0) {
          state.selectedTransfers = [];
        }
      }
    },
  },
});

export const { setSorter, showMoreTickets, toggleTransfer } =
  ticketSlice.actions;

export const selectFilteredTickets = createSelector(
  [(state) => state.tickets.tickets, (state) => state.filter.selectedTransfers],
  (tickets, selectedTransfers) => {
    if (selectedTransfers.length === 0) return [];
    return tickets.filter((ticket: any) =>
      selectedTransfers.some(
        (stops: any) =>
          (ticket.segments[0].stops.length === stops &&
            ticket.segments[1].stops.length <= stops) ||
          (ticket.segments[1].stops.length === stops &&
            ticket.segments[0].stops.length <= stops)
      )
    );
  }
);

export const selectSortedTickets = createSelector(
  [selectFilteredTickets, (state) => state.filter.selectedSorter],
  (filteredTickets, selectedSorter) => {
    return [...filteredTickets].sort((a, b) => {
      const totalDurationA = a.segments[0].duration + a.segments[1].duration;
      const totalDurationB = b.segments[0].duration + b.segments[1].duration;

      if (selectedSorter === 'cheapest') return a.price - b.price;
      if (selectedSorter === 'fastest') return totalDurationA - totalDurationB;
      return totalDurationA + a.price - (totalDurationB + b.price);
    });
  }
);

export default ticketSlice.reducer;

// store.ts
import { create } from "zustand";

// Define types for state & actions
interface TimerState {
	timers: Record<string, number>;
	addTimer: (name: string, duration: number) => void;
	removeTimer: (name: string) => void;
	startTimer: (name: string) => void;
	pauseTimer: (name: string) => void;
	resetTimer: (name: string) => void;
}

// Create store using the curried form of `create`
export const useTimerStore = create<TimerState>()((set) => ({
	timers: {},
	addTimer: (name: string, duration: number) =>
		set((state) => ({ timers: { ...state.timers, [name]: duration } })),
	removeTimer: (name: string) =>
		set((state) => ({
			timers: Object.fromEntries(
				Object.entries(state.timers).filter(([key]) => key !== name),
			),
		})),
	startTimer: (name: string) =>
		set((state) => ({
			timers: { ...state.timers, [name]: state.timers[name] - 1 },
		})),
	pauseTimer: (name: string) =>
		set((state) => ({
			timers: { ...state.timers, [name]: state.timers[name] },
		})),
	resetTimer: (name: string) =>
		set((state) => ({ timers: { ...state.timers, [name]: 0 } })),
}));

import { useCallback, useEffect, useRef, useState } from "react";

type TimerStatus = "started" | "paused" | "stopped";

interface UseTimerOptions {
	interval?: number; // update frequency (default: 1000ms)
	onTimerEnd?: () => void;
}

interface UseTimerReturn {
	timeLeft: number;
	percentage: number; // between 0 and 1
	status: TimerStatus;
	start: () => void;
	pause: () => void;
	reset: () => void;
}

export function useTimer(
	duration: number,
	options?: UseTimerOptions,
): UseTimerReturn {
	const interval = options?.interval ?? 1000;
	const onTimerEnd = options?.onTimerEnd;

	const [timeLeft, setTimeLeft] = useState(duration);
	const [status, setStatus] = useState<TimerStatus>("stopped");

	const timerRef = useRef<NodeJS.Timeout | null>(null);
	const startRef = useRef<number | null>(null);
	const elapsedRef = useRef<number>(0);

	const clearTimer = useCallback(() => {
		if (timerRef.current) {
			clearInterval(timerRef.current);
			timerRef.current = null;
		}
		elapsedRef.current = 0;
		startRef.current = null;
		setTimeLeft(duration);
		setStatus("stopped");
	}, [duration]);

	const update = useCallback(() => {
		if (startRef.current === null) return;
		const now = Date.now();
		const totalElapsed = elapsedRef.current + (now - startRef.current);
		const remaining = Math.max(duration - totalElapsed, 1000);
		setTimeLeft(remaining);
		if (remaining === 1000) {
			clearTimer();
			setStatus("stopped");
			onTimerEnd?.();
		}
	}, [duration, clearTimer, onTimerEnd]);

	const start = () => {
		if (status === "started") return;
		startRef.current = Date.now();
		timerRef.current = setInterval(update, interval);
		setStatus("started");
	};

	const pause = () => {
		if (status !== "started") return;
		const now = Date.now();
		if (startRef.current) {
			elapsedRef.current += now - startRef.current;
		}

		if (timerRef.current) {
			clearInterval(timerRef.current);
		}
		startRef.current = null;
		setStatus("paused");
	};

	const reset = () => {
		clearTimer();
	};

	useEffect(() => {
		return clearTimer;
	}, [clearTimer]);

	const resolvedTimeLeft = status === "stopped" ? duration : timeLeft;

	return {
		timeLeft: resolvedTimeLeft,
		percentage: resolvedTimeLeft / duration,
		status,
		start,
		pause,
		reset,
	};
}

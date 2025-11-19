import * as React from "react";

export type RsvpCountdownResult = {
  deadlineDate: Date | null;
  isExpired: boolean;
  countdown: string | null;
};

export function useRsvpCountdown(
  rsvpDeadline?: string | null
): RsvpCountdownResult {
  const [now, setNow] = React.useState<Date>(() => new Date());

  const deadlineDate = React.useMemo(
    () => (rsvpDeadline ? new Date(rsvpDeadline) : null),
    [rsvpDeadline]
  );

  React.useEffect(() => {
    if (!deadlineDate) return;
    const id = setInterval(() => {
      setNow(new Date());
    }, 60_000); // aktualizacja co minutę
    return () => clearInterval(id);
  }, [deadlineDate?.getTime()]);

  if (!deadlineDate) {
    return { deadlineDate: null, isExpired: false, countdown: null };
  }

  const diffMs = deadlineDate.getTime() - now.getTime();
  const isExpired = diffMs <= 0;

  if (isExpired) {
    return { deadlineDate, isExpired: true, countdown: null };
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(`${days} d`);
  if (hours > 0 || days > 0) parts.push(`${hours} h`);
  parts.push(`${minutes} min`);

  return {
    deadlineDate,
    isExpired: false,
    countdown: parts.join(" "),
  };
}

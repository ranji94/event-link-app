import * as React from "react";

export function useRsvpCountdown(rsvpDeadline?: string | null) {
  const [now, setNow] = React.useState<Date>(() => new Date());

  const deadlineDate = React.useMemo(
    () => (rsvpDeadline ? new Date(rsvpDeadline) : null),
    [rsvpDeadline]
  );

  React.useEffect(() => {
    if (!deadlineDate) return;
    const id = setInterval(() => {
      setNow(new Date());
    }, 60_000); // minuta po minucie
    return () => clearInterval(id);
  }, [deadlineDate]);

  if (!deadlineDate) {
    return {
      deadlineDate: null as Date | null,
      isExpired: false,
      countdown: null as null,
    };
  }

  const diffMs = deadlineDate.getTime() - now.getTime();
  const isExpired = diffMs <= 0;

  if (isExpired) {
    return { deadlineDate, isExpired: true, countdown: null as null };
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  const parts: string[] = [];
  if (days > 0) parts.push(String(days).padStart(2, "0"));
  parts.push(String(hours).padStart(2, "0"));
  parts.push(String(minutes).padStart(2, "0"));

  return {
    deadlineDate,
    isExpired: false,
    countdown: parts.join(":"), // np. "02:05:13" (dni:godziny:minuty lub godziny:minuty)
  };
}

export const formatDate = (dateString: string) => {
  const date = new Date(dateString);

  const dateFormatted = date.toLocaleDateString("en-CA", {
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });

  const timeFormatted = date.toLocaleTimeString("en-CA", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${dateFormatted} at ${timeFormatted}`;
};

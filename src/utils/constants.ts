export const BACKEND_URL = "http://localhost:3000";

export const formatDate = (dateString: string) => {
  if (!dateString) return "Unknown date";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) {
    return "Invalid date";
  }

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  const time = date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return `${day}.${month}.${year} at ${time}`;
};

import { formatDistanceToNow, parseISO } from 'date-fns/esm';

export const TimeAgo = ({ timestamp }) => {
  let timeAgo = '';

  if (timestamp) {
    const date = parseISO(timestamp);
    const timePeriod = formatDistanceToNow(date);
    timeAgo = `${timePeriod} ago`;
  }

  return (
    <span className="text-sm text-gray-500 text-opacity-75">
      <i>{timeAgo}</i>
    </span>
  );
};

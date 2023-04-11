export const getTimeAgo = (dateString: any) => {
  const date: any = new Date(dateString);
  const currentDate: any = new Date();
  const diffInSeconds = Math.round((currentDate - date) / 1000);

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`;
  } else if (diffInSeconds < 3600) {
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    return `${diffInMinutes} ${diffInMinutes === 1 ? 'minute' : 'minutes'} ago`;
  } else if (diffInSeconds < 86400) {
    const diffInHours = Math.floor(diffInSeconds / 3600);
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`;
  } else {
    const diffInDays = Math.floor(diffInSeconds / 86400);
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`;
  }
};

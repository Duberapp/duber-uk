const StatusBadge = ({ status, time }) => {
  switch (status) {
    case "Available":
      return (
        <button className="tracking-page-badge bg-red-100 text-red-500">
          ETA: TBH
        </button>
      );

    case "Live":
      return (
        <button className="tracking-page-badge bg-green-100 text-green-500">
          ETA: {time}
        </button>
      );

    case "Completed":
      return (
        <button className="tracking-page-badge bg-blue-100 text-blue-500">
          Completed
        </button>
      );

    default:
      return "";
  }
};

export default StatusBadge;

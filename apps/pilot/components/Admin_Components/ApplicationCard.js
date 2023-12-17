import { ApplicationCard as SharedApplicationCard } from "ui";
import { declinePilot, acceptPilot } from "../../config/supabaseFunctions";

const ApplicationCard = ({ item }) => {
  const { approved, created_at, declined, firstName, lastName, id } = item;

  const originalDate = new Date(created_at);
  const formattedDate = `${originalDate.getDate()}/${
    originalDate.getMonth() + 1
  }/${originalDate.getFullYear()}`;

  const handleAccept = async () => {
    const { message } = await acceptPilot(item.email, item.firstName);
    console.log(message);
  };

  return (
    <SharedApplicationCard
      pilotID={id}
      createdAt={formattedDate}
      isApproved={approved}
      isDeclined={declined}
      pilotName={`${firstName} ${lastName}`}
      test__handleView={handleAccept}
    />
  );
};

export default ApplicationCard;

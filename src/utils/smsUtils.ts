import axios from "axios";
import dayjs from "dayjs";
import jalaliday from "jalaliday";

dayjs.extend(jalaliday);

export const sendSmsToInvitedPeople = async (
  phone: string,
  fullName: string,
  sessionTitle: string,
  startedDate: string,
  endDate: string
) => {
  const persianDate = dayjs(startedDate)
    .calendar("jalali")
    .locale("fa")
    .format("YYYY/MM/DD");

  const startedHour = dayjs(startedDate)
    .calendar("jalali")
    .locale("fa")
    .format("HH:mm");

  const endHour = dayjs(endDate)
    .calendar("jalali")
    .locale("fa")
    .format("HH:mm");

  console.log(persianDate, startedHour, endHour);

  try {
    axios.get("https://api.sms-webservice.com/api/V3/Send", {
      params: {
        apikey: process.env.SMS_SECRET,
        text: `${fullName} عزیز شما به جلسه ${sessionTitle} در تاریخ ${persianDate} و ساعت ${startedHour} - ${endHour} دعوت شده اید`,
        sender: process.env.SMS_SENDER_PHONENUMBER,
        Recipients: phone,
      },
    });
  } catch (error) {
    console.log(error);
    return error;
  }
};

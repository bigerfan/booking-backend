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

  // console.log(persianDate, startedHour, endHour);
  const LRM = "\u200E";
  const RLM = "\u200F"; // Right-to-Left Mark

  const text = `سلام ${fullName} عزیز شما به جلسه ${sessionTitle} در تاریخ ${persianDate} و ساعت ${startedHour} - ${endHour} دعوت شده اید `;

  // const text = `${fullName} عزیز شما به جلسه ${sessionTitle} در تاریخ \u202A${persianDate}\u202C و ساعت \u202A${startedHour} - ${endHour}\u202C دعوت شده اید`;
  // console.log(text);

  // console.log("text :", text);
  try {
    // axios.get("https://api.sms-webservice.com/api/V3/Send", {
    //   params: {
    //     apikey: process.env.SMS_SECRET,
    //     text,
    //     sender: process.env.SMS_SENDER_PHONENUMBER,
    //     Recipients: phone,
    //   },
    // });
    console.log(text);
  } catch (error) {
    console.log(error);
    return error;
  }

  return text;
};

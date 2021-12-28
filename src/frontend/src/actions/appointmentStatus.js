import axios from "axios";

function getAppointmentStatuses() {
  return axios({
    method: "GET",
    url: "/api/appointmentStatus",
  });
}

export { getAppointmentStatuses };

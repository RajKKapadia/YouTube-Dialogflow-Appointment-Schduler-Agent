import { Request } from "express";
import { extractSessionVars } from "../utils/utils";
import { createEvent, EventDetailsTypes } from "../utils/calenderServices";

const handleScheduleAppointment = async (req: Request) => {
    try {
        const sessionVars = extractSessionVars(req.body);
        console.log(sessionVars);
        const eventDetails: EventDetailsTypes = {
            summary: `New appointment for ${sessionVars?.person.name}`,
            description: `${sessionVars?.email}, ${sessionVars?.note}`,
            startTime: sessionVars?.date_time?.date_time
        }
        const eventData = await createEvent(eventDetails)
        console.log(eventData);
    } catch (error) {
        console.error('Error in create-event route:', error);
    }
};

export default handleScheduleAppointment;

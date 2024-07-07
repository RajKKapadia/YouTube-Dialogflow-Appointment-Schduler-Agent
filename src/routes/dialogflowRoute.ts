import { Router, Request, Response } from "express";
import { generateResponseObject, ResponseObject } from "../utils/utils";
import handleScheduleAppointment from "../controllers/scheduleAppointment";

const router = Router()

router.post('/webhook', async (req: Request, res: Response) => {
    console.log(JSON.stringify(req.body, null, 2));
    const action = req.body.queryResult.action as string;
    let responseData: ResponseObject = {
        fulfillmentMessages: []
    };
    if (action === 'scheduleAppointment') {
        await handleScheduleAppointment(req);
        responseData.fulfillmentMessages = req.body.queryResult.fulfillmentMessages;
    } else {
        responseData = generateResponseObject([`No handler for the action ${action}.`]);
    }
    res.send(responseData);
});

export default router;

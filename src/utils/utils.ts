type FulfillmentMessage = {
    text: {
        text: string[];
    };
};

type OutputContext = {
    name: string;
    lifespanCount?: number;
    parameters: Record<string, any>;
};

export type ResponseObject = {
    fulfillmentMessages: FulfillmentMessage[];
    outputContexts?: OutputContext[];
};

type ContextTypes = {
    name: string;
    lifespanCount?: number;
    parameters?: { [key: string]: any };
};

type QueryResultTypes = {
    queryText: string;
    action: string;
    parameters: { [key: string]: any };
    allRequiredParamsPresent: boolean;
    fulfillmentMessages: any[];
    outputContexts: ContextTypes[];
    intent: {
        name: string;
        displayName: string;
    };
    intentDetectionConfidence: number;
    languageCode: string;
};

type DialogflowRequestTypes = {
    responseId: string;
    queryResult: QueryResultTypes;
    originalDetectIntentRequest: { source: string; payload: any };
    session: string;
};

export const generateResponseObject = (
    messages: string[],
    outputContexts: OutputContext[] = []
): ResponseObject => {
    const fulfillmentMessages: FulfillmentMessage[] = messages.map(message => ({
        text: {
            text: [message]
        }
    }));
    const response: ResponseObject = {
        fulfillmentMessages
    };
    if (outputContexts.length > 0) {
        response.outputContexts = outputContexts;
    }
    return response;
};

export const extractSessionVars = (response: DialogflowRequestTypes): { [key: string]: any } | undefined => {
    const sessionVarsContext = response.queryResult.outputContexts.find(
        (context) => context.name.endsWith('/contexts/session-vars')
    );
    return sessionVarsContext?.parameters;
};

import ballerina/http;
import sasindu/password_analyzer.regex_handler as regexHandler;

type Password record {
    string password;
};

@http:ServiceConfig {
    cors: {
        allowOrigins: ["http://localhost:3000"]
    }
}
service / on new http:Listener(9090) {
    resource function post checkPasswordLength(Password req) returns http:Response {
        http:Response response = new;
        response.setPayload({body: regexHandler:checkPasswordLength(req.password)});
        return response;
    }

    resource function post checkAtLeastOneCapitalLetter(Password req) returns http:Response {
        http:Response response = new;
        response.setPayload({body: regexHandler:checkAtLeastOneCapitalLetter(req.password)});
        return response;
    }

    resource function post checkAtLeastFourSimpleLetters(Password req) returns http:Response {
        http:Response response = new;
        response.setPayload({body: regexHandler:checkAtLeastFourSimpleLetters(req.password)});
        return response;
    }

    resource function post checkAtLeastOneNumber(Password req) returns http:Response {
        http:Response response = new;
        response.setPayload({body: regexHandler:checkAtLeastOneNumber(req.password)});
        return response;
    }

    resource function post checkSpecialCharacters(Password req) returns http:Response {
        http:Response response = new;
        response.setPayload({body: regexHandler:checkSpecialCharacters(req.password)});
        return response;
    }

    resource function post checkCommonWords(Password req) returns http:Response {
        http:Response response = new;
        response.setPayload({body: regexHandler:checkCommonWords(req.password)});
        return response;
    }

    resource function post checkSpaces(Password req) returns http:Response {
        http:Response response = new;
        response.setPayload({body: regexHandler:checkSpaces(req.password)});
        return response;
    }
}

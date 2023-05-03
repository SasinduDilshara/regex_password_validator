import ballerina/lang.regexp;

public isolated function checkPasswordLength(string password) returns boolean {
    return false;
}

public isolated function checkAtLeastOneCapitalLetter(string password) returns boolean {
    return false;
}

public isolated function checkAtLeastFourSimpleLetters(string password) returns boolean {
    return false;
}

public isolated function checkAtLeastOneNumber(string password) returns boolean {
    return false;
}

public isolated function checkSpecialCharacters(string password) returns boolean {
    regexp:RegExp regExp = re `[^@#\^%\\]*`;
    return password.length() != 0 && regExp.isFullMatch(password);
}

public isolated function checkCommonWords(string password) returns boolean {
    regexp:RegExp regExp = re `.*(?i:password|letmein|abcdef|qwerty).*`;
    return password.length() != 0 && !regExp.isFullMatch(password);
}

public isolated function checkSpaces(string password) returns boolean {
    regexp:RegExp regExp = re `(\S)+`;
    return regExp.isFullMatch(password);
}

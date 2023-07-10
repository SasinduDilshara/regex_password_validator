import ballerina/lang.regexp;

public isolated function checkPasswordLength(string password) returns boolean {
    string:RegExp lengthRegex = re `^.{8,16}$`;
    return lengthRegex.isFullMatch(password);
}

public isolated function checkAtLeastOneCapitalLetter(string password) returns boolean {
    return re `^.*[A-Z].*$`.isFullMatch(password);
}

public isolated function checkAtLeastFourSimpleLetters(string password) returns boolean {
    string:RegExp reg = re `([a-z])`;
    regexp:Groups[] simpleLetterGroups = reg.findAllGroups(password);
    return simpleLetterGroups.length() >= 4;
}

public isolated function checkAtLeastOneNumber(string password) returns boolean {
    return re `^.*\p{N}.*$`.isFullMatch(password);
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

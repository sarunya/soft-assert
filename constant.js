module.exports = {
    rootKey: "$",
    softAssertionMethods: ["softAssert", "softContains", "softAssertKey", "softContainsKey", "softTrue", "softAssertKeyAbsence", "softAssertAll"],
    deepAssertionMethods: ["deepAssert", "deepContains", "deepAssertKey", "deepContainstKey", "deeptTrue", "deepAssertKeyAbsence"],
    stackStartsWith: "at Assertion.",
    jsonMsg: "comparison failed for following keys in given json: \n\t",
    arrayMsg: "comparison failed for array data",
    containsAssertionMsg: "Contains assertion ",
    deepAssertionMsg: "Deep assertion ",
    softAsssertionMsg: "Soft assertion "
}
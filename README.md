# soft-assert
Soft Asserts the Json, Array and other data types. It throws an AssertionError when assertion fails in mocha test

## Functions supported : 

```
1.  deepAssert(actual, expected, msg, ignoreKeys)
2.  softAssert(actual, expected, msg, ignoreKeys)
3.  deepContains(actual, expected, msg, ignoreKeys)
4.  softContains(actual, expected, msg, ignoreKeys)
5.  deepAssertKey(actual, expected, key, msg, ignoreKeys)
6.  softAssertKey(actual, expected, key, msg, ignoreKeys)
7.  deepContainstKey(actual, expected, key, msg, ignoreKeys)
8.  softContainsKey(actual, expected, key, msg, ignoreKeys)
9.  deeptTrue(value, msg)
10. softTrue(value, msg)
11. deepAssertKeyAbsence(actual, key, msg)
12. softAssertKeyAbsence(actual, key, msg)
13. softAssertAll()
```

## Example Test for Soft Assert

Using softAssert, softContains, softAssertKey, softTrue, softAssertKeyAbsence asserts the value but does not throws the AssertionError, until softAssertAll is called.

softAssertAll - throws the error of all the previous soft assertion's error if any

[Sample Test Link](https://github.com/sarunya/soft-assert/blob/master/test/assert-json.js)

# Example : 

```
it("softAssert test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 1");
        expected.glossary.GlossDiv.GlossList2 = "something";
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 2", ["GlossList2"]);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso = ["some2"];
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 3");
        jsonAssertion.softAssert(actual, expected, "assertion error for softAssert 4");
        jsonAssertion.softAssertAll();
})
```

# Sample Test Failure Screenshot :

![Alt text](/resource/image/testfailure_screenshot.png "Test Failure")

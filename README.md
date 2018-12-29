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

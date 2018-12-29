const assert = require("chai").assert;
const _ = require("lodash");
const constant = require("./constant");

/**
 * Asserts json, array, array of json and other primitive types
 * Provides both full deep assertion and contains deep assertion
 * Ability to support Soft Assertion is also added
 * 
 * @class Assertion
 * @author sarunya.d
 */

class AssertionHelper {

    constructor() {
        this.softAssertJson = null;
        this.softAssertCount = 0;
    }

    //check if given json is an array
    _isJSON(x) {
        try {
            return (_.isObjectLike(x) && JSON.parse(JSON.stringify(x)) && !_.isArray(x));
        } catch (e) {
            return false;
        }
    }

    _removeFromArray(array, index) {
        array.splice(index, 1);
    }

    _isIgnoreKey(key) {
        const me = this;
        return _.indexOf(me.ignoreKeys, key) >= 0
    }

    //Asserts if actualArr deeply equals expectedArr
    _assertArray(actualArr, expectedArr, key) {
        const me = this;
        if (me._isIgnoreKey(key)) {
            return true;
        }
        //prevents deletion from actual data array
        actualArr = _.cloneDeep(actualArr);
        expectedArr = _.cloneDeep(expectedArr);

        let expectedMatchingIndexes = [];
        if (expectedArr.length > 0 && me._isJSON(expectedArr[0])) {
            let actualLen = actualArr.length;
            let expectLen = expectedArr.length;
            //loops for each data and checks with expected data is present in actual data array
            for (let i = 0; i < expectLen; i++) {
                for (let j = 0; j < actualLen; j++) {
                    try {
                        if (me._assert(actualArr[j], expectedArr[i], key + "." + j, true)) {
                            me._removeFromArray(actualArr, j);
                            expectedMatchingIndexes.push(i);
                            --actualLen;
                            break;
                        }
                    } catch (error) {
                        continue;
                    }
                }
            }
        }
        //remove matching data from expectedArr, to filter the data not present in actualArr
        expectedMatchingIndexes = _.reverse(_.sortBy(expectedMatchingIndexes));
        _.each(expectedMatchingIndexes, (index) => {
            me._removeFromArray(expectedArr, index);
        })
        if (!me.jsonContains) {
            //Full JSON Assertion
            me._chaiSameDeepMembers(actualArr, expectedArr, key);
        } else if (expectedArr.length > 0) {
            //Contains assertion
            me._chaiIncludeDeepMembers(actualArr, expectedArr, key);
        }
    }

    //Deep asserts actual with expected. ignoreDiff true is passed, to ignore assertion for given keys
    _assert(actual, expected, key, ignoreDiff = false) {
        const me = this;
        key = key || constant.rootKey;

        if (me._isIgnoreKey(key)) {
            return true;
        }

        let actualKeys = _.keys(actual);
        let expectedKeys = _.keys(expected);
        let missingKeysInActual = _.clone(actualKeys);

        let actualIgnoreKeys = _.intersection(me.ignoreKeys, actualKeys);
        let expectedIgnoreKeys = _.intersection(me.ignoreKeys, expectedKeys);

        //Delete ignored common keys from actual data
        _.each(actualIgnoreKeys, function (actIgnoreKey) {
            delete actual[actIgnoreKey];
        })

        //Delete ignored common keys from expected data
        _.each(expectedIgnoreKeys, function (expIgnoreKey) {
            delete expected[expIgnoreKey];
        })

        if (_.isArray(expected)) {
            return me._assertArray(actual, expected, key);
        } else if (me._isJSON(expected)) {
            //If the data is JSON, iterate for each key present in expected data and assert recursively
            _.each(expectedKeys, (expectKey) => {
                if (typeof actual[expectKey] == typeof expected[expectKey]) {
                    if (me._isJSON(actual[expectKey])) {
                        return me._assert(actual[expectKey], expected[expectKey], key + "." + expectKey)
                    } else if (_.isArray(actual[expectKey])) {
                        me._assertArray(actual[expectKey], expected[expectKey], key + "." + expectKey);
                    } else {
                        me._chaiDeepEqual(actual[expectKey], expected[expectKey], key + "." + expectKey, ignoreDiff);
                    }
                } else {
                    me._chaiDeepEqual(actual[expectKey], expected[expectKey], key + "." + expectKey, ignoreDiff);
                }
                //remove the key from array to get the list disjoint keys in actual and expected data
                me._removeFromArray(missingKeysInActual, missingKeysInActual.indexOf(expectKey));
            })
            //Assert the missing keys in actual keys only for Full JSON Assertion
            if (!me.jsonContains) {
                _.each(missingKeysInActual, function (missingKey) {
                    me._chaiDeepEqual(actual[missingKey], expected[missingKey], key + "." + missingKey, ignoreDiff);
                })
            }
        } else {
            me._chaiDeepEqual(actual, expected, key);
        }
        return true;
    }

    _constructJsonFromKeyValue(json, fullKey, value) {
        if(!_.isUndefined(value)) {
            json = _.set(json, fullKey, value);
        }
    }

    _constructJsonDiffAssertionError(msg) {
        const me = this;
        let compiledError = null;
        let firstMsg = "";
        let index = 1;
        let errorMsg = "";

        if (me.jsonDiffArray && me.jsonDiffArray.length > 0) {
            _.forEach(me.jsonDiffArray, function (jsonDiff) {
                let error = _.cloneDeep(jsonDiff.error);
                if (!compiledError) {
                    compiledError = jsonDiff.error;
                    firstMsg = compiledError.message;
                    compiledError.actual = {"$":{}};
                    compiledError.expected = {"$":{}};
                    compiledError.message = "";
                    errorMsg = "\n";
                }
                me._constructJsonFromKeyValue(compiledError.actual, jsonDiff.key, error.actual);
                me._constructJsonFromKeyValue(compiledError.expected, jsonDiff.key, error.expected);
                if (index < 5) {
                    errorMsg +=`\t${index} : key -> ${jsonDiff.key} \t\t message: ${error.message}\n`;
                } else if (index == 5) {
                    errorMsg += "..." + "\n";
                }
                ++index;
            })
            let message = "";
            compiledError.actual = compiledError.actual[constant.rootKey];
            compiledError.expected = compiledError.expected[constant.rootKey];
            if (me._isJSON(compiledError.actual)) {
                message = me._constructAssertionMessage(true) + _.sortBy(_.keys(compiledError.actual)).join("\n\t");
            } else if (_.isArray(compiledError.actual)) {
                message = me._constructAssertionMessage(false);
            }
            msg = (_.isEmpty(msg))?"":`\n\n\tCustom Message : ${msg}\n`;
            compiledError.message = message + msg + errorMsg;
            compiledError.stack = me._splitStackTrace(compiledError.stack, constant.deepAssertionMethods);
            return compiledError;
        }
    }

    _constructAssertionMessage(isJSON) {
        const me = this;
        let message = "\n"+(me.jsonContains) ? constant.containsAssertionMsg : constant.deepAssertionMsg;
        if (isJSON) {
            return message + constant.jsonMsg;
        }
        return message + constant.arrayMsg;
    }

    /**
     * Throw the error after concatenating the differences (incase of json)
     * If error is undefined, assertion has passed.
     * Therefore, error should not be passed, which will stop the assertion at that point
     */
    _throwJsonDiffAssertionError(msg) {
        const me = this;
        let error = me._constructJsonDiffAssertionError(msg);
        if (error) {
            throw error;
        }
    }

    _constructSoftAssertJson(msg) {
        const me = this;
        let error = me._constructJsonDiffAssertionError(msg);
        if (!error) {
            ++me.softAssertCount;
            return;
        }
        let stack = _.cloneDeep(error.stack);
        if (!me.softAssertJson) {
            me.softAssertJson = _.cloneDeep(error);
            me.softAssertJson.message = "";
            me.softAssertJson.actual = {};
            me.softAssertJson.expected = {};
            me.softAssertJson.stackMessage = "";
        }
        stack = me._splitStackTrace(stack, constant.softAssertionMethods)
        me.softAssertJson.message += `\n\n${constant.softAsssertionMsg} ` + (++me.softAssertCount) + ":" + "\n"+error.message + "Stack: " + stack;
        me.softAssertJson.actual[constant.softAsssertionMsg + me.softAssertCount] = error.actual;
        me.softAssertJson.expected[constant.softAsssertionMsg + me.softAssertCount] = error.expected;
    }

    _splitStackTrace(stack, assertionArray) {
        let stackArray = stack.split(constant.stackStartsWith + assertionArray[0]);
        if (stackArray && stackArray.length <= 1) {
            stackArray = stack.split(constant.stackStartsWith + assertionArray[1]);
        } else {
            let stack = stackArray[0].split(constant.stackStartsWith)+_.last(stackArray);
            return stack;
        }
        return _.last(stackArray)
    }

    _softThrowJsonDiffArray() {
        const me = this;
        if (me.softAssertJson) {
            let error = _.cloneDeep(me.softAssertJson);
            me.softAssertJson = null;
            me.softAssertCount = 0;
            throw error;
        }
    }

    _addToJsonDiffArray(actual, expected, key, error) {
        const me = this;
        me.jsonDiffArray.push({
            key: key,
            error: error
        })
    }

    _chaiDeepEqual(actual, expected, key, ignoreDiff = false) {
        const me = this;
        try {
            if(actual && me._isJSON(actual))
                actual = JSON.parse(JSON.stringify(actual));
            if(expected && me._isJSON(expected))
                expected = JSON.parse(JSON.stringify(expected));
            assert.deepEqual(actual, expected);
        } catch (error) {
            if (!ignoreDiff && !me._isIgnoreKey(key)) {
                me._addToJsonDiffArray(actual, expected, key, error);
            }
        }
    }

    _chaiSameDeepMembers(actual, expected, key) {
        const me = this;
        try {
            assert.sameDeepMembers(actual, expected);
        } catch (error) {
            if (!me._isIgnoreKey(key)) {
                me._addToJsonDiffArray(actual, expected, key, error);
            }
        }
    }

    _chaiIncludeDeepMembers(actual, expected, key) {
        const me = this;
        try {
            assert.includeDeepMembers(actual, expected);
        } catch (error) {
            if (!me._isIgnoreKey(key)) {
                me._addToJsonDiffArray(actual, expected, key, error);
            }
        }
    }

    _deleteIgnoredKeys(actual, expected) {
        const me = this;
        let ignoreAllWithName = [];
        _.each(me.ignoreKeys, function (ignoreKey) {
            if (_.startsWith(ignoreKey, `${[constant.rootKey]}.`)) {
                let parentKeys = _.split(ignoreKey);
                let childKey = _.last(parentKeys);
                parentKeys = _.slice(parentKeys, 1, parentKeys.length - 1);
                parentKeys = _.join(parentKeys, ".");
                let actualParent = _.get(actual, parentKeys, null);
                let expectedParent = _.get(expected, parentKeys, null);
                if (actualParent)
                    delete actualParent[childKey];
                if (expectedParent)
                    delete expectedParent[childKey];

            }
        })
    }

    _prepareAndAssert(actual, expected, ignoreKeys, jsonContains = false) {
        const me = this;
        me.jsonDiffArray = [];
        me.jsonContains = jsonContains;
        expected = _.cloneDeep(expected);
        expected = _.cloneDeep(expected);
        me.setIgnoreKeys(ignoreKeys);
        me._deleteIgnoredKeys(actual, expected);
        me._assert(actual, expected, constant.rootKey);
    }
}

module.exports = AssertionHelper;

const _ = require("lodash");
const AssertionHelper = require("./helper/assertion-helper")

/**
 * Asserts json, array, array of json and other primitive types
 * Provides both full deep assertion and contains deep assertion
 * Ability to support Soft Assertion is also added
 * 
 * @class Assertion
 * @author sarunya.d
 */
class Assertion extends AssertionHelper{

    constructor(ignoreKeys) {
        super(ignoreKeys);
        this.setIgnoreKeys(ignoreKeys);
    }

    /**
     * Sets key names to be ignored during assertion
     * 
     * @param {array} ignoreKeys keys to be ignored while asserting
     */
    setIgnoreKeys(ignoreKeys) {
        const me = this;
        me.ignoreKeys = ignoreKeys || [];
        me.ignoreKeys = _.isArray(ignoreKeys) ? ignoreKeys : [ignoreKeys];
    }


    /**
     * Full Deep assertion of objects passed
     * AssertionError is thrown on mismatch, which contains stack trace and mismatch informations
     * 
     * @param {JSON/array/string/integer} actual actual data   
     * @param {JSON/array/string/intege} expected expected data
     * @param {array} ignoreKeys keys to be ignored while asserting
     * @memberof Assertion
     */
    deepAssert(actual, expected, msg, ignoreKeys) {
        const me = this;
        me._prepareAndAssert(actual, expected, ignoreKeys);
        me._throwJsonDiffAssertionError(msg);
    }

    /**
     * Full Deep assertion of objects passed
     * AssertionError is thrown on mismatch, which contains stack trace and mismatch informations
     * 
     * @param {JSON/array/string/integer} actual actual data   
     * @param {JSON/array/string/intege} expected expected data
     * @param {array} ignoreKeys keys to be ignored while asserting
     * @memberof Assertion
     */
    deepAssertType(actual, expected, msg, ignoreKeys) {
        const me = this;
        me._prepareAndAssert(actual, expected, ignoreKeys, false, true);
        me._throwJsonDiffAssertionError(msg);
    }


    /**
     * Asserts json array with unique key checks on both array
     * @param {JSONARRAY} actual 
     * @param {JSONARRAY} expected 
     * @param {Array of String} uniqueKeys 
     * @param {String} msg 
     * @param {Array of String} ignoreKeys 
     */
    deepAssertJsonArray(actual, expected, uniqueKeys, msg, ignoreKeys) {
        const me = this;
        let preparedJsons = me._prepareAssertJsonArrayByKeys(actual, expected, uniqueKeys);
        me._prepareAndAssert(preparedJsons[0], preparedJsons[1], ignoreKeys);
        me._throwJsonDiffAssertionError(msg);
    }

    /**
     * Soft deep asserts the objects passed
     * Assertion error is swallowed and thrown on calling softAssertAll() function
     * 
     * @param {JSON/array/string/integer} actual actual data   
     * @param {JSON/array/string/intege} expected expected data
     * @param {array} ignoreKeys keys to be ignored while asserting 
     * @memberof Assertion
     */
    softAssert(actual, expected, msg, ignoreKeys) {
        const me = this;
        me._prepareAndAssert(actual, expected, ignoreKeys);
        me._constructSoftAssertJson(msg);
    }

    softAssertJsonArray(actual, expected, uniqueKeys, msg, ignoreKeys) {
        const me = this;
        let preparedJsons = me._prepareAssertJsonArrayByKeys(actual, expected, uniqueKeys);
        me._prepareAndAssert(preparedJsons[0], preparedJsons[1], ignoreKeys);
        me._constructSoftAssertJson(msg);
    }

    /**
     * Asserts if the actual data contains the expected data
     * AssertionError is thrown on mismatch, which contains stack trace and mismatch informations
     * 
     * @param {JSON/array/string/integer} actual actual data   
     * @param {JSON/array/string/intege} expected expected data
     * @param {array} ignoreKeys keys to be ignored while asserting 
     * @memberof Assertion
     */
    deepContains(actual, expected, msg, ignoreKeys) {
        const me = this;
        me._prepareAndAssert(actual, expected, ignoreKeys, true);
        me._throwJsonDiffAssertionError(msg);
    }

    deepContainsJsonArray(actual, expected, uniqueKeys, msg, ignoreKeys) {
        const me = this;
        actual = _.cloneDeep(actual);
        expected = _.cloneDeep(expected);
        let preparedJsons = me._prepareAssertJsonArrayByKeys(actual, expected, uniqueKeys);
        me._prepareAndAssert(preparedJsons[0], preparedJsons[1], ignoreKeys, true);
        me._throwJsonDiffAssertionError(msg);
    }

    /**
     * Soft assert if the actual data contains the expected data
     * Assertion error is swallowed and thrown on calling softAssertAll() function
     * 
     * @param {JSON/array/string/integer} actual actual data   
     * @param {JSON/array/string/intege} expected expected data
     * @param {array} ignoreKeys keys to be ignored while asserting 
     * @memberof Assertion
     */
    softContains(actual, expected, msg, ignoreKeys) {
        const me = this;
        me._prepareAndAssert(actual, expected, ignoreKeys, true);
        me._constructSoftAssertJson(msg);
    }


    softContainsJsonArray(actual, expected, uniqueKeys, msg, ignoreKeys) {
        const me = this;
        actual = _.cloneDeep(actual);
        expected = _.cloneDeep(expected);
        let preparedJsons = me._prepareAssertJsonArrayByKeys(actual, expected, uniqueKeys);
        me._prepareAndAssert(preparedJsons[0], preparedJsons[1], ignoreKeys, true);
        me._constructSoftAssertJson(msg);
    }


    /**
     * Full Deep assertion of objects passed in the key provided
     * AssertionError is thrown on mismatch, which contains stack trace and mismatch informations
     * 
     * @param {JSON/array/string/integer} actual actual data   
     * @param {JSON/array/string/intege} expected expected data
     * @param {array} ignoreKeys keys to be ignored while asserting
     * @memberof Assertion
     */
    deepAssertKey(actual, expected, key, msg, ignoreKeys) {
        const me = this;
        actual = _.get(actual, key);
        me.deepAssert(actual, expected, msg, ignoreKeys);
    }
    

    /**
     * Soft deep asserts the objects passed in the key povided
     * Assertion error is swallowed and thrown on calling softAssertAll() function
     * 
     * @param {JSON/array/string/integer} actual actual data   
     * @param {JSON/array/string/intege} expected expected data
     * @param {String} key  key which has to be asserted i.e root.key1.array1
     * @param {array} ignoreKeys keys to be ignored while asserting 
     * @memberof Assertion
     */
    softAssertKey(actual, expected, key, msg, ignoreKeys) {
        const me = this;
        actual = _.get(actual, key);
        me.softAssert(actual, expected, msg, ignoreKeys);
    }


    /**
     * Checks if the key in actual contains the expected data
     * 
     * @param {any} actual actual data
     * @param {any} expected expected data
     * @param {any} key key which has to be asserted ie root.key1.array1
     * @param {any} msg custom user message
     * @param {any} ignoreKeys keys to be ignored during assertion
     * @memberof Assertion
     */
    deepContainstKey(actual, expected, key, msg, ignoreKeys) {
        const me = this;
        actual = _.get(actual, key);
        me.deepContains(actual, expected, msg, ignoreKeys);
    }
    
    /**
     * Soft asserts if the key in actual contains the expected data
     * 
     * @param {any} actual actual data
     * @param {any} expected expected data
     * @param {any} key key which has to be asserted
     * @param {any} msg custom user message
     * @param {any} ignoreKeys keys to be ignored during assertion
     * @memberof Assertion
     */
    softContainsKey(actual, expected, key, msg, ignoreKeys) {
        const me = this;
        actual = _.get(actual, key);
        me.softContains(actual, expected, msg, ignoreKeys);
    }

    /**
     * Deeps asserts the given value for true
     * 
     * @param {any} value true value to be asserted
     * @param {any} msg custom user message
     * @memberof Assertion
     */
    deeptTrue(value, msg) {
        const me = this;
        me.deepAssert(value, true, msg);
    }

    /**
     * Soft asserts the given value for true
     * 
     * @param {any} value true value to be asserted
     * @param {any} msg custom user message
     * @memberof Assertion
     */
    softTrue(value, msg) {
        const me = this;
        me.softAssert(value, true, msg);
    }

    /**
     * Deep checks if the key is not present in actual data
     * 
     * @param {any} actual actual data
     * @param {any} key key, which to asserted for absence
     * @param {any} msg custom user message
     * @memberof Assertion
     */
    deepAssertKeyAbsence(actual, key, msg) {
        const me = this;
        me.deeptTrue(_.get(actual, key, true), msg);
    }

    /**
     * Soft asserts if the key is not present in actual data
     * 
     * @param {any} actual actual data
     * @param {any} key key, which to be asserted for absence
     * @param {any} msg custom user message
     * @memberof Assertion
     */
    softAssertKeyAbsence(actual, key, msg) {
        const me = this;
        me.softTrue(_.get(actual, key, true), msg);
    }

    /**
     * Throws soft assertion for all assertion points in a test
     */
    softAssertAll() {
        const me = this;
        me._softThrowJsonDiffArray();
    }
}

let assertion = new Assertion();
module.exports = assertion;
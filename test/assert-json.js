const Assertion = require("./../index")
const _ = require("lodash");


let arr = [1, 2];


describe("test", function () {
    jsonAssertion = new Assertion();
    before(function () {
        const me = this;
    })

    let json = {
        "glossary": {
            "title": "example glossary",
            "GlossDiv": {
                "title": "S",
                "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
                        "SortAs": "SGML",
                        "GlossTerm": "Standard Generalized Markup Language",
                        "Acronym": "SGML",
                        "Abbrev": "ISO 8879:1986",
                        "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        },
                        "GlossSee": "markup"
                    }
                }
            }
        }
    };
    
    it("deepAssert test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        jsonAssertion.deepAssert(actual, expected, "assertion error for deepAssert1");
        expected.glossary.GlossDiv.GlossList2 = "something";
        jsonAssertion.deepAssert(actual, expected, "assertion error for deepAssert2", ["GlossList2"]);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso = ["some2"];
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepAssert(actual, expected, "assertion error for deepAssert3");
    })

    it("deepContains test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepContains(actual, expected, "assertion error for deepAssert1");
        expected.glossary.GlossDiv.GlossList2 = "something";
        jsonAssertion.deepContains(actual, expected, "assertion error for deepAssert2", ["GlossList2"]);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.deepContains(actual, expected, "assertion error for deepAssert3");
    })
  
    it("deepAssertKey test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.deepAssertKey(actual, expected.glossary.GlossDiv.GlossList, "glossary.GlossDiv.GlossList", "assertion error for deepAssertKey 1", ["GlossSeeAlso"]);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepAssertKey(actual, expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para, "glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para", "assertion error for deepAssertKey 2");
    })

    it("deepContainstKey test", function() {
        let actual = _.cloneDeep(json);
        let expected = _.cloneDeep(json);
        expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.GlossSeeAlso[1] = "some2";
        jsonAssertion.deepContainstKey(actual, expected.glossary.GlossDiv.GlossList, "glossary.GlossDiv.GlossList", "assertion error for deepAssertKey 1", ["GlossSeeAlso"]);
        delete expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para;
        jsonAssertion.deepContainstKey(actual, expected.glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para, "glossary.GlossDiv.GlossList.GlossEntry.GlossDef.para", "assertion error for deepAssertKey 2");
    })
})
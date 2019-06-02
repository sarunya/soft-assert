const jsonAssertion = require("./../index")

let actual = [{
        "name": "Credit Card/Debit Card",
        "value": "CC"
    },
    {
        "name": "Bank Transfer",
        "value": "BT"
    },
    {
        "name": "COD",
        "value": "COD"
    },
    {
        "name": "Akulaku Installments",
        "value": "AI"
    }
];
let expected = [{
        "name": "Credit Card/Debit Card",
        "value": "CC"
    },
    {
        "name": "Bank Transfer",
        "value": "BT"
    },
    {
        "name": "COD",
        "value": "CODE"
    },
    {
        "name": "Akulaku Installment",
        "value": "AI"
    }
];

try {
    
//jsonAssertion.deepAssert(actual, expected,"not equal");
//jsonAssertion.deepAssert("actual", "expected","not equal");
jsonAssertion.deepAssertType([1,2,3], "<array>","not equal");
} catch (error) {
    console.log(error);
}
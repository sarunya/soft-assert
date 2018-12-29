const Assertion = require("./../index")
const _ = require("lodash");


let arr = [1, 2];


describe("test", function () {
    let jsonAssertion;
    //const me = this;
    before(function () {
        const me = this;
        jsonAssertion = new Assertion();
    })

    let actual = {
        "cart_id": "9cf1d2f5-a86b-4f5a-b70b-498b976614dc",
        "cost": {
            "discount": {
                "amount": 300,
                "split": {
                    "sku_offer": [{
                        "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20",
                        "offer_type": "TradeIn",
                        "discount": 300
                    }],
                    "epp": 0,
                    "shipping": 0,
                    "coupon": [],
                    "order_level_discount": 0
                }
            },
            "shipping": {
                "amount": 0,
                "currency": "USD"
            },
            "subtotal": {
                "amount": 1095.81
            },
            "tax": {
                "amount": 0,
                "currency": "USD"
            },
            "total": {
                "amount": 0,
                "currency": "USD"
            }
        },
        "guest_id": "1d84adfa-2c2d-42a3-86fb-e9f39dbc70fa",
        "identity_id": null,
        "line_items": [{
                "line_item_cost": {
                    "price": {
                        "amount": 600.81
                    },
                    "regular_price": {
                        "amount": 900.81
                    },
                    "unit_list_price": {
                        "amount": 900.81
                    },
                    "finance_info": {
                        "plan_id": "TMo BOGOm1",
                        "down_payment": {
                            "amount": 200,
                            "currency": "USD",
                            "min": {
                                "amount": 200,
                                "currency": "USD"
                            }
                        },
                        "name": "finance plan test",
                        "carrier_plan_id": "ATT",
                        "tenure": {
                            "no_of_units": 24,
                            "unit": "M"
                        },
                        "monthly_price": {
                            "amount": 29.2,
                            "currency": "USD"
                        },
                        "min_price": {
                            "amount": 400,
                            "currency": "USD"
                        },
                        "sales_pitch": [
                            "string"
                        ],
                        "terms_conditions": [
                            "string"
                        ],
                        "display_strike_through_price": true,
                        "plan_provider": "ATT",
                        "final_monthly_price": {
                            "amount": 16.7,
                            "currency": "USD"
                        }
                    },
                    "sale_price": {
                        "public": {
                            "unfinanced": {
                                "amount": 900.81
                            },
                            "financed": {}
                        },
                        "store": {
                            "unfinanced": {
                                "amount": 900.81
                            },
                            "financed": {}
                        }
                    }
                },
                "line_item_id": "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "quantity": 1,
                "sku_id": "SM-N950UZVAVZW",
                "line_items": [{
                    "line_item_cost": {
                        "price": {
                            "amount": 0
                        },
                        "regular_price": {
                            "amount": 0
                        },
                        "unit_list_price": {
                            "amount": 0
                        },
                        "sale_price": {
                            "public": {
                                "unfinanced": {
                                    "amount": 0
                                },
                                "financed": {}
                            },
                            "store": {
                                "unfinanced": {
                                    "amount": 0
                                },
                                "financed": {}
                            }
                        }
                    },
                    "line_item_id": "975ded1f-6997-45ae-895d-86833a97ee77",
                    "quantity": 1,
                    "sku_id": "TI300-Great-GLXYn5s7",
                    "discount": {
                        "amount": 0,
                        "split": {
                            "sku_offer": [],
                            "epp": 0,
                            "shipping": 0,
                            "coupon": [],
                            "order_level_discount": 0
                        }
                    }
                }],
                "discount": {
                    "amount": 300,
                    "split": {
                        "sku_offer": [{
                            "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20",
                            "offer_type": "TradeIn",
                            "discount": 300
                        }],
                        "epp": 0,
                        "shipping": 0,
                        "coupon": [],
                        "order_level_discount": 0
                    }
                },
                "offer_triggered_attributes": {
                    "return_window": {
                        "value": "30d"
                    },
                    "tags": [
                        "try & buy",
                        "promotional offers"
                    ]
                }
            },
            {
                "line_item_cost": {
                    "price": {
                        "amount": 600.81
                    },
                    "regular_price": {
                        "amount": 900.81
                    },
                    "unit_list_price": {
                        "amount": 900.81
                    },
                    "finance_info": {
                        "plan_id": "TMo BOGOm1",
                        "down_payment": {
                            "amount": 200,
                            "currency": "USD",
                            "min": {
                                "amount": 200,
                                "currency": "USD"
                            }
                        },
                        "name": "finance plan test",
                        "carrier_plan_id": "ATT",
                        "tenure": {
                            "no_of_units": 24,
                            "unit": "M"
                        },
                        "monthly_price": {
                            "amount": 29.2,
                            "currency": "USD"
                        },
                        "min_price": {
                            "amount": 400,
                            "currency": "USD"
                        },
                        "sales_pitch": [
                            "string"
                        ],
                        "terms_conditions": [
                            "string"
                        ],
                        "display_strike_through_price": true,
                        "plan_provider": "ATT",
                        "final_monthly_price": {
                            "amount": 16.7,
                            "currency": "USD"
                        }
                    },
                    "sale_price": {
                        "public": {
                            "unfinanced": {
                                "amount": 900.81
                            },
                            "financed": {}
                        },
                        "store": {
                            "unfinanced": {
                                "amount": 900.81
                            },
                            "financed": {}
                        }
                    }
                },
                "line_item_id": "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "quantity": 1,
                "sku_id": "SM-N950UZVAVZW",
                "line_items": [{
                    "line_item_cost": {
                        "price": {
                            "amount": 0
                        },
                        "regular_price": {
                            "amount": 0
                        },
                        "unit_list_price": {
                            "amount": 0
                        },
                        "sale_price": {
                            "public": {
                                "unfinanced": {
                                    "amount": 0
                                },
                                "financed": {}
                            },
                            "store": {
                                "unfinanced": {
                                    "amount": 0
                                },
                                "financed": {}
                            }
                        }
                    },
                    "line_item_id": "975ded1f-6997-45ae-895d-86833a97ee77",
                    "quantity": 1,
                    "sku_id": "TI300-Great-GLXYn5s7",
                    "discount": {
                        "amount": 0,
                        "split": {
                            "sku_offer": [],
                            "epp": 0,
                            "shipping": 0,
                            "coupon": [],
                            "order_level_discount": 0
                        }
                    }
                }],
                "discount": {
                    "amount": 300,
                    "split": {
                        "sku_offer": [{
                            "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20",
                            "offer_type": "TradeIn",
                            "discount": 300
                        }],
                        "epp": 0,
                        "shipping": 0,
                        "coupon": [],
                        "order_level_discount": 0
                    }
                },
                "offer_triggered_attributes": {
                    "return_window": {
                        "value": "30d"
                    },
                    "tags": [
                        "try & buy",
                        "promotional offers"
                    ]
                }
            },
            {
                "line_item_cost": {
                    "price": {
                        "amount": 195
                    },
                    "regular_price": {
                        "amount": 195
                    },
                    "unit_list_price": {
                        "amount": 195
                    },
                    "sale_price": {
                        "public": {
                            "unfinanced": {
                                "amount": 195
                            },
                            "financed": {}
                        },
                        "store": {
                            "unfinanced": {
                                "amount": 195
                            },
                            "financed": {}
                        }
                    }
                },
                "line_item_id": "66cb6704-529f-4384-bba6-d026f2fbb5dc",
                "quantity": 1,
                "sku_id": "SM-R325NZVAXAR",
                "offer_triggered_attributes": {
                    "return_window": {
                        "value": "30d"
                    },
                    "tags": [
                        "try & buy",
                        "promotional offers"
                    ]
                },
                "discount": {
                    "amount": 0,
                    "split": {
                        "sku_offer": [],
                        "epp": 0,
                        "shipping": 0,
                        "coupon": [],
                        "order_level_discount": 0
                    }
                }
            },
            {
                "line_item_cost": {
                    "price": {
                        "amount": 300
                    },
                    "regular_price": {
                        "amount": 300
                    },
                    "unit_list_price": {
                        "amount": 300
                    },
                    "sale_price": {
                        "public": {
                            "unfinanced": {
                                "amount": 300
                            },
                            "financed": {}
                        },
                        "store": {
                            "unfinanced": {
                                "amount": 300
                            }
                        }
                    }
                },
                "line_item_id": "2157da7c-aaf5-4481-b9b2-11ea81a0dc14",
                "quantity": 1,
                "sku_id": "SM-R210NZWAXAR-SPROMO",
                "offer_triggered_attributes": {
                    "return_window": {
                        "value": "30d"
                    },
                    "tags": [
                        "try & buy",
                        "try & buy2",
                        "promotional offers"
                    ]
                },
                "discount": {
                    "amount": 0,
                    "split": {
                        "sku_offer": [],
                        "epp": 0,
                        "shipping": 0,
                        "coupon": [],
                        "order_level_discount": 0
                    }
                }
            }
        ],
        "coupon_codes": [],
        "purchase_flow_id": {
            "id": "16051dfd-7520-47b6-b67f-55c0de0ef2d0",
            "template_id": "ecom"
        },
        "purchaseplan_incentive_total": "0",
        "schema_version": "v2.0",
        "shipping_info": {
            "city": "bedford",
            "country": "US",
            "email": "testemail@test.com",
            "first_name": "test_fname",
            "last_name": "test_lname",
            "line1": "1000 lincoln ave",
            "line2": null,
            "phone": "909-299-9887",
            "postal_code": "47421",
            "state_or_province": "IN"
        },
        "status": "Active",
        "visitor_id": "ecom|c268a6df-ea47-4c3b-ae9d-03ed53d4e477",
        "currency": "USD",
        "chosen_offer_list": [{
                "line_item_id": "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20"
            },
            {
                "line_item_id": "66cb6704-529f-4384-bba6-d026f2fbb5dc",
                "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20"
            },
            {
                "line_item_id": "2157da7c-aaf5-4481-b9b2-11ea81a0dc14",
                "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20"
            }
        ],
        "offer_groups": [{
            "group_id": "4fdbeb84-730f-4271-9ca3-a32646d84288",
            "discounted": [
                "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "66cb6704-529f-4384-bba6-d026f2fbb5dc",
                "2157da7c-aaf5-4481-b9b2-11ea81a0dc14"
            ],
            "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20",
            "triggered": [
                "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "975ded1f-6997-45ae-895d-86833a97ee77",
                "66cb6704-529f-4384-bba6-d026f2fbb5dc",
                "2157da7c-aaf5-4481-b9b2-11ea81a0dc14"
            ]
        }],
        "eppRejectionReasons": [],
        "payment_methods": [],
        "validation_details": "eyJvZmZlcl9kZXRhaWxzIjpbeyJvZmZlcl9pZCI6ImE2NTAwOTk5LTA5YzEtNDBmMS1iMGU1LTdmMWU3ZmJlNGEyMCJ9XX0="
    };
    let expected = {
        "cart_id": "9cf1d2f5-a86b-4f5a-b70b-498b976614dc",
        "cost": {
            "discount": {
                "amount": 300,
                "split": {
                    "sku_offer": [{
                        "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20",
                        "offer_type": "TradeIn",
                        "discount": 300
                    }],
                    "epp": 0,
                    "shipping": 0,
                    "coupon": [],
                    "order_level_discount": 0
                }
            },
            "shipping": {
                "amount": 0,
                "currency": "USD"
            },
            "subtotal": {
                "amount": 1095.81
            },
            "tax": {
                "amount": 0,
                "currency": "USD"
            },
            "total": {
                "amount": 0,
                "currency": "USD"
            }
        },
        "guest_id": "1d84adfa-2c2d-42a3-86fb-e9f39dbc70fa",
        "identity_id": null,
        "line_items": [{
                "line_item_cost": {
                    "price": {
                        "amount": 600.81
                    },
                    "regular_price": {
                        "amount": 900.81
                    },
                    "unit_list_price": {
                        "amount": 900.81
                    },
                    "finance_info": {
                        "plan_id": "TMo BOGOm1",
                        "down_payment": {
                            "amount": 200,
                            "currency": "USD",
                            "min": {
                                "amount": 200,
                                "currency": "USD"
                            }
                        },
                        "name": "finance plan test",
                        "carrier_plan_id": "ATT",
                        "tenure": {
                            "no_of_units": 24,
                            "unit": "M"
                        },
                        "monthly_price": {
                            "amount": 29.2,
                            "currency": "USD"
                        },
                        "min_price": {
                            "amount": 400,
                            "currency": "USD"
                        },
                        "sales_pitch": [
                            "string"
                        ],
                        "terms_conditions": [
                            "string"
                        ],
                        "display_strike_through_price": true,
                        "plan_provider": "ATT",
                        "final_monthly_price": {
                            "amount": 16.7,
                            "currency": "USD"
                        }
                    },
                    "sale_price": {
                        "public": {
                            "unfinanced": {
                                "amount": 900.81
                            },
                            "financed": {}
                        },
                        "store": {
                            "unfinanced": {
                                "amount": 900.81
                            },
                            "financed": {}
                        }
                    }
                },
                "line_item_id": "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "quantity": 1,
                "sku_id": "SM-N950UZVAVZW",
                "line_items": [{
                    "line_item_cost": {
                        "price": {
                            "amount": 0
                        },
                        "regular_price": {
                            "amount": 0
                        },
                        "unit_list_price": {
                            "amount": 0
                        },
                        "sale_price": {
                            "public": {
                                "unfinanced": {
                                    "amount": 0
                                },
                                "financed": {}
                            },
                            "store": {
                                "unfinanced": {
                                    "amount": 0
                                },
                                "financed": {}
                            }
                        }
                    },
                    "line_item_id": "975ded1f-6997-45ae-895d-86833a97ee77",
                    "quantity": 1,
                    "sku_id": "TI300-Great-GLXYn5s7",
                    "discount": {
                        "amount": 0,
                        "split": {
                            "sku_offer": [],
                            "epp": 0,
                            "shipping": 0,
                            "coupon": [],
                            "order_level_discount": 0
                        }
                    }
                }],
                "discount": {
                    "amount": 300,
                    "split": {
                        "sku_offer": [{
                            "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20",
                            "offer_type": "TradeIn",
                            "discount": 300
                        }],
                        "epp": 0,
                        "shipping": 0,
                        "coupon": [],
                        "order_level_discount": 0
                    }
                },
                "offer_triggered_attributes": {
                    "return_window": {
                        "value": "30d"
                    },
                    "tags": [
                        "try & buy",
                        "promotional offers"
                    ]
                }
            },
            {
                "line_item_cost": {
                    "price": {
                        "amount": 195
                    },
                    "regular_price": {
                        "amount": 195
                    },
                    "unit_list_price": {
                        "amount": 195
                    },
                    "sale_price": {
                        "public": {
                            "unfinanced": {
                                "amount": 195
                            },
                            "financed": {}
                        },
                        "store": {
                            "unfinanced": {
                                "amount": 195
                            },
                            "financed": {}
                        }
                    }
                },
                "line_item_id": "66cb6704-529f-4384-bba6-d026f2fbb5dc",
                "quantity": 1,
                "sku_id": "SM-R325NZVAXAR",
                "offer_triggered_attributes": {
                    "return_window": {
                        "value": "30d"
                    },
                    "tags": [
                        "try & buy",
                        "promotional offers"
                    ]
                },
                "discount": {
                    "amount": 0,
                    "split": {
                        "sku_offer": [],
                        "epp": 0,
                        "shipping": 0,
                        "coupon": [],
                        "order_level_discount": 0
                    }
                }
            },
            {
                "line_item_cost": {
                    "price": {
                        "amount": 300
                    },
                    "regular_price": {
                        "amount": 300
                    },
                    "unit_list_price": {
                        "amount": 300
                    },
                    "sale_price": {
                        "public": {
                            "unfinanced": {
                                "amount": 300
                            },
                            "financed": {
                                "amount": 50
                            }
                        },
                        "store": {
                            "unfinanced": {
                                "amount": 300
                            },
                            "financed": {}
                        }
                    }
                },
                "line_item_id": "2157da7c-aaf5-4481-b9b2-11ea81a0dc14",
                "quantity": 1,
                "sku_id12": "SM-R210NZWAXAR-SPROMO",
                "offer_triggered_attributes": {
                    "return_window": {
                        "value": "30d"
                    },
                    "tags": [
                        "try & buy",
                        "promotional offers"
                    ]
                },
                "discount": {
                    "amount": 0,
                    "split": {
                        "sku_offer": [],
                        "epp": 0,
                        "shipping": 0,
                        "coupon": [],
                        "order_level_discount": 0
                    }
                }
            }
        ],
        "coupon_codes": [],
        "purchase_flow_id": {
            "id": "16051dfd-7520-47b6-b67f-55c0de0ef2d0"
        },
        "purchaseplan_incentive_total": "1",
        "schema_version": "v2.0",
        "shipping_info": {
            "city": "bedford",
            "country": "US",
            "email": "testemail@test.com",
            "first_name": "test_fname",
            "last_name": "test_lname",
            "line1": "1000 lincoln ave",
            "line2": null,
            "phone": "909-299-9887",
            "postal_code": "47421",
            "state_or_province": "IN"
        },
        "status": "Active",
        "visitor_id": "ecom|c268a6df-ea47-4c3b-ae9d-03ed53d4e477",
        "currency": "USD",
        "chosen_offer_list": [{
                "line_item_id": "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20"
            },
            {
                "line_item_id": "2157da7c-aaf5-4481-b9b2-11ea81a0dc14",
                "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a21"
            }
        ],
        "offer_groups": [{
            "group_id": "4fdbeb84-730f-4271-9ca3-a32646d84288",
            "discounted": [
                "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "66cb6704-529f-4384-bba6-d026f2fbb5dc"
            ],
            "offer_id": "a6500999-09c1-40f1-b0e5-7f1e7fbe4a20",
            "triggered": [
                "e7dd8a23-2503-4dc9-84c9-6ef4287fc344",
                "66cb6704-529f-4384-bba6-d026f2fbb5dc",
                "975ded1f-6997-45ae-895d-86833a97ee77",
                "2157da7c-aaf5-4481-b9b2-11ea81a0dc14"
            ]
        }],
        "eppRejectionReasons": [],
        "payment_methods": [],
        "validation_details": "eyJvZmZlcl9kZXRhaWxzIjpbeyJvZmZlcl9pZCI6ImE2NTAwOTk5LTA5YzEtNDBmMS1iMGU1LTdmMWU3ZmJlNGEyMCJ9XX0="
    }

    // for (var index = 0; index < arr.length; index += 1) (function(arrayEntry, indexIfYouNeedIt) {
    //     it("", function() {
    //       console.log(arrayEntry)
    //       //console.log(indexIfYouNeedIt)
    //     })
    //   })(array[index], index);

    arr = ["sum", 1, 1];


    // data("class", "function", function() {
    //     it("array assertion ", function() {
    //         jsonAssertion.deepAssert([1,2,5], [4,1,2]);
    //     });
    // })



    it("json assertion", function () {
        jsonAssertion.deepAssert(actual, expected);
    })

    it("json assertion with exclude keys", function() {
        jsonAssertion.deepAssert(actual, expected, "its failing:(", ["$.purchase_flow_id","$.chosen_offer_list","triggered","sku_id", "line_item_id","financed","$.offer_groups"]);
    })

    it("deep contains assertion", function() {
        jsonAssertion.deepContains(actual, {offer_groups: expected.offer_groups, chosen_offer_list: [expected.chosen_offer_list[1]]}, "failed", []);
    })

    it("deepcontains assertion for array", function() {
        jsonAssertion.deepContains([3,2,1,4,3],[1,2,3,4], []);
    })

    describe.only("soft assert", function() {


        it("deepcontains assertion for array", function() {
            jsonAssertion.softAssert([1,2,5], [1,2,3]);
            jsonAssertion.softContains({a:"b",c:"d"}, {c:"d"});
            jsonAssertion.softContains({a:"b",c:"d"}, {c:3});
            jsonAssertion.softContains([3,2,1],[1,4], []);
            jsonAssertion.softAssertAll();
        })
        it("array assertion", function() {
            jsonAssertion.softAssert([1,2,5], [4,1,2]);
        })

        it("json assertion", function() {
            jsonAssertion.softAssert(actual, expected);
        })

        it("json assertion with exclude keys", function() {
            jsonAssertion.softAssert(actual, expected, ["$.purchase_flow_id","$.chosen_offer_list","triggered","sku_id", "line_item_id","financed","$.offer_groups"]);
        })

        it("deep contains assertion", function() {
            jsonAssertion.softContains(actual, {offer_groups: expected.offer_groups, chosen_offer_list: [expected.chosen_offer_list[1]]}, []);
        })

        afterEach(function() {
            //jsonAssertion.softAssertAll();
        })

        after(function() {
            //jsonAssertion.softAssertAll();
        })

    })

    it("array assertion", function () {
        let expected = {
            "offer_groups": [{
                    "discounted": [
                        "d9f0a69b-6c2d-4162-84c9-bae075e74601"
                    ],
                    "offer_id": "1f01ec83-940e-49ac-99ab-3c45e4dc0c7b",
                    "triggered": [],
                    "coupon_code": "HLMEFBUQ7"
                },
                {
                    "discounted": [
                        "d9f0a69b-6c2d-4162-84c9-bae075e74600"
                    ],
                    "offer_id": "88b276ce-7896-42f6-ad9a-0eec184633ba",
                    "triggered": []
                },
                {
                    "discounted": [
                        "c7d48a0a-4090-469a-a4c8-290df1db91e2"
                    ],
                    "offer_id": "88b276ce-7896-42f6-ad9a-0eec184633ba",
                    "triggered": []
                }
            ]
        }
        let actual = _.cloneDeep(expected);
        expected.offer_groups[2].discounted[0] = "sarunya";
        jsonAssertion.deepAssert(actual, expected);
    })
})
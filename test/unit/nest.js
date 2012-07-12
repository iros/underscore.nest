module("nest");

test("Basic Nesting - 1 level", function() {

  var data = [
    { c1 : "A", c2 : "B", c3 : "C", v : 10 },
    { c1 : "A", c2 : "C", c3 : "D", v : 10 },
    { c1 : "B", c2 : "B", c3 : "C", v : 10 }
  ];

  var expectedData = {
    children : [
      { name : 'A', index : 0, children : [
        { c1 : "A", c2 : "B", c3 : "C", v : 10 },
        { c1 : "A", c2 : "C", c3 : "D", v : 10 }
      ]},
      { name : 'B', index : 1, children : [
        { c1 : "B", c2 : "B", c3 : "C", v : 10 }
      ]}
    ]
  };

  var actualResult = _.nest(data, "c1");
  ok(_.isEqual(actualResult, expectedData), actualResult);

});

test("Basic Nesting - 2 level", function() {

  var data = [
    { c1 : "A", c2 : "B", c3 : "C", v : 10 },
    { c1 : "A", c2 : "C", c3 : "D", v : 10 },
    { c1 : "B", c2 : "B", c3 : "C", v : 10 }
  ];

  var expectedData = {"children":
    [
      { name : "A",
        children : [
          { name : "B",
            children :[
              { c1 : "A",
                c2 : "B",
                c3 : "C",
                v :10
              }],
            index : 0},
          { name : "C", 
            children :[
              { c1 : "A", 
                c2 : "C", 
                c3 : "D",
                v :10
              }
            ],
            index : 1
          }
        ],
        index : 0 },{
        name : "B",
        children : [
          { name : "B",
            children : [
             { c1 : "B", 
               c2 : "B", 
               c3 : "C", 
               v : 10
           }],
           index : 0
        }], index : 1
      }
    ]
  };

  var actualResult = _.nest(data, ["c1", "c2"]);
  ok(_.isEqual(actualResult, expectedData), actualResult);

});


test("Basic Nesting - 3 level", function() {

  var data = [
    { c1 : "A", c2 : "B", c3 : "C", v : 10 },
    { c1 : "A", c2 : "C", c3 : "D", v : 10 },
    { c1 : "B", c2 : "B", c3 : "C", v : 10 }
  ];

  var expectedData ={
    children: [{
        name: "A",
        children: [{
            name: "B",
            children: [{
                name: "C",
                children: [{
                    c1: "A",
                    c2: "B",
                    c3: "C",
                    v: 10
                }],
                index: 0
            }],
            index: 0
        },
        {
            name: "C",
            children: [{
                name: "D",
                children: [{
                    c1: "A",
                    c2: "C",
                    c3: "D",
                    v: 10
                }],
                index: 0
            }],
            index: 1
        }],
        index: 0
    },
    {
        name: "B",
        children: [{
            name: "B",
            children: [{
                name: "C",
                children: [{
                    c1: "B",
                    c2: "B",
                    c3: "C",
                    v: 10
                }],
                index: 0
            }],
            index: 0
        }],
        index: 1
    }]
  };

  var actualResult = _.nest(data, ["c1", "c2","c3"]);
  ok(_.isEqual(actualResult, expectedData), actualResult);
});

module("Nest with reduce");

var sum = function(rows) {
  return _.reduce(_.pluck(rows, "v"), 
    function(memo, num){ return memo + num; }, 0);
};

test("Basic Nesting - 1 level with reduce", function() {

  var data = [
    { c1 : "A", c2 : "B", c3 : "C", v : 10 },
    { c1 : "A", c2 : "C", c3 : "D", v : 10 },
    { c1 : "B", c2 : "B", c3 : "C", v : 10 }
  ];

  var expectedData = {
    children : [
      { name : 'A', index : 0, value : 20 },
      { name : 'B', index : 1, value : 10 }
    ]
  };

  var actualResult = _.nest(data, "c1", sum);
  ok(_.isEqual(actualResult, expectedData), actualResult);
});

test("Basic Nesting - 2 level with reduce", function() {

  var data = [
    { c1 : "A", c2 : "B", c3 : "C", v : 10 },
    { c1 : "A", c2 : "C", c3 : "D", v : 10 },
    { c1 : "B", c2 : "B", c3 : "C", v : 10 }
  ];

  var expectedData = {
    "children": [
      {
        name: "A",
        children: [
          {
            name: "B",
            value: 10,
            index: 0
          },
          {
            name: "C",
            value: 10,
            index: 1
          }
        ],
        index: 0
      },
      {
        name: "B",
        index: 1,
        children: [
          {
            name: "B",
            value: 10,
            index: 0
          }
        ]
      }
    ]
  };

  var actualResult = _.nest(data, ["c1", "c2"], sum);
  ok(_.isEqual(actualResult, expectedData), actualResult);

});

test("Basic Nesting - 3 level with reduce", function() {

  var data = [
    { c1 : "A", c2 : "B", c3 : "C", v : 10 },
    { c1 : "A", c2 : "C", c3 : "D", v : 10 },
    { c1 : "B", c2 : "B", c3 : "C", v : 10 }
  ];

  var expectedData ={
    children: [{
        name: "A",
        children: [{
            name: "B",
            children: [{
                name: "C",
                value : 10,
                index: 0
            }],
            index: 0
        },
        {
            name: "C",
            children: [{
                name: "D",
                value : 10,
                index: 0
            }],
            index: 1
        }],
        index: 0
    },
    {
        name: "B",
        children: [{
            name: "B",
            children: [{
                name: "C",
                value : 10,
                index: 0
            }],
            index: 0
        }],
        index: 1
    }]
  };

  var actualResult = _.nest(data, ["c1", "c2","c3"], sum);
  ok(_.isEqual(actualResult, expectedData), actualResult);
});



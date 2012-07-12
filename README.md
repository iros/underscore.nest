Underscore.Nest
================

Underscore.Nest is an extenstion for converting flat data into nested tree structures.
For example, if your data looks like this:

```javascript
var data = [
    { c1 : "A", c2 : "B", c3 : "C", v : 10 },
    { c1 : "A", c2 : "C", c3 : "D", v : 10 },
    { c1 : "B", c2 : "B", c3 : "C", v : 10 }
  ];
```

And you want it to look like this:

```javascript
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
```

You can accomplish that by using underscore.nest like so:

```javascript
  _.nest(data, "c1");
```

# API:

Basic API:

```javascript
_.nest(data, columnsToReduceBy, reduceFunction);
```

* data - An array of objects
* columnsToReduceBy - Underscore.nest can infinitly nest your data. You can either nest by a single field
  by passing the name of that field, or an array of fields.
* reduceFunction - Optional. If you want to reduce your resulting children into a single value result,
  pass a function that takes an array of objects and returns a single value.

# Examples:

## Nest With Reduce:

If you pass in a reduce function, instead of having a `children` property set, you will
have a `value` property set that will be the result of the reduce function call.

```javascript

var data = [
  { c1 : "A", c2 : "B", c3 : "C", v : 10 },
  { c1 : "A", c2 : "C", c3 : "D", v : 10 },
  { c1 : "B", c2 : "B", c3 : "C", v : 10 }
];

_.nest(data, "c1", _.sum); // _.sum is from underscore.math
```

Results in:

```json
{
  children : [
    { name : 'A', index : 0, value : 20 },
    { name : 'B', index : 1, value : 10 }
  ]
};
```

## Multi Level Nesting

If you pass an array of properties instead of a single string for the second argument, nest will
create a nesting based on each of those arguments like so:

```javascript
var data = [
  { c1 : "A", c2 : "B", c3 : "C", v : 10 },
  { c1 : "A", c2 : "C", c3 : "D", v : 10 },
  { c1 : "B", c2 : "B", c3 : "C", v : 10 }
];

_.nest(data, ["c1", "c2"]);
```

Results in:

```
{ children :
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
```

# Questions? 
Contact @ireneros on twitter, iros on IRC email me.


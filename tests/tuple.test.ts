import { Equal } from "./../src/utils";
import { Includes, ToIntersection, Join, Merge } from "./../src/tuple";
import { Expect, ExpectFalse } from "./test-util";

type test_includes = [
  Expect<Includes<[any], any>>,
  Expect<Includes<[never], never>>,
  Expect<Includes<[never, 1], 1>>,
  Expect<Includes<[1, 2, 3], 1>>,

  ExpectFalse<Includes<[never, 1], 2>>
];

type test_merge = [
  Expect<Equal<Merge<[[any, 1], [2, never]]>, [any, 1, 2, never]>>,
  Expect<
    Equal<
      Merge<[[any, 1], [1, never], [unknown, any, null], [undefined]]>,
      [any, 1, never, unknown, null, undefined]
    >
  >
];

type test_join = [
  Expect<Equal<ToIntersection<[1, 2] | [2, 3]>, [2]>>,
  Expect<Equal<ToIntersection<[1, 2] | [1, 3]>, [1]>>,
  Expect<Equal<ToIntersection<[1, 2] | [3, 4]>, []>>,
  Expect<Equal<ToIntersection<[] | []>, []>>,
  Expect<Equal<ToIntersection<[1, 2, 3] | [2, 3, 4] | [3, 4, 5]>, [3]>>,
  Expect<
    Equal<
      ToIntersection<
        | [{}, null, undefined, any, unknown, never, boolean, "1"]
        | [never, unknown, any, undefined, null, {}, false, true, string]
      >,
      [{}, null, undefined, any, unknown, never]
    >
  >,
  Expect<
    Equal<ToIntersection<[[1, 2, 3] | [2, 3, 4] | [3, 4, 5]][number]>, [3]>
  >
];

type test_joinstring = [
  Expect<Equal<Join<[1, 2, 3]>, "1, 2, 3">>,
  Expect<Equal<Join<["a", "b", "c"], "-">, "a-b-c">>,
  Expect<Equal<Join<[]>, "">>,
  Expect<Equal<Join<[], ",">, "">>,
  Expect<Equal<Join<["a"], ",">, "a">>
];

type a = Join<[1, 2, 3]>;

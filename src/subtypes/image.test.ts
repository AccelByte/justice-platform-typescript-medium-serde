/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

import { toRaw } from "./image";

test("toRaw returns null when given invalid parameter", () => {
  expect(toRaw(1 as any)).toBe(null);
  expect(toRaw("1" as any)).toBe(null);
  expect(toRaw({} as any)).toBe(null);
  expect(toRaw(new Error() as any)).toBe(null);
  expect(toRaw((() => {}) as any)).toBe(null);
});

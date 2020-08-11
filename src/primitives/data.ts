/*
 * Copyright (c) 2020 AccelByte Inc. All Rights Reserved
 * This is licensed software from AccelByte Inc, for limitations
 * and restrictions contact your company contract manager.
 */

export type Data<Kind extends string = string, Data extends any = unknown> = {
  kind: Kind;
  value: Data;
};

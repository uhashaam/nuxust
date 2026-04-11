
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Product
 * 
 */
export type Product = $Result.DefaultSelection<Prisma.$ProductPayload>
/**
 * Model IndustrySite
 * 
 */
export type IndustrySite = $Result.DefaultSelection<Prisma.$IndustrySitePayload>
/**
 * Model NewsContent
 * 
 */
export type NewsContent = $Result.DefaultSelection<Prisma.$NewsContentPayload>
/**
 * Model PlanCoupon
 * 
 */
export type PlanCoupon = $Result.DefaultSelection<Prisma.$PlanCouponPayload>
/**
 * Model AdminSetting
 * 
 */
export type AdminSetting = $Result.DefaultSelection<Prisma.$AdminSettingPayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.product`: Exposes CRUD operations for the **Product** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Products
    * const products = await prisma.product.findMany()
    * ```
    */
  get product(): Prisma.ProductDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.industrySite`: Exposes CRUD operations for the **IndustrySite** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more IndustrySites
    * const industrySites = await prisma.industrySite.findMany()
    * ```
    */
  get industrySite(): Prisma.IndustrySiteDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.newsContent`: Exposes CRUD operations for the **NewsContent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more NewsContents
    * const newsContents = await prisma.newsContent.findMany()
    * ```
    */
  get newsContent(): Prisma.NewsContentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.planCoupon`: Exposes CRUD operations for the **PlanCoupon** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PlanCoupons
    * const planCoupons = await prisma.planCoupon.findMany()
    * ```
    */
  get planCoupon(): Prisma.PlanCouponDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.adminSetting`: Exposes CRUD operations for the **AdminSetting** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more AdminSettings
    * const adminSettings = await prisma.adminSetting.findMany()
    * ```
    */
  get adminSetting(): Prisma.AdminSettingDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.19.2
   * Query Engine version: c2990dca591cba766e3b7ef5d9e8a84796e47ab7
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Product: 'Product',
    IndustrySite: 'IndustrySite',
    NewsContent: 'NewsContent',
    PlanCoupon: 'PlanCoupon',
    AdminSetting: 'AdminSetting'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "product" | "industrySite" | "newsContent" | "planCoupon" | "adminSetting"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Product: {
        payload: Prisma.$ProductPayload<ExtArgs>
        fields: Prisma.ProductFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProductFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProductFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findFirst: {
            args: Prisma.ProductFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProductFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          findMany: {
            args: Prisma.ProductFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          create: {
            args: Prisma.ProductCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          createMany: {
            args: Prisma.ProductCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ProductCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          delete: {
            args: Prisma.ProductDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          update: {
            args: Prisma.ProductUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          deleteMany: {
            args: Prisma.ProductDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProductUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ProductUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>[]
          }
          upsert: {
            args: Prisma.ProductUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProductPayload>
          }
          aggregate: {
            args: Prisma.ProductAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProduct>
          }
          groupBy: {
            args: Prisma.ProductGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProductGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProductCountArgs<ExtArgs>
            result: $Utils.Optional<ProductCountAggregateOutputType> | number
          }
        }
      }
      IndustrySite: {
        payload: Prisma.$IndustrySitePayload<ExtArgs>
        fields: Prisma.IndustrySiteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IndustrySiteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IndustrySiteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>
          }
          findFirst: {
            args: Prisma.IndustrySiteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IndustrySiteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>
          }
          findMany: {
            args: Prisma.IndustrySiteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>[]
          }
          create: {
            args: Prisma.IndustrySiteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>
          }
          createMany: {
            args: Prisma.IndustrySiteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IndustrySiteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>[]
          }
          delete: {
            args: Prisma.IndustrySiteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>
          }
          update: {
            args: Prisma.IndustrySiteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>
          }
          deleteMany: {
            args: Prisma.IndustrySiteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IndustrySiteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IndustrySiteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>[]
          }
          upsert: {
            args: Prisma.IndustrySiteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IndustrySitePayload>
          }
          aggregate: {
            args: Prisma.IndustrySiteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIndustrySite>
          }
          groupBy: {
            args: Prisma.IndustrySiteGroupByArgs<ExtArgs>
            result: $Utils.Optional<IndustrySiteGroupByOutputType>[]
          }
          count: {
            args: Prisma.IndustrySiteCountArgs<ExtArgs>
            result: $Utils.Optional<IndustrySiteCountAggregateOutputType> | number
          }
        }
      }
      NewsContent: {
        payload: Prisma.$NewsContentPayload<ExtArgs>
        fields: Prisma.NewsContentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.NewsContentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.NewsContentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>
          }
          findFirst: {
            args: Prisma.NewsContentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.NewsContentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>
          }
          findMany: {
            args: Prisma.NewsContentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>[]
          }
          create: {
            args: Prisma.NewsContentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>
          }
          createMany: {
            args: Prisma.NewsContentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.NewsContentCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>[]
          }
          delete: {
            args: Prisma.NewsContentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>
          }
          update: {
            args: Prisma.NewsContentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>
          }
          deleteMany: {
            args: Prisma.NewsContentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.NewsContentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.NewsContentUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>[]
          }
          upsert: {
            args: Prisma.NewsContentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$NewsContentPayload>
          }
          aggregate: {
            args: Prisma.NewsContentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNewsContent>
          }
          groupBy: {
            args: Prisma.NewsContentGroupByArgs<ExtArgs>
            result: $Utils.Optional<NewsContentGroupByOutputType>[]
          }
          count: {
            args: Prisma.NewsContentCountArgs<ExtArgs>
            result: $Utils.Optional<NewsContentCountAggregateOutputType> | number
          }
        }
      }
      PlanCoupon: {
        payload: Prisma.$PlanCouponPayload<ExtArgs>
        fields: Prisma.PlanCouponFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PlanCouponFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PlanCouponFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>
          }
          findFirst: {
            args: Prisma.PlanCouponFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PlanCouponFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>
          }
          findMany: {
            args: Prisma.PlanCouponFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>[]
          }
          create: {
            args: Prisma.PlanCouponCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>
          }
          createMany: {
            args: Prisma.PlanCouponCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.PlanCouponCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>[]
          }
          delete: {
            args: Prisma.PlanCouponDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>
          }
          update: {
            args: Prisma.PlanCouponUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>
          }
          deleteMany: {
            args: Prisma.PlanCouponDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PlanCouponUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.PlanCouponUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>[]
          }
          upsert: {
            args: Prisma.PlanCouponUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PlanCouponPayload>
          }
          aggregate: {
            args: Prisma.PlanCouponAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePlanCoupon>
          }
          groupBy: {
            args: Prisma.PlanCouponGroupByArgs<ExtArgs>
            result: $Utils.Optional<PlanCouponGroupByOutputType>[]
          }
          count: {
            args: Prisma.PlanCouponCountArgs<ExtArgs>
            result: $Utils.Optional<PlanCouponCountAggregateOutputType> | number
          }
        }
      }
      AdminSetting: {
        payload: Prisma.$AdminSettingPayload<ExtArgs>
        fields: Prisma.AdminSettingFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AdminSettingFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AdminSettingFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          findFirst: {
            args: Prisma.AdminSettingFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AdminSettingFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          findMany: {
            args: Prisma.AdminSettingFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>[]
          }
          create: {
            args: Prisma.AdminSettingCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          createMany: {
            args: Prisma.AdminSettingCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.AdminSettingCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>[]
          }
          delete: {
            args: Prisma.AdminSettingDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          update: {
            args: Prisma.AdminSettingUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          deleteMany: {
            args: Prisma.AdminSettingDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AdminSettingUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.AdminSettingUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>[]
          }
          upsert: {
            args: Prisma.AdminSettingUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AdminSettingPayload>
          }
          aggregate: {
            args: Prisma.AdminSettingAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAdminSetting>
          }
          groupBy: {
            args: Prisma.AdminSettingGroupByArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingGroupByOutputType>[]
          }
          count: {
            args: Prisma.AdminSettingCountArgs<ExtArgs>
            result: $Utils.Optional<AdminSettingCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory | null
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    product?: ProductOmit
    industrySite?: IndustrySiteOmit
    newsContent?: NewsContentOmit
    planCoupon?: PlanCouponOmit
    adminSetting?: AdminSettingOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */



  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserAvgAggregateOutputType = {
    registration_time: number | null
    remaining_posts: number | null
    plan_expires_at: number | null
    renewal_notified_at: number | null
    code_expires_at: number | null
  }

  export type UserSumAggregateOutputType = {
    registration_time: bigint | null
    remaining_posts: number | null
    plan_expires_at: bigint | null
    renewal_notified_at: bigint | null
    code_expires_at: bigint | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    user_type: string | null
    registration_time: bigint | null
    remaining_posts: number | null
    user_status: string | null
    plan_expires_at: bigint | null
    renewal_notified_at: bigint | null
    password_reset_code: string | null
    verification_code: string | null
    code_expires_at: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    username: string | null
    email: string | null
    password_hash: string | null
    user_type: string | null
    registration_time: bigint | null
    remaining_posts: number | null
    user_status: string | null
    plan_expires_at: bigint | null
    renewal_notified_at: bigint | null
    password_reset_code: string | null
    verification_code: string | null
    code_expires_at: bigint | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    username: number
    email: number
    password_hash: number
    user_type: number
    registration_time: number
    remaining_posts: number
    user_status: number
    plan_expires_at: number
    renewal_notified_at: number
    password_reset_code: number
    verification_code: number
    code_expires_at: number
    bound_site_id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserAvgAggregateInputType = {
    registration_time?: true
    remaining_posts?: true
    plan_expires_at?: true
    renewal_notified_at?: true
    code_expires_at?: true
  }

  export type UserSumAggregateInputType = {
    registration_time?: true
    remaining_posts?: true
    plan_expires_at?: true
    renewal_notified_at?: true
    code_expires_at?: true
  }

  export type UserMinAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    user_type?: true
    registration_time?: true
    remaining_posts?: true
    user_status?: true
    plan_expires_at?: true
    renewal_notified_at?: true
    password_reset_code?: true
    verification_code?: true
    code_expires_at?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    user_type?: true
    registration_time?: true
    remaining_posts?: true
    user_status?: true
    plan_expires_at?: true
    renewal_notified_at?: true
    password_reset_code?: true
    verification_code?: true
    code_expires_at?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    username?: true
    email?: true
    password_hash?: true
    user_type?: true
    registration_time?: true
    remaining_posts?: true
    user_status?: true
    plan_expires_at?: true
    renewal_notified_at?: true
    password_reset_code?: true
    verification_code?: true
    code_expires_at?: true
    bound_site_id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UserAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UserSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _avg?: UserAvgAggregateInputType
    _sum?: UserSumAggregateInputType
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    username: string
    email: string | null
    password_hash: string
    user_type: string
    registration_time: bigint
    remaining_posts: number
    user_status: string
    plan_expires_at: bigint | null
    renewal_notified_at: bigint | null
    password_reset_code: string | null
    verification_code: string | null
    code_expires_at: bigint | null
    bound_site_id: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _avg: UserAvgAggregateOutputType | null
    _sum: UserSumAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    user_type?: boolean
    registration_time?: boolean
    remaining_posts?: boolean
    user_status?: boolean
    plan_expires_at?: boolean
    renewal_notified_at?: boolean
    password_reset_code?: boolean
    verification_code?: boolean
    code_expires_at?: boolean
    bound_site_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    user_type?: boolean
    registration_time?: boolean
    remaining_posts?: boolean
    user_status?: boolean
    plan_expires_at?: boolean
    renewal_notified_at?: boolean
    password_reset_code?: boolean
    verification_code?: boolean
    code_expires_at?: boolean
    bound_site_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    user_type?: boolean
    registration_time?: boolean
    remaining_posts?: boolean
    user_status?: boolean
    plan_expires_at?: boolean
    renewal_notified_at?: boolean
    password_reset_code?: boolean
    verification_code?: boolean
    code_expires_at?: boolean
    bound_site_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    username?: boolean
    email?: boolean
    password_hash?: boolean
    user_type?: boolean
    registration_time?: boolean
    remaining_posts?: boolean
    user_status?: boolean
    plan_expires_at?: boolean
    renewal_notified_at?: boolean
    password_reset_code?: boolean
    verification_code?: boolean
    code_expires_at?: boolean
    bound_site_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "username" | "email" | "password_hash" | "user_type" | "registration_time" | "remaining_posts" | "user_status" | "plan_expires_at" | "renewal_notified_at" | "password_reset_code" | "verification_code" | "code_expires_at" | "bound_site_id" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      username: string
      email: string | null
      password_hash: string
      user_type: string
      registration_time: bigint
      remaining_posts: number
      user_status: string
      plan_expires_at: bigint | null
      renewal_notified_at: bigint | null
      password_reset_code: string | null
      verification_code: string | null
      code_expires_at: bigint | null
      bound_site_id: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly username: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password_hash: FieldRef<"User", 'String'>
    readonly user_type: FieldRef<"User", 'String'>
    readonly registration_time: FieldRef<"User", 'BigInt'>
    readonly remaining_posts: FieldRef<"User", 'Int'>
    readonly user_status: FieldRef<"User", 'String'>
    readonly plan_expires_at: FieldRef<"User", 'BigInt'>
    readonly renewal_notified_at: FieldRef<"User", 'BigInt'>
    readonly password_reset_code: FieldRef<"User", 'String'>
    readonly verification_code: FieldRef<"User", 'String'>
    readonly code_expires_at: FieldRef<"User", 'BigInt'>
    readonly bound_site_id: FieldRef<"User", 'Json'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
  }


  /**
   * Model Product
   */

  export type AggregateProduct = {
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  export type ProductAvgAggregateOutputType = {
    price: number | null
  }

  export type ProductSumAggregateOutputType = {
    price: number | null
  }

  export type ProductMinAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    short_description: string | null
    price: number | null
    category: string | null
    specifications: string | null
    slug: string | null
    is_featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductMaxAggregateOutputType = {
    id: string | null
    name: string | null
    description: string | null
    short_description: string | null
    price: number | null
    category: string | null
    specifications: string | null
    slug: string | null
    is_featured: boolean | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProductCountAggregateOutputType = {
    id: number
    name: number
    description: number
    short_description: number
    price: number
    category: number
    specifications: number
    slug: number
    featured_image: number
    is_featured: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProductAvgAggregateInputType = {
    price?: true
  }

  export type ProductSumAggregateInputType = {
    price?: true
  }

  export type ProductMinAggregateInputType = {
    id?: true
    name?: true
    description?: true
    short_description?: true
    price?: true
    category?: true
    specifications?: true
    slug?: true
    is_featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductMaxAggregateInputType = {
    id?: true
    name?: true
    description?: true
    short_description?: true
    price?: true
    category?: true
    specifications?: true
    slug?: true
    is_featured?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProductCountAggregateInputType = {
    id?: true
    name?: true
    description?: true
    short_description?: true
    price?: true
    category?: true
    specifications?: true
    slug?: true
    featured_image?: true
    is_featured?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProductAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Product to aggregate.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Products
    **/
    _count?: true | ProductCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProductAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProductSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProductMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProductMaxAggregateInputType
  }

  export type GetProductAggregateType<T extends ProductAggregateArgs> = {
        [P in keyof T & keyof AggregateProduct]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProduct[P]>
      : GetScalarType<T[P], AggregateProduct[P]>
  }




  export type ProductGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProductWhereInput
    orderBy?: ProductOrderByWithAggregationInput | ProductOrderByWithAggregationInput[]
    by: ProductScalarFieldEnum[] | ProductScalarFieldEnum
    having?: ProductScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProductCountAggregateInputType | true
    _avg?: ProductAvgAggregateInputType
    _sum?: ProductSumAggregateInputType
    _min?: ProductMinAggregateInputType
    _max?: ProductMaxAggregateInputType
  }

  export type ProductGroupByOutputType = {
    id: string
    name: string
    description: string
    short_description: string | null
    price: number
    category: string | null
    specifications: string | null
    slug: string
    featured_image: JsonValue | null
    is_featured: boolean
    createdAt: Date
    updatedAt: Date
    _count: ProductCountAggregateOutputType | null
    _avg: ProductAvgAggregateOutputType | null
    _sum: ProductSumAggregateOutputType | null
    _min: ProductMinAggregateOutputType | null
    _max: ProductMaxAggregateOutputType | null
  }

  type GetProductGroupByPayload<T extends ProductGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProductGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProductGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProductGroupByOutputType[P]>
            : GetScalarType<T[P], ProductGroupByOutputType[P]>
        }
      >
    >


  export type ProductSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    short_description?: boolean
    price?: boolean
    category?: boolean
    specifications?: boolean
    slug?: boolean
    featured_image?: boolean
    is_featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    short_description?: boolean
    price?: boolean
    category?: boolean
    specifications?: boolean
    slug?: boolean
    featured_image?: boolean
    is_featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    description?: boolean
    short_description?: boolean
    price?: boolean
    category?: boolean
    specifications?: boolean
    slug?: boolean
    featured_image?: boolean
    is_featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["product"]>

  export type ProductSelectScalar = {
    id?: boolean
    name?: boolean
    description?: boolean
    short_description?: boolean
    price?: boolean
    category?: boolean
    specifications?: boolean
    slug?: boolean
    featured_image?: boolean
    is_featured?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProductOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "description" | "short_description" | "price" | "category" | "specifications" | "slug" | "featured_image" | "is_featured" | "createdAt" | "updatedAt", ExtArgs["result"]["product"]>

  export type $ProductPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Product"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      description: string
      short_description: string | null
      price: number
      category: string | null
      specifications: string | null
      slug: string
      featured_image: Prisma.JsonValue | null
      is_featured: boolean
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["product"]>
    composites: {}
  }

  type ProductGetPayload<S extends boolean | null | undefined | ProductDefaultArgs> = $Result.GetResult<Prisma.$ProductPayload, S>

  type ProductCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProductFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProductCountAggregateInputType | true
    }

  export interface ProductDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Product'], meta: { name: 'Product' } }
    /**
     * Find zero or one Product that matches the filter.
     * @param {ProductFindUniqueArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProductFindUniqueArgs>(args: SelectSubset<T, ProductFindUniqueArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Product that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProductFindUniqueOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProductFindUniqueOrThrowArgs>(args: SelectSubset<T, ProductFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProductFindFirstArgs>(args?: SelectSubset<T, ProductFindFirstArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Product that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindFirstOrThrowArgs} args - Arguments to find a Product
     * @example
     * // Get one Product
     * const product = await prisma.product.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProductFindFirstOrThrowArgs>(args?: SelectSubset<T, ProductFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Products that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Products
     * const products = await prisma.product.findMany()
     * 
     * // Get first 10 Products
     * const products = await prisma.product.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const productWithIdOnly = await prisma.product.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProductFindManyArgs>(args?: SelectSubset<T, ProductFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Product.
     * @param {ProductCreateArgs} args - Arguments to create a Product.
     * @example
     * // Create one Product
     * const Product = await prisma.product.create({
     *   data: {
     *     // ... data to create a Product
     *   }
     * })
     * 
     */
    create<T extends ProductCreateArgs>(args: SelectSubset<T, ProductCreateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Products.
     * @param {ProductCreateManyArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProductCreateManyArgs>(args?: SelectSubset<T, ProductCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Products and returns the data saved in the database.
     * @param {ProductCreateManyAndReturnArgs} args - Arguments to create many Products.
     * @example
     * // Create many Products
     * const product = await prisma.product.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Products and only return the `id`
     * const productWithIdOnly = await prisma.product.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ProductCreateManyAndReturnArgs>(args?: SelectSubset<T, ProductCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Product.
     * @param {ProductDeleteArgs} args - Arguments to delete one Product.
     * @example
     * // Delete one Product
     * const Product = await prisma.product.delete({
     *   where: {
     *     // ... filter to delete one Product
     *   }
     * })
     * 
     */
    delete<T extends ProductDeleteArgs>(args: SelectSubset<T, ProductDeleteArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Product.
     * @param {ProductUpdateArgs} args - Arguments to update one Product.
     * @example
     * // Update one Product
     * const product = await prisma.product.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProductUpdateArgs>(args: SelectSubset<T, ProductUpdateArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Products.
     * @param {ProductDeleteManyArgs} args - Arguments to filter Products to delete.
     * @example
     * // Delete a few Products
     * const { count } = await prisma.product.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProductDeleteManyArgs>(args?: SelectSubset<T, ProductDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProductUpdateManyArgs>(args: SelectSubset<T, ProductUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Products and returns the data updated in the database.
     * @param {ProductUpdateManyAndReturnArgs} args - Arguments to update many Products.
     * @example
     * // Update many Products
     * const product = await prisma.product.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Products and only return the `id`
     * const productWithIdOnly = await prisma.product.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ProductUpdateManyAndReturnArgs>(args: SelectSubset<T, ProductUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Product.
     * @param {ProductUpsertArgs} args - Arguments to update or create a Product.
     * @example
     * // Update or create a Product
     * const product = await prisma.product.upsert({
     *   create: {
     *     // ... data to create a Product
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Product we want to update
     *   }
     * })
     */
    upsert<T extends ProductUpsertArgs>(args: SelectSubset<T, ProductUpsertArgs<ExtArgs>>): Prisma__ProductClient<$Result.GetResult<Prisma.$ProductPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Products.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductCountArgs} args - Arguments to filter Products to count.
     * @example
     * // Count the number of Products
     * const count = await prisma.product.count({
     *   where: {
     *     // ... the filter for the Products we want to count
     *   }
     * })
    **/
    count<T extends ProductCountArgs>(
      args?: Subset<T, ProductCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProductCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProductAggregateArgs>(args: Subset<T, ProductAggregateArgs>): Prisma.PrismaPromise<GetProductAggregateType<T>>

    /**
     * Group by Product.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProductGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProductGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProductGroupByArgs['orderBy'] }
        : { orderBy?: ProductGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProductGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProductGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Product model
   */
  readonly fields: ProductFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Product.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProductClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Product model
   */
  interface ProductFieldRefs {
    readonly id: FieldRef<"Product", 'String'>
    readonly name: FieldRef<"Product", 'String'>
    readonly description: FieldRef<"Product", 'String'>
    readonly short_description: FieldRef<"Product", 'String'>
    readonly price: FieldRef<"Product", 'Float'>
    readonly category: FieldRef<"Product", 'String'>
    readonly specifications: FieldRef<"Product", 'String'>
    readonly slug: FieldRef<"Product", 'String'>
    readonly featured_image: FieldRef<"Product", 'Json'>
    readonly is_featured: FieldRef<"Product", 'Boolean'>
    readonly createdAt: FieldRef<"Product", 'DateTime'>
    readonly updatedAt: FieldRef<"Product", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Product findUnique
   */
  export type ProductFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findUniqueOrThrow
   */
  export type ProductFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product findFirst
   */
  export type ProductFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findFirstOrThrow
   */
  export type ProductFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Product to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Products.
     */
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product findMany
   */
  export type ProductFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter, which Products to fetch.
     */
    where?: ProductWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Products to fetch.
     */
    orderBy?: ProductOrderByWithRelationInput | ProductOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Products.
     */
    cursor?: ProductWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Products from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Products.
     */
    skip?: number
    distinct?: ProductScalarFieldEnum | ProductScalarFieldEnum[]
  }

  /**
   * Product create
   */
  export type ProductCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to create a Product.
     */
    data: XOR<ProductCreateInput, ProductUncheckedCreateInput>
  }

  /**
   * Product createMany
   */
  export type ProductCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product createManyAndReturn
   */
  export type ProductCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to create many Products.
     */
    data: ProductCreateManyInput | ProductCreateManyInput[]
  }

  /**
   * Product update
   */
  export type ProductUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data needed to update a Product.
     */
    data: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
    /**
     * Choose, which Product to update.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product updateMany
   */
  export type ProductUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product updateManyAndReturn
   */
  export type ProductUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The data used to update Products.
     */
    data: XOR<ProductUpdateManyMutationInput, ProductUncheckedUpdateManyInput>
    /**
     * Filter which Products to update
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to update.
     */
    limit?: number
  }

  /**
   * Product upsert
   */
  export type ProductUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * The filter to search for the Product to update in case it exists.
     */
    where: ProductWhereUniqueInput
    /**
     * In case the Product found by the `where` argument doesn't exist, create a new Product with this data.
     */
    create: XOR<ProductCreateInput, ProductUncheckedCreateInput>
    /**
     * In case the Product was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProductUpdateInput, ProductUncheckedUpdateInput>
  }

  /**
   * Product delete
   */
  export type ProductDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
    /**
     * Filter which Product to delete.
     */
    where: ProductWhereUniqueInput
  }

  /**
   * Product deleteMany
   */
  export type ProductDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Products to delete
     */
    where?: ProductWhereInput
    /**
     * Limit how many Products to delete.
     */
    limit?: number
  }

  /**
   * Product without action
   */
  export type ProductDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Product
     */
    select?: ProductSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Product
     */
    omit?: ProductOmit<ExtArgs> | null
  }


  /**
   * Model IndustrySite
   */

  export type AggregateIndustrySite = {
    _count: IndustrySiteCountAggregateOutputType | null
    _min: IndustrySiteMinAggregateOutputType | null
    _max: IndustrySiteMaxAggregateOutputType | null
  }

  export type IndustrySiteMinAggregateOutputType = {
    id: string | null
    site_name: string | null
    site_title: string | null
    industry_name: string | null
    sub_domain: string | null
    subdomain: string | null
    meta_description: string | null
    contact_email: string | null
    contact_phone: string | null
    address: string | null
    social_links: string | null
    ssl_status: string | null
    header_style_id: string | null
    footer_style_id: string | null
    banner_style_id: string | null
    news_detail_style_id: string | null
    news_list_style_id: string | null
    site_status: string | null
    bound_user_id: string | null
    ai_news_toggle: boolean | null
    about_text: string | null
    is_active: boolean | null
    custom_css: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IndustrySiteMaxAggregateOutputType = {
    id: string | null
    site_name: string | null
    site_title: string | null
    industry_name: string | null
    sub_domain: string | null
    subdomain: string | null
    meta_description: string | null
    contact_email: string | null
    contact_phone: string | null
    address: string | null
    social_links: string | null
    ssl_status: string | null
    header_style_id: string | null
    footer_style_id: string | null
    banner_style_id: string | null
    news_detail_style_id: string | null
    news_list_style_id: string | null
    site_status: string | null
    bound_user_id: string | null
    ai_news_toggle: boolean | null
    about_text: string | null
    is_active: boolean | null
    custom_css: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type IndustrySiteCountAggregateOutputType = {
    id: number
    site_name: number
    site_title: number
    industry_name: number
    sub_domain: number
    subdomain: number
    meta_description: number
    logo: number
    favicon: number
    contact_email: number
    contact_phone: number
    address: number
    social_links: number
    ssl_status: number
    header_style_id: number
    footer_style_id: number
    banner_style_id: number
    news_detail_style_id: number
    news_list_style_id: number
    site_status: number
    bound_user_id: number
    ai_news_toggle: number
    about_text: number
    is_active: number
    custom_css: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type IndustrySiteMinAggregateInputType = {
    id?: true
    site_name?: true
    site_title?: true
    industry_name?: true
    sub_domain?: true
    subdomain?: true
    meta_description?: true
    contact_email?: true
    contact_phone?: true
    address?: true
    social_links?: true
    ssl_status?: true
    header_style_id?: true
    footer_style_id?: true
    banner_style_id?: true
    news_detail_style_id?: true
    news_list_style_id?: true
    site_status?: true
    bound_user_id?: true
    ai_news_toggle?: true
    about_text?: true
    is_active?: true
    custom_css?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IndustrySiteMaxAggregateInputType = {
    id?: true
    site_name?: true
    site_title?: true
    industry_name?: true
    sub_domain?: true
    subdomain?: true
    meta_description?: true
    contact_email?: true
    contact_phone?: true
    address?: true
    social_links?: true
    ssl_status?: true
    header_style_id?: true
    footer_style_id?: true
    banner_style_id?: true
    news_detail_style_id?: true
    news_list_style_id?: true
    site_status?: true
    bound_user_id?: true
    ai_news_toggle?: true
    about_text?: true
    is_active?: true
    custom_css?: true
    createdAt?: true
    updatedAt?: true
  }

  export type IndustrySiteCountAggregateInputType = {
    id?: true
    site_name?: true
    site_title?: true
    industry_name?: true
    sub_domain?: true
    subdomain?: true
    meta_description?: true
    logo?: true
    favicon?: true
    contact_email?: true
    contact_phone?: true
    address?: true
    social_links?: true
    ssl_status?: true
    header_style_id?: true
    footer_style_id?: true
    banner_style_id?: true
    news_detail_style_id?: true
    news_list_style_id?: true
    site_status?: true
    bound_user_id?: true
    ai_news_toggle?: true
    about_text?: true
    is_active?: true
    custom_css?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type IndustrySiteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IndustrySite to aggregate.
     */
    where?: IndustrySiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustrySites to fetch.
     */
    orderBy?: IndustrySiteOrderByWithRelationInput | IndustrySiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IndustrySiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustrySites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustrySites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned IndustrySites
    **/
    _count?: true | IndustrySiteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IndustrySiteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IndustrySiteMaxAggregateInputType
  }

  export type GetIndustrySiteAggregateType<T extends IndustrySiteAggregateArgs> = {
        [P in keyof T & keyof AggregateIndustrySite]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIndustrySite[P]>
      : GetScalarType<T[P], AggregateIndustrySite[P]>
  }




  export type IndustrySiteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IndustrySiteWhereInput
    orderBy?: IndustrySiteOrderByWithAggregationInput | IndustrySiteOrderByWithAggregationInput[]
    by: IndustrySiteScalarFieldEnum[] | IndustrySiteScalarFieldEnum
    having?: IndustrySiteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IndustrySiteCountAggregateInputType | true
    _min?: IndustrySiteMinAggregateInputType
    _max?: IndustrySiteMaxAggregateInputType
  }

  export type IndustrySiteGroupByOutputType = {
    id: string
    site_name: string
    site_title: string | null
    industry_name: string | null
    sub_domain: string
    subdomain: string | null
    meta_description: string | null
    logo: JsonValue | null
    favicon: JsonValue | null
    contact_email: string | null
    contact_phone: string | null
    address: string | null
    social_links: string | null
    ssl_status: string | null
    header_style_id: string | null
    footer_style_id: string | null
    banner_style_id: string | null
    news_detail_style_id: string | null
    news_list_style_id: string | null
    site_status: string | null
    bound_user_id: string | null
    ai_news_toggle: boolean | null
    about_text: string | null
    is_active: boolean
    custom_css: string | null
    createdAt: Date
    updatedAt: Date
    _count: IndustrySiteCountAggregateOutputType | null
    _min: IndustrySiteMinAggregateOutputType | null
    _max: IndustrySiteMaxAggregateOutputType | null
  }

  type GetIndustrySiteGroupByPayload<T extends IndustrySiteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IndustrySiteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IndustrySiteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IndustrySiteGroupByOutputType[P]>
            : GetScalarType<T[P], IndustrySiteGroupByOutputType[P]>
        }
      >
    >


  export type IndustrySiteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site_name?: boolean
    site_title?: boolean
    industry_name?: boolean
    sub_domain?: boolean
    subdomain?: boolean
    meta_description?: boolean
    logo?: boolean
    favicon?: boolean
    contact_email?: boolean
    contact_phone?: boolean
    address?: boolean
    social_links?: boolean
    ssl_status?: boolean
    header_style_id?: boolean
    footer_style_id?: boolean
    banner_style_id?: boolean
    news_detail_style_id?: boolean
    news_list_style_id?: boolean
    site_status?: boolean
    bound_user_id?: boolean
    ai_news_toggle?: boolean
    about_text?: boolean
    is_active?: boolean
    custom_css?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["industrySite"]>

  export type IndustrySiteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site_name?: boolean
    site_title?: boolean
    industry_name?: boolean
    sub_domain?: boolean
    subdomain?: boolean
    meta_description?: boolean
    logo?: boolean
    favicon?: boolean
    contact_email?: boolean
    contact_phone?: boolean
    address?: boolean
    social_links?: boolean
    ssl_status?: boolean
    header_style_id?: boolean
    footer_style_id?: boolean
    banner_style_id?: boolean
    news_detail_style_id?: boolean
    news_list_style_id?: boolean
    site_status?: boolean
    bound_user_id?: boolean
    ai_news_toggle?: boolean
    about_text?: boolean
    is_active?: boolean
    custom_css?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["industrySite"]>

  export type IndustrySiteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    site_name?: boolean
    site_title?: boolean
    industry_name?: boolean
    sub_domain?: boolean
    subdomain?: boolean
    meta_description?: boolean
    logo?: boolean
    favicon?: boolean
    contact_email?: boolean
    contact_phone?: boolean
    address?: boolean
    social_links?: boolean
    ssl_status?: boolean
    header_style_id?: boolean
    footer_style_id?: boolean
    banner_style_id?: boolean
    news_detail_style_id?: boolean
    news_list_style_id?: boolean
    site_status?: boolean
    bound_user_id?: boolean
    ai_news_toggle?: boolean
    about_text?: boolean
    is_active?: boolean
    custom_css?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["industrySite"]>

  export type IndustrySiteSelectScalar = {
    id?: boolean
    site_name?: boolean
    site_title?: boolean
    industry_name?: boolean
    sub_domain?: boolean
    subdomain?: boolean
    meta_description?: boolean
    logo?: boolean
    favicon?: boolean
    contact_email?: boolean
    contact_phone?: boolean
    address?: boolean
    social_links?: boolean
    ssl_status?: boolean
    header_style_id?: boolean
    footer_style_id?: boolean
    banner_style_id?: boolean
    news_detail_style_id?: boolean
    news_list_style_id?: boolean
    site_status?: boolean
    bound_user_id?: boolean
    ai_news_toggle?: boolean
    about_text?: boolean
    is_active?: boolean
    custom_css?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type IndustrySiteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "site_name" | "site_title" | "industry_name" | "sub_domain" | "subdomain" | "meta_description" | "logo" | "favicon" | "contact_email" | "contact_phone" | "address" | "social_links" | "ssl_status" | "header_style_id" | "footer_style_id" | "banner_style_id" | "news_detail_style_id" | "news_list_style_id" | "site_status" | "bound_user_id" | "ai_news_toggle" | "about_text" | "is_active" | "custom_css" | "createdAt" | "updatedAt", ExtArgs["result"]["industrySite"]>

  export type $IndustrySitePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "IndustrySite"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      site_name: string
      site_title: string | null
      industry_name: string | null
      sub_domain: string
      subdomain: string | null
      meta_description: string | null
      logo: Prisma.JsonValue | null
      favicon: Prisma.JsonValue | null
      contact_email: string | null
      contact_phone: string | null
      address: string | null
      social_links: string | null
      ssl_status: string | null
      header_style_id: string | null
      footer_style_id: string | null
      banner_style_id: string | null
      news_detail_style_id: string | null
      news_list_style_id: string | null
      site_status: string | null
      bound_user_id: string | null
      ai_news_toggle: boolean | null
      about_text: string | null
      is_active: boolean
      custom_css: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["industrySite"]>
    composites: {}
  }

  type IndustrySiteGetPayload<S extends boolean | null | undefined | IndustrySiteDefaultArgs> = $Result.GetResult<Prisma.$IndustrySitePayload, S>

  type IndustrySiteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IndustrySiteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IndustrySiteCountAggregateInputType | true
    }

  export interface IndustrySiteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['IndustrySite'], meta: { name: 'IndustrySite' } }
    /**
     * Find zero or one IndustrySite that matches the filter.
     * @param {IndustrySiteFindUniqueArgs} args - Arguments to find a IndustrySite
     * @example
     * // Get one IndustrySite
     * const industrySite = await prisma.industrySite.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IndustrySiteFindUniqueArgs>(args: SelectSubset<T, IndustrySiteFindUniqueArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one IndustrySite that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IndustrySiteFindUniqueOrThrowArgs} args - Arguments to find a IndustrySite
     * @example
     * // Get one IndustrySite
     * const industrySite = await prisma.industrySite.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IndustrySiteFindUniqueOrThrowArgs>(args: SelectSubset<T, IndustrySiteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IndustrySite that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustrySiteFindFirstArgs} args - Arguments to find a IndustrySite
     * @example
     * // Get one IndustrySite
     * const industrySite = await prisma.industrySite.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IndustrySiteFindFirstArgs>(args?: SelectSubset<T, IndustrySiteFindFirstArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first IndustrySite that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustrySiteFindFirstOrThrowArgs} args - Arguments to find a IndustrySite
     * @example
     * // Get one IndustrySite
     * const industrySite = await prisma.industrySite.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IndustrySiteFindFirstOrThrowArgs>(args?: SelectSubset<T, IndustrySiteFindFirstOrThrowArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more IndustrySites that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustrySiteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all IndustrySites
     * const industrySites = await prisma.industrySite.findMany()
     * 
     * // Get first 10 IndustrySites
     * const industrySites = await prisma.industrySite.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const industrySiteWithIdOnly = await prisma.industrySite.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends IndustrySiteFindManyArgs>(args?: SelectSubset<T, IndustrySiteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a IndustrySite.
     * @param {IndustrySiteCreateArgs} args - Arguments to create a IndustrySite.
     * @example
     * // Create one IndustrySite
     * const IndustrySite = await prisma.industrySite.create({
     *   data: {
     *     // ... data to create a IndustrySite
     *   }
     * })
     * 
     */
    create<T extends IndustrySiteCreateArgs>(args: SelectSubset<T, IndustrySiteCreateArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many IndustrySites.
     * @param {IndustrySiteCreateManyArgs} args - Arguments to create many IndustrySites.
     * @example
     * // Create many IndustrySites
     * const industrySite = await prisma.industrySite.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IndustrySiteCreateManyArgs>(args?: SelectSubset<T, IndustrySiteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many IndustrySites and returns the data saved in the database.
     * @param {IndustrySiteCreateManyAndReturnArgs} args - Arguments to create many IndustrySites.
     * @example
     * // Create many IndustrySites
     * const industrySite = await prisma.industrySite.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many IndustrySites and only return the `id`
     * const industrySiteWithIdOnly = await prisma.industrySite.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IndustrySiteCreateManyAndReturnArgs>(args?: SelectSubset<T, IndustrySiteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a IndustrySite.
     * @param {IndustrySiteDeleteArgs} args - Arguments to delete one IndustrySite.
     * @example
     * // Delete one IndustrySite
     * const IndustrySite = await prisma.industrySite.delete({
     *   where: {
     *     // ... filter to delete one IndustrySite
     *   }
     * })
     * 
     */
    delete<T extends IndustrySiteDeleteArgs>(args: SelectSubset<T, IndustrySiteDeleteArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one IndustrySite.
     * @param {IndustrySiteUpdateArgs} args - Arguments to update one IndustrySite.
     * @example
     * // Update one IndustrySite
     * const industrySite = await prisma.industrySite.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IndustrySiteUpdateArgs>(args: SelectSubset<T, IndustrySiteUpdateArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more IndustrySites.
     * @param {IndustrySiteDeleteManyArgs} args - Arguments to filter IndustrySites to delete.
     * @example
     * // Delete a few IndustrySites
     * const { count } = await prisma.industrySite.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IndustrySiteDeleteManyArgs>(args?: SelectSubset<T, IndustrySiteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IndustrySites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustrySiteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many IndustrySites
     * const industrySite = await prisma.industrySite.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IndustrySiteUpdateManyArgs>(args: SelectSubset<T, IndustrySiteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more IndustrySites and returns the data updated in the database.
     * @param {IndustrySiteUpdateManyAndReturnArgs} args - Arguments to update many IndustrySites.
     * @example
     * // Update many IndustrySites
     * const industrySite = await prisma.industrySite.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more IndustrySites and only return the `id`
     * const industrySiteWithIdOnly = await prisma.industrySite.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IndustrySiteUpdateManyAndReturnArgs>(args: SelectSubset<T, IndustrySiteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one IndustrySite.
     * @param {IndustrySiteUpsertArgs} args - Arguments to update or create a IndustrySite.
     * @example
     * // Update or create a IndustrySite
     * const industrySite = await prisma.industrySite.upsert({
     *   create: {
     *     // ... data to create a IndustrySite
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the IndustrySite we want to update
     *   }
     * })
     */
    upsert<T extends IndustrySiteUpsertArgs>(args: SelectSubset<T, IndustrySiteUpsertArgs<ExtArgs>>): Prisma__IndustrySiteClient<$Result.GetResult<Prisma.$IndustrySitePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of IndustrySites.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustrySiteCountArgs} args - Arguments to filter IndustrySites to count.
     * @example
     * // Count the number of IndustrySites
     * const count = await prisma.industrySite.count({
     *   where: {
     *     // ... the filter for the IndustrySites we want to count
     *   }
     * })
    **/
    count<T extends IndustrySiteCountArgs>(
      args?: Subset<T, IndustrySiteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IndustrySiteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a IndustrySite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustrySiteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IndustrySiteAggregateArgs>(args: Subset<T, IndustrySiteAggregateArgs>): Prisma.PrismaPromise<GetIndustrySiteAggregateType<T>>

    /**
     * Group by IndustrySite.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IndustrySiteGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IndustrySiteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IndustrySiteGroupByArgs['orderBy'] }
        : { orderBy?: IndustrySiteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IndustrySiteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIndustrySiteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the IndustrySite model
   */
  readonly fields: IndustrySiteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for IndustrySite.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IndustrySiteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the IndustrySite model
   */
  interface IndustrySiteFieldRefs {
    readonly id: FieldRef<"IndustrySite", 'String'>
    readonly site_name: FieldRef<"IndustrySite", 'String'>
    readonly site_title: FieldRef<"IndustrySite", 'String'>
    readonly industry_name: FieldRef<"IndustrySite", 'String'>
    readonly sub_domain: FieldRef<"IndustrySite", 'String'>
    readonly subdomain: FieldRef<"IndustrySite", 'String'>
    readonly meta_description: FieldRef<"IndustrySite", 'String'>
    readonly logo: FieldRef<"IndustrySite", 'Json'>
    readonly favicon: FieldRef<"IndustrySite", 'Json'>
    readonly contact_email: FieldRef<"IndustrySite", 'String'>
    readonly contact_phone: FieldRef<"IndustrySite", 'String'>
    readonly address: FieldRef<"IndustrySite", 'String'>
    readonly social_links: FieldRef<"IndustrySite", 'String'>
    readonly ssl_status: FieldRef<"IndustrySite", 'String'>
    readonly header_style_id: FieldRef<"IndustrySite", 'String'>
    readonly footer_style_id: FieldRef<"IndustrySite", 'String'>
    readonly banner_style_id: FieldRef<"IndustrySite", 'String'>
    readonly news_detail_style_id: FieldRef<"IndustrySite", 'String'>
    readonly news_list_style_id: FieldRef<"IndustrySite", 'String'>
    readonly site_status: FieldRef<"IndustrySite", 'String'>
    readonly bound_user_id: FieldRef<"IndustrySite", 'String'>
    readonly ai_news_toggle: FieldRef<"IndustrySite", 'Boolean'>
    readonly about_text: FieldRef<"IndustrySite", 'String'>
    readonly is_active: FieldRef<"IndustrySite", 'Boolean'>
    readonly custom_css: FieldRef<"IndustrySite", 'String'>
    readonly createdAt: FieldRef<"IndustrySite", 'DateTime'>
    readonly updatedAt: FieldRef<"IndustrySite", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * IndustrySite findUnique
   */
  export type IndustrySiteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * Filter, which IndustrySite to fetch.
     */
    where: IndustrySiteWhereUniqueInput
  }

  /**
   * IndustrySite findUniqueOrThrow
   */
  export type IndustrySiteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * Filter, which IndustrySite to fetch.
     */
    where: IndustrySiteWhereUniqueInput
  }

  /**
   * IndustrySite findFirst
   */
  export type IndustrySiteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * Filter, which IndustrySite to fetch.
     */
    where?: IndustrySiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustrySites to fetch.
     */
    orderBy?: IndustrySiteOrderByWithRelationInput | IndustrySiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IndustrySites.
     */
    cursor?: IndustrySiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustrySites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustrySites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IndustrySites.
     */
    distinct?: IndustrySiteScalarFieldEnum | IndustrySiteScalarFieldEnum[]
  }

  /**
   * IndustrySite findFirstOrThrow
   */
  export type IndustrySiteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * Filter, which IndustrySite to fetch.
     */
    where?: IndustrySiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustrySites to fetch.
     */
    orderBy?: IndustrySiteOrderByWithRelationInput | IndustrySiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for IndustrySites.
     */
    cursor?: IndustrySiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustrySites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustrySites.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of IndustrySites.
     */
    distinct?: IndustrySiteScalarFieldEnum | IndustrySiteScalarFieldEnum[]
  }

  /**
   * IndustrySite findMany
   */
  export type IndustrySiteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * Filter, which IndustrySites to fetch.
     */
    where?: IndustrySiteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of IndustrySites to fetch.
     */
    orderBy?: IndustrySiteOrderByWithRelationInput | IndustrySiteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing IndustrySites.
     */
    cursor?: IndustrySiteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` IndustrySites from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` IndustrySites.
     */
    skip?: number
    distinct?: IndustrySiteScalarFieldEnum | IndustrySiteScalarFieldEnum[]
  }

  /**
   * IndustrySite create
   */
  export type IndustrySiteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * The data needed to create a IndustrySite.
     */
    data: XOR<IndustrySiteCreateInput, IndustrySiteUncheckedCreateInput>
  }

  /**
   * IndustrySite createMany
   */
  export type IndustrySiteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many IndustrySites.
     */
    data: IndustrySiteCreateManyInput | IndustrySiteCreateManyInput[]
  }

  /**
   * IndustrySite createManyAndReturn
   */
  export type IndustrySiteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * The data used to create many IndustrySites.
     */
    data: IndustrySiteCreateManyInput | IndustrySiteCreateManyInput[]
  }

  /**
   * IndustrySite update
   */
  export type IndustrySiteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * The data needed to update a IndustrySite.
     */
    data: XOR<IndustrySiteUpdateInput, IndustrySiteUncheckedUpdateInput>
    /**
     * Choose, which IndustrySite to update.
     */
    where: IndustrySiteWhereUniqueInput
  }

  /**
   * IndustrySite updateMany
   */
  export type IndustrySiteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update IndustrySites.
     */
    data: XOR<IndustrySiteUpdateManyMutationInput, IndustrySiteUncheckedUpdateManyInput>
    /**
     * Filter which IndustrySites to update
     */
    where?: IndustrySiteWhereInput
    /**
     * Limit how many IndustrySites to update.
     */
    limit?: number
  }

  /**
   * IndustrySite updateManyAndReturn
   */
  export type IndustrySiteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * The data used to update IndustrySites.
     */
    data: XOR<IndustrySiteUpdateManyMutationInput, IndustrySiteUncheckedUpdateManyInput>
    /**
     * Filter which IndustrySites to update
     */
    where?: IndustrySiteWhereInput
    /**
     * Limit how many IndustrySites to update.
     */
    limit?: number
  }

  /**
   * IndustrySite upsert
   */
  export type IndustrySiteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * The filter to search for the IndustrySite to update in case it exists.
     */
    where: IndustrySiteWhereUniqueInput
    /**
     * In case the IndustrySite found by the `where` argument doesn't exist, create a new IndustrySite with this data.
     */
    create: XOR<IndustrySiteCreateInput, IndustrySiteUncheckedCreateInput>
    /**
     * In case the IndustrySite was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IndustrySiteUpdateInput, IndustrySiteUncheckedUpdateInput>
  }

  /**
   * IndustrySite delete
   */
  export type IndustrySiteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
    /**
     * Filter which IndustrySite to delete.
     */
    where: IndustrySiteWhereUniqueInput
  }

  /**
   * IndustrySite deleteMany
   */
  export type IndustrySiteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which IndustrySites to delete
     */
    where?: IndustrySiteWhereInput
    /**
     * Limit how many IndustrySites to delete.
     */
    limit?: number
  }

  /**
   * IndustrySite without action
   */
  export type IndustrySiteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the IndustrySite
     */
    select?: IndustrySiteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the IndustrySite
     */
    omit?: IndustrySiteOmit<ExtArgs> | null
  }


  /**
   * Model NewsContent
   */

  export type AggregateNewsContent = {
    _count: NewsContentCountAggregateOutputType | null
    _avg: NewsContentAvgAggregateOutputType | null
    _sum: NewsContentSumAggregateOutputType | null
    _min: NewsContentMinAggregateOutputType | null
    _max: NewsContentMaxAggregateOutputType | null
  }

  export type NewsContentAvgAggregateOutputType = {
    publication_time: number | null
  }

  export type NewsContentSumAggregateOutputType = {
    publication_time: bigint | null
  }

  export type NewsContentMinAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    industry: string | null
    publication_time: bigint | null
    summary: string | null
    author: string | null
    status: string | null
    source: string | null
    is_featured: boolean | null
    slug: string | null
    original_url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsContentMaxAggregateOutputType = {
    id: string | null
    title: string | null
    content: string | null
    industry: string | null
    publication_time: bigint | null
    summary: string | null
    author: string | null
    status: string | null
    source: string | null
    is_featured: boolean | null
    slug: string | null
    original_url: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type NewsContentCountAggregateOutputType = {
    id: number
    title: number
    content: number
    industry: number
    publication_time: number
    summary: number
    thumbnail: number
    author: number
    status: number
    source: number
    is_featured: number
    slug: number
    original_url: number
    related_products: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type NewsContentAvgAggregateInputType = {
    publication_time?: true
  }

  export type NewsContentSumAggregateInputType = {
    publication_time?: true
  }

  export type NewsContentMinAggregateInputType = {
    id?: true
    title?: true
    content?: true
    industry?: true
    publication_time?: true
    summary?: true
    author?: true
    status?: true
    source?: true
    is_featured?: true
    slug?: true
    original_url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsContentMaxAggregateInputType = {
    id?: true
    title?: true
    content?: true
    industry?: true
    publication_time?: true
    summary?: true
    author?: true
    status?: true
    source?: true
    is_featured?: true
    slug?: true
    original_url?: true
    createdAt?: true
    updatedAt?: true
  }

  export type NewsContentCountAggregateInputType = {
    id?: true
    title?: true
    content?: true
    industry?: true
    publication_time?: true
    summary?: true
    thumbnail?: true
    author?: true
    status?: true
    source?: true
    is_featured?: true
    slug?: true
    original_url?: true
    related_products?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type NewsContentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsContent to aggregate.
     */
    where?: NewsContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsContents to fetch.
     */
    orderBy?: NewsContentOrderByWithRelationInput | NewsContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: NewsContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned NewsContents
    **/
    _count?: true | NewsContentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: NewsContentAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: NewsContentSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NewsContentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NewsContentMaxAggregateInputType
  }

  export type GetNewsContentAggregateType<T extends NewsContentAggregateArgs> = {
        [P in keyof T & keyof AggregateNewsContent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNewsContent[P]>
      : GetScalarType<T[P], AggregateNewsContent[P]>
  }




  export type NewsContentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: NewsContentWhereInput
    orderBy?: NewsContentOrderByWithAggregationInput | NewsContentOrderByWithAggregationInput[]
    by: NewsContentScalarFieldEnum[] | NewsContentScalarFieldEnum
    having?: NewsContentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NewsContentCountAggregateInputType | true
    _avg?: NewsContentAvgAggregateInputType
    _sum?: NewsContentSumAggregateInputType
    _min?: NewsContentMinAggregateInputType
    _max?: NewsContentMaxAggregateInputType
  }

  export type NewsContentGroupByOutputType = {
    id: string
    title: string
    content: string
    industry: string | null
    publication_time: bigint | null
    summary: string | null
    thumbnail: JsonValue | null
    author: string | null
    status: string
    source: string | null
    is_featured: boolean
    slug: string
    original_url: string | null
    related_products: JsonValue | null
    createdAt: Date
    updatedAt: Date
    _count: NewsContentCountAggregateOutputType | null
    _avg: NewsContentAvgAggregateOutputType | null
    _sum: NewsContentSumAggregateOutputType | null
    _min: NewsContentMinAggregateOutputType | null
    _max: NewsContentMaxAggregateOutputType | null
  }

  type GetNewsContentGroupByPayload<T extends NewsContentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NewsContentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NewsContentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NewsContentGroupByOutputType[P]>
            : GetScalarType<T[P], NewsContentGroupByOutputType[P]>
        }
      >
    >


  export type NewsContentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    industry?: boolean
    publication_time?: boolean
    summary?: boolean
    thumbnail?: boolean
    author?: boolean
    status?: boolean
    source?: boolean
    is_featured?: boolean
    slug?: boolean
    original_url?: boolean
    related_products?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsContent"]>

  export type NewsContentSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    industry?: boolean
    publication_time?: boolean
    summary?: boolean
    thumbnail?: boolean
    author?: boolean
    status?: boolean
    source?: boolean
    is_featured?: boolean
    slug?: boolean
    original_url?: boolean
    related_products?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsContent"]>

  export type NewsContentSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    title?: boolean
    content?: boolean
    industry?: boolean
    publication_time?: boolean
    summary?: boolean
    thumbnail?: boolean
    author?: boolean
    status?: boolean
    source?: boolean
    is_featured?: boolean
    slug?: boolean
    original_url?: boolean
    related_products?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["newsContent"]>

  export type NewsContentSelectScalar = {
    id?: boolean
    title?: boolean
    content?: boolean
    industry?: boolean
    publication_time?: boolean
    summary?: boolean
    thumbnail?: boolean
    author?: boolean
    status?: boolean
    source?: boolean
    is_featured?: boolean
    slug?: boolean
    original_url?: boolean
    related_products?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type NewsContentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "title" | "content" | "industry" | "publication_time" | "summary" | "thumbnail" | "author" | "status" | "source" | "is_featured" | "slug" | "original_url" | "related_products" | "createdAt" | "updatedAt", ExtArgs["result"]["newsContent"]>

  export type $NewsContentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "NewsContent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      title: string
      content: string
      industry: string | null
      publication_time: bigint | null
      summary: string | null
      thumbnail: Prisma.JsonValue | null
      author: string | null
      status: string
      source: string | null
      is_featured: boolean
      slug: string
      original_url: string | null
      related_products: Prisma.JsonValue | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["newsContent"]>
    composites: {}
  }

  type NewsContentGetPayload<S extends boolean | null | undefined | NewsContentDefaultArgs> = $Result.GetResult<Prisma.$NewsContentPayload, S>

  type NewsContentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<NewsContentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NewsContentCountAggregateInputType | true
    }

  export interface NewsContentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['NewsContent'], meta: { name: 'NewsContent' } }
    /**
     * Find zero or one NewsContent that matches the filter.
     * @param {NewsContentFindUniqueArgs} args - Arguments to find a NewsContent
     * @example
     * // Get one NewsContent
     * const newsContent = await prisma.newsContent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends NewsContentFindUniqueArgs>(args: SelectSubset<T, NewsContentFindUniqueArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one NewsContent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {NewsContentFindUniqueOrThrowArgs} args - Arguments to find a NewsContent
     * @example
     * // Get one NewsContent
     * const newsContent = await prisma.newsContent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends NewsContentFindUniqueOrThrowArgs>(args: SelectSubset<T, NewsContentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsContent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsContentFindFirstArgs} args - Arguments to find a NewsContent
     * @example
     * // Get one NewsContent
     * const newsContent = await prisma.newsContent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends NewsContentFindFirstArgs>(args?: SelectSubset<T, NewsContentFindFirstArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first NewsContent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsContentFindFirstOrThrowArgs} args - Arguments to find a NewsContent
     * @example
     * // Get one NewsContent
     * const newsContent = await prisma.newsContent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends NewsContentFindFirstOrThrowArgs>(args?: SelectSubset<T, NewsContentFindFirstOrThrowArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more NewsContents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsContentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all NewsContents
     * const newsContents = await prisma.newsContent.findMany()
     * 
     * // Get first 10 NewsContents
     * const newsContents = await prisma.newsContent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const newsContentWithIdOnly = await prisma.newsContent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends NewsContentFindManyArgs>(args?: SelectSubset<T, NewsContentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a NewsContent.
     * @param {NewsContentCreateArgs} args - Arguments to create a NewsContent.
     * @example
     * // Create one NewsContent
     * const NewsContent = await prisma.newsContent.create({
     *   data: {
     *     // ... data to create a NewsContent
     *   }
     * })
     * 
     */
    create<T extends NewsContentCreateArgs>(args: SelectSubset<T, NewsContentCreateArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many NewsContents.
     * @param {NewsContentCreateManyArgs} args - Arguments to create many NewsContents.
     * @example
     * // Create many NewsContents
     * const newsContent = await prisma.newsContent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends NewsContentCreateManyArgs>(args?: SelectSubset<T, NewsContentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many NewsContents and returns the data saved in the database.
     * @param {NewsContentCreateManyAndReturnArgs} args - Arguments to create many NewsContents.
     * @example
     * // Create many NewsContents
     * const newsContent = await prisma.newsContent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many NewsContents and only return the `id`
     * const newsContentWithIdOnly = await prisma.newsContent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends NewsContentCreateManyAndReturnArgs>(args?: SelectSubset<T, NewsContentCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a NewsContent.
     * @param {NewsContentDeleteArgs} args - Arguments to delete one NewsContent.
     * @example
     * // Delete one NewsContent
     * const NewsContent = await prisma.newsContent.delete({
     *   where: {
     *     // ... filter to delete one NewsContent
     *   }
     * })
     * 
     */
    delete<T extends NewsContentDeleteArgs>(args: SelectSubset<T, NewsContentDeleteArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one NewsContent.
     * @param {NewsContentUpdateArgs} args - Arguments to update one NewsContent.
     * @example
     * // Update one NewsContent
     * const newsContent = await prisma.newsContent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends NewsContentUpdateArgs>(args: SelectSubset<T, NewsContentUpdateArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more NewsContents.
     * @param {NewsContentDeleteManyArgs} args - Arguments to filter NewsContents to delete.
     * @example
     * // Delete a few NewsContents
     * const { count } = await prisma.newsContent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends NewsContentDeleteManyArgs>(args?: SelectSubset<T, NewsContentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsContentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many NewsContents
     * const newsContent = await prisma.newsContent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends NewsContentUpdateManyArgs>(args: SelectSubset<T, NewsContentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more NewsContents and returns the data updated in the database.
     * @param {NewsContentUpdateManyAndReturnArgs} args - Arguments to update many NewsContents.
     * @example
     * // Update many NewsContents
     * const newsContent = await prisma.newsContent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more NewsContents and only return the `id`
     * const newsContentWithIdOnly = await prisma.newsContent.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends NewsContentUpdateManyAndReturnArgs>(args: SelectSubset<T, NewsContentUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one NewsContent.
     * @param {NewsContentUpsertArgs} args - Arguments to update or create a NewsContent.
     * @example
     * // Update or create a NewsContent
     * const newsContent = await prisma.newsContent.upsert({
     *   create: {
     *     // ... data to create a NewsContent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the NewsContent we want to update
     *   }
     * })
     */
    upsert<T extends NewsContentUpsertArgs>(args: SelectSubset<T, NewsContentUpsertArgs<ExtArgs>>): Prisma__NewsContentClient<$Result.GetResult<Prisma.$NewsContentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of NewsContents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsContentCountArgs} args - Arguments to filter NewsContents to count.
     * @example
     * // Count the number of NewsContents
     * const count = await prisma.newsContent.count({
     *   where: {
     *     // ... the filter for the NewsContents we want to count
     *   }
     * })
    **/
    count<T extends NewsContentCountArgs>(
      args?: Subset<T, NewsContentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NewsContentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a NewsContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsContentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NewsContentAggregateArgs>(args: Subset<T, NewsContentAggregateArgs>): Prisma.PrismaPromise<GetNewsContentAggregateType<T>>

    /**
     * Group by NewsContent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NewsContentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends NewsContentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: NewsContentGroupByArgs['orderBy'] }
        : { orderBy?: NewsContentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, NewsContentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNewsContentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the NewsContent model
   */
  readonly fields: NewsContentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for NewsContent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__NewsContentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the NewsContent model
   */
  interface NewsContentFieldRefs {
    readonly id: FieldRef<"NewsContent", 'String'>
    readonly title: FieldRef<"NewsContent", 'String'>
    readonly content: FieldRef<"NewsContent", 'String'>
    readonly industry: FieldRef<"NewsContent", 'String'>
    readonly publication_time: FieldRef<"NewsContent", 'BigInt'>
    readonly summary: FieldRef<"NewsContent", 'String'>
    readonly thumbnail: FieldRef<"NewsContent", 'Json'>
    readonly author: FieldRef<"NewsContent", 'String'>
    readonly status: FieldRef<"NewsContent", 'String'>
    readonly source: FieldRef<"NewsContent", 'String'>
    readonly is_featured: FieldRef<"NewsContent", 'Boolean'>
    readonly slug: FieldRef<"NewsContent", 'String'>
    readonly original_url: FieldRef<"NewsContent", 'String'>
    readonly related_products: FieldRef<"NewsContent", 'Json'>
    readonly createdAt: FieldRef<"NewsContent", 'DateTime'>
    readonly updatedAt: FieldRef<"NewsContent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * NewsContent findUnique
   */
  export type NewsContentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * Filter, which NewsContent to fetch.
     */
    where: NewsContentWhereUniqueInput
  }

  /**
   * NewsContent findUniqueOrThrow
   */
  export type NewsContentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * Filter, which NewsContent to fetch.
     */
    where: NewsContentWhereUniqueInput
  }

  /**
   * NewsContent findFirst
   */
  export type NewsContentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * Filter, which NewsContent to fetch.
     */
    where?: NewsContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsContents to fetch.
     */
    orderBy?: NewsContentOrderByWithRelationInput | NewsContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsContents.
     */
    cursor?: NewsContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsContents.
     */
    distinct?: NewsContentScalarFieldEnum | NewsContentScalarFieldEnum[]
  }

  /**
   * NewsContent findFirstOrThrow
   */
  export type NewsContentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * Filter, which NewsContent to fetch.
     */
    where?: NewsContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsContents to fetch.
     */
    orderBy?: NewsContentOrderByWithRelationInput | NewsContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for NewsContents.
     */
    cursor?: NewsContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsContents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of NewsContents.
     */
    distinct?: NewsContentScalarFieldEnum | NewsContentScalarFieldEnum[]
  }

  /**
   * NewsContent findMany
   */
  export type NewsContentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * Filter, which NewsContents to fetch.
     */
    where?: NewsContentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of NewsContents to fetch.
     */
    orderBy?: NewsContentOrderByWithRelationInput | NewsContentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing NewsContents.
     */
    cursor?: NewsContentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` NewsContents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` NewsContents.
     */
    skip?: number
    distinct?: NewsContentScalarFieldEnum | NewsContentScalarFieldEnum[]
  }

  /**
   * NewsContent create
   */
  export type NewsContentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * The data needed to create a NewsContent.
     */
    data: XOR<NewsContentCreateInput, NewsContentUncheckedCreateInput>
  }

  /**
   * NewsContent createMany
   */
  export type NewsContentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many NewsContents.
     */
    data: NewsContentCreateManyInput | NewsContentCreateManyInput[]
  }

  /**
   * NewsContent createManyAndReturn
   */
  export type NewsContentCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * The data used to create many NewsContents.
     */
    data: NewsContentCreateManyInput | NewsContentCreateManyInput[]
  }

  /**
   * NewsContent update
   */
  export type NewsContentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * The data needed to update a NewsContent.
     */
    data: XOR<NewsContentUpdateInput, NewsContentUncheckedUpdateInput>
    /**
     * Choose, which NewsContent to update.
     */
    where: NewsContentWhereUniqueInput
  }

  /**
   * NewsContent updateMany
   */
  export type NewsContentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update NewsContents.
     */
    data: XOR<NewsContentUpdateManyMutationInput, NewsContentUncheckedUpdateManyInput>
    /**
     * Filter which NewsContents to update
     */
    where?: NewsContentWhereInput
    /**
     * Limit how many NewsContents to update.
     */
    limit?: number
  }

  /**
   * NewsContent updateManyAndReturn
   */
  export type NewsContentUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * The data used to update NewsContents.
     */
    data: XOR<NewsContentUpdateManyMutationInput, NewsContentUncheckedUpdateManyInput>
    /**
     * Filter which NewsContents to update
     */
    where?: NewsContentWhereInput
    /**
     * Limit how many NewsContents to update.
     */
    limit?: number
  }

  /**
   * NewsContent upsert
   */
  export type NewsContentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * The filter to search for the NewsContent to update in case it exists.
     */
    where: NewsContentWhereUniqueInput
    /**
     * In case the NewsContent found by the `where` argument doesn't exist, create a new NewsContent with this data.
     */
    create: XOR<NewsContentCreateInput, NewsContentUncheckedCreateInput>
    /**
     * In case the NewsContent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<NewsContentUpdateInput, NewsContentUncheckedUpdateInput>
  }

  /**
   * NewsContent delete
   */
  export type NewsContentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
    /**
     * Filter which NewsContent to delete.
     */
    where: NewsContentWhereUniqueInput
  }

  /**
   * NewsContent deleteMany
   */
  export type NewsContentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which NewsContents to delete
     */
    where?: NewsContentWhereInput
    /**
     * Limit how many NewsContents to delete.
     */
    limit?: number
  }

  /**
   * NewsContent without action
   */
  export type NewsContentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NewsContent
     */
    select?: NewsContentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the NewsContent
     */
    omit?: NewsContentOmit<ExtArgs> | null
  }


  /**
   * Model PlanCoupon
   */

  export type AggregatePlanCoupon = {
    _count: PlanCouponCountAggregateOutputType | null
    _avg: PlanCouponAvgAggregateOutputType | null
    _sum: PlanCouponSumAggregateOutputType | null
    _min: PlanCouponMinAggregateOutputType | null
    _max: PlanCouponMaxAggregateOutputType | null
  }

  export type PlanCouponAvgAggregateOutputType = {
    price: number | null
    discount_amount: number | null
    duration_days: number | null
    max_uses: number | null
    current_uses: number | null
    valid_until: number | null
  }

  export type PlanCouponSumAggregateOutputType = {
    price: number | null
    discount_amount: number | null
    duration_days: number | null
    max_uses: number | null
    current_uses: number | null
    valid_until: bigint | null
  }

  export type PlanCouponMinAggregateOutputType = {
    id: string | null
    type: string | null
    name: string | null
    code: string | null
    price: number | null
    discount_amount: number | null
    billing_cycle: string | null
    duration_days: number | null
    max_uses: number | null
    current_uses: number | null
    is_active: boolean | null
    valid_until: bigint | null
    features: string | null
    limits: string | null
    stripe_price_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCouponMaxAggregateOutputType = {
    id: string | null
    type: string | null
    name: string | null
    code: string | null
    price: number | null
    discount_amount: number | null
    billing_cycle: string | null
    duration_days: number | null
    max_uses: number | null
    current_uses: number | null
    is_active: boolean | null
    valid_until: bigint | null
    features: string | null
    limits: string | null
    stripe_price_id: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type PlanCouponCountAggregateOutputType = {
    id: number
    type: number
    name: number
    code: number
    price: number
    discount_amount: number
    billing_cycle: number
    duration_days: number
    max_uses: number
    current_uses: number
    is_active: number
    valid_until: number
    features: number
    limits: number
    stripe_price_id: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type PlanCouponAvgAggregateInputType = {
    price?: true
    discount_amount?: true
    duration_days?: true
    max_uses?: true
    current_uses?: true
    valid_until?: true
  }

  export type PlanCouponSumAggregateInputType = {
    price?: true
    discount_amount?: true
    duration_days?: true
    max_uses?: true
    current_uses?: true
    valid_until?: true
  }

  export type PlanCouponMinAggregateInputType = {
    id?: true
    type?: true
    name?: true
    code?: true
    price?: true
    discount_amount?: true
    billing_cycle?: true
    duration_days?: true
    max_uses?: true
    current_uses?: true
    is_active?: true
    valid_until?: true
    features?: true
    limits?: true
    stripe_price_id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCouponMaxAggregateInputType = {
    id?: true
    type?: true
    name?: true
    code?: true
    price?: true
    discount_amount?: true
    billing_cycle?: true
    duration_days?: true
    max_uses?: true
    current_uses?: true
    is_active?: true
    valid_until?: true
    features?: true
    limits?: true
    stripe_price_id?: true
    createdAt?: true
    updatedAt?: true
  }

  export type PlanCouponCountAggregateInputType = {
    id?: true
    type?: true
    name?: true
    code?: true
    price?: true
    discount_amount?: true
    billing_cycle?: true
    duration_days?: true
    max_uses?: true
    current_uses?: true
    is_active?: true
    valid_until?: true
    features?: true
    limits?: true
    stripe_price_id?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type PlanCouponAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanCoupon to aggregate.
     */
    where?: PlanCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanCoupons to fetch.
     */
    orderBy?: PlanCouponOrderByWithRelationInput | PlanCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PlanCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanCoupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PlanCoupons
    **/
    _count?: true | PlanCouponCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PlanCouponAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PlanCouponSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PlanCouponMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PlanCouponMaxAggregateInputType
  }

  export type GetPlanCouponAggregateType<T extends PlanCouponAggregateArgs> = {
        [P in keyof T & keyof AggregatePlanCoupon]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePlanCoupon[P]>
      : GetScalarType<T[P], AggregatePlanCoupon[P]>
  }




  export type PlanCouponGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PlanCouponWhereInput
    orderBy?: PlanCouponOrderByWithAggregationInput | PlanCouponOrderByWithAggregationInput[]
    by: PlanCouponScalarFieldEnum[] | PlanCouponScalarFieldEnum
    having?: PlanCouponScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PlanCouponCountAggregateInputType | true
    _avg?: PlanCouponAvgAggregateInputType
    _sum?: PlanCouponSumAggregateInputType
    _min?: PlanCouponMinAggregateInputType
    _max?: PlanCouponMaxAggregateInputType
  }

  export type PlanCouponGroupByOutputType = {
    id: string
    type: string
    name: string
    code: string | null
    price: number | null
    discount_amount: number | null
    billing_cycle: string | null
    duration_days: number | null
    max_uses: number | null
    current_uses: number
    is_active: boolean
    valid_until: bigint | null
    features: string | null
    limits: string | null
    stripe_price_id: string | null
    createdAt: Date
    updatedAt: Date
    _count: PlanCouponCountAggregateOutputType | null
    _avg: PlanCouponAvgAggregateOutputType | null
    _sum: PlanCouponSumAggregateOutputType | null
    _min: PlanCouponMinAggregateOutputType | null
    _max: PlanCouponMaxAggregateOutputType | null
  }

  type GetPlanCouponGroupByPayload<T extends PlanCouponGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PlanCouponGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PlanCouponGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PlanCouponGroupByOutputType[P]>
            : GetScalarType<T[P], PlanCouponGroupByOutputType[P]>
        }
      >
    >


  export type PlanCouponSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    code?: boolean
    price?: boolean
    discount_amount?: boolean
    billing_cycle?: boolean
    duration_days?: boolean
    max_uses?: boolean
    current_uses?: boolean
    is_active?: boolean
    valid_until?: boolean
    features?: boolean
    limits?: boolean
    stripe_price_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["planCoupon"]>

  export type PlanCouponSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    code?: boolean
    price?: boolean
    discount_amount?: boolean
    billing_cycle?: boolean
    duration_days?: boolean
    max_uses?: boolean
    current_uses?: boolean
    is_active?: boolean
    valid_until?: boolean
    features?: boolean
    limits?: boolean
    stripe_price_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["planCoupon"]>

  export type PlanCouponSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    type?: boolean
    name?: boolean
    code?: boolean
    price?: boolean
    discount_amount?: boolean
    billing_cycle?: boolean
    duration_days?: boolean
    max_uses?: boolean
    current_uses?: boolean
    is_active?: boolean
    valid_until?: boolean
    features?: boolean
    limits?: boolean
    stripe_price_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["planCoupon"]>

  export type PlanCouponSelectScalar = {
    id?: boolean
    type?: boolean
    name?: boolean
    code?: boolean
    price?: boolean
    discount_amount?: boolean
    billing_cycle?: boolean
    duration_days?: boolean
    max_uses?: boolean
    current_uses?: boolean
    is_active?: boolean
    valid_until?: boolean
    features?: boolean
    limits?: boolean
    stripe_price_id?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type PlanCouponOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "type" | "name" | "code" | "price" | "discount_amount" | "billing_cycle" | "duration_days" | "max_uses" | "current_uses" | "is_active" | "valid_until" | "features" | "limits" | "stripe_price_id" | "createdAt" | "updatedAt", ExtArgs["result"]["planCoupon"]>

  export type $PlanCouponPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PlanCoupon"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      type: string
      name: string
      code: string | null
      price: number | null
      discount_amount: number | null
      billing_cycle: string | null
      duration_days: number | null
      max_uses: number | null
      current_uses: number
      is_active: boolean
      valid_until: bigint | null
      features: string | null
      limits: string | null
      stripe_price_id: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["planCoupon"]>
    composites: {}
  }

  type PlanCouponGetPayload<S extends boolean | null | undefined | PlanCouponDefaultArgs> = $Result.GetResult<Prisma.$PlanCouponPayload, S>

  type PlanCouponCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PlanCouponFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PlanCouponCountAggregateInputType | true
    }

  export interface PlanCouponDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PlanCoupon'], meta: { name: 'PlanCoupon' } }
    /**
     * Find zero or one PlanCoupon that matches the filter.
     * @param {PlanCouponFindUniqueArgs} args - Arguments to find a PlanCoupon
     * @example
     * // Get one PlanCoupon
     * const planCoupon = await prisma.planCoupon.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PlanCouponFindUniqueArgs>(args: SelectSubset<T, PlanCouponFindUniqueArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PlanCoupon that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PlanCouponFindUniqueOrThrowArgs} args - Arguments to find a PlanCoupon
     * @example
     * // Get one PlanCoupon
     * const planCoupon = await prisma.planCoupon.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PlanCouponFindUniqueOrThrowArgs>(args: SelectSubset<T, PlanCouponFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanCoupon that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCouponFindFirstArgs} args - Arguments to find a PlanCoupon
     * @example
     * // Get one PlanCoupon
     * const planCoupon = await prisma.planCoupon.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PlanCouponFindFirstArgs>(args?: SelectSubset<T, PlanCouponFindFirstArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PlanCoupon that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCouponFindFirstOrThrowArgs} args - Arguments to find a PlanCoupon
     * @example
     * // Get one PlanCoupon
     * const planCoupon = await prisma.planCoupon.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PlanCouponFindFirstOrThrowArgs>(args?: SelectSubset<T, PlanCouponFindFirstOrThrowArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PlanCoupons that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCouponFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PlanCoupons
     * const planCoupons = await prisma.planCoupon.findMany()
     * 
     * // Get first 10 PlanCoupons
     * const planCoupons = await prisma.planCoupon.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const planCouponWithIdOnly = await prisma.planCoupon.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PlanCouponFindManyArgs>(args?: SelectSubset<T, PlanCouponFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PlanCoupon.
     * @param {PlanCouponCreateArgs} args - Arguments to create a PlanCoupon.
     * @example
     * // Create one PlanCoupon
     * const PlanCoupon = await prisma.planCoupon.create({
     *   data: {
     *     // ... data to create a PlanCoupon
     *   }
     * })
     * 
     */
    create<T extends PlanCouponCreateArgs>(args: SelectSubset<T, PlanCouponCreateArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PlanCoupons.
     * @param {PlanCouponCreateManyArgs} args - Arguments to create many PlanCoupons.
     * @example
     * // Create many PlanCoupons
     * const planCoupon = await prisma.planCoupon.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PlanCouponCreateManyArgs>(args?: SelectSubset<T, PlanCouponCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many PlanCoupons and returns the data saved in the database.
     * @param {PlanCouponCreateManyAndReturnArgs} args - Arguments to create many PlanCoupons.
     * @example
     * // Create many PlanCoupons
     * const planCoupon = await prisma.planCoupon.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many PlanCoupons and only return the `id`
     * const planCouponWithIdOnly = await prisma.planCoupon.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends PlanCouponCreateManyAndReturnArgs>(args?: SelectSubset<T, PlanCouponCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a PlanCoupon.
     * @param {PlanCouponDeleteArgs} args - Arguments to delete one PlanCoupon.
     * @example
     * // Delete one PlanCoupon
     * const PlanCoupon = await prisma.planCoupon.delete({
     *   where: {
     *     // ... filter to delete one PlanCoupon
     *   }
     * })
     * 
     */
    delete<T extends PlanCouponDeleteArgs>(args: SelectSubset<T, PlanCouponDeleteArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PlanCoupon.
     * @param {PlanCouponUpdateArgs} args - Arguments to update one PlanCoupon.
     * @example
     * // Update one PlanCoupon
     * const planCoupon = await prisma.planCoupon.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PlanCouponUpdateArgs>(args: SelectSubset<T, PlanCouponUpdateArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PlanCoupons.
     * @param {PlanCouponDeleteManyArgs} args - Arguments to filter PlanCoupons to delete.
     * @example
     * // Delete a few PlanCoupons
     * const { count } = await prisma.planCoupon.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PlanCouponDeleteManyArgs>(args?: SelectSubset<T, PlanCouponDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanCoupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCouponUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PlanCoupons
     * const planCoupon = await prisma.planCoupon.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PlanCouponUpdateManyArgs>(args: SelectSubset<T, PlanCouponUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PlanCoupons and returns the data updated in the database.
     * @param {PlanCouponUpdateManyAndReturnArgs} args - Arguments to update many PlanCoupons.
     * @example
     * // Update many PlanCoupons
     * const planCoupon = await prisma.planCoupon.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more PlanCoupons and only return the `id`
     * const planCouponWithIdOnly = await prisma.planCoupon.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends PlanCouponUpdateManyAndReturnArgs>(args: SelectSubset<T, PlanCouponUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one PlanCoupon.
     * @param {PlanCouponUpsertArgs} args - Arguments to update or create a PlanCoupon.
     * @example
     * // Update or create a PlanCoupon
     * const planCoupon = await prisma.planCoupon.upsert({
     *   create: {
     *     // ... data to create a PlanCoupon
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PlanCoupon we want to update
     *   }
     * })
     */
    upsert<T extends PlanCouponUpsertArgs>(args: SelectSubset<T, PlanCouponUpsertArgs<ExtArgs>>): Prisma__PlanCouponClient<$Result.GetResult<Prisma.$PlanCouponPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PlanCoupons.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCouponCountArgs} args - Arguments to filter PlanCoupons to count.
     * @example
     * // Count the number of PlanCoupons
     * const count = await prisma.planCoupon.count({
     *   where: {
     *     // ... the filter for the PlanCoupons we want to count
     *   }
     * })
    **/
    count<T extends PlanCouponCountArgs>(
      args?: Subset<T, PlanCouponCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PlanCouponCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PlanCoupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCouponAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PlanCouponAggregateArgs>(args: Subset<T, PlanCouponAggregateArgs>): Prisma.PrismaPromise<GetPlanCouponAggregateType<T>>

    /**
     * Group by PlanCoupon.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PlanCouponGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PlanCouponGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PlanCouponGroupByArgs['orderBy'] }
        : { orderBy?: PlanCouponGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PlanCouponGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPlanCouponGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PlanCoupon model
   */
  readonly fields: PlanCouponFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PlanCoupon.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PlanCouponClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PlanCoupon model
   */
  interface PlanCouponFieldRefs {
    readonly id: FieldRef<"PlanCoupon", 'String'>
    readonly type: FieldRef<"PlanCoupon", 'String'>
    readonly name: FieldRef<"PlanCoupon", 'String'>
    readonly code: FieldRef<"PlanCoupon", 'String'>
    readonly price: FieldRef<"PlanCoupon", 'Float'>
    readonly discount_amount: FieldRef<"PlanCoupon", 'Float'>
    readonly billing_cycle: FieldRef<"PlanCoupon", 'String'>
    readonly duration_days: FieldRef<"PlanCoupon", 'Int'>
    readonly max_uses: FieldRef<"PlanCoupon", 'Int'>
    readonly current_uses: FieldRef<"PlanCoupon", 'Int'>
    readonly is_active: FieldRef<"PlanCoupon", 'Boolean'>
    readonly valid_until: FieldRef<"PlanCoupon", 'BigInt'>
    readonly features: FieldRef<"PlanCoupon", 'String'>
    readonly limits: FieldRef<"PlanCoupon", 'String'>
    readonly stripe_price_id: FieldRef<"PlanCoupon", 'String'>
    readonly createdAt: FieldRef<"PlanCoupon", 'DateTime'>
    readonly updatedAt: FieldRef<"PlanCoupon", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PlanCoupon findUnique
   */
  export type PlanCouponFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * Filter, which PlanCoupon to fetch.
     */
    where: PlanCouponWhereUniqueInput
  }

  /**
   * PlanCoupon findUniqueOrThrow
   */
  export type PlanCouponFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * Filter, which PlanCoupon to fetch.
     */
    where: PlanCouponWhereUniqueInput
  }

  /**
   * PlanCoupon findFirst
   */
  export type PlanCouponFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * Filter, which PlanCoupon to fetch.
     */
    where?: PlanCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanCoupons to fetch.
     */
    orderBy?: PlanCouponOrderByWithRelationInput | PlanCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanCoupons.
     */
    cursor?: PlanCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanCoupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanCoupons.
     */
    distinct?: PlanCouponScalarFieldEnum | PlanCouponScalarFieldEnum[]
  }

  /**
   * PlanCoupon findFirstOrThrow
   */
  export type PlanCouponFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * Filter, which PlanCoupon to fetch.
     */
    where?: PlanCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanCoupons to fetch.
     */
    orderBy?: PlanCouponOrderByWithRelationInput | PlanCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PlanCoupons.
     */
    cursor?: PlanCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanCoupons.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PlanCoupons.
     */
    distinct?: PlanCouponScalarFieldEnum | PlanCouponScalarFieldEnum[]
  }

  /**
   * PlanCoupon findMany
   */
  export type PlanCouponFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * Filter, which PlanCoupons to fetch.
     */
    where?: PlanCouponWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PlanCoupons to fetch.
     */
    orderBy?: PlanCouponOrderByWithRelationInput | PlanCouponOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PlanCoupons.
     */
    cursor?: PlanCouponWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PlanCoupons from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PlanCoupons.
     */
    skip?: number
    distinct?: PlanCouponScalarFieldEnum | PlanCouponScalarFieldEnum[]
  }

  /**
   * PlanCoupon create
   */
  export type PlanCouponCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * The data needed to create a PlanCoupon.
     */
    data: XOR<PlanCouponCreateInput, PlanCouponUncheckedCreateInput>
  }

  /**
   * PlanCoupon createMany
   */
  export type PlanCouponCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PlanCoupons.
     */
    data: PlanCouponCreateManyInput | PlanCouponCreateManyInput[]
  }

  /**
   * PlanCoupon createManyAndReturn
   */
  export type PlanCouponCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * The data used to create many PlanCoupons.
     */
    data: PlanCouponCreateManyInput | PlanCouponCreateManyInput[]
  }

  /**
   * PlanCoupon update
   */
  export type PlanCouponUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * The data needed to update a PlanCoupon.
     */
    data: XOR<PlanCouponUpdateInput, PlanCouponUncheckedUpdateInput>
    /**
     * Choose, which PlanCoupon to update.
     */
    where: PlanCouponWhereUniqueInput
  }

  /**
   * PlanCoupon updateMany
   */
  export type PlanCouponUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PlanCoupons.
     */
    data: XOR<PlanCouponUpdateManyMutationInput, PlanCouponUncheckedUpdateManyInput>
    /**
     * Filter which PlanCoupons to update
     */
    where?: PlanCouponWhereInput
    /**
     * Limit how many PlanCoupons to update.
     */
    limit?: number
  }

  /**
   * PlanCoupon updateManyAndReturn
   */
  export type PlanCouponUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * The data used to update PlanCoupons.
     */
    data: XOR<PlanCouponUpdateManyMutationInput, PlanCouponUncheckedUpdateManyInput>
    /**
     * Filter which PlanCoupons to update
     */
    where?: PlanCouponWhereInput
    /**
     * Limit how many PlanCoupons to update.
     */
    limit?: number
  }

  /**
   * PlanCoupon upsert
   */
  export type PlanCouponUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * The filter to search for the PlanCoupon to update in case it exists.
     */
    where: PlanCouponWhereUniqueInput
    /**
     * In case the PlanCoupon found by the `where` argument doesn't exist, create a new PlanCoupon with this data.
     */
    create: XOR<PlanCouponCreateInput, PlanCouponUncheckedCreateInput>
    /**
     * In case the PlanCoupon was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PlanCouponUpdateInput, PlanCouponUncheckedUpdateInput>
  }

  /**
   * PlanCoupon delete
   */
  export type PlanCouponDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
    /**
     * Filter which PlanCoupon to delete.
     */
    where: PlanCouponWhereUniqueInput
  }

  /**
   * PlanCoupon deleteMany
   */
  export type PlanCouponDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PlanCoupons to delete
     */
    where?: PlanCouponWhereInput
    /**
     * Limit how many PlanCoupons to delete.
     */
    limit?: number
  }

  /**
   * PlanCoupon without action
   */
  export type PlanCouponDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PlanCoupon
     */
    select?: PlanCouponSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PlanCoupon
     */
    omit?: PlanCouponOmit<ExtArgs> | null
  }


  /**
   * Model AdminSetting
   */

  export type AggregateAdminSetting = {
    _count: AdminSettingCountAggregateOutputType | null
    _min: AdminSettingMinAggregateOutputType | null
    _max: AdminSettingMaxAggregateOutputType | null
  }

  export type AdminSettingMinAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminSettingMaxAggregateOutputType = {
    id: string | null
    key: string | null
    value: string | null
    description: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AdminSettingCountAggregateOutputType = {
    id: number
    key: number
    value: number
    description: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AdminSettingMinAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminSettingMaxAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AdminSettingCountAggregateInputType = {
    id?: true
    key?: true
    value?: true
    description?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AdminSettingAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSetting to aggregate.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned AdminSettings
    **/
    _count?: true | AdminSettingCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AdminSettingMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AdminSettingMaxAggregateInputType
  }

  export type GetAdminSettingAggregateType<T extends AdminSettingAggregateArgs> = {
        [P in keyof T & keyof AggregateAdminSetting]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAdminSetting[P]>
      : GetScalarType<T[P], AggregateAdminSetting[P]>
  }




  export type AdminSettingGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AdminSettingWhereInput
    orderBy?: AdminSettingOrderByWithAggregationInput | AdminSettingOrderByWithAggregationInput[]
    by: AdminSettingScalarFieldEnum[] | AdminSettingScalarFieldEnum
    having?: AdminSettingScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AdminSettingCountAggregateInputType | true
    _min?: AdminSettingMinAggregateInputType
    _max?: AdminSettingMaxAggregateInputType
  }

  export type AdminSettingGroupByOutputType = {
    id: string
    key: string
    value: string
    description: string | null
    createdAt: Date
    updatedAt: Date
    _count: AdminSettingCountAggregateOutputType | null
    _min: AdminSettingMinAggregateOutputType | null
    _max: AdminSettingMaxAggregateOutputType | null
  }

  type GetAdminSettingGroupByPayload<T extends AdminSettingGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AdminSettingGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AdminSettingGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AdminSettingGroupByOutputType[P]>
            : GetScalarType<T[P], AdminSettingGroupByOutputType[P]>
        }
      >
    >


  export type AdminSettingSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminSetting"]>

  export type AdminSettingSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminSetting"]>

  export type AdminSettingSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["adminSetting"]>

  export type AdminSettingSelectScalar = {
    id?: boolean
    key?: boolean
    value?: boolean
    description?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type AdminSettingOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "key" | "value" | "description" | "createdAt" | "updatedAt", ExtArgs["result"]["adminSetting"]>

  export type $AdminSettingPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "AdminSetting"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      key: string
      value: string
      description: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["adminSetting"]>
    composites: {}
  }

  type AdminSettingGetPayload<S extends boolean | null | undefined | AdminSettingDefaultArgs> = $Result.GetResult<Prisma.$AdminSettingPayload, S>

  type AdminSettingCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AdminSettingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AdminSettingCountAggregateInputType | true
    }

  export interface AdminSettingDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['AdminSetting'], meta: { name: 'AdminSetting' } }
    /**
     * Find zero or one AdminSetting that matches the filter.
     * @param {AdminSettingFindUniqueArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AdminSettingFindUniqueArgs>(args: SelectSubset<T, AdminSettingFindUniqueArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one AdminSetting that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AdminSettingFindUniqueOrThrowArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AdminSettingFindUniqueOrThrowArgs>(args: SelectSubset<T, AdminSettingFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSetting that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingFindFirstArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AdminSettingFindFirstArgs>(args?: SelectSubset<T, AdminSettingFindFirstArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first AdminSetting that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingFindFirstOrThrowArgs} args - Arguments to find a AdminSetting
     * @example
     * // Get one AdminSetting
     * const adminSetting = await prisma.adminSetting.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AdminSettingFindFirstOrThrowArgs>(args?: SelectSubset<T, AdminSettingFindFirstOrThrowArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more AdminSettings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all AdminSettings
     * const adminSettings = await prisma.adminSetting.findMany()
     * 
     * // Get first 10 AdminSettings
     * const adminSettings = await prisma.adminSetting.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const adminSettingWithIdOnly = await prisma.adminSetting.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AdminSettingFindManyArgs>(args?: SelectSubset<T, AdminSettingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a AdminSetting.
     * @param {AdminSettingCreateArgs} args - Arguments to create a AdminSetting.
     * @example
     * // Create one AdminSetting
     * const AdminSetting = await prisma.adminSetting.create({
     *   data: {
     *     // ... data to create a AdminSetting
     *   }
     * })
     * 
     */
    create<T extends AdminSettingCreateArgs>(args: SelectSubset<T, AdminSettingCreateArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many AdminSettings.
     * @param {AdminSettingCreateManyArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSetting = await prisma.adminSetting.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AdminSettingCreateManyArgs>(args?: SelectSubset<T, AdminSettingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many AdminSettings and returns the data saved in the database.
     * @param {AdminSettingCreateManyAndReturnArgs} args - Arguments to create many AdminSettings.
     * @example
     * // Create many AdminSettings
     * const adminSetting = await prisma.adminSetting.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many AdminSettings and only return the `id`
     * const adminSettingWithIdOnly = await prisma.adminSetting.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends AdminSettingCreateManyAndReturnArgs>(args?: SelectSubset<T, AdminSettingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a AdminSetting.
     * @param {AdminSettingDeleteArgs} args - Arguments to delete one AdminSetting.
     * @example
     * // Delete one AdminSetting
     * const AdminSetting = await prisma.adminSetting.delete({
     *   where: {
     *     // ... filter to delete one AdminSetting
     *   }
     * })
     * 
     */
    delete<T extends AdminSettingDeleteArgs>(args: SelectSubset<T, AdminSettingDeleteArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one AdminSetting.
     * @param {AdminSettingUpdateArgs} args - Arguments to update one AdminSetting.
     * @example
     * // Update one AdminSetting
     * const adminSetting = await prisma.adminSetting.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AdminSettingUpdateArgs>(args: SelectSubset<T, AdminSettingUpdateArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more AdminSettings.
     * @param {AdminSettingDeleteManyArgs} args - Arguments to filter AdminSettings to delete.
     * @example
     * // Delete a few AdminSettings
     * const { count } = await prisma.adminSetting.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AdminSettingDeleteManyArgs>(args?: SelectSubset<T, AdminSettingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many AdminSettings
     * const adminSetting = await prisma.adminSetting.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AdminSettingUpdateManyArgs>(args: SelectSubset<T, AdminSettingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more AdminSettings and returns the data updated in the database.
     * @param {AdminSettingUpdateManyAndReturnArgs} args - Arguments to update many AdminSettings.
     * @example
     * // Update many AdminSettings
     * const adminSetting = await prisma.adminSetting.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more AdminSettings and only return the `id`
     * const adminSettingWithIdOnly = await prisma.adminSetting.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends AdminSettingUpdateManyAndReturnArgs>(args: SelectSubset<T, AdminSettingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one AdminSetting.
     * @param {AdminSettingUpsertArgs} args - Arguments to update or create a AdminSetting.
     * @example
     * // Update or create a AdminSetting
     * const adminSetting = await prisma.adminSetting.upsert({
     *   create: {
     *     // ... data to create a AdminSetting
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the AdminSetting we want to update
     *   }
     * })
     */
    upsert<T extends AdminSettingUpsertArgs>(args: SelectSubset<T, AdminSettingUpsertArgs<ExtArgs>>): Prisma__AdminSettingClient<$Result.GetResult<Prisma.$AdminSettingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of AdminSettings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingCountArgs} args - Arguments to filter AdminSettings to count.
     * @example
     * // Count the number of AdminSettings
     * const count = await prisma.adminSetting.count({
     *   where: {
     *     // ... the filter for the AdminSettings we want to count
     *   }
     * })
    **/
    count<T extends AdminSettingCountArgs>(
      args?: Subset<T, AdminSettingCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AdminSettingCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a AdminSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AdminSettingAggregateArgs>(args: Subset<T, AdminSettingAggregateArgs>): Prisma.PrismaPromise<GetAdminSettingAggregateType<T>>

    /**
     * Group by AdminSetting.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AdminSettingGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AdminSettingGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AdminSettingGroupByArgs['orderBy'] }
        : { orderBy?: AdminSettingGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AdminSettingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAdminSettingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the AdminSetting model
   */
  readonly fields: AdminSettingFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for AdminSetting.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AdminSettingClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the AdminSetting model
   */
  interface AdminSettingFieldRefs {
    readonly id: FieldRef<"AdminSetting", 'String'>
    readonly key: FieldRef<"AdminSetting", 'String'>
    readonly value: FieldRef<"AdminSetting", 'String'>
    readonly description: FieldRef<"AdminSetting", 'String'>
    readonly createdAt: FieldRef<"AdminSetting", 'DateTime'>
    readonly updatedAt: FieldRef<"AdminSetting", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * AdminSetting findUnique
   */
  export type AdminSettingFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting findUniqueOrThrow
   */
  export type AdminSettingFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting findFirst
   */
  export type AdminSettingFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingScalarFieldEnum | AdminSettingScalarFieldEnum[]
  }

  /**
   * AdminSetting findFirstOrThrow
   */
  export type AdminSettingFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which AdminSetting to fetch.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for AdminSettings.
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of AdminSettings.
     */
    distinct?: AdminSettingScalarFieldEnum | AdminSettingScalarFieldEnum[]
  }

  /**
   * AdminSetting findMany
   */
  export type AdminSettingFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * Filter, which AdminSettings to fetch.
     */
    where?: AdminSettingWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of AdminSettings to fetch.
     */
    orderBy?: AdminSettingOrderByWithRelationInput | AdminSettingOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing AdminSettings.
     */
    cursor?: AdminSettingWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` AdminSettings from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` AdminSettings.
     */
    skip?: number
    distinct?: AdminSettingScalarFieldEnum | AdminSettingScalarFieldEnum[]
  }

  /**
   * AdminSetting create
   */
  export type AdminSettingCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * The data needed to create a AdminSetting.
     */
    data: XOR<AdminSettingCreateInput, AdminSettingUncheckedCreateInput>
  }

  /**
   * AdminSetting createMany
   */
  export type AdminSettingCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingCreateManyInput | AdminSettingCreateManyInput[]
  }

  /**
   * AdminSetting createManyAndReturn
   */
  export type AdminSettingCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * The data used to create many AdminSettings.
     */
    data: AdminSettingCreateManyInput | AdminSettingCreateManyInput[]
  }

  /**
   * AdminSetting update
   */
  export type AdminSettingUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * The data needed to update a AdminSetting.
     */
    data: XOR<AdminSettingUpdateInput, AdminSettingUncheckedUpdateInput>
    /**
     * Choose, which AdminSetting to update.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting updateMany
   */
  export type AdminSettingUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingUpdateManyMutationInput, AdminSettingUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
  }

  /**
   * AdminSetting updateManyAndReturn
   */
  export type AdminSettingUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * The data used to update AdminSettings.
     */
    data: XOR<AdminSettingUpdateManyMutationInput, AdminSettingUncheckedUpdateManyInput>
    /**
     * Filter which AdminSettings to update
     */
    where?: AdminSettingWhereInput
    /**
     * Limit how many AdminSettings to update.
     */
    limit?: number
  }

  /**
   * AdminSetting upsert
   */
  export type AdminSettingUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * The filter to search for the AdminSetting to update in case it exists.
     */
    where: AdminSettingWhereUniqueInput
    /**
     * In case the AdminSetting found by the `where` argument doesn't exist, create a new AdminSetting with this data.
     */
    create: XOR<AdminSettingCreateInput, AdminSettingUncheckedCreateInput>
    /**
     * In case the AdminSetting was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AdminSettingUpdateInput, AdminSettingUncheckedUpdateInput>
  }

  /**
   * AdminSetting delete
   */
  export type AdminSettingDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
    /**
     * Filter which AdminSetting to delete.
     */
    where: AdminSettingWhereUniqueInput
  }

  /**
   * AdminSetting deleteMany
   */
  export type AdminSettingDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which AdminSettings to delete
     */
    where?: AdminSettingWhereInput
    /**
     * Limit how many AdminSettings to delete.
     */
    limit?: number
  }

  /**
   * AdminSetting without action
   */
  export type AdminSettingDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the AdminSetting
     */
    select?: AdminSettingSelect<ExtArgs> | null
    /**
     * Omit specific fields from the AdminSetting
     */
    omit?: AdminSettingOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    username: 'username',
    email: 'email',
    password_hash: 'password_hash',
    user_type: 'user_type',
    registration_time: 'registration_time',
    remaining_posts: 'remaining_posts',
    user_status: 'user_status',
    plan_expires_at: 'plan_expires_at',
    renewal_notified_at: 'renewal_notified_at',
    password_reset_code: 'password_reset_code',
    verification_code: 'verification_code',
    code_expires_at: 'code_expires_at',
    bound_site_id: 'bound_site_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ProductScalarFieldEnum: {
    id: 'id',
    name: 'name',
    description: 'description',
    short_description: 'short_description',
    price: 'price',
    category: 'category',
    specifications: 'specifications',
    slug: 'slug',
    featured_image: 'featured_image',
    is_featured: 'is_featured',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProductScalarFieldEnum = (typeof ProductScalarFieldEnum)[keyof typeof ProductScalarFieldEnum]


  export const IndustrySiteScalarFieldEnum: {
    id: 'id',
    site_name: 'site_name',
    site_title: 'site_title',
    industry_name: 'industry_name',
    sub_domain: 'sub_domain',
    subdomain: 'subdomain',
    meta_description: 'meta_description',
    logo: 'logo',
    favicon: 'favicon',
    contact_email: 'contact_email',
    contact_phone: 'contact_phone',
    address: 'address',
    social_links: 'social_links',
    ssl_status: 'ssl_status',
    header_style_id: 'header_style_id',
    footer_style_id: 'footer_style_id',
    banner_style_id: 'banner_style_id',
    news_detail_style_id: 'news_detail_style_id',
    news_list_style_id: 'news_list_style_id',
    site_status: 'site_status',
    bound_user_id: 'bound_user_id',
    ai_news_toggle: 'ai_news_toggle',
    about_text: 'about_text',
    is_active: 'is_active',
    custom_css: 'custom_css',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type IndustrySiteScalarFieldEnum = (typeof IndustrySiteScalarFieldEnum)[keyof typeof IndustrySiteScalarFieldEnum]


  export const NewsContentScalarFieldEnum: {
    id: 'id',
    title: 'title',
    content: 'content',
    industry: 'industry',
    publication_time: 'publication_time',
    summary: 'summary',
    thumbnail: 'thumbnail',
    author: 'author',
    status: 'status',
    source: 'source',
    is_featured: 'is_featured',
    slug: 'slug',
    original_url: 'original_url',
    related_products: 'related_products',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type NewsContentScalarFieldEnum = (typeof NewsContentScalarFieldEnum)[keyof typeof NewsContentScalarFieldEnum]


  export const PlanCouponScalarFieldEnum: {
    id: 'id',
    type: 'type',
    name: 'name',
    code: 'code',
    price: 'price',
    discount_amount: 'discount_amount',
    billing_cycle: 'billing_cycle',
    duration_days: 'duration_days',
    max_uses: 'max_uses',
    current_uses: 'current_uses',
    is_active: 'is_active',
    valid_until: 'valid_until',
    features: 'features',
    limits: 'limits',
    stripe_price_id: 'stripe_price_id',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type PlanCouponScalarFieldEnum = (typeof PlanCouponScalarFieldEnum)[keyof typeof PlanCouponScalarFieldEnum]


  export const AdminSettingScalarFieldEnum: {
    id: 'id',
    key: 'key',
    value: 'value',
    description: 'description',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AdminSettingScalarFieldEnum = (typeof AdminSettingScalarFieldEnum)[keyof typeof AdminSettingScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'BigInt'
   */
  export type BigIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'BigInt'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    username?: StringFilter<"User"> | string
    email?: StringNullableFilter<"User"> | string | null
    password_hash?: StringFilter<"User"> | string
    user_type?: StringFilter<"User"> | string
    registration_time?: BigIntFilter<"User"> | bigint | number
    remaining_posts?: IntFilter<"User"> | number
    user_status?: StringFilter<"User"> | string
    plan_expires_at?: BigIntNullableFilter<"User"> | bigint | number | null
    renewal_notified_at?: BigIntNullableFilter<"User"> | bigint | number | null
    password_reset_code?: StringNullableFilter<"User"> | string | null
    verification_code?: StringNullableFilter<"User"> | string | null
    code_expires_at?: BigIntNullableFilter<"User"> | bigint | number | null
    bound_site_id?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    registration_time?: SortOrder
    remaining_posts?: SortOrder
    user_status?: SortOrder
    plan_expires_at?: SortOrderInput | SortOrder
    renewal_notified_at?: SortOrderInput | SortOrder
    password_reset_code?: SortOrderInput | SortOrder
    verification_code?: SortOrderInput | SortOrder
    code_expires_at?: SortOrderInput | SortOrder
    bound_site_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    username?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    password_hash?: StringFilter<"User"> | string
    user_type?: StringFilter<"User"> | string
    registration_time?: BigIntFilter<"User"> | bigint | number
    remaining_posts?: IntFilter<"User"> | number
    user_status?: StringFilter<"User"> | string
    plan_expires_at?: BigIntNullableFilter<"User"> | bigint | number | null
    renewal_notified_at?: BigIntNullableFilter<"User"> | bigint | number | null
    password_reset_code?: StringNullableFilter<"User"> | string | null
    verification_code?: StringNullableFilter<"User"> | string | null
    code_expires_at?: BigIntNullableFilter<"User"> | bigint | number | null
    bound_site_id?: JsonNullableFilter<"User">
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
  }, "id" | "username" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrderInput | SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    registration_time?: SortOrder
    remaining_posts?: SortOrder
    user_status?: SortOrder
    plan_expires_at?: SortOrderInput | SortOrder
    renewal_notified_at?: SortOrderInput | SortOrder
    password_reset_code?: SortOrderInput | SortOrder
    verification_code?: SortOrderInput | SortOrder
    code_expires_at?: SortOrderInput | SortOrder
    bound_site_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _avg?: UserAvgOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
    _sum?: UserSumOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    username?: StringWithAggregatesFilter<"User"> | string
    email?: StringNullableWithAggregatesFilter<"User"> | string | null
    password_hash?: StringWithAggregatesFilter<"User"> | string
    user_type?: StringWithAggregatesFilter<"User"> | string
    registration_time?: BigIntWithAggregatesFilter<"User"> | bigint | number
    remaining_posts?: IntWithAggregatesFilter<"User"> | number
    user_status?: StringWithAggregatesFilter<"User"> | string
    plan_expires_at?: BigIntNullableWithAggregatesFilter<"User"> | bigint | number | null
    renewal_notified_at?: BigIntNullableWithAggregatesFilter<"User"> | bigint | number | null
    password_reset_code?: StringNullableWithAggregatesFilter<"User"> | string | null
    verification_code?: StringNullableWithAggregatesFilter<"User"> | string | null
    code_expires_at?: BigIntNullableWithAggregatesFilter<"User"> | bigint | number | null
    bound_site_id?: JsonNullableWithAggregatesFilter<"User">
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ProductWhereInput = {
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    id?: StringFilter<"Product"> | string
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    short_description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    category?: StringNullableFilter<"Product"> | string | null
    specifications?: StringNullableFilter<"Product"> | string | null
    slug?: StringFilter<"Product"> | string
    featured_image?: JsonNullableFilter<"Product">
    is_featured?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }

  export type ProductOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    short_description?: SortOrderInput | SortOrder
    price?: SortOrder
    category?: SortOrderInput | SortOrder
    specifications?: SortOrderInput | SortOrder
    slug?: SortOrder
    featured_image?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: ProductWhereInput | ProductWhereInput[]
    OR?: ProductWhereInput[]
    NOT?: ProductWhereInput | ProductWhereInput[]
    name?: StringFilter<"Product"> | string
    description?: StringFilter<"Product"> | string
    short_description?: StringNullableFilter<"Product"> | string | null
    price?: FloatFilter<"Product"> | number
    category?: StringNullableFilter<"Product"> | string | null
    specifications?: StringNullableFilter<"Product"> | string | null
    featured_image?: JsonNullableFilter<"Product">
    is_featured?: BoolFilter<"Product"> | boolean
    createdAt?: DateTimeFilter<"Product"> | Date | string
    updatedAt?: DateTimeFilter<"Product"> | Date | string
  }, "id" | "slug">

  export type ProductOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    short_description?: SortOrderInput | SortOrder
    price?: SortOrder
    category?: SortOrderInput | SortOrder
    specifications?: SortOrderInput | SortOrder
    slug?: SortOrder
    featured_image?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProductCountOrderByAggregateInput
    _avg?: ProductAvgOrderByAggregateInput
    _max?: ProductMaxOrderByAggregateInput
    _min?: ProductMinOrderByAggregateInput
    _sum?: ProductSumOrderByAggregateInput
  }

  export type ProductScalarWhereWithAggregatesInput = {
    AND?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    OR?: ProductScalarWhereWithAggregatesInput[]
    NOT?: ProductScalarWhereWithAggregatesInput | ProductScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Product"> | string
    name?: StringWithAggregatesFilter<"Product"> | string
    description?: StringWithAggregatesFilter<"Product"> | string
    short_description?: StringNullableWithAggregatesFilter<"Product"> | string | null
    price?: FloatWithAggregatesFilter<"Product"> | number
    category?: StringNullableWithAggregatesFilter<"Product"> | string | null
    specifications?: StringNullableWithAggregatesFilter<"Product"> | string | null
    slug?: StringWithAggregatesFilter<"Product"> | string
    featured_image?: JsonNullableWithAggregatesFilter<"Product">
    is_featured?: BoolWithAggregatesFilter<"Product"> | boolean
    createdAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Product"> | Date | string
  }

  export type IndustrySiteWhereInput = {
    AND?: IndustrySiteWhereInput | IndustrySiteWhereInput[]
    OR?: IndustrySiteWhereInput[]
    NOT?: IndustrySiteWhereInput | IndustrySiteWhereInput[]
    id?: StringFilter<"IndustrySite"> | string
    site_name?: StringFilter<"IndustrySite"> | string
    site_title?: StringNullableFilter<"IndustrySite"> | string | null
    industry_name?: StringNullableFilter<"IndustrySite"> | string | null
    sub_domain?: StringFilter<"IndustrySite"> | string
    subdomain?: StringNullableFilter<"IndustrySite"> | string | null
    meta_description?: StringNullableFilter<"IndustrySite"> | string | null
    logo?: JsonNullableFilter<"IndustrySite">
    favicon?: JsonNullableFilter<"IndustrySite">
    contact_email?: StringNullableFilter<"IndustrySite"> | string | null
    contact_phone?: StringNullableFilter<"IndustrySite"> | string | null
    address?: StringNullableFilter<"IndustrySite"> | string | null
    social_links?: StringNullableFilter<"IndustrySite"> | string | null
    ssl_status?: StringNullableFilter<"IndustrySite"> | string | null
    header_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    footer_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    banner_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    news_detail_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    news_list_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    site_status?: StringNullableFilter<"IndustrySite"> | string | null
    bound_user_id?: StringNullableFilter<"IndustrySite"> | string | null
    ai_news_toggle?: BoolNullableFilter<"IndustrySite"> | boolean | null
    about_text?: StringNullableFilter<"IndustrySite"> | string | null
    is_active?: BoolFilter<"IndustrySite"> | boolean
    custom_css?: StringNullableFilter<"IndustrySite"> | string | null
    createdAt?: DateTimeFilter<"IndustrySite"> | Date | string
    updatedAt?: DateTimeFilter<"IndustrySite"> | Date | string
  }

  export type IndustrySiteOrderByWithRelationInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_title?: SortOrderInput | SortOrder
    industry_name?: SortOrderInput | SortOrder
    sub_domain?: SortOrder
    subdomain?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    favicon?: SortOrderInput | SortOrder
    contact_email?: SortOrderInput | SortOrder
    contact_phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    social_links?: SortOrderInput | SortOrder
    ssl_status?: SortOrderInput | SortOrder
    header_style_id?: SortOrderInput | SortOrder
    footer_style_id?: SortOrderInput | SortOrder
    banner_style_id?: SortOrderInput | SortOrder
    news_detail_style_id?: SortOrderInput | SortOrder
    news_list_style_id?: SortOrderInput | SortOrder
    site_status?: SortOrderInput | SortOrder
    bound_user_id?: SortOrderInput | SortOrder
    ai_news_toggle?: SortOrderInput | SortOrder
    about_text?: SortOrderInput | SortOrder
    is_active?: SortOrder
    custom_css?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IndustrySiteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    sub_domain?: string
    AND?: IndustrySiteWhereInput | IndustrySiteWhereInput[]
    OR?: IndustrySiteWhereInput[]
    NOT?: IndustrySiteWhereInput | IndustrySiteWhereInput[]
    site_name?: StringFilter<"IndustrySite"> | string
    site_title?: StringNullableFilter<"IndustrySite"> | string | null
    industry_name?: StringNullableFilter<"IndustrySite"> | string | null
    subdomain?: StringNullableFilter<"IndustrySite"> | string | null
    meta_description?: StringNullableFilter<"IndustrySite"> | string | null
    logo?: JsonNullableFilter<"IndustrySite">
    favicon?: JsonNullableFilter<"IndustrySite">
    contact_email?: StringNullableFilter<"IndustrySite"> | string | null
    contact_phone?: StringNullableFilter<"IndustrySite"> | string | null
    address?: StringNullableFilter<"IndustrySite"> | string | null
    social_links?: StringNullableFilter<"IndustrySite"> | string | null
    ssl_status?: StringNullableFilter<"IndustrySite"> | string | null
    header_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    footer_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    banner_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    news_detail_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    news_list_style_id?: StringNullableFilter<"IndustrySite"> | string | null
    site_status?: StringNullableFilter<"IndustrySite"> | string | null
    bound_user_id?: StringNullableFilter<"IndustrySite"> | string | null
    ai_news_toggle?: BoolNullableFilter<"IndustrySite"> | boolean | null
    about_text?: StringNullableFilter<"IndustrySite"> | string | null
    is_active?: BoolFilter<"IndustrySite"> | boolean
    custom_css?: StringNullableFilter<"IndustrySite"> | string | null
    createdAt?: DateTimeFilter<"IndustrySite"> | Date | string
    updatedAt?: DateTimeFilter<"IndustrySite"> | Date | string
  }, "id" | "sub_domain">

  export type IndustrySiteOrderByWithAggregationInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_title?: SortOrderInput | SortOrder
    industry_name?: SortOrderInput | SortOrder
    sub_domain?: SortOrder
    subdomain?: SortOrderInput | SortOrder
    meta_description?: SortOrderInput | SortOrder
    logo?: SortOrderInput | SortOrder
    favicon?: SortOrderInput | SortOrder
    contact_email?: SortOrderInput | SortOrder
    contact_phone?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    social_links?: SortOrderInput | SortOrder
    ssl_status?: SortOrderInput | SortOrder
    header_style_id?: SortOrderInput | SortOrder
    footer_style_id?: SortOrderInput | SortOrder
    banner_style_id?: SortOrderInput | SortOrder
    news_detail_style_id?: SortOrderInput | SortOrder
    news_list_style_id?: SortOrderInput | SortOrder
    site_status?: SortOrderInput | SortOrder
    bound_user_id?: SortOrderInput | SortOrder
    ai_news_toggle?: SortOrderInput | SortOrder
    about_text?: SortOrderInput | SortOrder
    is_active?: SortOrder
    custom_css?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: IndustrySiteCountOrderByAggregateInput
    _max?: IndustrySiteMaxOrderByAggregateInput
    _min?: IndustrySiteMinOrderByAggregateInput
  }

  export type IndustrySiteScalarWhereWithAggregatesInput = {
    AND?: IndustrySiteScalarWhereWithAggregatesInput | IndustrySiteScalarWhereWithAggregatesInput[]
    OR?: IndustrySiteScalarWhereWithAggregatesInput[]
    NOT?: IndustrySiteScalarWhereWithAggregatesInput | IndustrySiteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"IndustrySite"> | string
    site_name?: StringWithAggregatesFilter<"IndustrySite"> | string
    site_title?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    industry_name?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    sub_domain?: StringWithAggregatesFilter<"IndustrySite"> | string
    subdomain?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    meta_description?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    logo?: JsonNullableWithAggregatesFilter<"IndustrySite">
    favicon?: JsonNullableWithAggregatesFilter<"IndustrySite">
    contact_email?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    contact_phone?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    address?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    social_links?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    ssl_status?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    header_style_id?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    footer_style_id?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    banner_style_id?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    news_detail_style_id?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    news_list_style_id?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    site_status?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    bound_user_id?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    ai_news_toggle?: BoolNullableWithAggregatesFilter<"IndustrySite"> | boolean | null
    about_text?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    is_active?: BoolWithAggregatesFilter<"IndustrySite"> | boolean
    custom_css?: StringNullableWithAggregatesFilter<"IndustrySite"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"IndustrySite"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"IndustrySite"> | Date | string
  }

  export type NewsContentWhereInput = {
    AND?: NewsContentWhereInput | NewsContentWhereInput[]
    OR?: NewsContentWhereInput[]
    NOT?: NewsContentWhereInput | NewsContentWhereInput[]
    id?: StringFilter<"NewsContent"> | string
    title?: StringFilter<"NewsContent"> | string
    content?: StringFilter<"NewsContent"> | string
    industry?: StringNullableFilter<"NewsContent"> | string | null
    publication_time?: BigIntNullableFilter<"NewsContent"> | bigint | number | null
    summary?: StringNullableFilter<"NewsContent"> | string | null
    thumbnail?: JsonNullableFilter<"NewsContent">
    author?: StringNullableFilter<"NewsContent"> | string | null
    status?: StringFilter<"NewsContent"> | string
    source?: StringNullableFilter<"NewsContent"> | string | null
    is_featured?: BoolFilter<"NewsContent"> | boolean
    slug?: StringFilter<"NewsContent"> | string
    original_url?: StringNullableFilter<"NewsContent"> | string | null
    related_products?: JsonNullableFilter<"NewsContent">
    createdAt?: DateTimeFilter<"NewsContent"> | Date | string
    updatedAt?: DateTimeFilter<"NewsContent"> | Date | string
  }

  export type NewsContentOrderByWithRelationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    industry?: SortOrderInput | SortOrder
    publication_time?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    slug?: SortOrder
    original_url?: SortOrderInput | SortOrder
    related_products?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsContentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: NewsContentWhereInput | NewsContentWhereInput[]
    OR?: NewsContentWhereInput[]
    NOT?: NewsContentWhereInput | NewsContentWhereInput[]
    title?: StringFilter<"NewsContent"> | string
    content?: StringFilter<"NewsContent"> | string
    industry?: StringNullableFilter<"NewsContent"> | string | null
    publication_time?: BigIntNullableFilter<"NewsContent"> | bigint | number | null
    summary?: StringNullableFilter<"NewsContent"> | string | null
    thumbnail?: JsonNullableFilter<"NewsContent">
    author?: StringNullableFilter<"NewsContent"> | string | null
    status?: StringFilter<"NewsContent"> | string
    source?: StringNullableFilter<"NewsContent"> | string | null
    is_featured?: BoolFilter<"NewsContent"> | boolean
    original_url?: StringNullableFilter<"NewsContent"> | string | null
    related_products?: JsonNullableFilter<"NewsContent">
    createdAt?: DateTimeFilter<"NewsContent"> | Date | string
    updatedAt?: DateTimeFilter<"NewsContent"> | Date | string
  }, "id" | "slug">

  export type NewsContentOrderByWithAggregationInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    industry?: SortOrderInput | SortOrder
    publication_time?: SortOrderInput | SortOrder
    summary?: SortOrderInput | SortOrder
    thumbnail?: SortOrderInput | SortOrder
    author?: SortOrderInput | SortOrder
    status?: SortOrder
    source?: SortOrderInput | SortOrder
    is_featured?: SortOrder
    slug?: SortOrder
    original_url?: SortOrderInput | SortOrder
    related_products?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: NewsContentCountOrderByAggregateInput
    _avg?: NewsContentAvgOrderByAggregateInput
    _max?: NewsContentMaxOrderByAggregateInput
    _min?: NewsContentMinOrderByAggregateInput
    _sum?: NewsContentSumOrderByAggregateInput
  }

  export type NewsContentScalarWhereWithAggregatesInput = {
    AND?: NewsContentScalarWhereWithAggregatesInput | NewsContentScalarWhereWithAggregatesInput[]
    OR?: NewsContentScalarWhereWithAggregatesInput[]
    NOT?: NewsContentScalarWhereWithAggregatesInput | NewsContentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"NewsContent"> | string
    title?: StringWithAggregatesFilter<"NewsContent"> | string
    content?: StringWithAggregatesFilter<"NewsContent"> | string
    industry?: StringNullableWithAggregatesFilter<"NewsContent"> | string | null
    publication_time?: BigIntNullableWithAggregatesFilter<"NewsContent"> | bigint | number | null
    summary?: StringNullableWithAggregatesFilter<"NewsContent"> | string | null
    thumbnail?: JsonNullableWithAggregatesFilter<"NewsContent">
    author?: StringNullableWithAggregatesFilter<"NewsContent"> | string | null
    status?: StringWithAggregatesFilter<"NewsContent"> | string
    source?: StringNullableWithAggregatesFilter<"NewsContent"> | string | null
    is_featured?: BoolWithAggregatesFilter<"NewsContent"> | boolean
    slug?: StringWithAggregatesFilter<"NewsContent"> | string
    original_url?: StringNullableWithAggregatesFilter<"NewsContent"> | string | null
    related_products?: JsonNullableWithAggregatesFilter<"NewsContent">
    createdAt?: DateTimeWithAggregatesFilter<"NewsContent"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"NewsContent"> | Date | string
  }

  export type PlanCouponWhereInput = {
    AND?: PlanCouponWhereInput | PlanCouponWhereInput[]
    OR?: PlanCouponWhereInput[]
    NOT?: PlanCouponWhereInput | PlanCouponWhereInput[]
    id?: StringFilter<"PlanCoupon"> | string
    type?: StringFilter<"PlanCoupon"> | string
    name?: StringFilter<"PlanCoupon"> | string
    code?: StringNullableFilter<"PlanCoupon"> | string | null
    price?: FloatNullableFilter<"PlanCoupon"> | number | null
    discount_amount?: FloatNullableFilter<"PlanCoupon"> | number | null
    billing_cycle?: StringNullableFilter<"PlanCoupon"> | string | null
    duration_days?: IntNullableFilter<"PlanCoupon"> | number | null
    max_uses?: IntNullableFilter<"PlanCoupon"> | number | null
    current_uses?: IntFilter<"PlanCoupon"> | number
    is_active?: BoolFilter<"PlanCoupon"> | boolean
    valid_until?: BigIntNullableFilter<"PlanCoupon"> | bigint | number | null
    features?: StringNullableFilter<"PlanCoupon"> | string | null
    limits?: StringNullableFilter<"PlanCoupon"> | string | null
    stripe_price_id?: StringNullableFilter<"PlanCoupon"> | string | null
    createdAt?: DateTimeFilter<"PlanCoupon"> | Date | string
    updatedAt?: DateTimeFilter<"PlanCoupon"> | Date | string
  }

  export type PlanCouponOrderByWithRelationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    discount_amount?: SortOrderInput | SortOrder
    billing_cycle?: SortOrderInput | SortOrder
    duration_days?: SortOrderInput | SortOrder
    max_uses?: SortOrderInput | SortOrder
    current_uses?: SortOrder
    is_active?: SortOrder
    valid_until?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    limits?: SortOrderInput | SortOrder
    stripe_price_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanCouponWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    code?: string
    AND?: PlanCouponWhereInput | PlanCouponWhereInput[]
    OR?: PlanCouponWhereInput[]
    NOT?: PlanCouponWhereInput | PlanCouponWhereInput[]
    type?: StringFilter<"PlanCoupon"> | string
    name?: StringFilter<"PlanCoupon"> | string
    price?: FloatNullableFilter<"PlanCoupon"> | number | null
    discount_amount?: FloatNullableFilter<"PlanCoupon"> | number | null
    billing_cycle?: StringNullableFilter<"PlanCoupon"> | string | null
    duration_days?: IntNullableFilter<"PlanCoupon"> | number | null
    max_uses?: IntNullableFilter<"PlanCoupon"> | number | null
    current_uses?: IntFilter<"PlanCoupon"> | number
    is_active?: BoolFilter<"PlanCoupon"> | boolean
    valid_until?: BigIntNullableFilter<"PlanCoupon"> | bigint | number | null
    features?: StringNullableFilter<"PlanCoupon"> | string | null
    limits?: StringNullableFilter<"PlanCoupon"> | string | null
    stripe_price_id?: StringNullableFilter<"PlanCoupon"> | string | null
    createdAt?: DateTimeFilter<"PlanCoupon"> | Date | string
    updatedAt?: DateTimeFilter<"PlanCoupon"> | Date | string
  }, "id" | "code">

  export type PlanCouponOrderByWithAggregationInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrderInput | SortOrder
    price?: SortOrderInput | SortOrder
    discount_amount?: SortOrderInput | SortOrder
    billing_cycle?: SortOrderInput | SortOrder
    duration_days?: SortOrderInput | SortOrder
    max_uses?: SortOrderInput | SortOrder
    current_uses?: SortOrder
    is_active?: SortOrder
    valid_until?: SortOrderInput | SortOrder
    features?: SortOrderInput | SortOrder
    limits?: SortOrderInput | SortOrder
    stripe_price_id?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: PlanCouponCountOrderByAggregateInput
    _avg?: PlanCouponAvgOrderByAggregateInput
    _max?: PlanCouponMaxOrderByAggregateInput
    _min?: PlanCouponMinOrderByAggregateInput
    _sum?: PlanCouponSumOrderByAggregateInput
  }

  export type PlanCouponScalarWhereWithAggregatesInput = {
    AND?: PlanCouponScalarWhereWithAggregatesInput | PlanCouponScalarWhereWithAggregatesInput[]
    OR?: PlanCouponScalarWhereWithAggregatesInput[]
    NOT?: PlanCouponScalarWhereWithAggregatesInput | PlanCouponScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PlanCoupon"> | string
    type?: StringWithAggregatesFilter<"PlanCoupon"> | string
    name?: StringWithAggregatesFilter<"PlanCoupon"> | string
    code?: StringNullableWithAggregatesFilter<"PlanCoupon"> | string | null
    price?: FloatNullableWithAggregatesFilter<"PlanCoupon"> | number | null
    discount_amount?: FloatNullableWithAggregatesFilter<"PlanCoupon"> | number | null
    billing_cycle?: StringNullableWithAggregatesFilter<"PlanCoupon"> | string | null
    duration_days?: IntNullableWithAggregatesFilter<"PlanCoupon"> | number | null
    max_uses?: IntNullableWithAggregatesFilter<"PlanCoupon"> | number | null
    current_uses?: IntWithAggregatesFilter<"PlanCoupon"> | number
    is_active?: BoolWithAggregatesFilter<"PlanCoupon"> | boolean
    valid_until?: BigIntNullableWithAggregatesFilter<"PlanCoupon"> | bigint | number | null
    features?: StringNullableWithAggregatesFilter<"PlanCoupon"> | string | null
    limits?: StringNullableWithAggregatesFilter<"PlanCoupon"> | string | null
    stripe_price_id?: StringNullableWithAggregatesFilter<"PlanCoupon"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"PlanCoupon"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"PlanCoupon"> | Date | string
  }

  export type AdminSettingWhereInput = {
    AND?: AdminSettingWhereInput | AdminSettingWhereInput[]
    OR?: AdminSettingWhereInput[]
    NOT?: AdminSettingWhereInput | AdminSettingWhereInput[]
    id?: StringFilter<"AdminSetting"> | string
    key?: StringFilter<"AdminSetting"> | string
    value?: StringFilter<"AdminSetting"> | string
    description?: StringNullableFilter<"AdminSetting"> | string | null
    createdAt?: DateTimeFilter<"AdminSetting"> | Date | string
    updatedAt?: DateTimeFilter<"AdminSetting"> | Date | string
  }

  export type AdminSettingOrderByWithRelationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    key?: string
    AND?: AdminSettingWhereInput | AdminSettingWhereInput[]
    OR?: AdminSettingWhereInput[]
    NOT?: AdminSettingWhereInput | AdminSettingWhereInput[]
    value?: StringFilter<"AdminSetting"> | string
    description?: StringNullableFilter<"AdminSetting"> | string | null
    createdAt?: DateTimeFilter<"AdminSetting"> | Date | string
    updatedAt?: DateTimeFilter<"AdminSetting"> | Date | string
  }, "id" | "key">

  export type AdminSettingOrderByWithAggregationInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: AdminSettingCountOrderByAggregateInput
    _max?: AdminSettingMaxOrderByAggregateInput
    _min?: AdminSettingMinOrderByAggregateInput
  }

  export type AdminSettingScalarWhereWithAggregatesInput = {
    AND?: AdminSettingScalarWhereWithAggregatesInput | AdminSettingScalarWhereWithAggregatesInput[]
    OR?: AdminSettingScalarWhereWithAggregatesInput[]
    NOT?: AdminSettingScalarWhereWithAggregatesInput | AdminSettingScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"AdminSetting"> | string
    key?: StringWithAggregatesFilter<"AdminSetting"> | string
    value?: StringWithAggregatesFilter<"AdminSetting"> | string
    description?: StringNullableWithAggregatesFilter<"AdminSetting"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"AdminSetting"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"AdminSetting"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    username: string
    email?: string | null
    password_hash: string
    user_type?: string
    registration_time: bigint | number
    remaining_posts?: number
    user_status?: string
    plan_expires_at?: bigint | number | null
    renewal_notified_at?: bigint | number | null
    password_reset_code?: string | null
    verification_code?: string | null
    code_expires_at?: bigint | number | null
    bound_site_id?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUncheckedCreateInput = {
    id?: string
    username: string
    email?: string | null
    password_hash: string
    user_type?: string
    registration_time: bigint | number
    remaining_posts?: number
    user_status?: string
    plan_expires_at?: bigint | number | null
    renewal_notified_at?: bigint | number | null
    password_reset_code?: string | null
    verification_code?: string | null
    code_expires_at?: bigint | number | null
    bound_site_id?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    registration_time?: BigIntFieldUpdateOperationsInput | bigint | number
    remaining_posts?: IntFieldUpdateOperationsInput | number
    user_status?: StringFieldUpdateOperationsInput | string
    plan_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    renewal_notified_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    password_reset_code?: NullableStringFieldUpdateOperationsInput | string | null
    verification_code?: NullableStringFieldUpdateOperationsInput | string | null
    code_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    bound_site_id?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    registration_time?: BigIntFieldUpdateOperationsInput | bigint | number
    remaining_posts?: IntFieldUpdateOperationsInput | number
    user_status?: StringFieldUpdateOperationsInput | string
    plan_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    renewal_notified_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    password_reset_code?: NullableStringFieldUpdateOperationsInput | string | null
    verification_code?: NullableStringFieldUpdateOperationsInput | string | null
    code_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    bound_site_id?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserCreateManyInput = {
    id?: string
    username: string
    email?: string | null
    password_hash: string
    user_type?: string
    registration_time: bigint | number
    remaining_posts?: number
    user_status?: string
    plan_expires_at?: bigint | number | null
    renewal_notified_at?: bigint | number | null
    password_reset_code?: string | null
    verification_code?: string | null
    code_expires_at?: bigint | number | null
    bound_site_id?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    registration_time?: BigIntFieldUpdateOperationsInput | bigint | number
    remaining_posts?: IntFieldUpdateOperationsInput | number
    user_status?: StringFieldUpdateOperationsInput | string
    plan_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    renewal_notified_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    password_reset_code?: NullableStringFieldUpdateOperationsInput | string | null
    verification_code?: NullableStringFieldUpdateOperationsInput | string | null
    code_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    bound_site_id?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    username?: StringFieldUpdateOperationsInput | string
    email?: NullableStringFieldUpdateOperationsInput | string | null
    password_hash?: StringFieldUpdateOperationsInput | string
    user_type?: StringFieldUpdateOperationsInput | string
    registration_time?: BigIntFieldUpdateOperationsInput | bigint | number
    remaining_posts?: IntFieldUpdateOperationsInput | number
    user_status?: StringFieldUpdateOperationsInput | string
    plan_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    renewal_notified_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    password_reset_code?: NullableStringFieldUpdateOperationsInput | string | null
    verification_code?: NullableStringFieldUpdateOperationsInput | string | null
    code_expires_at?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    bound_site_id?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateInput = {
    id?: string
    name: string
    description: string
    short_description?: string | null
    price?: number
    category?: string | null
    specifications?: string | null
    slug: string
    featured_image?: NullableJsonNullValueInput | InputJsonValue
    is_featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUncheckedCreateInput = {
    id?: string
    name: string
    description: string
    short_description?: string | null
    price?: number
    category?: string | null
    specifications?: string | null
    slug: string
    featured_image?: NullableJsonNullValueInput | InputJsonValue
    is_featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    specifications?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    featured_image?: NullableJsonNullValueInput | InputJsonValue
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    specifications?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    featured_image?: NullableJsonNullValueInput | InputJsonValue
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductCreateManyInput = {
    id?: string
    name: string
    description: string
    short_description?: string | null
    price?: number
    category?: string | null
    specifications?: string | null
    slug: string
    featured_image?: NullableJsonNullValueInput | InputJsonValue
    is_featured?: boolean
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProductUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    specifications?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    featured_image?: NullableJsonNullValueInput | InputJsonValue
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProductUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    description?: StringFieldUpdateOperationsInput | string
    short_description?: NullableStringFieldUpdateOperationsInput | string | null
    price?: FloatFieldUpdateOperationsInput | number
    category?: NullableStringFieldUpdateOperationsInput | string | null
    specifications?: NullableStringFieldUpdateOperationsInput | string | null
    slug?: StringFieldUpdateOperationsInput | string
    featured_image?: NullableJsonNullValueInput | InputJsonValue
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndustrySiteCreateInput = {
    id?: string
    site_name: string
    site_title?: string | null
    industry_name?: string | null
    sub_domain: string
    subdomain?: string | null
    meta_description?: string | null
    logo?: NullableJsonNullValueInput | InputJsonValue
    favicon?: NullableJsonNullValueInput | InputJsonValue
    contact_email?: string | null
    contact_phone?: string | null
    address?: string | null
    social_links?: string | null
    ssl_status?: string | null
    header_style_id?: string | null
    footer_style_id?: string | null
    banner_style_id?: string | null
    news_detail_style_id?: string | null
    news_list_style_id?: string | null
    site_status?: string | null
    bound_user_id?: string | null
    ai_news_toggle?: boolean | null
    about_text?: string | null
    is_active?: boolean
    custom_css?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IndustrySiteUncheckedCreateInput = {
    id?: string
    site_name: string
    site_title?: string | null
    industry_name?: string | null
    sub_domain: string
    subdomain?: string | null
    meta_description?: string | null
    logo?: NullableJsonNullValueInput | InputJsonValue
    favicon?: NullableJsonNullValueInput | InputJsonValue
    contact_email?: string | null
    contact_phone?: string | null
    address?: string | null
    social_links?: string | null
    ssl_status?: string | null
    header_style_id?: string | null
    footer_style_id?: string | null
    banner_style_id?: string | null
    news_detail_style_id?: string | null
    news_list_style_id?: string | null
    site_status?: string | null
    bound_user_id?: string | null
    ai_news_toggle?: boolean | null
    about_text?: string | null
    is_active?: boolean
    custom_css?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IndustrySiteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    site_name?: StringFieldUpdateOperationsInput | string
    site_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry_name?: NullableStringFieldUpdateOperationsInput | string | null
    sub_domain?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableJsonNullValueInput | InputJsonValue
    favicon?: NullableJsonNullValueInput | InputJsonValue
    contact_email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableStringFieldUpdateOperationsInput | string | null
    ssl_status?: NullableStringFieldUpdateOperationsInput | string | null
    header_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    footer_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    banner_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_detail_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_list_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    site_status?: NullableStringFieldUpdateOperationsInput | string | null
    bound_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    ai_news_toggle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    about_text?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    custom_css?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndustrySiteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    site_name?: StringFieldUpdateOperationsInput | string
    site_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry_name?: NullableStringFieldUpdateOperationsInput | string | null
    sub_domain?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableJsonNullValueInput | InputJsonValue
    favicon?: NullableJsonNullValueInput | InputJsonValue
    contact_email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableStringFieldUpdateOperationsInput | string | null
    ssl_status?: NullableStringFieldUpdateOperationsInput | string | null
    header_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    footer_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    banner_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_detail_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_list_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    site_status?: NullableStringFieldUpdateOperationsInput | string | null
    bound_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    ai_news_toggle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    about_text?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    custom_css?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndustrySiteCreateManyInput = {
    id?: string
    site_name: string
    site_title?: string | null
    industry_name?: string | null
    sub_domain: string
    subdomain?: string | null
    meta_description?: string | null
    logo?: NullableJsonNullValueInput | InputJsonValue
    favicon?: NullableJsonNullValueInput | InputJsonValue
    contact_email?: string | null
    contact_phone?: string | null
    address?: string | null
    social_links?: string | null
    ssl_status?: string | null
    header_style_id?: string | null
    footer_style_id?: string | null
    banner_style_id?: string | null
    news_detail_style_id?: string | null
    news_list_style_id?: string | null
    site_status?: string | null
    bound_user_id?: string | null
    ai_news_toggle?: boolean | null
    about_text?: string | null
    is_active?: boolean
    custom_css?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type IndustrySiteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    site_name?: StringFieldUpdateOperationsInput | string
    site_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry_name?: NullableStringFieldUpdateOperationsInput | string | null
    sub_domain?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableJsonNullValueInput | InputJsonValue
    favicon?: NullableJsonNullValueInput | InputJsonValue
    contact_email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableStringFieldUpdateOperationsInput | string | null
    ssl_status?: NullableStringFieldUpdateOperationsInput | string | null
    header_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    footer_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    banner_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_detail_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_list_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    site_status?: NullableStringFieldUpdateOperationsInput | string | null
    bound_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    ai_news_toggle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    about_text?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    custom_css?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IndustrySiteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    site_name?: StringFieldUpdateOperationsInput | string
    site_title?: NullableStringFieldUpdateOperationsInput | string | null
    industry_name?: NullableStringFieldUpdateOperationsInput | string | null
    sub_domain?: StringFieldUpdateOperationsInput | string
    subdomain?: NullableStringFieldUpdateOperationsInput | string | null
    meta_description?: NullableStringFieldUpdateOperationsInput | string | null
    logo?: NullableJsonNullValueInput | InputJsonValue
    favicon?: NullableJsonNullValueInput | InputJsonValue
    contact_email?: NullableStringFieldUpdateOperationsInput | string | null
    contact_phone?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    social_links?: NullableStringFieldUpdateOperationsInput | string | null
    ssl_status?: NullableStringFieldUpdateOperationsInput | string | null
    header_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    footer_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    banner_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_detail_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    news_list_style_id?: NullableStringFieldUpdateOperationsInput | string | null
    site_status?: NullableStringFieldUpdateOperationsInput | string | null
    bound_user_id?: NullableStringFieldUpdateOperationsInput | string | null
    ai_news_toggle?: NullableBoolFieldUpdateOperationsInput | boolean | null
    about_text?: NullableStringFieldUpdateOperationsInput | string | null
    is_active?: BoolFieldUpdateOperationsInput | boolean
    custom_css?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsContentCreateInput = {
    id?: string
    title: string
    content: string
    industry?: string | null
    publication_time?: bigint | number | null
    summary?: string | null
    thumbnail?: NullableJsonNullValueInput | InputJsonValue
    author?: string | null
    status?: string
    source?: string | null
    is_featured?: boolean
    slug: string
    original_url?: string | null
    related_products?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsContentUncheckedCreateInput = {
    id?: string
    title: string
    content: string
    industry?: string | null
    publication_time?: bigint | number | null
    summary?: string | null
    thumbnail?: NullableJsonNullValueInput | InputJsonValue
    author?: string | null
    status?: string
    source?: string | null
    is_featured?: boolean
    slug: string
    original_url?: string | null
    related_products?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsContentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    publication_time?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableJsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    original_url?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsContentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    publication_time?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableJsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    original_url?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsContentCreateManyInput = {
    id?: string
    title: string
    content: string
    industry?: string | null
    publication_time?: bigint | number | null
    summary?: string | null
    thumbnail?: NullableJsonNullValueInput | InputJsonValue
    author?: string | null
    status?: string
    source?: string | null
    is_featured?: boolean
    slug: string
    original_url?: string | null
    related_products?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type NewsContentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    publication_time?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableJsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    original_url?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type NewsContentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    industry?: NullableStringFieldUpdateOperationsInput | string | null
    publication_time?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    summary?: NullableStringFieldUpdateOperationsInput | string | null
    thumbnail?: NullableJsonNullValueInput | InputJsonValue
    author?: NullableStringFieldUpdateOperationsInput | string | null
    status?: StringFieldUpdateOperationsInput | string
    source?: NullableStringFieldUpdateOperationsInput | string | null
    is_featured?: BoolFieldUpdateOperationsInput | boolean
    slug?: StringFieldUpdateOperationsInput | string
    original_url?: NullableStringFieldUpdateOperationsInput | string | null
    related_products?: NullableJsonNullValueInput | InputJsonValue
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCouponCreateInput = {
    id?: string
    type: string
    name: string
    code?: string | null
    price?: number | null
    discount_amount?: number | null
    billing_cycle?: string | null
    duration_days?: number | null
    max_uses?: number | null
    current_uses?: number
    is_active?: boolean
    valid_until?: bigint | number | null
    features?: string | null
    limits?: string | null
    stripe_price_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCouponUncheckedCreateInput = {
    id?: string
    type: string
    name: string
    code?: string | null
    price?: number | null
    discount_amount?: number | null
    billing_cycle?: string | null
    duration_days?: number | null
    max_uses?: number | null
    current_uses?: number
    is_active?: boolean
    valid_until?: bigint | number | null
    features?: string | null
    limits?: string | null
    stripe_price_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCouponUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discount_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_cycle?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    max_uses?: NullableIntFieldUpdateOperationsInput | number | null
    current_uses?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    valid_until?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: NullableStringFieldUpdateOperationsInput | string | null
    stripe_price_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCouponUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discount_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_cycle?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    max_uses?: NullableIntFieldUpdateOperationsInput | number | null
    current_uses?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    valid_until?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: NullableStringFieldUpdateOperationsInput | string | null
    stripe_price_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCouponCreateManyInput = {
    id?: string
    type: string
    name: string
    code?: string | null
    price?: number | null
    discount_amount?: number | null
    billing_cycle?: string | null
    duration_days?: number | null
    max_uses?: number | null
    current_uses?: number
    is_active?: boolean
    valid_until?: bigint | number | null
    features?: string | null
    limits?: string | null
    stripe_price_id?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PlanCouponUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discount_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_cycle?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    max_uses?: NullableIntFieldUpdateOperationsInput | number | null
    current_uses?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    valid_until?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: NullableStringFieldUpdateOperationsInput | string | null
    stripe_price_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PlanCouponUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    type?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    code?: NullableStringFieldUpdateOperationsInput | string | null
    price?: NullableFloatFieldUpdateOperationsInput | number | null
    discount_amount?: NullableFloatFieldUpdateOperationsInput | number | null
    billing_cycle?: NullableStringFieldUpdateOperationsInput | string | null
    duration_days?: NullableIntFieldUpdateOperationsInput | number | null
    max_uses?: NullableIntFieldUpdateOperationsInput | number | null
    current_uses?: IntFieldUpdateOperationsInput | number
    is_active?: BoolFieldUpdateOperationsInput | boolean
    valid_until?: NullableBigIntFieldUpdateOperationsInput | bigint | number | null
    features?: NullableStringFieldUpdateOperationsInput | string | null
    limits?: NullableStringFieldUpdateOperationsInput | string | null
    stripe_price_id?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingCreateInput = {
    id?: string
    key: string
    value: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingUncheckedCreateInput = {
    id?: string
    key: string
    value: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingCreateManyInput = {
    id?: string
    key: string
    value: string
    description?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type AdminSettingUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AdminSettingUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    key?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type BigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type BigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    registration_time?: SortOrder
    remaining_posts?: SortOrder
    user_status?: SortOrder
    plan_expires_at?: SortOrder
    renewal_notified_at?: SortOrder
    password_reset_code?: SortOrder
    verification_code?: SortOrder
    code_expires_at?: SortOrder
    bound_site_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserAvgOrderByAggregateInput = {
    registration_time?: SortOrder
    remaining_posts?: SortOrder
    plan_expires_at?: SortOrder
    renewal_notified_at?: SortOrder
    code_expires_at?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    registration_time?: SortOrder
    remaining_posts?: SortOrder
    user_status?: SortOrder
    plan_expires_at?: SortOrder
    renewal_notified_at?: SortOrder
    password_reset_code?: SortOrder
    verification_code?: SortOrder
    code_expires_at?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    username?: SortOrder
    email?: SortOrder
    password_hash?: SortOrder
    user_type?: SortOrder
    registration_time?: SortOrder
    remaining_posts?: SortOrder
    user_status?: SortOrder
    plan_expires_at?: SortOrder
    renewal_notified_at?: SortOrder
    password_reset_code?: SortOrder
    verification_code?: SortOrder
    code_expires_at?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserSumOrderByAggregateInput = {
    registration_time?: SortOrder
    remaining_posts?: SortOrder
    plan_expires_at?: SortOrder
    renewal_notified_at?: SortOrder
    code_expires_at?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type BigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type BigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type FloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type ProductCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    short_description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    specifications?: SortOrder
    slug?: SortOrder
    featured_image?: SortOrder
    is_featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductAvgOrderByAggregateInput = {
    price?: SortOrder
  }

  export type ProductMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    short_description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    specifications?: SortOrder
    slug?: SortOrder
    is_featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    description?: SortOrder
    short_description?: SortOrder
    price?: SortOrder
    category?: SortOrder
    specifications?: SortOrder
    slug?: SortOrder
    is_featured?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProductSumOrderByAggregateInput = {
    price?: SortOrder
  }

  export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type IndustrySiteCountOrderByAggregateInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_title?: SortOrder
    industry_name?: SortOrder
    sub_domain?: SortOrder
    subdomain?: SortOrder
    meta_description?: SortOrder
    logo?: SortOrder
    favicon?: SortOrder
    contact_email?: SortOrder
    contact_phone?: SortOrder
    address?: SortOrder
    social_links?: SortOrder
    ssl_status?: SortOrder
    header_style_id?: SortOrder
    footer_style_id?: SortOrder
    banner_style_id?: SortOrder
    news_detail_style_id?: SortOrder
    news_list_style_id?: SortOrder
    site_status?: SortOrder
    bound_user_id?: SortOrder
    ai_news_toggle?: SortOrder
    about_text?: SortOrder
    is_active?: SortOrder
    custom_css?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IndustrySiteMaxOrderByAggregateInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_title?: SortOrder
    industry_name?: SortOrder
    sub_domain?: SortOrder
    subdomain?: SortOrder
    meta_description?: SortOrder
    contact_email?: SortOrder
    contact_phone?: SortOrder
    address?: SortOrder
    social_links?: SortOrder
    ssl_status?: SortOrder
    header_style_id?: SortOrder
    footer_style_id?: SortOrder
    banner_style_id?: SortOrder
    news_detail_style_id?: SortOrder
    news_list_style_id?: SortOrder
    site_status?: SortOrder
    bound_user_id?: SortOrder
    ai_news_toggle?: SortOrder
    about_text?: SortOrder
    is_active?: SortOrder
    custom_css?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type IndustrySiteMinOrderByAggregateInput = {
    id?: SortOrder
    site_name?: SortOrder
    site_title?: SortOrder
    industry_name?: SortOrder
    sub_domain?: SortOrder
    subdomain?: SortOrder
    meta_description?: SortOrder
    contact_email?: SortOrder
    contact_phone?: SortOrder
    address?: SortOrder
    social_links?: SortOrder
    ssl_status?: SortOrder
    header_style_id?: SortOrder
    footer_style_id?: SortOrder
    banner_style_id?: SortOrder
    news_detail_style_id?: SortOrder
    news_list_style_id?: SortOrder
    site_status?: SortOrder
    bound_user_id?: SortOrder
    ai_news_toggle?: SortOrder
    about_text?: SortOrder
    is_active?: SortOrder
    custom_css?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NewsContentCountOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    industry?: SortOrder
    publication_time?: SortOrder
    summary?: SortOrder
    thumbnail?: SortOrder
    author?: SortOrder
    status?: SortOrder
    source?: SortOrder
    is_featured?: SortOrder
    slug?: SortOrder
    original_url?: SortOrder
    related_products?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsContentAvgOrderByAggregateInput = {
    publication_time?: SortOrder
  }

  export type NewsContentMaxOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    industry?: SortOrder
    publication_time?: SortOrder
    summary?: SortOrder
    author?: SortOrder
    status?: SortOrder
    source?: SortOrder
    is_featured?: SortOrder
    slug?: SortOrder
    original_url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsContentMinOrderByAggregateInput = {
    id?: SortOrder
    title?: SortOrder
    content?: SortOrder
    industry?: SortOrder
    publication_time?: SortOrder
    summary?: SortOrder
    author?: SortOrder
    status?: SortOrder
    source?: SortOrder
    is_featured?: SortOrder
    slug?: SortOrder
    original_url?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type NewsContentSumOrderByAggregateInput = {
    publication_time?: SortOrder
  }

  export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PlanCouponCountOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrder
    price?: SortOrder
    discount_amount?: SortOrder
    billing_cycle?: SortOrder
    duration_days?: SortOrder
    max_uses?: SortOrder
    current_uses?: SortOrder
    is_active?: SortOrder
    valid_until?: SortOrder
    features?: SortOrder
    limits?: SortOrder
    stripe_price_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanCouponAvgOrderByAggregateInput = {
    price?: SortOrder
    discount_amount?: SortOrder
    duration_days?: SortOrder
    max_uses?: SortOrder
    current_uses?: SortOrder
    valid_until?: SortOrder
  }

  export type PlanCouponMaxOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrder
    price?: SortOrder
    discount_amount?: SortOrder
    billing_cycle?: SortOrder
    duration_days?: SortOrder
    max_uses?: SortOrder
    current_uses?: SortOrder
    is_active?: SortOrder
    valid_until?: SortOrder
    features?: SortOrder
    limits?: SortOrder
    stripe_price_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanCouponMinOrderByAggregateInput = {
    id?: SortOrder
    type?: SortOrder
    name?: SortOrder
    code?: SortOrder
    price?: SortOrder
    discount_amount?: SortOrder
    billing_cycle?: SortOrder
    duration_days?: SortOrder
    max_uses?: SortOrder
    current_uses?: SortOrder
    is_active?: SortOrder
    valid_until?: SortOrder
    features?: SortOrder
    limits?: SortOrder
    stripe_price_id?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type PlanCouponSumOrderByAggregateInput = {
    price?: SortOrder
    discount_amount?: SortOrder
    duration_days?: SortOrder
    max_uses?: SortOrder
    current_uses?: SortOrder
    valid_until?: SortOrder
  }

  export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type AdminSettingCountOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingMaxOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type AdminSettingMinOrderByAggregateInput = {
    id?: SortOrder
    key?: SortOrder
    value?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type BigIntFieldUpdateOperationsInput = {
    set?: bigint | number
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableBigIntFieldUpdateOperationsInput = {
    set?: bigint | number | null
    increment?: bigint | number
    decrement?: bigint | number
    multiply?: bigint | number
    divide?: bigint | number
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type FloatFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type NullableFloatFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedBigIntFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntFilter<$PrismaModel> | bigint | number
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedBigIntNullableFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableFilter<$PrismaModel> | bigint | number | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedBigIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    in?: bigint[] | number[]
    notIn?: bigint[] | number[]
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntWithAggregatesFilter<$PrismaModel> | bigint | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedBigIntFilter<$PrismaModel>
    _min?: NestedBigIntFilter<$PrismaModel>
    _max?: NestedBigIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedBigIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: bigint | number | BigIntFieldRefInput<$PrismaModel> | null
    in?: bigint[] | number[] | null
    notIn?: bigint[] | number[] | null
    lt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    lte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gt?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    gte?: bigint | number | BigIntFieldRefInput<$PrismaModel>
    not?: NestedBigIntNullableWithAggregatesFilter<$PrismaModel> | bigint | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedBigIntNullableFilter<$PrismaModel>
    _min?: NestedBigIntNullableFilter<$PrismaModel>
    _max?: NestedBigIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedFloatFilter<$PrismaModel>
    _min?: NestedFloatFilter<$PrismaModel>
    _max?: NestedFloatFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedFloatNullableFilter<$PrismaModel>
    _min?: NestedFloatNullableFilter<$PrismaModel>
    _max?: NestedFloatNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
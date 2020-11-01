import {
  DMMF,
  DMMFClass,
  Engine,
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  sqltag as sql,
  empty,
  join,
  raw,
  Sql,
  Decimal,
} from './runtime';

export { PrismaClientKnownRequestError }
export { PrismaClientUnknownRequestError }
export { PrismaClientRustPanicError }
export { PrismaClientInitializationError }
export { PrismaClientValidationError }
export { Decimal }

/**
 * Re-export of sql-template-tag
 */
export { sql, empty, join, raw, Sql }

/**
 * Prisma Client JS version: 2.10.1
 * Query Engine version: 7d0087eadc7265e12d4b8d8c3516b02c4c965111
 */
export declare type PrismaVersion = {
  client: string
}

export declare const prismaVersion: PrismaVersion 

/**
 * Utility Types
 */

/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON object.
 * This type can be useful to enforce some input to be JSON-compatible or as a super-type to be extended from. 
 */
export declare type JsonObject = {[Key in string]?: JsonValue}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches a JSON array.
 */
export declare interface JsonArray extends Array<JsonValue> {}
 
/**
 * From https://github.com/sindresorhus/type-fest/
 * Matches any valid JSON value.
 */
export declare type JsonValue = string | number | boolean | null | JsonObject | JsonArray

/**
 * Same as JsonObject, but allows undefined
 */
export declare type InputJsonObject = {[Key in string]?: JsonValue}
 
export declare interface InputJsonArray extends Array<JsonValue> {}
 
export declare type InputJsonValue = undefined |  string | number | boolean | null | InputJsonObject | InputJsonArray

declare type SelectAndInclude = {
  select: any
  include: any
}

declare type HasSelect = {
  select: any
}

declare type HasInclude = {
  include: any
}

declare type CheckSelect<T, S, U> = T extends SelectAndInclude
  ? 'Please either choose `select` or `include`'
  : T extends HasSelect
  ? U
  : T extends HasInclude
  ? U
  : S

/**
 * Get the type of the value, that the Promise holds.
 */
export declare type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

/**
 * Get the return type of a function which returns a Promise.
 */
export declare type PromiseReturnType<T extends (...args: any) => Promise<any>> = PromiseType<ReturnType<T>>


export declare type Enumerable<T> = T | Array<T>;

export type RequiredKeys<T> = {
  [K in keyof T]-?: {} extends Pick<T, K> ? never : K
}[keyof T]

export declare type TruthyKeys<T> = {
  [key in keyof T]: T[key] extends false | undefined | null ? never : key
}[keyof T]

export declare type TrueKeys<T> = TruthyKeys<Pick<T, RequiredKeys<T>>>

/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export declare type Subset<T, U> = {
  [key in keyof T]: key extends keyof U ? T[key] : never;
};
declare class PrismaClientFetcher {
  private readonly prisma;
  private readonly debug;
  private readonly hooks?;
  constructor(prisma: PrismaClient<any, any>, debug?: boolean, hooks?: Hooks | undefined);
  request<T>(document: any, dataPath?: string[], rootField?: string, typeName?: string, isList?: boolean, callsite?: string): Promise<T>;
  sanitizeMessage(message: string): string;
  protected unpack(document: any, data: any, path: string[], rootField?: string, isList?: boolean): any;
}


/**
 * Client
**/

export declare type Datasource = {
  url?: string
}

export type Datasources = {
  db?: Datasource
}

export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'

export interface PrismaClientOptions {
  /**
   * Overwrites the datasource url from your prisma.schema file
   */
  datasources?: Datasources

  /**
   * @default "colorless"
   */
  errorFormat?: ErrorFormat

  /**
   * @example
   * ```
   * // Defaults to stdout
   * log: ['query', 'info', 'warn', 'error']
   * 
   * // Emit as events
   * log: [
   *  { emit: 'stdout', level: 'query' },
   *  { emit: 'stdout', level: 'info' },
   *  { emit: 'stdout', level: 'warn' }
   *  { emit: 'stdout', level: 'error' }
   * ]
   * ```
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
   */
  log?: Array<LogLevel | LogDefinition>
}

export type Hooks = {
  beforeRequest?: (options: {query: string, path: string[], rootField?: string, typeName?: string, document: any}) => any
}

/* Types for Logging */
export type LogLevel = 'info' | 'query' | 'warn' | 'error'
export type LogDefinition = {
  level: LogLevel
  emit: 'stdout' | 'event'
}

export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
  GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
  : never

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
  | 'findOne'
  | 'findMany'
  | 'findFirst'
  | 'create'
  | 'update'
  | 'updateMany'
  | 'upsert'
  | 'delete'
  | 'deleteMany'
  | 'executeRaw'
  | 'queryRaw'
  | 'aggregate'

/**
 * These options are being passed in to the middleware as "params"
 */
export type MiddlewareParams = {
  model?: string
  action: PrismaAction
  args: any
  dataPath: string[]
  runInTransaction: boolean
}

/**
 * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
 */
export type Middleware<T = any> = (
  params: MiddlewareParams,
  next: (params: MiddlewareParams) => Promise<T>,
) => Promise<T>

// tested in getLogLevel.test.ts
export declare function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

/**
 * ##  Prisma Client ʲˢ
 * 
 * Type-safe database client for TypeScript & Node.js (ORM replacement)
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Champions
 * const champions = await prisma.champions.findMany()
 * ```
 *
 * 
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export declare class PrismaClient<
  T extends PrismaClientOptions = PrismaClientOptions,
  U = 'log' extends keyof T ? T['log'] extends Array<LogLevel | LogDefinition> ? GetEvents<T['log']> : never : never
> {
  /**
   * @private
   */
  private fetcher;
  /**
   * @private
   */
  private readonly dmmf;
  /**
   * @private
   */
  private connectionPromise?;
  /**
   * @private
   */
  private disconnectionPromise?;
  /**
   * @private
   */
  private readonly engineConfig;
  /**
   * @private
   */
  private readonly measurePerformance;
  /**
   * @private
   */
  private engine: Engine;
  /**
   * @private
   */
  private errorFormat: ErrorFormat;

  /**
   * ##  Prisma Client ʲˢ
   * 
   * Type-safe database client for TypeScript & Node.js (ORM replacement)
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Champions
   * const champions = await prisma.champions.findMany()
   * ```
   *
   * 
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */
  constructor(optionsArg?: T);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * @deprecated renamed to `$on`
   */
  on<V extends U>(eventType: V, callback: (event: V extends 'query' ? QueryEvent : LogEvent) => void): void;
  /**
   * Connect with the database
   */
  $connect(): Promise<void>;
  /**
   * @deprecated renamed to `$connect`
   */
  connect(): Promise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): Promise<any>;
  /**
   * @deprecated renamed to `$disconnect`
   */
  disconnect(): Promise<any>;

  /**
   * Add a middleware
   */
  $use(cb: Middleware): void

  /**
   * Executes a raw query and returns the number of affected rows
   * @example
   * ```
   * // With parameters use prisma.executeRaw``, values will be escaped automatically
   * const result = await prisma.executeRaw`UPDATE User SET cool = ${true} WHERE id = ${1};`
   * // Or
   * const result = await prisma.executeRaw('UPDATE User SET cool = $1 WHERE id = $2 ;', true, 1)
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * @deprecated renamed to `$executeRaw`
   */
  executeRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<number>;

  /**
   * Performs a raw query and returns the SELECT data
   * @example
   * ```
   * // With parameters use prisma.queryRaw``, values will be escaped automatically
   * const result = await prisma.queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'ema.il'};`
   * // Or
   * const result = await prisma.queryRaw('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'ema.il')
  * ```
  * 
  * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
  */
  $queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;
 
  /**
   * @deprecated renamed to `$queryRaw`
   */
  queryRaw<T = any>(query: string | TemplateStringsArray | Sql, ...values: any[]): Promise<T>;

  /**
   * Execute queries in a transaction
   * @example
   * ```
   * const [george, bob, alice] = await prisma.transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   */
  $transaction: PromiseConstructor['all']
  /**
   * @deprecated renamed to `$transaction`
   */
  transaction: PromiseConstructor['all']

  /**
   * `prisma.champions`: Exposes CRUD operations for the **champions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Champions
    * const champions = await prisma.champions.findMany()
    * ```
    */
  get champions(): championsDelegate;

  /**
   * `prisma.games`: Exposes CRUD operations for the **games** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Games
    * const games = await prisma.games.findMany()
    * ```
    */
  get games(): gamesDelegate;

  /**
   * `prisma.matchban`: Exposes CRUD operations for the **matchban** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matchbans
    * const matchbans = await prisma.matchban.findMany()
    * ```
    */
  get matchban(): matchbanDelegate;

  /**
   * `prisma.matches`: Exposes CRUD operations for the **matches** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matches
    * const matches = await prisma.matches.findMany()
    * ```
    */
  get matches(): matchesDelegate;

  /**
   * `prisma.matchesbans`: Exposes CRUD operations for the **matchesbans** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Matchesbans
    * const matchesbans = await prisma.matchesbans.findMany()
    * ```
    */
  get matchesbans(): matchesbansDelegate;

  /**
   * `prisma.participants`: Exposes CRUD operations for the **participants** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Participants
    * const participants = await prisma.participants.findMany()
    * ```
    */
  get participants(): participantsDelegate;

  /**
   * `prisma.ranks`: Exposes CRUD operations for the **ranks** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Ranks
    * const ranks = await prisma.ranks.findMany()
    * ```
    */
  get ranks(): ranksDelegate;

  /**
   * `prisma.stages`: Exposes CRUD operations for the **stages** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Stages
    * const stages = await prisma.stages.findMany()
    * ```
    */
  get stages(): stagesDelegate;

  /**
   * `prisma.tournaments`: Exposes CRUD operations for the **tournaments** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tournaments
    * const tournaments = await prisma.tournaments.findMany()
    * ```
    */
  get tournaments(): tournamentsDelegate;

  /**
   * `prisma.waywins`: Exposes CRUD operations for the **waywins** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Waywins
    * const waywins = await prisma.waywins.findMany()
    * ```
    */
  get waywins(): waywinsDelegate;
}



/**
 * Enums
 */

// Based on
// https://github.com/microsoft/TypeScript/issues/3192#issuecomment-261720275

export declare const ChampionsDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type ChampionsDistinctFieldEnum = (typeof ChampionsDistinctFieldEnum)[keyof typeof ChampionsDistinctFieldEnum]


export declare const GamesDistinctFieldEnum: {
  id: 'id',
  player1Won: 'player1Won',
  blueSideWon: 'blueSideWon',
  p1CS: 'p1CS',
  p2CS: 'p2CS',
  duration: 'duration',
  matchId: 'matchId',
  p1ChampionId: 'p1ChampionId',
  p2ChampionId: 'p2ChampionId',
  waywinId: 'waywinId'
};

export declare type GamesDistinctFieldEnum = (typeof GamesDistinctFieldEnum)[keyof typeof GamesDistinctFieldEnum]


export declare const MatchbanDistinctFieldEnum: {
  gameId: 'gameId',
  championId: 'championId',
  playerId: 'playerId'
};

export declare type MatchbanDistinctFieldEnum = (typeof MatchbanDistinctFieldEnum)[keyof typeof MatchbanDistinctFieldEnum]


export declare const MatchesDistinctFieldEnum: {
  id: 'id',
  tournamentId: 'tournamentId',
  stageId: 'stageId',
  player1Id: 'player1Id',
  player2Id: 'player2Id'
};

export declare type MatchesDistinctFieldEnum = (typeof MatchesDistinctFieldEnum)[keyof typeof MatchesDistinctFieldEnum]


export declare const MatchesbansDistinctFieldEnum: {
  matchId: 'matchId',
  championId: 'championId',
  playerId: 'playerId'
};

export declare type MatchesbansDistinctFieldEnum = (typeof MatchesbansDistinctFieldEnum)[keyof typeof MatchesbansDistinctFieldEnum]


export declare const ParticipantsDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  rankId: 'rankId',
  signUpDate: 'signUpDate',
  resignationDate: 'resignationDate'
};

export declare type ParticipantsDistinctFieldEnum = (typeof ParticipantsDistinctFieldEnum)[keyof typeof ParticipantsDistinctFieldEnum]


export declare const RanksDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type RanksDistinctFieldEnum = (typeof RanksDistinctFieldEnum)[keyof typeof RanksDistinctFieldEnum]


export declare const StagesDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type StagesDistinctFieldEnum = (typeof StagesDistinctFieldEnum)[keyof typeof StagesDistinctFieldEnum]


export declare const TournamentsDistinctFieldEnum: {
  id: 'id',
  name: 'name',
  description: 'description',
  startDate: 'startDate',
  endDate: 'endDate',
  createdOn: 'createdOn'
};

export declare type TournamentsDistinctFieldEnum = (typeof TournamentsDistinctFieldEnum)[keyof typeof TournamentsDistinctFieldEnum]


export declare const WaywinsDistinctFieldEnum: {
  id: 'id',
  name: 'name'
};

export declare type WaywinsDistinctFieldEnum = (typeof WaywinsDistinctFieldEnum)[keyof typeof WaywinsDistinctFieldEnum]


export declare const SortOrder: {
  asc: 'asc',
  desc: 'desc'
};

export declare type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


export declare const QueryMode: {
  default: 'default',
  insensitive: 'insensitive'
};

export declare type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]



/**
 * Model champions
 */

export type champions = {
  id: number
  name: string
}


export type AggregateChampions = {
  count: number
  avg: ChampionsAvgAggregateOutputType | null
  sum: ChampionsSumAggregateOutputType | null
  min: ChampionsMinAggregateOutputType | null
  max: ChampionsMaxAggregateOutputType | null
}

export type ChampionsAvgAggregateOutputType = {
  id: number
}

export type ChampionsSumAggregateOutputType = {
  id: number
}

export type ChampionsMinAggregateOutputType = {
  id: number
}

export type ChampionsMaxAggregateOutputType = {
  id: number
}


export type ChampionsAvgAggregateInputType = {
  id?: true
}

export type ChampionsSumAggregateInputType = {
  id?: true
}

export type ChampionsMinAggregateInputType = {
  id?: true
}

export type ChampionsMaxAggregateInputType = {
  id?: true
}

export type AggregateChampionsArgs = {
  where?: championsWhereInput
  orderBy?: Enumerable<championsOrderByInput> | championsOrderByInput
  cursor?: championsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChampionsDistinctFieldEnum>
  count?: true
  avg?: ChampionsAvgAggregateInputType
  sum?: ChampionsSumAggregateInputType
  min?: ChampionsMinAggregateInputType
  max?: ChampionsMaxAggregateInputType
}

export type GetChampionsAggregateType<T extends AggregateChampionsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetChampionsAggregateScalarType<T[P]>
}

export type GetChampionsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ChampionsAvgAggregateOutputType ? ChampionsAvgAggregateOutputType[P] : never
}
    
    

export type championsSelect = {
  id?: boolean
  name?: boolean
  games_championsTogames_p1ChampionId?: boolean | FindManygamesArgs
  games_championsTogames_p2ChampionId?: boolean | FindManygamesArgs
}

export type championsInclude = {
  games_championsTogames_p1ChampionId?: boolean | FindManygamesArgs
  games_championsTogames_p2ChampionId?: boolean | FindManygamesArgs
}

export type championsGetPayload<
  S extends boolean | null | undefined | championsArgs,
  U = keyof S
> = S extends true
  ? champions
  : S extends undefined
  ? never
  : S extends championsArgs | FindManychampionsArgs
  ? 'include' extends U
    ? champions  & {
      [P in TrueKeys<S['include']>]:
      P extends 'games_championsTogames_p1ChampionId'
      ? Array<gamesGetPayload<S['include'][P]>> :
      P extends 'games_championsTogames_p2ChampionId'
      ? Array<gamesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof champions ? champions[P]
: 
      P extends 'games_championsTogames_p1ChampionId'
      ? Array<gamesGetPayload<S['select'][P]>> :
      P extends 'games_championsTogames_p2ChampionId'
      ? Array<gamesGetPayload<S['select'][P]>> : never
    }
  : champions
: champions


export interface championsDelegate {
  /**
   * Find zero or one Champions that matches the filter.
   * @param {FindOnechampionsArgs} args - Arguments to find a Champions
   * @example
   * // Get one Champions
   * const champions = await prisma.champions.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnechampionsArgs>(
    args: Subset<T, FindOnechampionsArgs>
  ): CheckSelect<T, Prisma__championsClient<champions | null>, Prisma__championsClient<championsGetPayload<T> | null>>
  /**
   * Find the first Champions that matches the filter.
   * @param {FindFirstchampionsArgs} args - Arguments to find a Champions
   * @example
   * // Get one Champions
   * const champions = await prisma.champions.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstchampionsArgs>(
    args?: Subset<T, FindFirstchampionsArgs>
  ): CheckSelect<T, Prisma__championsClient<champions | null>, Prisma__championsClient<championsGetPayload<T> | null>>
  /**
   * Find zero or more Champions that matches the filter.
   * @param {FindManychampionsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Champions
   * const champions = await prisma.champions.findMany()
   * 
   * // Get first 10 Champions
   * const champions = await prisma.champions.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const championsWithIdOnly = await prisma.champions.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManychampionsArgs>(
    args?: Subset<T, FindManychampionsArgs>
  ): CheckSelect<T, Promise<Array<champions>>, Promise<Array<championsGetPayload<T>>>>
  /**
   * Create a Champions.
   * @param {championsCreateArgs} args - Arguments to create a Champions.
   * @example
   * // Create one Champions
   * const Champions = await prisma.champions.create({
   *   data: {
   *     // ... data to create a Champions
   *   }
   * })
   * 
  **/
  create<T extends championsCreateArgs>(
    args: Subset<T, championsCreateArgs>
  ): CheckSelect<T, Prisma__championsClient<champions>, Prisma__championsClient<championsGetPayload<T>>>
  /**
   * Delete a Champions.
   * @param {championsDeleteArgs} args - Arguments to delete one Champions.
   * @example
   * // Delete one Champions
   * const Champions = await prisma.champions.delete({
   *   where: {
   *     // ... filter to delete one Champions
   *   }
   * })
   * 
  **/
  delete<T extends championsDeleteArgs>(
    args: Subset<T, championsDeleteArgs>
  ): CheckSelect<T, Prisma__championsClient<champions>, Prisma__championsClient<championsGetPayload<T>>>
  /**
   * Update one Champions.
   * @param {championsUpdateArgs} args - Arguments to update one Champions.
   * @example
   * // Update one Champions
   * const champions = await prisma.champions.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends championsUpdateArgs>(
    args: Subset<T, championsUpdateArgs>
  ): CheckSelect<T, Prisma__championsClient<champions>, Prisma__championsClient<championsGetPayload<T>>>
  /**
   * Delete zero or more Champions.
   * @param {championsDeleteManyArgs} args - Arguments to filter Champions to delete.
   * @example
   * // Delete a few Champions
   * const { count } = await prisma.champions.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends championsDeleteManyArgs>(
    args: Subset<T, championsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Champions.
   * @param {championsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Champions
   * const champions = await prisma.champions.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends championsUpdateManyArgs>(
    args: Subset<T, championsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Champions.
   * @param {championsUpsertArgs} args - Arguments to update or create a Champions.
   * @example
   * // Update or create a Champions
   * const champions = await prisma.champions.upsert({
   *   create: {
   *     // ... data to create a Champions
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Champions we want to update
   *   }
   * })
  **/
  upsert<T extends championsUpsertArgs>(
    args: Subset<T, championsUpsertArgs>
  ): CheckSelect<T, Prisma__championsClient<champions>, Prisma__championsClient<championsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManychampionsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateChampionsArgs>(args: Subset<T, AggregateChampionsArgs>): Promise<GetChampionsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for champions.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__championsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  games_championsTogames_p1ChampionId<T extends FindManygamesArgs = {}>(args?: Subset<T, FindManygamesArgs>): CheckSelect<T, Promise<Array<games>>, Promise<Array<gamesGetPayload<T>>>>;

  games_championsTogames_p2ChampionId<T extends FindManygamesArgs = {}>(args?: Subset<T, FindManygamesArgs>): CheckSelect<T, Promise<Array<games>>, Promise<Array<gamesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * champions findOne
 */
export type FindOnechampionsArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
  /**
   * Filter, which champions to fetch.
  **/
  where: championsWhereUniqueInput
}


/**
 * champions findFirst
 */
export type FindFirstchampionsArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
  /**
   * Filter, which champions to fetch.
  **/
  where?: championsWhereInput
  orderBy?: Enumerable<championsOrderByInput> | championsOrderByInput
  cursor?: championsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ChampionsDistinctFieldEnum>
}


/**
 * champions findMany
 */
export type FindManychampionsArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
  /**
   * Filter, which champions to fetch.
  **/
  where?: championsWhereInput
  /**
   * Determine the order of the champions to fetch.
  **/
  orderBy?: Enumerable<championsOrderByInput> | championsOrderByInput
  /**
   * Sets the position for listing champions.
  **/
  cursor?: championsWhereUniqueInput
  /**
   * The number of champions to fetch. If negative number, it will take champions before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` champions.
  **/
  skip?: number
  distinct?: Enumerable<ChampionsDistinctFieldEnum>
}


/**
 * champions create
 */
export type championsCreateArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
  /**
   * The data needed to create a champions.
  **/
  data: championsCreateInput
}


/**
 * champions update
 */
export type championsUpdateArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
  /**
   * The data needed to update a champions.
  **/
  data: championsUpdateInput
  /**
   * Choose, which champions to update.
  **/
  where: championsWhereUniqueInput
}


/**
 * champions updateMany
 */
export type championsUpdateManyArgs = {
  data: championsUpdateManyMutationInput
  where?: championsWhereInput
}


/**
 * champions upsert
 */
export type championsUpsertArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
  /**
   * The filter to search for the champions to update in case it exists.
  **/
  where: championsWhereUniqueInput
  /**
   * In case the champions found by the `where` argument doesn't exist, create a new champions with this data.
  **/
  create: championsCreateInput
  /**
   * In case the champions was found with the provided `where` argument, update it with this data.
  **/
  update: championsUpdateInput
}


/**
 * champions delete
 */
export type championsDeleteArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
  /**
   * Filter which champions to delete.
  **/
  where: championsWhereUniqueInput
}


/**
 * champions deleteMany
 */
export type championsDeleteManyArgs = {
  where?: championsWhereInput
}


/**
 * champions without action
 */
export type championsArgs = {
  /**
   * Select specific fields to fetch from the champions
  **/
  select?: championsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: championsInclude | null
}



/**
 * Model games
 */

export type games = {
  id: number
  player1Won: boolean
  blueSideWon: boolean
  p1CS: number | null
  p2CS: number | null
  duration: number | null
  matchId: number | null
  p1ChampionId: number | null
  p2ChampionId: number | null
  waywinId: number | null
}


export type AggregateGames = {
  count: number
  avg: GamesAvgAggregateOutputType | null
  sum: GamesSumAggregateOutputType | null
  min: GamesMinAggregateOutputType | null
  max: GamesMaxAggregateOutputType | null
}

export type GamesAvgAggregateOutputType = {
  id: number
  p1CS: number | null
  p2CS: number | null
  duration: number | null
  matchId: number | null
  p1ChampionId: number | null
  p2ChampionId: number | null
  waywinId: number | null
}

export type GamesSumAggregateOutputType = {
  id: number
  p1CS: number | null
  p2CS: number | null
  duration: number | null
  matchId: number | null
  p1ChampionId: number | null
  p2ChampionId: number | null
  waywinId: number | null
}

export type GamesMinAggregateOutputType = {
  id: number
  p1CS: number | null
  p2CS: number | null
  duration: number | null
  matchId: number | null
  p1ChampionId: number | null
  p2ChampionId: number | null
  waywinId: number | null
}

export type GamesMaxAggregateOutputType = {
  id: number
  p1CS: number | null
  p2CS: number | null
  duration: number | null
  matchId: number | null
  p1ChampionId: number | null
  p2ChampionId: number | null
  waywinId: number | null
}


export type GamesAvgAggregateInputType = {
  id?: true
  p1CS?: true
  p2CS?: true
  duration?: true
  matchId?: true
  p1ChampionId?: true
  p2ChampionId?: true
  waywinId?: true
}

export type GamesSumAggregateInputType = {
  id?: true
  p1CS?: true
  p2CS?: true
  duration?: true
  matchId?: true
  p1ChampionId?: true
  p2ChampionId?: true
  waywinId?: true
}

export type GamesMinAggregateInputType = {
  id?: true
  p1CS?: true
  p2CS?: true
  duration?: true
  matchId?: true
  p1ChampionId?: true
  p2ChampionId?: true
  waywinId?: true
}

export type GamesMaxAggregateInputType = {
  id?: true
  p1CS?: true
  p2CS?: true
  duration?: true
  matchId?: true
  p1ChampionId?: true
  p2ChampionId?: true
  waywinId?: true
}

export type AggregateGamesArgs = {
  where?: gamesWhereInput
  orderBy?: Enumerable<gamesOrderByInput> | gamesOrderByInput
  cursor?: gamesWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<GamesDistinctFieldEnum>
  count?: true
  avg?: GamesAvgAggregateInputType
  sum?: GamesSumAggregateInputType
  min?: GamesMinAggregateInputType
  max?: GamesMaxAggregateInputType
}

export type GetGamesAggregateType<T extends AggregateGamesArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetGamesAggregateScalarType<T[P]>
}

export type GetGamesAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof GamesAvgAggregateOutputType ? GamesAvgAggregateOutputType[P] : never
}
    
    

export type gamesSelect = {
  id?: boolean
  player1Won?: boolean
  blueSideWon?: boolean
  p1CS?: boolean
  p2CS?: boolean
  duration?: boolean
  matchId?: boolean
  p1ChampionId?: boolean
  p2ChampionId?: boolean
  waywinId?: boolean
  matches?: boolean | matchesArgs
  champions_championsTogames_p1ChampionId?: boolean | championsArgs
  champions_championsTogames_p2ChampionId?: boolean | championsArgs
  waywins?: boolean | waywinsArgs
}

export type gamesInclude = {
  matches?: boolean | matchesArgs
  champions_championsTogames_p1ChampionId?: boolean | championsArgs
  champions_championsTogames_p2ChampionId?: boolean | championsArgs
  waywins?: boolean | waywinsArgs
}

export type gamesGetPayload<
  S extends boolean | null | undefined | gamesArgs,
  U = keyof S
> = S extends true
  ? games
  : S extends undefined
  ? never
  : S extends gamesArgs | FindManygamesArgs
  ? 'include' extends U
    ? games  & {
      [P in TrueKeys<S['include']>]:
      P extends 'matches'
      ? matchesGetPayload<S['include'][P]> | null :
      P extends 'champions_championsTogames_p1ChampionId'
      ? championsGetPayload<S['include'][P]> | null :
      P extends 'champions_championsTogames_p2ChampionId'
      ? championsGetPayload<S['include'][P]> | null :
      P extends 'waywins'
      ? waywinsGetPayload<S['include'][P]> | null : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof games ? games[P]
: 
      P extends 'matches'
      ? matchesGetPayload<S['select'][P]> | null :
      P extends 'champions_championsTogames_p1ChampionId'
      ? championsGetPayload<S['select'][P]> | null :
      P extends 'champions_championsTogames_p2ChampionId'
      ? championsGetPayload<S['select'][P]> | null :
      P extends 'waywins'
      ? waywinsGetPayload<S['select'][P]> | null : never
    }
  : games
: games


export interface gamesDelegate {
  /**
   * Find zero or one Games that matches the filter.
   * @param {FindOnegamesArgs} args - Arguments to find a Games
   * @example
   * // Get one Games
   * const games = await prisma.games.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnegamesArgs>(
    args: Subset<T, FindOnegamesArgs>
  ): CheckSelect<T, Prisma__gamesClient<games | null>, Prisma__gamesClient<gamesGetPayload<T> | null>>
  /**
   * Find the first Games that matches the filter.
   * @param {FindFirstgamesArgs} args - Arguments to find a Games
   * @example
   * // Get one Games
   * const games = await prisma.games.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstgamesArgs>(
    args?: Subset<T, FindFirstgamesArgs>
  ): CheckSelect<T, Prisma__gamesClient<games | null>, Prisma__gamesClient<gamesGetPayload<T> | null>>
  /**
   * Find zero or more Games that matches the filter.
   * @param {FindManygamesArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Games
   * const games = await prisma.games.findMany()
   * 
   * // Get first 10 Games
   * const games = await prisma.games.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const gamesWithIdOnly = await prisma.games.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManygamesArgs>(
    args?: Subset<T, FindManygamesArgs>
  ): CheckSelect<T, Promise<Array<games>>, Promise<Array<gamesGetPayload<T>>>>
  /**
   * Create a Games.
   * @param {gamesCreateArgs} args - Arguments to create a Games.
   * @example
   * // Create one Games
   * const Games = await prisma.games.create({
   *   data: {
   *     // ... data to create a Games
   *   }
   * })
   * 
  **/
  create<T extends gamesCreateArgs>(
    args: Subset<T, gamesCreateArgs>
  ): CheckSelect<T, Prisma__gamesClient<games>, Prisma__gamesClient<gamesGetPayload<T>>>
  /**
   * Delete a Games.
   * @param {gamesDeleteArgs} args - Arguments to delete one Games.
   * @example
   * // Delete one Games
   * const Games = await prisma.games.delete({
   *   where: {
   *     // ... filter to delete one Games
   *   }
   * })
   * 
  **/
  delete<T extends gamesDeleteArgs>(
    args: Subset<T, gamesDeleteArgs>
  ): CheckSelect<T, Prisma__gamesClient<games>, Prisma__gamesClient<gamesGetPayload<T>>>
  /**
   * Update one Games.
   * @param {gamesUpdateArgs} args - Arguments to update one Games.
   * @example
   * // Update one Games
   * const games = await prisma.games.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends gamesUpdateArgs>(
    args: Subset<T, gamesUpdateArgs>
  ): CheckSelect<T, Prisma__gamesClient<games>, Prisma__gamesClient<gamesGetPayload<T>>>
  /**
   * Delete zero or more Games.
   * @param {gamesDeleteManyArgs} args - Arguments to filter Games to delete.
   * @example
   * // Delete a few Games
   * const { count } = await prisma.games.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends gamesDeleteManyArgs>(
    args: Subset<T, gamesDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Games.
   * @param {gamesUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Games
   * const games = await prisma.games.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends gamesUpdateManyArgs>(
    args: Subset<T, gamesUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Games.
   * @param {gamesUpsertArgs} args - Arguments to update or create a Games.
   * @example
   * // Update or create a Games
   * const games = await prisma.games.upsert({
   *   create: {
   *     // ... data to create a Games
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Games we want to update
   *   }
   * })
  **/
  upsert<T extends gamesUpsertArgs>(
    args: Subset<T, gamesUpsertArgs>
  ): CheckSelect<T, Prisma__gamesClient<games>, Prisma__gamesClient<gamesGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManygamesArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateGamesArgs>(args: Subset<T, AggregateGamesArgs>): Promise<GetGamesAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for games.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__gamesClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  matches<T extends matchesArgs = {}>(args?: Subset<T, matchesArgs>): CheckSelect<T, Prisma__matchesClient<matches | null>, Prisma__matchesClient<matchesGetPayload<T> | null>>;

  champions_championsTogames_p1ChampionId<T extends championsArgs = {}>(args?: Subset<T, championsArgs>): CheckSelect<T, Prisma__championsClient<champions | null>, Prisma__championsClient<championsGetPayload<T> | null>>;

  champions_championsTogames_p2ChampionId<T extends championsArgs = {}>(args?: Subset<T, championsArgs>): CheckSelect<T, Prisma__championsClient<champions | null>, Prisma__championsClient<championsGetPayload<T> | null>>;

  waywins<T extends waywinsArgs = {}>(args?: Subset<T, waywinsArgs>): CheckSelect<T, Prisma__waywinsClient<waywins | null>, Prisma__waywinsClient<waywinsGetPayload<T> | null>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * games findOne
 */
export type FindOnegamesArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
  /**
   * Filter, which games to fetch.
  **/
  where: gamesWhereUniqueInput
}


/**
 * games findFirst
 */
export type FindFirstgamesArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
  /**
   * Filter, which games to fetch.
  **/
  where?: gamesWhereInput
  orderBy?: Enumerable<gamesOrderByInput> | gamesOrderByInput
  cursor?: gamesWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<GamesDistinctFieldEnum>
}


/**
 * games findMany
 */
export type FindManygamesArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
  /**
   * Filter, which games to fetch.
  **/
  where?: gamesWhereInput
  /**
   * Determine the order of the games to fetch.
  **/
  orderBy?: Enumerable<gamesOrderByInput> | gamesOrderByInput
  /**
   * Sets the position for listing games.
  **/
  cursor?: gamesWhereUniqueInput
  /**
   * The number of games to fetch. If negative number, it will take games before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` games.
  **/
  skip?: number
  distinct?: Enumerable<GamesDistinctFieldEnum>
}


/**
 * games create
 */
export type gamesCreateArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
  /**
   * The data needed to create a games.
  **/
  data: gamesCreateInput
}


/**
 * games update
 */
export type gamesUpdateArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
  /**
   * The data needed to update a games.
  **/
  data: gamesUpdateInput
  /**
   * Choose, which games to update.
  **/
  where: gamesWhereUniqueInput
}


/**
 * games updateMany
 */
export type gamesUpdateManyArgs = {
  data: gamesUpdateManyMutationInput
  where?: gamesWhereInput
}


/**
 * games upsert
 */
export type gamesUpsertArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
  /**
   * The filter to search for the games to update in case it exists.
  **/
  where: gamesWhereUniqueInput
  /**
   * In case the games found by the `where` argument doesn't exist, create a new games with this data.
  **/
  create: gamesCreateInput
  /**
   * In case the games was found with the provided `where` argument, update it with this data.
  **/
  update: gamesUpdateInput
}


/**
 * games delete
 */
export type gamesDeleteArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
  /**
   * Filter which games to delete.
  **/
  where: gamesWhereUniqueInput
}


/**
 * games deleteMany
 */
export type gamesDeleteManyArgs = {
  where?: gamesWhereInput
}


/**
 * games without action
 */
export type gamesArgs = {
  /**
   * Select specific fields to fetch from the games
  **/
  select?: gamesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: gamesInclude | null
}



/**
 * Model matchban
 */

export type matchban = {
  gameId: number
  championId: number
  playerId: number
}


export type AggregateMatchban = {
  count: number
  avg: MatchbanAvgAggregateOutputType | null
  sum: MatchbanSumAggregateOutputType | null
  min: MatchbanMinAggregateOutputType | null
  max: MatchbanMaxAggregateOutputType | null
}

export type MatchbanAvgAggregateOutputType = {
  gameId: number
  championId: number
  playerId: number
}

export type MatchbanSumAggregateOutputType = {
  gameId: number
  championId: number
  playerId: number
}

export type MatchbanMinAggregateOutputType = {
  gameId: number
  championId: number
  playerId: number
}

export type MatchbanMaxAggregateOutputType = {
  gameId: number
  championId: number
  playerId: number
}


export type MatchbanAvgAggregateInputType = {
  gameId?: true
  championId?: true
  playerId?: true
}

export type MatchbanSumAggregateInputType = {
  gameId?: true
  championId?: true
  playerId?: true
}

export type MatchbanMinAggregateInputType = {
  gameId?: true
  championId?: true
  playerId?: true
}

export type MatchbanMaxAggregateInputType = {
  gameId?: true
  championId?: true
  playerId?: true
}

export type AggregateMatchbanArgs = {
  where?: matchbanWhereInput
  orderBy?: Enumerable<matchbanOrderByInput> | matchbanOrderByInput
  cursor?: matchbanWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MatchbanDistinctFieldEnum>
  count?: true
  avg?: MatchbanAvgAggregateInputType
  sum?: MatchbanSumAggregateInputType
  min?: MatchbanMinAggregateInputType
  max?: MatchbanMaxAggregateInputType
}

export type GetMatchbanAggregateType<T extends AggregateMatchbanArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMatchbanAggregateScalarType<T[P]>
}

export type GetMatchbanAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MatchbanAvgAggregateOutputType ? MatchbanAvgAggregateOutputType[P] : never
}
    
    

export type matchbanSelect = {
  gameId?: boolean
  championId?: boolean
  playerId?: boolean
}

export type matchbanGetPayload<
  S extends boolean | null | undefined | matchbanArgs,
  U = keyof S
> = S extends true
  ? matchban
  : S extends undefined
  ? never
  : S extends matchbanArgs | FindManymatchbanArgs
  ? 'include' extends U
    ? matchban 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof matchban ? matchban[P]
: 
 never
    }
  : matchban
: matchban


export interface matchbanDelegate {
  /**
   * Find zero or one Matchban that matches the filter.
   * @param {FindOnematchbanArgs} args - Arguments to find a Matchban
   * @example
   * // Get one Matchban
   * const matchban = await prisma.matchban.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnematchbanArgs>(
    args: Subset<T, FindOnematchbanArgs>
  ): CheckSelect<T, Prisma__matchbanClient<matchban | null>, Prisma__matchbanClient<matchbanGetPayload<T> | null>>
  /**
   * Find the first Matchban that matches the filter.
   * @param {FindFirstmatchbanArgs} args - Arguments to find a Matchban
   * @example
   * // Get one Matchban
   * const matchban = await prisma.matchban.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstmatchbanArgs>(
    args?: Subset<T, FindFirstmatchbanArgs>
  ): CheckSelect<T, Prisma__matchbanClient<matchban | null>, Prisma__matchbanClient<matchbanGetPayload<T> | null>>
  /**
   * Find zero or more Matchbans that matches the filter.
   * @param {FindManymatchbanArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Matchbans
   * const matchbans = await prisma.matchban.findMany()
   * 
   * // Get first 10 Matchbans
   * const matchbans = await prisma.matchban.findMany({ take: 10 })
   * 
   * // Only select the `gameId`
   * const matchbanWithGameIdOnly = await prisma.matchban.findMany({ select: { gameId: true } })
   * 
  **/
  findMany<T extends FindManymatchbanArgs>(
    args?: Subset<T, FindManymatchbanArgs>
  ): CheckSelect<T, Promise<Array<matchban>>, Promise<Array<matchbanGetPayload<T>>>>
  /**
   * Create a Matchban.
   * @param {matchbanCreateArgs} args - Arguments to create a Matchban.
   * @example
   * // Create one Matchban
   * const Matchban = await prisma.matchban.create({
   *   data: {
   *     // ... data to create a Matchban
   *   }
   * })
   * 
  **/
  create<T extends matchbanCreateArgs>(
    args: Subset<T, matchbanCreateArgs>
  ): CheckSelect<T, Prisma__matchbanClient<matchban>, Prisma__matchbanClient<matchbanGetPayload<T>>>
  /**
   * Delete a Matchban.
   * @param {matchbanDeleteArgs} args - Arguments to delete one Matchban.
   * @example
   * // Delete one Matchban
   * const Matchban = await prisma.matchban.delete({
   *   where: {
   *     // ... filter to delete one Matchban
   *   }
   * })
   * 
  **/
  delete<T extends matchbanDeleteArgs>(
    args: Subset<T, matchbanDeleteArgs>
  ): CheckSelect<T, Prisma__matchbanClient<matchban>, Prisma__matchbanClient<matchbanGetPayload<T>>>
  /**
   * Update one Matchban.
   * @param {matchbanUpdateArgs} args - Arguments to update one Matchban.
   * @example
   * // Update one Matchban
   * const matchban = await prisma.matchban.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends matchbanUpdateArgs>(
    args: Subset<T, matchbanUpdateArgs>
  ): CheckSelect<T, Prisma__matchbanClient<matchban>, Prisma__matchbanClient<matchbanGetPayload<T>>>
  /**
   * Delete zero or more Matchbans.
   * @param {matchbanDeleteManyArgs} args - Arguments to filter Matchbans to delete.
   * @example
   * // Delete a few Matchbans
   * const { count } = await prisma.matchban.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends matchbanDeleteManyArgs>(
    args: Subset<T, matchbanDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Matchbans.
   * @param {matchbanUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Matchbans
   * const matchban = await prisma.matchban.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends matchbanUpdateManyArgs>(
    args: Subset<T, matchbanUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Matchban.
   * @param {matchbanUpsertArgs} args - Arguments to update or create a Matchban.
   * @example
   * // Update or create a Matchban
   * const matchban = await prisma.matchban.upsert({
   *   create: {
   *     // ... data to create a Matchban
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Matchban we want to update
   *   }
   * })
  **/
  upsert<T extends matchbanUpsertArgs>(
    args: Subset<T, matchbanUpsertArgs>
  ): CheckSelect<T, Prisma__matchbanClient<matchban>, Prisma__matchbanClient<matchbanGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManymatchbanArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMatchbanArgs>(args: Subset<T, AggregateMatchbanArgs>): Promise<GetMatchbanAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for matchban.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__matchbanClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * matchban findOne
 */
export type FindOnematchbanArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
  /**
   * Filter, which matchban to fetch.
  **/
  where: matchbanWhereUniqueInput
}


/**
 * matchban findFirst
 */
export type FindFirstmatchbanArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
  /**
   * Filter, which matchban to fetch.
  **/
  where?: matchbanWhereInput
  orderBy?: Enumerable<matchbanOrderByInput> | matchbanOrderByInput
  cursor?: matchbanWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MatchbanDistinctFieldEnum>
}


/**
 * matchban findMany
 */
export type FindManymatchbanArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
  /**
   * Filter, which matchbans to fetch.
  **/
  where?: matchbanWhereInput
  /**
   * Determine the order of the matchbans to fetch.
  **/
  orderBy?: Enumerable<matchbanOrderByInput> | matchbanOrderByInput
  /**
   * Sets the position for listing matchbans.
  **/
  cursor?: matchbanWhereUniqueInput
  /**
   * The number of matchbans to fetch. If negative number, it will take matchbans before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` matchbans.
  **/
  skip?: number
  distinct?: Enumerable<MatchbanDistinctFieldEnum>
}


/**
 * matchban create
 */
export type matchbanCreateArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
  /**
   * The data needed to create a matchban.
  **/
  data: matchbanCreateInput
}


/**
 * matchban update
 */
export type matchbanUpdateArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
  /**
   * The data needed to update a matchban.
  **/
  data: matchbanUpdateInput
  /**
   * Choose, which matchban to update.
  **/
  where: matchbanWhereUniqueInput
}


/**
 * matchban updateMany
 */
export type matchbanUpdateManyArgs = {
  data: matchbanUpdateManyMutationInput
  where?: matchbanWhereInput
}


/**
 * matchban upsert
 */
export type matchbanUpsertArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
  /**
   * The filter to search for the matchban to update in case it exists.
  **/
  where: matchbanWhereUniqueInput
  /**
   * In case the matchban found by the `where` argument doesn't exist, create a new matchban with this data.
  **/
  create: matchbanCreateInput
  /**
   * In case the matchban was found with the provided `where` argument, update it with this data.
  **/
  update: matchbanUpdateInput
}


/**
 * matchban delete
 */
export type matchbanDeleteArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
  /**
   * Filter which matchban to delete.
  **/
  where: matchbanWhereUniqueInput
}


/**
 * matchban deleteMany
 */
export type matchbanDeleteManyArgs = {
  where?: matchbanWhereInput
}


/**
 * matchban without action
 */
export type matchbanArgs = {
  /**
   * Select specific fields to fetch from the matchban
  **/
  select?: matchbanSelect | null
}



/**
 * Model matches
 */

export type matches = {
  id: number
  tournamentId: number | null
  stageId: number | null
  player1Id: number | null
  player2Id: number | null
}


export type AggregateMatches = {
  count: number
  avg: MatchesAvgAggregateOutputType | null
  sum: MatchesSumAggregateOutputType | null
  min: MatchesMinAggregateOutputType | null
  max: MatchesMaxAggregateOutputType | null
}

export type MatchesAvgAggregateOutputType = {
  id: number
  tournamentId: number | null
  stageId: number | null
  player1Id: number | null
  player2Id: number | null
}

export type MatchesSumAggregateOutputType = {
  id: number
  tournamentId: number | null
  stageId: number | null
  player1Id: number | null
  player2Id: number | null
}

export type MatchesMinAggregateOutputType = {
  id: number
  tournamentId: number | null
  stageId: number | null
  player1Id: number | null
  player2Id: number | null
}

export type MatchesMaxAggregateOutputType = {
  id: number
  tournamentId: number | null
  stageId: number | null
  player1Id: number | null
  player2Id: number | null
}


export type MatchesAvgAggregateInputType = {
  id?: true
  tournamentId?: true
  stageId?: true
  player1Id?: true
  player2Id?: true
}

export type MatchesSumAggregateInputType = {
  id?: true
  tournamentId?: true
  stageId?: true
  player1Id?: true
  player2Id?: true
}

export type MatchesMinAggregateInputType = {
  id?: true
  tournamentId?: true
  stageId?: true
  player1Id?: true
  player2Id?: true
}

export type MatchesMaxAggregateInputType = {
  id?: true
  tournamentId?: true
  stageId?: true
  player1Id?: true
  player2Id?: true
}

export type AggregateMatchesArgs = {
  where?: matchesWhereInput
  orderBy?: Enumerable<matchesOrderByInput> | matchesOrderByInput
  cursor?: matchesWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MatchesDistinctFieldEnum>
  count?: true
  avg?: MatchesAvgAggregateInputType
  sum?: MatchesSumAggregateInputType
  min?: MatchesMinAggregateInputType
  max?: MatchesMaxAggregateInputType
}

export type GetMatchesAggregateType<T extends AggregateMatchesArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMatchesAggregateScalarType<T[P]>
}

export type GetMatchesAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MatchesAvgAggregateOutputType ? MatchesAvgAggregateOutputType[P] : never
}
    
    

export type matchesSelect = {
  id?: boolean
  tournamentId?: boolean
  stageId?: boolean
  player1Id?: boolean
  player2Id?: boolean
  participants_matches_player1IdToparticipants?: boolean | participantsArgs
  participants_matches_player2IdToparticipants?: boolean | participantsArgs
  stages?: boolean | stagesArgs
  tournaments?: boolean | tournamentsArgs
  games?: boolean | FindManygamesArgs
}

export type matchesInclude = {
  participants_matches_player1IdToparticipants?: boolean | participantsArgs
  participants_matches_player2IdToparticipants?: boolean | participantsArgs
  stages?: boolean | stagesArgs
  tournaments?: boolean | tournamentsArgs
  games?: boolean | FindManygamesArgs
}

export type matchesGetPayload<
  S extends boolean | null | undefined | matchesArgs,
  U = keyof S
> = S extends true
  ? matches
  : S extends undefined
  ? never
  : S extends matchesArgs | FindManymatchesArgs
  ? 'include' extends U
    ? matches  & {
      [P in TrueKeys<S['include']>]:
      P extends 'participants_matches_player1IdToparticipants'
      ? participantsGetPayload<S['include'][P]> | null :
      P extends 'participants_matches_player2IdToparticipants'
      ? participantsGetPayload<S['include'][P]> | null :
      P extends 'stages'
      ? stagesGetPayload<S['include'][P]> | null :
      P extends 'tournaments'
      ? tournamentsGetPayload<S['include'][P]> | null :
      P extends 'games'
      ? Array<gamesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof matches ? matches[P]
: 
      P extends 'participants_matches_player1IdToparticipants'
      ? participantsGetPayload<S['select'][P]> | null :
      P extends 'participants_matches_player2IdToparticipants'
      ? participantsGetPayload<S['select'][P]> | null :
      P extends 'stages'
      ? stagesGetPayload<S['select'][P]> | null :
      P extends 'tournaments'
      ? tournamentsGetPayload<S['select'][P]> | null :
      P extends 'games'
      ? Array<gamesGetPayload<S['select'][P]>> : never
    }
  : matches
: matches


export interface matchesDelegate {
  /**
   * Find zero or one Matches that matches the filter.
   * @param {FindOnematchesArgs} args - Arguments to find a Matches
   * @example
   * // Get one Matches
   * const matches = await prisma.matches.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnematchesArgs>(
    args: Subset<T, FindOnematchesArgs>
  ): CheckSelect<T, Prisma__matchesClient<matches | null>, Prisma__matchesClient<matchesGetPayload<T> | null>>
  /**
   * Find the first Matches that matches the filter.
   * @param {FindFirstmatchesArgs} args - Arguments to find a Matches
   * @example
   * // Get one Matches
   * const matches = await prisma.matches.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstmatchesArgs>(
    args?: Subset<T, FindFirstmatchesArgs>
  ): CheckSelect<T, Prisma__matchesClient<matches | null>, Prisma__matchesClient<matchesGetPayload<T> | null>>
  /**
   * Find zero or more Matches that matches the filter.
   * @param {FindManymatchesArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Matches
   * const matches = await prisma.matches.findMany()
   * 
   * // Get first 10 Matches
   * const matches = await prisma.matches.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const matchesWithIdOnly = await prisma.matches.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManymatchesArgs>(
    args?: Subset<T, FindManymatchesArgs>
  ): CheckSelect<T, Promise<Array<matches>>, Promise<Array<matchesGetPayload<T>>>>
  /**
   * Create a Matches.
   * @param {matchesCreateArgs} args - Arguments to create a Matches.
   * @example
   * // Create one Matches
   * const Matches = await prisma.matches.create({
   *   data: {
   *     // ... data to create a Matches
   *   }
   * })
   * 
  **/
  create<T extends matchesCreateArgs>(
    args: Subset<T, matchesCreateArgs>
  ): CheckSelect<T, Prisma__matchesClient<matches>, Prisma__matchesClient<matchesGetPayload<T>>>
  /**
   * Delete a Matches.
   * @param {matchesDeleteArgs} args - Arguments to delete one Matches.
   * @example
   * // Delete one Matches
   * const Matches = await prisma.matches.delete({
   *   where: {
   *     // ... filter to delete one Matches
   *   }
   * })
   * 
  **/
  delete<T extends matchesDeleteArgs>(
    args: Subset<T, matchesDeleteArgs>
  ): CheckSelect<T, Prisma__matchesClient<matches>, Prisma__matchesClient<matchesGetPayload<T>>>
  /**
   * Update one Matches.
   * @param {matchesUpdateArgs} args - Arguments to update one Matches.
   * @example
   * // Update one Matches
   * const matches = await prisma.matches.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends matchesUpdateArgs>(
    args: Subset<T, matchesUpdateArgs>
  ): CheckSelect<T, Prisma__matchesClient<matches>, Prisma__matchesClient<matchesGetPayload<T>>>
  /**
   * Delete zero or more Matches.
   * @param {matchesDeleteManyArgs} args - Arguments to filter Matches to delete.
   * @example
   * // Delete a few Matches
   * const { count } = await prisma.matches.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends matchesDeleteManyArgs>(
    args: Subset<T, matchesDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Matches.
   * @param {matchesUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Matches
   * const matches = await prisma.matches.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends matchesUpdateManyArgs>(
    args: Subset<T, matchesUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Matches.
   * @param {matchesUpsertArgs} args - Arguments to update or create a Matches.
   * @example
   * // Update or create a Matches
   * const matches = await prisma.matches.upsert({
   *   create: {
   *     // ... data to create a Matches
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Matches we want to update
   *   }
   * })
  **/
  upsert<T extends matchesUpsertArgs>(
    args: Subset<T, matchesUpsertArgs>
  ): CheckSelect<T, Prisma__matchesClient<matches>, Prisma__matchesClient<matchesGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManymatchesArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMatchesArgs>(args: Subset<T, AggregateMatchesArgs>): Promise<GetMatchesAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for matches.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__matchesClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  participants_matches_player1IdToparticipants<T extends participantsArgs = {}>(args?: Subset<T, participantsArgs>): CheckSelect<T, Prisma__participantsClient<participants | null>, Prisma__participantsClient<participantsGetPayload<T> | null>>;

  participants_matches_player2IdToparticipants<T extends participantsArgs = {}>(args?: Subset<T, participantsArgs>): CheckSelect<T, Prisma__participantsClient<participants | null>, Prisma__participantsClient<participantsGetPayload<T> | null>>;

  stages<T extends stagesArgs = {}>(args?: Subset<T, stagesArgs>): CheckSelect<T, Prisma__stagesClient<stages | null>, Prisma__stagesClient<stagesGetPayload<T> | null>>;

  tournaments<T extends tournamentsArgs = {}>(args?: Subset<T, tournamentsArgs>): CheckSelect<T, Prisma__tournamentsClient<tournaments | null>, Prisma__tournamentsClient<tournamentsGetPayload<T> | null>>;

  games<T extends FindManygamesArgs = {}>(args?: Subset<T, FindManygamesArgs>): CheckSelect<T, Promise<Array<games>>, Promise<Array<gamesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * matches findOne
 */
export type FindOnematchesArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
  /**
   * Filter, which matches to fetch.
  **/
  where: matchesWhereUniqueInput
}


/**
 * matches findFirst
 */
export type FindFirstmatchesArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
  /**
   * Filter, which matches to fetch.
  **/
  where?: matchesWhereInput
  orderBy?: Enumerable<matchesOrderByInput> | matchesOrderByInput
  cursor?: matchesWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MatchesDistinctFieldEnum>
}


/**
 * matches findMany
 */
export type FindManymatchesArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
  /**
   * Filter, which matches to fetch.
  **/
  where?: matchesWhereInput
  /**
   * Determine the order of the matches to fetch.
  **/
  orderBy?: Enumerable<matchesOrderByInput> | matchesOrderByInput
  /**
   * Sets the position for listing matches.
  **/
  cursor?: matchesWhereUniqueInput
  /**
   * The number of matches to fetch. If negative number, it will take matches before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` matches.
  **/
  skip?: number
  distinct?: Enumerable<MatchesDistinctFieldEnum>
}


/**
 * matches create
 */
export type matchesCreateArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
  /**
   * The data needed to create a matches.
  **/
  data: matchesCreateInput
}


/**
 * matches update
 */
export type matchesUpdateArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
  /**
   * The data needed to update a matches.
  **/
  data: matchesUpdateInput
  /**
   * Choose, which matches to update.
  **/
  where: matchesWhereUniqueInput
}


/**
 * matches updateMany
 */
export type matchesUpdateManyArgs = {
  data: matchesUpdateManyMutationInput
  where?: matchesWhereInput
}


/**
 * matches upsert
 */
export type matchesUpsertArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
  /**
   * The filter to search for the matches to update in case it exists.
  **/
  where: matchesWhereUniqueInput
  /**
   * In case the matches found by the `where` argument doesn't exist, create a new matches with this data.
  **/
  create: matchesCreateInput
  /**
   * In case the matches was found with the provided `where` argument, update it with this data.
  **/
  update: matchesUpdateInput
}


/**
 * matches delete
 */
export type matchesDeleteArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
  /**
   * Filter which matches to delete.
  **/
  where: matchesWhereUniqueInput
}


/**
 * matches deleteMany
 */
export type matchesDeleteManyArgs = {
  where?: matchesWhereInput
}


/**
 * matches without action
 */
export type matchesArgs = {
  /**
   * Select specific fields to fetch from the matches
  **/
  select?: matchesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: matchesInclude | null
}



/**
 * Model matchesbans
 */

export type matchesbans = {
  matchId: number
  championId: number
  playerId: number
}


export type AggregateMatchesbans = {
  count: number
  avg: MatchesbansAvgAggregateOutputType | null
  sum: MatchesbansSumAggregateOutputType | null
  min: MatchesbansMinAggregateOutputType | null
  max: MatchesbansMaxAggregateOutputType | null
}

export type MatchesbansAvgAggregateOutputType = {
  matchId: number
  championId: number
  playerId: number
}

export type MatchesbansSumAggregateOutputType = {
  matchId: number
  championId: number
  playerId: number
}

export type MatchesbansMinAggregateOutputType = {
  matchId: number
  championId: number
  playerId: number
}

export type MatchesbansMaxAggregateOutputType = {
  matchId: number
  championId: number
  playerId: number
}


export type MatchesbansAvgAggregateInputType = {
  matchId?: true
  championId?: true
  playerId?: true
}

export type MatchesbansSumAggregateInputType = {
  matchId?: true
  championId?: true
  playerId?: true
}

export type MatchesbansMinAggregateInputType = {
  matchId?: true
  championId?: true
  playerId?: true
}

export type MatchesbansMaxAggregateInputType = {
  matchId?: true
  championId?: true
  playerId?: true
}

export type AggregateMatchesbansArgs = {
  where?: matchesbansWhereInput
  orderBy?: Enumerable<matchesbansOrderByInput> | matchesbansOrderByInput
  cursor?: matchesbansWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MatchesbansDistinctFieldEnum>
  count?: true
  avg?: MatchesbansAvgAggregateInputType
  sum?: MatchesbansSumAggregateInputType
  min?: MatchesbansMinAggregateInputType
  max?: MatchesbansMaxAggregateInputType
}

export type GetMatchesbansAggregateType<T extends AggregateMatchesbansArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetMatchesbansAggregateScalarType<T[P]>
}

export type GetMatchesbansAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof MatchesbansAvgAggregateOutputType ? MatchesbansAvgAggregateOutputType[P] : never
}
    
    

export type matchesbansSelect = {
  matchId?: boolean
  championId?: boolean
  playerId?: boolean
}

export type matchesbansGetPayload<
  S extends boolean | null | undefined | matchesbansArgs,
  U = keyof S
> = S extends true
  ? matchesbans
  : S extends undefined
  ? never
  : S extends matchesbansArgs | FindManymatchesbansArgs
  ? 'include' extends U
    ? matchesbans 
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof matchesbans ? matchesbans[P]
: 
 never
    }
  : matchesbans
: matchesbans


export interface matchesbansDelegate {
  /**
   * Find zero or one Matchesbans that matches the filter.
   * @param {FindOnematchesbansArgs} args - Arguments to find a Matchesbans
   * @example
   * // Get one Matchesbans
   * const matchesbans = await prisma.matchesbans.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnematchesbansArgs>(
    args: Subset<T, FindOnematchesbansArgs>
  ): CheckSelect<T, Prisma__matchesbansClient<matchesbans | null>, Prisma__matchesbansClient<matchesbansGetPayload<T> | null>>
  /**
   * Find the first Matchesbans that matches the filter.
   * @param {FindFirstmatchesbansArgs} args - Arguments to find a Matchesbans
   * @example
   * // Get one Matchesbans
   * const matchesbans = await prisma.matchesbans.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstmatchesbansArgs>(
    args?: Subset<T, FindFirstmatchesbansArgs>
  ): CheckSelect<T, Prisma__matchesbansClient<matchesbans | null>, Prisma__matchesbansClient<matchesbansGetPayload<T> | null>>
  /**
   * Find zero or more Matchesbans that matches the filter.
   * @param {FindManymatchesbansArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Matchesbans
   * const matchesbans = await prisma.matchesbans.findMany()
   * 
   * // Get first 10 Matchesbans
   * const matchesbans = await prisma.matchesbans.findMany({ take: 10 })
   * 
   * // Only select the `matchId`
   * const matchesbansWithMatchIdOnly = await prisma.matchesbans.findMany({ select: { matchId: true } })
   * 
  **/
  findMany<T extends FindManymatchesbansArgs>(
    args?: Subset<T, FindManymatchesbansArgs>
  ): CheckSelect<T, Promise<Array<matchesbans>>, Promise<Array<matchesbansGetPayload<T>>>>
  /**
   * Create a Matchesbans.
   * @param {matchesbansCreateArgs} args - Arguments to create a Matchesbans.
   * @example
   * // Create one Matchesbans
   * const Matchesbans = await prisma.matchesbans.create({
   *   data: {
   *     // ... data to create a Matchesbans
   *   }
   * })
   * 
  **/
  create<T extends matchesbansCreateArgs>(
    args: Subset<T, matchesbansCreateArgs>
  ): CheckSelect<T, Prisma__matchesbansClient<matchesbans>, Prisma__matchesbansClient<matchesbansGetPayload<T>>>
  /**
   * Delete a Matchesbans.
   * @param {matchesbansDeleteArgs} args - Arguments to delete one Matchesbans.
   * @example
   * // Delete one Matchesbans
   * const Matchesbans = await prisma.matchesbans.delete({
   *   where: {
   *     // ... filter to delete one Matchesbans
   *   }
   * })
   * 
  **/
  delete<T extends matchesbansDeleteArgs>(
    args: Subset<T, matchesbansDeleteArgs>
  ): CheckSelect<T, Prisma__matchesbansClient<matchesbans>, Prisma__matchesbansClient<matchesbansGetPayload<T>>>
  /**
   * Update one Matchesbans.
   * @param {matchesbansUpdateArgs} args - Arguments to update one Matchesbans.
   * @example
   * // Update one Matchesbans
   * const matchesbans = await prisma.matchesbans.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends matchesbansUpdateArgs>(
    args: Subset<T, matchesbansUpdateArgs>
  ): CheckSelect<T, Prisma__matchesbansClient<matchesbans>, Prisma__matchesbansClient<matchesbansGetPayload<T>>>
  /**
   * Delete zero or more Matchesbans.
   * @param {matchesbansDeleteManyArgs} args - Arguments to filter Matchesbans to delete.
   * @example
   * // Delete a few Matchesbans
   * const { count } = await prisma.matchesbans.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends matchesbansDeleteManyArgs>(
    args: Subset<T, matchesbansDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Matchesbans.
   * @param {matchesbansUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Matchesbans
   * const matchesbans = await prisma.matchesbans.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends matchesbansUpdateManyArgs>(
    args: Subset<T, matchesbansUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Matchesbans.
   * @param {matchesbansUpsertArgs} args - Arguments to update or create a Matchesbans.
   * @example
   * // Update or create a Matchesbans
   * const matchesbans = await prisma.matchesbans.upsert({
   *   create: {
   *     // ... data to create a Matchesbans
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Matchesbans we want to update
   *   }
   * })
  **/
  upsert<T extends matchesbansUpsertArgs>(
    args: Subset<T, matchesbansUpsertArgs>
  ): CheckSelect<T, Prisma__matchesbansClient<matchesbans>, Prisma__matchesbansClient<matchesbansGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManymatchesbansArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateMatchesbansArgs>(args: Subset<T, AggregateMatchesbansArgs>): Promise<GetMatchesbansAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for matchesbans.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__matchesbansClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';


  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * matchesbans findOne
 */
export type FindOnematchesbansArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
  /**
   * Filter, which matchesbans to fetch.
  **/
  where: matchesbansWhereUniqueInput
}


/**
 * matchesbans findFirst
 */
export type FindFirstmatchesbansArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
  /**
   * Filter, which matchesbans to fetch.
  **/
  where?: matchesbansWhereInput
  orderBy?: Enumerable<matchesbansOrderByInput> | matchesbansOrderByInput
  cursor?: matchesbansWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<MatchesbansDistinctFieldEnum>
}


/**
 * matchesbans findMany
 */
export type FindManymatchesbansArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
  /**
   * Filter, which matchesbans to fetch.
  **/
  where?: matchesbansWhereInput
  /**
   * Determine the order of the matchesbans to fetch.
  **/
  orderBy?: Enumerable<matchesbansOrderByInput> | matchesbansOrderByInput
  /**
   * Sets the position for listing matchesbans.
  **/
  cursor?: matchesbansWhereUniqueInput
  /**
   * The number of matchesbans to fetch. If negative number, it will take matchesbans before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` matchesbans.
  **/
  skip?: number
  distinct?: Enumerable<MatchesbansDistinctFieldEnum>
}


/**
 * matchesbans create
 */
export type matchesbansCreateArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
  /**
   * The data needed to create a matchesbans.
  **/
  data: matchesbansCreateInput
}


/**
 * matchesbans update
 */
export type matchesbansUpdateArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
  /**
   * The data needed to update a matchesbans.
  **/
  data: matchesbansUpdateInput
  /**
   * Choose, which matchesbans to update.
  **/
  where: matchesbansWhereUniqueInput
}


/**
 * matchesbans updateMany
 */
export type matchesbansUpdateManyArgs = {
  data: matchesbansUpdateManyMutationInput
  where?: matchesbansWhereInput
}


/**
 * matchesbans upsert
 */
export type matchesbansUpsertArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
  /**
   * The filter to search for the matchesbans to update in case it exists.
  **/
  where: matchesbansWhereUniqueInput
  /**
   * In case the matchesbans found by the `where` argument doesn't exist, create a new matchesbans with this data.
  **/
  create: matchesbansCreateInput
  /**
   * In case the matchesbans was found with the provided `where` argument, update it with this data.
  **/
  update: matchesbansUpdateInput
}


/**
 * matchesbans delete
 */
export type matchesbansDeleteArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
  /**
   * Filter which matchesbans to delete.
  **/
  where: matchesbansWhereUniqueInput
}


/**
 * matchesbans deleteMany
 */
export type matchesbansDeleteManyArgs = {
  where?: matchesbansWhereInput
}


/**
 * matchesbans without action
 */
export type matchesbansArgs = {
  /**
   * Select specific fields to fetch from the matchesbans
  **/
  select?: matchesbansSelect | null
}



/**
 * Model participants
 */

export type participants = {
  id: number
  name: string
  rankId: number | null
  signUpDate: Date | null
  resignationDate: Date | null
}


export type AggregateParticipants = {
  count: number
  avg: ParticipantsAvgAggregateOutputType | null
  sum: ParticipantsSumAggregateOutputType | null
  min: ParticipantsMinAggregateOutputType | null
  max: ParticipantsMaxAggregateOutputType | null
}

export type ParticipantsAvgAggregateOutputType = {
  id: number
  rankId: number | null
}

export type ParticipantsSumAggregateOutputType = {
  id: number
  rankId: number | null
}

export type ParticipantsMinAggregateOutputType = {
  id: number
  rankId: number | null
}

export type ParticipantsMaxAggregateOutputType = {
  id: number
  rankId: number | null
}


export type ParticipantsAvgAggregateInputType = {
  id?: true
  rankId?: true
}

export type ParticipantsSumAggregateInputType = {
  id?: true
  rankId?: true
}

export type ParticipantsMinAggregateInputType = {
  id?: true
  rankId?: true
}

export type ParticipantsMaxAggregateInputType = {
  id?: true
  rankId?: true
}

export type AggregateParticipantsArgs = {
  where?: participantsWhereInput
  orderBy?: Enumerable<participantsOrderByInput> | participantsOrderByInput
  cursor?: participantsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ParticipantsDistinctFieldEnum>
  count?: true
  avg?: ParticipantsAvgAggregateInputType
  sum?: ParticipantsSumAggregateInputType
  min?: ParticipantsMinAggregateInputType
  max?: ParticipantsMaxAggregateInputType
}

export type GetParticipantsAggregateType<T extends AggregateParticipantsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetParticipantsAggregateScalarType<T[P]>
}

export type GetParticipantsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof ParticipantsAvgAggregateOutputType ? ParticipantsAvgAggregateOutputType[P] : never
}
    
    

export type participantsSelect = {
  id?: boolean
  name?: boolean
  rankId?: boolean
  signUpDate?: boolean
  resignationDate?: boolean
  ranks?: boolean | ranksArgs
  matches_matches_player1IdToparticipants?: boolean | FindManymatchesArgs
  matches_matches_player2IdToparticipants?: boolean | FindManymatchesArgs
}

export type participantsInclude = {
  ranks?: boolean | ranksArgs
  matches_matches_player1IdToparticipants?: boolean | FindManymatchesArgs
  matches_matches_player2IdToparticipants?: boolean | FindManymatchesArgs
}

export type participantsGetPayload<
  S extends boolean | null | undefined | participantsArgs,
  U = keyof S
> = S extends true
  ? participants
  : S extends undefined
  ? never
  : S extends participantsArgs | FindManyparticipantsArgs
  ? 'include' extends U
    ? participants  & {
      [P in TrueKeys<S['include']>]:
      P extends 'ranks'
      ? ranksGetPayload<S['include'][P]> | null :
      P extends 'matches_matches_player1IdToparticipants'
      ? Array<matchesGetPayload<S['include'][P]>> :
      P extends 'matches_matches_player2IdToparticipants'
      ? Array<matchesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof participants ? participants[P]
: 
      P extends 'ranks'
      ? ranksGetPayload<S['select'][P]> | null :
      P extends 'matches_matches_player1IdToparticipants'
      ? Array<matchesGetPayload<S['select'][P]>> :
      P extends 'matches_matches_player2IdToparticipants'
      ? Array<matchesGetPayload<S['select'][P]>> : never
    }
  : participants
: participants


export interface participantsDelegate {
  /**
   * Find zero or one Participants that matches the filter.
   * @param {FindOneparticipantsArgs} args - Arguments to find a Participants
   * @example
   * // Get one Participants
   * const participants = await prisma.participants.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneparticipantsArgs>(
    args: Subset<T, FindOneparticipantsArgs>
  ): CheckSelect<T, Prisma__participantsClient<participants | null>, Prisma__participantsClient<participantsGetPayload<T> | null>>
  /**
   * Find the first Participants that matches the filter.
   * @param {FindFirstparticipantsArgs} args - Arguments to find a Participants
   * @example
   * // Get one Participants
   * const participants = await prisma.participants.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstparticipantsArgs>(
    args?: Subset<T, FindFirstparticipantsArgs>
  ): CheckSelect<T, Prisma__participantsClient<participants | null>, Prisma__participantsClient<participantsGetPayload<T> | null>>
  /**
   * Find zero or more Participants that matches the filter.
   * @param {FindManyparticipantsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Participants
   * const participants = await prisma.participants.findMany()
   * 
   * // Get first 10 Participants
   * const participants = await prisma.participants.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const participantsWithIdOnly = await prisma.participants.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyparticipantsArgs>(
    args?: Subset<T, FindManyparticipantsArgs>
  ): CheckSelect<T, Promise<Array<participants>>, Promise<Array<participantsGetPayload<T>>>>
  /**
   * Create a Participants.
   * @param {participantsCreateArgs} args - Arguments to create a Participants.
   * @example
   * // Create one Participants
   * const Participants = await prisma.participants.create({
   *   data: {
   *     // ... data to create a Participants
   *   }
   * })
   * 
  **/
  create<T extends participantsCreateArgs>(
    args: Subset<T, participantsCreateArgs>
  ): CheckSelect<T, Prisma__participantsClient<participants>, Prisma__participantsClient<participantsGetPayload<T>>>
  /**
   * Delete a Participants.
   * @param {participantsDeleteArgs} args - Arguments to delete one Participants.
   * @example
   * // Delete one Participants
   * const Participants = await prisma.participants.delete({
   *   where: {
   *     // ... filter to delete one Participants
   *   }
   * })
   * 
  **/
  delete<T extends participantsDeleteArgs>(
    args: Subset<T, participantsDeleteArgs>
  ): CheckSelect<T, Prisma__participantsClient<participants>, Prisma__participantsClient<participantsGetPayload<T>>>
  /**
   * Update one Participants.
   * @param {participantsUpdateArgs} args - Arguments to update one Participants.
   * @example
   * // Update one Participants
   * const participants = await prisma.participants.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends participantsUpdateArgs>(
    args: Subset<T, participantsUpdateArgs>
  ): CheckSelect<T, Prisma__participantsClient<participants>, Prisma__participantsClient<participantsGetPayload<T>>>
  /**
   * Delete zero or more Participants.
   * @param {participantsDeleteManyArgs} args - Arguments to filter Participants to delete.
   * @example
   * // Delete a few Participants
   * const { count } = await prisma.participants.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends participantsDeleteManyArgs>(
    args: Subset<T, participantsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Participants.
   * @param {participantsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Participants
   * const participants = await prisma.participants.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends participantsUpdateManyArgs>(
    args: Subset<T, participantsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Participants.
   * @param {participantsUpsertArgs} args - Arguments to update or create a Participants.
   * @example
   * // Update or create a Participants
   * const participants = await prisma.participants.upsert({
   *   create: {
   *     // ... data to create a Participants
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Participants we want to update
   *   }
   * })
  **/
  upsert<T extends participantsUpsertArgs>(
    args: Subset<T, participantsUpsertArgs>
  ): CheckSelect<T, Prisma__participantsClient<participants>, Prisma__participantsClient<participantsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyparticipantsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateParticipantsArgs>(args: Subset<T, AggregateParticipantsArgs>): Promise<GetParticipantsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for participants.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__participantsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  ranks<T extends ranksArgs = {}>(args?: Subset<T, ranksArgs>): CheckSelect<T, Prisma__ranksClient<ranks | null>, Prisma__ranksClient<ranksGetPayload<T> | null>>;

  matches_matches_player1IdToparticipants<T extends FindManymatchesArgs = {}>(args?: Subset<T, FindManymatchesArgs>): CheckSelect<T, Promise<Array<matches>>, Promise<Array<matchesGetPayload<T>>>>;

  matches_matches_player2IdToparticipants<T extends FindManymatchesArgs = {}>(args?: Subset<T, FindManymatchesArgs>): CheckSelect<T, Promise<Array<matches>>, Promise<Array<matchesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * participants findOne
 */
export type FindOneparticipantsArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
  /**
   * Filter, which participants to fetch.
  **/
  where: participantsWhereUniqueInput
}


/**
 * participants findFirst
 */
export type FindFirstparticipantsArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
  /**
   * Filter, which participants to fetch.
  **/
  where?: participantsWhereInput
  orderBy?: Enumerable<participantsOrderByInput> | participantsOrderByInput
  cursor?: participantsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<ParticipantsDistinctFieldEnum>
}


/**
 * participants findMany
 */
export type FindManyparticipantsArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
  /**
   * Filter, which participants to fetch.
  **/
  where?: participantsWhereInput
  /**
   * Determine the order of the participants to fetch.
  **/
  orderBy?: Enumerable<participantsOrderByInput> | participantsOrderByInput
  /**
   * Sets the position for listing participants.
  **/
  cursor?: participantsWhereUniqueInput
  /**
   * The number of participants to fetch. If negative number, it will take participants before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` participants.
  **/
  skip?: number
  distinct?: Enumerable<ParticipantsDistinctFieldEnum>
}


/**
 * participants create
 */
export type participantsCreateArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
  /**
   * The data needed to create a participants.
  **/
  data: participantsCreateInput
}


/**
 * participants update
 */
export type participantsUpdateArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
  /**
   * The data needed to update a participants.
  **/
  data: participantsUpdateInput
  /**
   * Choose, which participants to update.
  **/
  where: participantsWhereUniqueInput
}


/**
 * participants updateMany
 */
export type participantsUpdateManyArgs = {
  data: participantsUpdateManyMutationInput
  where?: participantsWhereInput
}


/**
 * participants upsert
 */
export type participantsUpsertArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
  /**
   * The filter to search for the participants to update in case it exists.
  **/
  where: participantsWhereUniqueInput
  /**
   * In case the participants found by the `where` argument doesn't exist, create a new participants with this data.
  **/
  create: participantsCreateInput
  /**
   * In case the participants was found with the provided `where` argument, update it with this data.
  **/
  update: participantsUpdateInput
}


/**
 * participants delete
 */
export type participantsDeleteArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
  /**
   * Filter which participants to delete.
  **/
  where: participantsWhereUniqueInput
}


/**
 * participants deleteMany
 */
export type participantsDeleteManyArgs = {
  where?: participantsWhereInput
}


/**
 * participants without action
 */
export type participantsArgs = {
  /**
   * Select specific fields to fetch from the participants
  **/
  select?: participantsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: participantsInclude | null
}



/**
 * Model ranks
 */

export type ranks = {
  id: number
  name: string
}


export type AggregateRanks = {
  count: number
  avg: RanksAvgAggregateOutputType | null
  sum: RanksSumAggregateOutputType | null
  min: RanksMinAggregateOutputType | null
  max: RanksMaxAggregateOutputType | null
}

export type RanksAvgAggregateOutputType = {
  id: number
}

export type RanksSumAggregateOutputType = {
  id: number
}

export type RanksMinAggregateOutputType = {
  id: number
}

export type RanksMaxAggregateOutputType = {
  id: number
}


export type RanksAvgAggregateInputType = {
  id?: true
}

export type RanksSumAggregateInputType = {
  id?: true
}

export type RanksMinAggregateInputType = {
  id?: true
}

export type RanksMaxAggregateInputType = {
  id?: true
}

export type AggregateRanksArgs = {
  where?: ranksWhereInput
  orderBy?: Enumerable<ranksOrderByInput> | ranksOrderByInput
  cursor?: ranksWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RanksDistinctFieldEnum>
  count?: true
  avg?: RanksAvgAggregateInputType
  sum?: RanksSumAggregateInputType
  min?: RanksMinAggregateInputType
  max?: RanksMaxAggregateInputType
}

export type GetRanksAggregateType<T extends AggregateRanksArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetRanksAggregateScalarType<T[P]>
}

export type GetRanksAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof RanksAvgAggregateOutputType ? RanksAvgAggregateOutputType[P] : never
}
    
    

export type ranksSelect = {
  id?: boolean
  name?: boolean
  participants?: boolean | FindManyparticipantsArgs
}

export type ranksInclude = {
  participants?: boolean | FindManyparticipantsArgs
}

export type ranksGetPayload<
  S extends boolean | null | undefined | ranksArgs,
  U = keyof S
> = S extends true
  ? ranks
  : S extends undefined
  ? never
  : S extends ranksArgs | FindManyranksArgs
  ? 'include' extends U
    ? ranks  & {
      [P in TrueKeys<S['include']>]:
      P extends 'participants'
      ? Array<participantsGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof ranks ? ranks[P]
: 
      P extends 'participants'
      ? Array<participantsGetPayload<S['select'][P]>> : never
    }
  : ranks
: ranks


export interface ranksDelegate {
  /**
   * Find zero or one Ranks that matches the filter.
   * @param {FindOneranksArgs} args - Arguments to find a Ranks
   * @example
   * // Get one Ranks
   * const ranks = await prisma.ranks.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOneranksArgs>(
    args: Subset<T, FindOneranksArgs>
  ): CheckSelect<T, Prisma__ranksClient<ranks | null>, Prisma__ranksClient<ranksGetPayload<T> | null>>
  /**
   * Find the first Ranks that matches the filter.
   * @param {FindFirstranksArgs} args - Arguments to find a Ranks
   * @example
   * // Get one Ranks
   * const ranks = await prisma.ranks.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstranksArgs>(
    args?: Subset<T, FindFirstranksArgs>
  ): CheckSelect<T, Prisma__ranksClient<ranks | null>, Prisma__ranksClient<ranksGetPayload<T> | null>>
  /**
   * Find zero or more Ranks that matches the filter.
   * @param {FindManyranksArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Ranks
   * const ranks = await prisma.ranks.findMany()
   * 
   * // Get first 10 Ranks
   * const ranks = await prisma.ranks.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const ranksWithIdOnly = await prisma.ranks.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManyranksArgs>(
    args?: Subset<T, FindManyranksArgs>
  ): CheckSelect<T, Promise<Array<ranks>>, Promise<Array<ranksGetPayload<T>>>>
  /**
   * Create a Ranks.
   * @param {ranksCreateArgs} args - Arguments to create a Ranks.
   * @example
   * // Create one Ranks
   * const Ranks = await prisma.ranks.create({
   *   data: {
   *     // ... data to create a Ranks
   *   }
   * })
   * 
  **/
  create<T extends ranksCreateArgs>(
    args: Subset<T, ranksCreateArgs>
  ): CheckSelect<T, Prisma__ranksClient<ranks>, Prisma__ranksClient<ranksGetPayload<T>>>
  /**
   * Delete a Ranks.
   * @param {ranksDeleteArgs} args - Arguments to delete one Ranks.
   * @example
   * // Delete one Ranks
   * const Ranks = await prisma.ranks.delete({
   *   where: {
   *     // ... filter to delete one Ranks
   *   }
   * })
   * 
  **/
  delete<T extends ranksDeleteArgs>(
    args: Subset<T, ranksDeleteArgs>
  ): CheckSelect<T, Prisma__ranksClient<ranks>, Prisma__ranksClient<ranksGetPayload<T>>>
  /**
   * Update one Ranks.
   * @param {ranksUpdateArgs} args - Arguments to update one Ranks.
   * @example
   * // Update one Ranks
   * const ranks = await prisma.ranks.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends ranksUpdateArgs>(
    args: Subset<T, ranksUpdateArgs>
  ): CheckSelect<T, Prisma__ranksClient<ranks>, Prisma__ranksClient<ranksGetPayload<T>>>
  /**
   * Delete zero or more Ranks.
   * @param {ranksDeleteManyArgs} args - Arguments to filter Ranks to delete.
   * @example
   * // Delete a few Ranks
   * const { count } = await prisma.ranks.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends ranksDeleteManyArgs>(
    args: Subset<T, ranksDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Ranks.
   * @param {ranksUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Ranks
   * const ranks = await prisma.ranks.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends ranksUpdateManyArgs>(
    args: Subset<T, ranksUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Ranks.
   * @param {ranksUpsertArgs} args - Arguments to update or create a Ranks.
   * @example
   * // Update or create a Ranks
   * const ranks = await prisma.ranks.upsert({
   *   create: {
   *     // ... data to create a Ranks
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Ranks we want to update
   *   }
   * })
  **/
  upsert<T extends ranksUpsertArgs>(
    args: Subset<T, ranksUpsertArgs>
  ): CheckSelect<T, Prisma__ranksClient<ranks>, Prisma__ranksClient<ranksGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManyranksArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateRanksArgs>(args: Subset<T, AggregateRanksArgs>): Promise<GetRanksAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for ranks.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__ranksClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  participants<T extends FindManyparticipantsArgs = {}>(args?: Subset<T, FindManyparticipantsArgs>): CheckSelect<T, Promise<Array<participants>>, Promise<Array<participantsGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * ranks findOne
 */
export type FindOneranksArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
  /**
   * Filter, which ranks to fetch.
  **/
  where: ranksWhereUniqueInput
}


/**
 * ranks findFirst
 */
export type FindFirstranksArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
  /**
   * Filter, which ranks to fetch.
  **/
  where?: ranksWhereInput
  orderBy?: Enumerable<ranksOrderByInput> | ranksOrderByInput
  cursor?: ranksWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<RanksDistinctFieldEnum>
}


/**
 * ranks findMany
 */
export type FindManyranksArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
  /**
   * Filter, which ranks to fetch.
  **/
  where?: ranksWhereInput
  /**
   * Determine the order of the ranks to fetch.
  **/
  orderBy?: Enumerable<ranksOrderByInput> | ranksOrderByInput
  /**
   * Sets the position for listing ranks.
  **/
  cursor?: ranksWhereUniqueInput
  /**
   * The number of ranks to fetch. If negative number, it will take ranks before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` ranks.
  **/
  skip?: number
  distinct?: Enumerable<RanksDistinctFieldEnum>
}


/**
 * ranks create
 */
export type ranksCreateArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
  /**
   * The data needed to create a ranks.
  **/
  data: ranksCreateInput
}


/**
 * ranks update
 */
export type ranksUpdateArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
  /**
   * The data needed to update a ranks.
  **/
  data: ranksUpdateInput
  /**
   * Choose, which ranks to update.
  **/
  where: ranksWhereUniqueInput
}


/**
 * ranks updateMany
 */
export type ranksUpdateManyArgs = {
  data: ranksUpdateManyMutationInput
  where?: ranksWhereInput
}


/**
 * ranks upsert
 */
export type ranksUpsertArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
  /**
   * The filter to search for the ranks to update in case it exists.
  **/
  where: ranksWhereUniqueInput
  /**
   * In case the ranks found by the `where` argument doesn't exist, create a new ranks with this data.
  **/
  create: ranksCreateInput
  /**
   * In case the ranks was found with the provided `where` argument, update it with this data.
  **/
  update: ranksUpdateInput
}


/**
 * ranks delete
 */
export type ranksDeleteArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
  /**
   * Filter which ranks to delete.
  **/
  where: ranksWhereUniqueInput
}


/**
 * ranks deleteMany
 */
export type ranksDeleteManyArgs = {
  where?: ranksWhereInput
}


/**
 * ranks without action
 */
export type ranksArgs = {
  /**
   * Select specific fields to fetch from the ranks
  **/
  select?: ranksSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: ranksInclude | null
}



/**
 * Model stages
 */

export type stages = {
  id: number
  name: string
}


export type AggregateStages = {
  count: number
  avg: StagesAvgAggregateOutputType | null
  sum: StagesSumAggregateOutputType | null
  min: StagesMinAggregateOutputType | null
  max: StagesMaxAggregateOutputType | null
}

export type StagesAvgAggregateOutputType = {
  id: number
}

export type StagesSumAggregateOutputType = {
  id: number
}

export type StagesMinAggregateOutputType = {
  id: number
}

export type StagesMaxAggregateOutputType = {
  id: number
}


export type StagesAvgAggregateInputType = {
  id?: true
}

export type StagesSumAggregateInputType = {
  id?: true
}

export type StagesMinAggregateInputType = {
  id?: true
}

export type StagesMaxAggregateInputType = {
  id?: true
}

export type AggregateStagesArgs = {
  where?: stagesWhereInput
  orderBy?: Enumerable<stagesOrderByInput> | stagesOrderByInput
  cursor?: stagesWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<StagesDistinctFieldEnum>
  count?: true
  avg?: StagesAvgAggregateInputType
  sum?: StagesSumAggregateInputType
  min?: StagesMinAggregateInputType
  max?: StagesMaxAggregateInputType
}

export type GetStagesAggregateType<T extends AggregateStagesArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetStagesAggregateScalarType<T[P]>
}

export type GetStagesAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof StagesAvgAggregateOutputType ? StagesAvgAggregateOutputType[P] : never
}
    
    

export type stagesSelect = {
  id?: boolean
  name?: boolean
  matches?: boolean | FindManymatchesArgs
}

export type stagesInclude = {
  matches?: boolean | FindManymatchesArgs
}

export type stagesGetPayload<
  S extends boolean | null | undefined | stagesArgs,
  U = keyof S
> = S extends true
  ? stages
  : S extends undefined
  ? never
  : S extends stagesArgs | FindManystagesArgs
  ? 'include' extends U
    ? stages  & {
      [P in TrueKeys<S['include']>]:
      P extends 'matches'
      ? Array<matchesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof stages ? stages[P]
: 
      P extends 'matches'
      ? Array<matchesGetPayload<S['select'][P]>> : never
    }
  : stages
: stages


export interface stagesDelegate {
  /**
   * Find zero or one Stages that matches the filter.
   * @param {FindOnestagesArgs} args - Arguments to find a Stages
   * @example
   * // Get one Stages
   * const stages = await prisma.stages.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnestagesArgs>(
    args: Subset<T, FindOnestagesArgs>
  ): CheckSelect<T, Prisma__stagesClient<stages | null>, Prisma__stagesClient<stagesGetPayload<T> | null>>
  /**
   * Find the first Stages that matches the filter.
   * @param {FindFirststagesArgs} args - Arguments to find a Stages
   * @example
   * // Get one Stages
   * const stages = await prisma.stages.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirststagesArgs>(
    args?: Subset<T, FindFirststagesArgs>
  ): CheckSelect<T, Prisma__stagesClient<stages | null>, Prisma__stagesClient<stagesGetPayload<T> | null>>
  /**
   * Find zero or more Stages that matches the filter.
   * @param {FindManystagesArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Stages
   * const stages = await prisma.stages.findMany()
   * 
   * // Get first 10 Stages
   * const stages = await prisma.stages.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const stagesWithIdOnly = await prisma.stages.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManystagesArgs>(
    args?: Subset<T, FindManystagesArgs>
  ): CheckSelect<T, Promise<Array<stages>>, Promise<Array<stagesGetPayload<T>>>>
  /**
   * Create a Stages.
   * @param {stagesCreateArgs} args - Arguments to create a Stages.
   * @example
   * // Create one Stages
   * const Stages = await prisma.stages.create({
   *   data: {
   *     // ... data to create a Stages
   *   }
   * })
   * 
  **/
  create<T extends stagesCreateArgs>(
    args: Subset<T, stagesCreateArgs>
  ): CheckSelect<T, Prisma__stagesClient<stages>, Prisma__stagesClient<stagesGetPayload<T>>>
  /**
   * Delete a Stages.
   * @param {stagesDeleteArgs} args - Arguments to delete one Stages.
   * @example
   * // Delete one Stages
   * const Stages = await prisma.stages.delete({
   *   where: {
   *     // ... filter to delete one Stages
   *   }
   * })
   * 
  **/
  delete<T extends stagesDeleteArgs>(
    args: Subset<T, stagesDeleteArgs>
  ): CheckSelect<T, Prisma__stagesClient<stages>, Prisma__stagesClient<stagesGetPayload<T>>>
  /**
   * Update one Stages.
   * @param {stagesUpdateArgs} args - Arguments to update one Stages.
   * @example
   * // Update one Stages
   * const stages = await prisma.stages.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends stagesUpdateArgs>(
    args: Subset<T, stagesUpdateArgs>
  ): CheckSelect<T, Prisma__stagesClient<stages>, Prisma__stagesClient<stagesGetPayload<T>>>
  /**
   * Delete zero or more Stages.
   * @param {stagesDeleteManyArgs} args - Arguments to filter Stages to delete.
   * @example
   * // Delete a few Stages
   * const { count } = await prisma.stages.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends stagesDeleteManyArgs>(
    args: Subset<T, stagesDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Stages.
   * @param {stagesUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Stages
   * const stages = await prisma.stages.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends stagesUpdateManyArgs>(
    args: Subset<T, stagesUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Stages.
   * @param {stagesUpsertArgs} args - Arguments to update or create a Stages.
   * @example
   * // Update or create a Stages
   * const stages = await prisma.stages.upsert({
   *   create: {
   *     // ... data to create a Stages
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Stages we want to update
   *   }
   * })
  **/
  upsert<T extends stagesUpsertArgs>(
    args: Subset<T, stagesUpsertArgs>
  ): CheckSelect<T, Prisma__stagesClient<stages>, Prisma__stagesClient<stagesGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManystagesArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateStagesArgs>(args: Subset<T, AggregateStagesArgs>): Promise<GetStagesAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for stages.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__stagesClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  matches<T extends FindManymatchesArgs = {}>(args?: Subset<T, FindManymatchesArgs>): CheckSelect<T, Promise<Array<matches>>, Promise<Array<matchesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * stages findOne
 */
export type FindOnestagesArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
  /**
   * Filter, which stages to fetch.
  **/
  where: stagesWhereUniqueInput
}


/**
 * stages findFirst
 */
export type FindFirststagesArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
  /**
   * Filter, which stages to fetch.
  **/
  where?: stagesWhereInput
  orderBy?: Enumerable<stagesOrderByInput> | stagesOrderByInput
  cursor?: stagesWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<StagesDistinctFieldEnum>
}


/**
 * stages findMany
 */
export type FindManystagesArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
  /**
   * Filter, which stages to fetch.
  **/
  where?: stagesWhereInput
  /**
   * Determine the order of the stages to fetch.
  **/
  orderBy?: Enumerable<stagesOrderByInput> | stagesOrderByInput
  /**
   * Sets the position for listing stages.
  **/
  cursor?: stagesWhereUniqueInput
  /**
   * The number of stages to fetch. If negative number, it will take stages before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` stages.
  **/
  skip?: number
  distinct?: Enumerable<StagesDistinctFieldEnum>
}


/**
 * stages create
 */
export type stagesCreateArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
  /**
   * The data needed to create a stages.
  **/
  data: stagesCreateInput
}


/**
 * stages update
 */
export type stagesUpdateArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
  /**
   * The data needed to update a stages.
  **/
  data: stagesUpdateInput
  /**
   * Choose, which stages to update.
  **/
  where: stagesWhereUniqueInput
}


/**
 * stages updateMany
 */
export type stagesUpdateManyArgs = {
  data: stagesUpdateManyMutationInput
  where?: stagesWhereInput
}


/**
 * stages upsert
 */
export type stagesUpsertArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
  /**
   * The filter to search for the stages to update in case it exists.
  **/
  where: stagesWhereUniqueInput
  /**
   * In case the stages found by the `where` argument doesn't exist, create a new stages with this data.
  **/
  create: stagesCreateInput
  /**
   * In case the stages was found with the provided `where` argument, update it with this data.
  **/
  update: stagesUpdateInput
}


/**
 * stages delete
 */
export type stagesDeleteArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
  /**
   * Filter which stages to delete.
  **/
  where: stagesWhereUniqueInput
}


/**
 * stages deleteMany
 */
export type stagesDeleteManyArgs = {
  where?: stagesWhereInput
}


/**
 * stages without action
 */
export type stagesArgs = {
  /**
   * Select specific fields to fetch from the stages
  **/
  select?: stagesSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: stagesInclude | null
}



/**
 * Model tournaments
 */

export type tournaments = {
  id: number
  name: string
  description: string
  startDate: Date
  endDate: Date | null
  createdOn: Date
}


export type AggregateTournaments = {
  count: number
  avg: TournamentsAvgAggregateOutputType | null
  sum: TournamentsSumAggregateOutputType | null
  min: TournamentsMinAggregateOutputType | null
  max: TournamentsMaxAggregateOutputType | null
}

export type TournamentsAvgAggregateOutputType = {
  id: number
}

export type TournamentsSumAggregateOutputType = {
  id: number
}

export type TournamentsMinAggregateOutputType = {
  id: number
}

export type TournamentsMaxAggregateOutputType = {
  id: number
}


export type TournamentsAvgAggregateInputType = {
  id?: true
}

export type TournamentsSumAggregateInputType = {
  id?: true
}

export type TournamentsMinAggregateInputType = {
  id?: true
}

export type TournamentsMaxAggregateInputType = {
  id?: true
}

export type AggregateTournamentsArgs = {
  where?: tournamentsWhereInput
  orderBy?: Enumerable<tournamentsOrderByInput> | tournamentsOrderByInput
  cursor?: tournamentsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TournamentsDistinctFieldEnum>
  count?: true
  avg?: TournamentsAvgAggregateInputType
  sum?: TournamentsSumAggregateInputType
  min?: TournamentsMinAggregateInputType
  max?: TournamentsMaxAggregateInputType
}

export type GetTournamentsAggregateType<T extends AggregateTournamentsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetTournamentsAggregateScalarType<T[P]>
}

export type GetTournamentsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof TournamentsAvgAggregateOutputType ? TournamentsAvgAggregateOutputType[P] : never
}
    
    

export type tournamentsSelect = {
  id?: boolean
  name?: boolean
  description?: boolean
  startDate?: boolean
  endDate?: boolean
  createdOn?: boolean
  matches?: boolean | FindManymatchesArgs
}

export type tournamentsInclude = {
  matches?: boolean | FindManymatchesArgs
}

export type tournamentsGetPayload<
  S extends boolean | null | undefined | tournamentsArgs,
  U = keyof S
> = S extends true
  ? tournaments
  : S extends undefined
  ? never
  : S extends tournamentsArgs | FindManytournamentsArgs
  ? 'include' extends U
    ? tournaments  & {
      [P in TrueKeys<S['include']>]:
      P extends 'matches'
      ? Array<matchesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof tournaments ? tournaments[P]
: 
      P extends 'matches'
      ? Array<matchesGetPayload<S['select'][P]>> : never
    }
  : tournaments
: tournaments


export interface tournamentsDelegate {
  /**
   * Find zero or one Tournaments that matches the filter.
   * @param {FindOnetournamentsArgs} args - Arguments to find a Tournaments
   * @example
   * // Get one Tournaments
   * const tournaments = await prisma.tournaments.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnetournamentsArgs>(
    args: Subset<T, FindOnetournamentsArgs>
  ): CheckSelect<T, Prisma__tournamentsClient<tournaments | null>, Prisma__tournamentsClient<tournamentsGetPayload<T> | null>>
  /**
   * Find the first Tournaments that matches the filter.
   * @param {FindFirsttournamentsArgs} args - Arguments to find a Tournaments
   * @example
   * // Get one Tournaments
   * const tournaments = await prisma.tournaments.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirsttournamentsArgs>(
    args?: Subset<T, FindFirsttournamentsArgs>
  ): CheckSelect<T, Prisma__tournamentsClient<tournaments | null>, Prisma__tournamentsClient<tournamentsGetPayload<T> | null>>
  /**
   * Find zero or more Tournaments that matches the filter.
   * @param {FindManytournamentsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Tournaments
   * const tournaments = await prisma.tournaments.findMany()
   * 
   * // Get first 10 Tournaments
   * const tournaments = await prisma.tournaments.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const tournamentsWithIdOnly = await prisma.tournaments.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManytournamentsArgs>(
    args?: Subset<T, FindManytournamentsArgs>
  ): CheckSelect<T, Promise<Array<tournaments>>, Promise<Array<tournamentsGetPayload<T>>>>
  /**
   * Create a Tournaments.
   * @param {tournamentsCreateArgs} args - Arguments to create a Tournaments.
   * @example
   * // Create one Tournaments
   * const Tournaments = await prisma.tournaments.create({
   *   data: {
   *     // ... data to create a Tournaments
   *   }
   * })
   * 
  **/
  create<T extends tournamentsCreateArgs>(
    args: Subset<T, tournamentsCreateArgs>
  ): CheckSelect<T, Prisma__tournamentsClient<tournaments>, Prisma__tournamentsClient<tournamentsGetPayload<T>>>
  /**
   * Delete a Tournaments.
   * @param {tournamentsDeleteArgs} args - Arguments to delete one Tournaments.
   * @example
   * // Delete one Tournaments
   * const Tournaments = await prisma.tournaments.delete({
   *   where: {
   *     // ... filter to delete one Tournaments
   *   }
   * })
   * 
  **/
  delete<T extends tournamentsDeleteArgs>(
    args: Subset<T, tournamentsDeleteArgs>
  ): CheckSelect<T, Prisma__tournamentsClient<tournaments>, Prisma__tournamentsClient<tournamentsGetPayload<T>>>
  /**
   * Update one Tournaments.
   * @param {tournamentsUpdateArgs} args - Arguments to update one Tournaments.
   * @example
   * // Update one Tournaments
   * const tournaments = await prisma.tournaments.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends tournamentsUpdateArgs>(
    args: Subset<T, tournamentsUpdateArgs>
  ): CheckSelect<T, Prisma__tournamentsClient<tournaments>, Prisma__tournamentsClient<tournamentsGetPayload<T>>>
  /**
   * Delete zero or more Tournaments.
   * @param {tournamentsDeleteManyArgs} args - Arguments to filter Tournaments to delete.
   * @example
   * // Delete a few Tournaments
   * const { count } = await prisma.tournaments.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends tournamentsDeleteManyArgs>(
    args: Subset<T, tournamentsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Tournaments.
   * @param {tournamentsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Tournaments
   * const tournaments = await prisma.tournaments.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends tournamentsUpdateManyArgs>(
    args: Subset<T, tournamentsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Tournaments.
   * @param {tournamentsUpsertArgs} args - Arguments to update or create a Tournaments.
   * @example
   * // Update or create a Tournaments
   * const tournaments = await prisma.tournaments.upsert({
   *   create: {
   *     // ... data to create a Tournaments
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Tournaments we want to update
   *   }
   * })
  **/
  upsert<T extends tournamentsUpsertArgs>(
    args: Subset<T, tournamentsUpsertArgs>
  ): CheckSelect<T, Prisma__tournamentsClient<tournaments>, Prisma__tournamentsClient<tournamentsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManytournamentsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateTournamentsArgs>(args: Subset<T, AggregateTournamentsArgs>): Promise<GetTournamentsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for tournaments.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__tournamentsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  matches<T extends FindManymatchesArgs = {}>(args?: Subset<T, FindManymatchesArgs>): CheckSelect<T, Promise<Array<matches>>, Promise<Array<matchesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * tournaments findOne
 */
export type FindOnetournamentsArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
  /**
   * Filter, which tournaments to fetch.
  **/
  where: tournamentsWhereUniqueInput
}


/**
 * tournaments findFirst
 */
export type FindFirsttournamentsArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
  /**
   * Filter, which tournaments to fetch.
  **/
  where?: tournamentsWhereInput
  orderBy?: Enumerable<tournamentsOrderByInput> | tournamentsOrderByInput
  cursor?: tournamentsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<TournamentsDistinctFieldEnum>
}


/**
 * tournaments findMany
 */
export type FindManytournamentsArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
  /**
   * Filter, which tournaments to fetch.
  **/
  where?: tournamentsWhereInput
  /**
   * Determine the order of the tournaments to fetch.
  **/
  orderBy?: Enumerable<tournamentsOrderByInput> | tournamentsOrderByInput
  /**
   * Sets the position for listing tournaments.
  **/
  cursor?: tournamentsWhereUniqueInput
  /**
   * The number of tournaments to fetch. If negative number, it will take tournaments before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` tournaments.
  **/
  skip?: number
  distinct?: Enumerable<TournamentsDistinctFieldEnum>
}


/**
 * tournaments create
 */
export type tournamentsCreateArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
  /**
   * The data needed to create a tournaments.
  **/
  data: tournamentsCreateInput
}


/**
 * tournaments update
 */
export type tournamentsUpdateArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
  /**
   * The data needed to update a tournaments.
  **/
  data: tournamentsUpdateInput
  /**
   * Choose, which tournaments to update.
  **/
  where: tournamentsWhereUniqueInput
}


/**
 * tournaments updateMany
 */
export type tournamentsUpdateManyArgs = {
  data: tournamentsUpdateManyMutationInput
  where?: tournamentsWhereInput
}


/**
 * tournaments upsert
 */
export type tournamentsUpsertArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
  /**
   * The filter to search for the tournaments to update in case it exists.
  **/
  where: tournamentsWhereUniqueInput
  /**
   * In case the tournaments found by the `where` argument doesn't exist, create a new tournaments with this data.
  **/
  create: tournamentsCreateInput
  /**
   * In case the tournaments was found with the provided `where` argument, update it with this data.
  **/
  update: tournamentsUpdateInput
}


/**
 * tournaments delete
 */
export type tournamentsDeleteArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
  /**
   * Filter which tournaments to delete.
  **/
  where: tournamentsWhereUniqueInput
}


/**
 * tournaments deleteMany
 */
export type tournamentsDeleteManyArgs = {
  where?: tournamentsWhereInput
}


/**
 * tournaments without action
 */
export type tournamentsArgs = {
  /**
   * Select specific fields to fetch from the tournaments
  **/
  select?: tournamentsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: tournamentsInclude | null
}



/**
 * Model waywins
 */

export type waywins = {
  id: number
  name: string
}


export type AggregateWaywins = {
  count: number
  avg: WaywinsAvgAggregateOutputType | null
  sum: WaywinsSumAggregateOutputType | null
  min: WaywinsMinAggregateOutputType | null
  max: WaywinsMaxAggregateOutputType | null
}

export type WaywinsAvgAggregateOutputType = {
  id: number
}

export type WaywinsSumAggregateOutputType = {
  id: number
}

export type WaywinsMinAggregateOutputType = {
  id: number
}

export type WaywinsMaxAggregateOutputType = {
  id: number
}


export type WaywinsAvgAggregateInputType = {
  id?: true
}

export type WaywinsSumAggregateInputType = {
  id?: true
}

export type WaywinsMinAggregateInputType = {
  id?: true
}

export type WaywinsMaxAggregateInputType = {
  id?: true
}

export type AggregateWaywinsArgs = {
  where?: waywinsWhereInput
  orderBy?: Enumerable<waywinsOrderByInput> | waywinsOrderByInput
  cursor?: waywinsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<WaywinsDistinctFieldEnum>
  count?: true
  avg?: WaywinsAvgAggregateInputType
  sum?: WaywinsSumAggregateInputType
  min?: WaywinsMinAggregateInputType
  max?: WaywinsMaxAggregateInputType
}

export type GetWaywinsAggregateType<T extends AggregateWaywinsArgs> = {
  [P in keyof T]: P extends 'count' ? number : GetWaywinsAggregateScalarType<T[P]>
}

export type GetWaywinsAggregateScalarType<T extends any> = {
  [P in keyof T]: P extends keyof WaywinsAvgAggregateOutputType ? WaywinsAvgAggregateOutputType[P] : never
}
    
    

export type waywinsSelect = {
  id?: boolean
  name?: boolean
  games?: boolean | FindManygamesArgs
}

export type waywinsInclude = {
  games?: boolean | FindManygamesArgs
}

export type waywinsGetPayload<
  S extends boolean | null | undefined | waywinsArgs,
  U = keyof S
> = S extends true
  ? waywins
  : S extends undefined
  ? never
  : S extends waywinsArgs | FindManywaywinsArgs
  ? 'include' extends U
    ? waywins  & {
      [P in TrueKeys<S['include']>]:
      P extends 'games'
      ? Array<gamesGetPayload<S['include'][P]>> : never
    }
  : 'select' extends U
    ? {
      [P in TrueKeys<S['select']>]:P extends keyof waywins ? waywins[P]
: 
      P extends 'games'
      ? Array<gamesGetPayload<S['select'][P]>> : never
    }
  : waywins
: waywins


export interface waywinsDelegate {
  /**
   * Find zero or one Waywins that matches the filter.
   * @param {FindOnewaywinsArgs} args - Arguments to find a Waywins
   * @example
   * // Get one Waywins
   * const waywins = await prisma.waywins.findOne({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findOne<T extends FindOnewaywinsArgs>(
    args: Subset<T, FindOnewaywinsArgs>
  ): CheckSelect<T, Prisma__waywinsClient<waywins | null>, Prisma__waywinsClient<waywinsGetPayload<T> | null>>
  /**
   * Find the first Waywins that matches the filter.
   * @param {FindFirstwaywinsArgs} args - Arguments to find a Waywins
   * @example
   * // Get one Waywins
   * const waywins = await prisma.waywins.findFirst({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
  **/
  findFirst<T extends FindFirstwaywinsArgs>(
    args?: Subset<T, FindFirstwaywinsArgs>
  ): CheckSelect<T, Prisma__waywinsClient<waywins | null>, Prisma__waywinsClient<waywinsGetPayload<T> | null>>
  /**
   * Find zero or more Waywins that matches the filter.
   * @param {FindManywaywinsArgs=} args - Arguments to filter and select certain fields only.
   * @example
   * // Get all Waywins
   * const waywins = await prisma.waywins.findMany()
   * 
   * // Get first 10 Waywins
   * const waywins = await prisma.waywins.findMany({ take: 10 })
   * 
   * // Only select the `id`
   * const waywinsWithIdOnly = await prisma.waywins.findMany({ select: { id: true } })
   * 
  **/
  findMany<T extends FindManywaywinsArgs>(
    args?: Subset<T, FindManywaywinsArgs>
  ): CheckSelect<T, Promise<Array<waywins>>, Promise<Array<waywinsGetPayload<T>>>>
  /**
   * Create a Waywins.
   * @param {waywinsCreateArgs} args - Arguments to create a Waywins.
   * @example
   * // Create one Waywins
   * const Waywins = await prisma.waywins.create({
   *   data: {
   *     // ... data to create a Waywins
   *   }
   * })
   * 
  **/
  create<T extends waywinsCreateArgs>(
    args: Subset<T, waywinsCreateArgs>
  ): CheckSelect<T, Prisma__waywinsClient<waywins>, Prisma__waywinsClient<waywinsGetPayload<T>>>
  /**
   * Delete a Waywins.
   * @param {waywinsDeleteArgs} args - Arguments to delete one Waywins.
   * @example
   * // Delete one Waywins
   * const Waywins = await prisma.waywins.delete({
   *   where: {
   *     // ... filter to delete one Waywins
   *   }
   * })
   * 
  **/
  delete<T extends waywinsDeleteArgs>(
    args: Subset<T, waywinsDeleteArgs>
  ): CheckSelect<T, Prisma__waywinsClient<waywins>, Prisma__waywinsClient<waywinsGetPayload<T>>>
  /**
   * Update one Waywins.
   * @param {waywinsUpdateArgs} args - Arguments to update one Waywins.
   * @example
   * // Update one Waywins
   * const waywins = await prisma.waywins.update({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  update<T extends waywinsUpdateArgs>(
    args: Subset<T, waywinsUpdateArgs>
  ): CheckSelect<T, Prisma__waywinsClient<waywins>, Prisma__waywinsClient<waywinsGetPayload<T>>>
  /**
   * Delete zero or more Waywins.
   * @param {waywinsDeleteManyArgs} args - Arguments to filter Waywins to delete.
   * @example
   * // Delete a few Waywins
   * const { count } = await prisma.waywins.deleteMany({
   *   where: {
   *     // ... provide filter here
   *   }
   * })
   * 
  **/
  deleteMany<T extends waywinsDeleteManyArgs>(
    args: Subset<T, waywinsDeleteManyArgs>
  ): Promise<BatchPayload>
  /**
   * Update zero or more Waywins.
   * @param {waywinsUpdateManyArgs} args - Arguments to update one or more rows.
   * @example
   * // Update many Waywins
   * const waywins = await prisma.waywins.updateMany({
   *   where: {
   *     // ... provide filter here
   *   },
   *   data: {
   *     // ... provide data here
   *   }
   * })
   * 
  **/
  updateMany<T extends waywinsUpdateManyArgs>(
    args: Subset<T, waywinsUpdateManyArgs>
  ): Promise<BatchPayload>
  /**
   * Create or update one Waywins.
   * @param {waywinsUpsertArgs} args - Arguments to update or create a Waywins.
   * @example
   * // Update or create a Waywins
   * const waywins = await prisma.waywins.upsert({
   *   create: {
   *     // ... data to create a Waywins
   *   },
   *   update: {
   *     // ... in case it already exists, update
   *   },
   *   where: {
   *     // ... the filter for the Waywins we want to update
   *   }
   * })
  **/
  upsert<T extends waywinsUpsertArgs>(
    args: Subset<T, waywinsUpsertArgs>
  ): CheckSelect<T, Prisma__waywinsClient<waywins>, Prisma__waywinsClient<waywinsGetPayload<T>>>
  /**
   * Count
   */
  count(args?: Omit<FindManywaywinsArgs, 'select' | 'include'>): Promise<number>

  /**
   * Aggregate
   */
  aggregate<T extends AggregateWaywinsArgs>(args: Subset<T, AggregateWaywinsArgs>): Promise<GetWaywinsAggregateType<T>>
}

/**
 * The delegate class that acts as a "Promise-like" for waywins.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in 
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export declare class Prisma__waywinsClient<T> implements Promise<T> {
  private readonly _dmmf;
  private readonly _fetcher;
  private readonly _queryType;
  private readonly _rootField;
  private readonly _clientMethod;
  private readonly _args;
  private readonly _dataPath;
  private readonly _errorFormat;
  private readonly _measurePerformance?;
  private _isList;
  private _callsite;
  private _requestPromise?;
  constructor(_dmmf: DMMFClass, _fetcher: PrismaClientFetcher, _queryType: 'query' | 'mutation', _rootField: string, _clientMethod: string, _args: any, _dataPath: string[], _errorFormat: ErrorFormat, _measurePerformance?: boolean | undefined, _isList?: boolean);
  readonly [Symbol.toStringTag]: 'PrismaClientPromise';

  games<T extends FindManygamesArgs = {}>(args?: Subset<T, FindManygamesArgs>): CheckSelect<T, Promise<Array<games>>, Promise<Array<gamesGetPayload<T>>>>;

  private get _document();
  /**
   * Attaches callbacks for the resolution and/or rejection of the Promise.
   * @param onfulfilled The callback to execute when the Promise is resolved.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of which ever callback is executed.
   */
  then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | Promise<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | Promise<TResult2>) | undefined | null): Promise<TResult1 | TResult2>;
  /**
   * Attaches a callback for only the rejection of the Promise.
   * @param onrejected The callback to execute when the Promise is rejected.
   * @returns A Promise for the completion of the callback.
   */
  catch<TResult = never>(onrejected?: ((reason: any) => TResult | Promise<TResult>) | undefined | null): Promise<T | TResult>;
  /**
   * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
   * resolved value cannot be modified from the callback.
   * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
   * @returns A Promise for the completion of the callback.
   */
  finally(onfinally?: (() => void) | undefined | null): Promise<T>;
}

// Custom InputTypes

/**
 * waywins findOne
 */
export type FindOnewaywinsArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
  /**
   * Filter, which waywins to fetch.
  **/
  where: waywinsWhereUniqueInput
}


/**
 * waywins findFirst
 */
export type FindFirstwaywinsArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
  /**
   * Filter, which waywins to fetch.
  **/
  where?: waywinsWhereInput
  orderBy?: Enumerable<waywinsOrderByInput> | waywinsOrderByInput
  cursor?: waywinsWhereUniqueInput
  take?: number
  skip?: number
  distinct?: Enumerable<WaywinsDistinctFieldEnum>
}


/**
 * waywins findMany
 */
export type FindManywaywinsArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
  /**
   * Filter, which waywins to fetch.
  **/
  where?: waywinsWhereInput
  /**
   * Determine the order of the waywins to fetch.
  **/
  orderBy?: Enumerable<waywinsOrderByInput> | waywinsOrderByInput
  /**
   * Sets the position for listing waywins.
  **/
  cursor?: waywinsWhereUniqueInput
  /**
   * The number of waywins to fetch. If negative number, it will take waywins before the `cursor`.
  **/
  take?: number
  /**
   * Skip the first `n` waywins.
  **/
  skip?: number
  distinct?: Enumerable<WaywinsDistinctFieldEnum>
}


/**
 * waywins create
 */
export type waywinsCreateArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
  /**
   * The data needed to create a waywins.
  **/
  data: waywinsCreateInput
}


/**
 * waywins update
 */
export type waywinsUpdateArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
  /**
   * The data needed to update a waywins.
  **/
  data: waywinsUpdateInput
  /**
   * Choose, which waywins to update.
  **/
  where: waywinsWhereUniqueInput
}


/**
 * waywins updateMany
 */
export type waywinsUpdateManyArgs = {
  data: waywinsUpdateManyMutationInput
  where?: waywinsWhereInput
}


/**
 * waywins upsert
 */
export type waywinsUpsertArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
  /**
   * The filter to search for the waywins to update in case it exists.
  **/
  where: waywinsWhereUniqueInput
  /**
   * In case the waywins found by the `where` argument doesn't exist, create a new waywins with this data.
  **/
  create: waywinsCreateInput
  /**
   * In case the waywins was found with the provided `where` argument, update it with this data.
  **/
  update: waywinsUpdateInput
}


/**
 * waywins delete
 */
export type waywinsDeleteArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
  /**
   * Filter which waywins to delete.
  **/
  where: waywinsWhereUniqueInput
}


/**
 * waywins deleteMany
 */
export type waywinsDeleteManyArgs = {
  where?: waywinsWhereInput
}


/**
 * waywins without action
 */
export type waywinsArgs = {
  /**
   * Select specific fields to fetch from the waywins
  **/
  select?: waywinsSelect | null
  /**
   * Choose, which related nodes to fetch as well.
  **/
  include?: waywinsInclude | null
}



/**
 * Deep Input Types
 */


export type championsWhereInput = {
  AND?: championsWhereInput | Enumerable<championsWhereInput>
  OR?: championsWhereInput | Enumerable<championsWhereInput>
  NOT?: championsWhereInput | Enumerable<championsWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  games_championsTogames_p1ChampionId?: GamesListRelationFilter
  games_championsTogames_p2ChampionId?: GamesListRelationFilter
}

export type championsOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type championsWhereUniqueInput = {
  id?: number
}

export type gamesWhereInput = {
  AND?: gamesWhereInput | Enumerable<gamesWhereInput>
  OR?: gamesWhereInput | Enumerable<gamesWhereInput>
  NOT?: gamesWhereInput | Enumerable<gamesWhereInput>
  id?: IntFilter | number
  player1Won?: BoolFilter | boolean
  blueSideWon?: BoolFilter | boolean
  p1CS?: IntNullableFilter | number | null
  p2CS?: IntNullableFilter | number | null
  duration?: IntNullableFilter | number | null
  matchId?: IntNullableFilter | number | null
  p1ChampionId?: IntNullableFilter | number | null
  p2ChampionId?: IntNullableFilter | number | null
  waywinId?: IntNullableFilter | number | null
  matches?: MatchesRelationFilter | matchesWhereInput | null
  champions_championsTogames_p1ChampionId?: ChampionsRelationFilter | championsWhereInput | null
  champions_championsTogames_p2ChampionId?: ChampionsRelationFilter | championsWhereInput | null
  waywins?: WaywinsRelationFilter | waywinsWhereInput | null
}

export type gamesOrderByInput = {
  id?: SortOrder
  player1Won?: SortOrder
  blueSideWon?: SortOrder
  p1CS?: SortOrder
  p2CS?: SortOrder
  duration?: SortOrder
  matchId?: SortOrder
  p1ChampionId?: SortOrder
  p2ChampionId?: SortOrder
  waywinId?: SortOrder
}

export type gamesWhereUniqueInput = {
  id?: number
}

export type matchbanWhereInput = {
  AND?: matchbanWhereInput | Enumerable<matchbanWhereInput>
  OR?: matchbanWhereInput | Enumerable<matchbanWhereInput>
  NOT?: matchbanWhereInput | Enumerable<matchbanWhereInput>
  gameId?: IntFilter | number
  championId?: IntFilter | number
  playerId?: IntFilter | number
}

export type matchbanOrderByInput = {
  gameId?: SortOrder
  championId?: SortOrder
  playerId?: SortOrder
}

export type matchbanWhereUniqueInput = {
  gameId_championId?: GameIdChampionIdCompoundUniqueInput
}

export type matchesWhereInput = {
  AND?: matchesWhereInput | Enumerable<matchesWhereInput>
  OR?: matchesWhereInput | Enumerable<matchesWhereInput>
  NOT?: matchesWhereInput | Enumerable<matchesWhereInput>
  id?: IntFilter | number
  tournamentId?: IntNullableFilter | number | null
  stageId?: IntNullableFilter | number | null
  player1Id?: IntNullableFilter | number | null
  player2Id?: IntNullableFilter | number | null
  participants_matches_player1IdToparticipants?: ParticipantsRelationFilter | participantsWhereInput | null
  participants_matches_player2IdToparticipants?: ParticipantsRelationFilter | participantsWhereInput | null
  stages?: StagesRelationFilter | stagesWhereInput | null
  tournaments?: TournamentsRelationFilter | tournamentsWhereInput | null
  games?: GamesListRelationFilter
}

export type matchesOrderByInput = {
  id?: SortOrder
  tournamentId?: SortOrder
  stageId?: SortOrder
  player1Id?: SortOrder
  player2Id?: SortOrder
}

export type matchesWhereUniqueInput = {
  id?: number
}

export type matchesbansWhereInput = {
  AND?: matchesbansWhereInput | Enumerable<matchesbansWhereInput>
  OR?: matchesbansWhereInput | Enumerable<matchesbansWhereInput>
  NOT?: matchesbansWhereInput | Enumerable<matchesbansWhereInput>
  matchId?: IntFilter | number
  championId?: IntFilter | number
  playerId?: IntFilter | number
}

export type matchesbansOrderByInput = {
  matchId?: SortOrder
  championId?: SortOrder
  playerId?: SortOrder
}

export type matchesbansWhereUniqueInput = {
  matchId_championId?: MatchIdChampionIdCompoundUniqueInput
}

export type participantsWhereInput = {
  AND?: participantsWhereInput | Enumerable<participantsWhereInput>
  OR?: participantsWhereInput | Enumerable<participantsWhereInput>
  NOT?: participantsWhereInput | Enumerable<participantsWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  rankId?: IntNullableFilter | number | null
  signUpDate?: DateTimeNullableFilter | Date | string | null
  resignationDate?: DateTimeNullableFilter | Date | string | null
  ranks?: RanksRelationFilter | ranksWhereInput | null
  matches_matches_player1IdToparticipants?: MatchesListRelationFilter
  matches_matches_player2IdToparticipants?: MatchesListRelationFilter
}

export type participantsOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  rankId?: SortOrder
  signUpDate?: SortOrder
  resignationDate?: SortOrder
}

export type participantsWhereUniqueInput = {
  id?: number
}

export type ranksWhereInput = {
  AND?: ranksWhereInput | Enumerable<ranksWhereInput>
  OR?: ranksWhereInput | Enumerable<ranksWhereInput>
  NOT?: ranksWhereInput | Enumerable<ranksWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  participants?: ParticipantsListRelationFilter
}

export type ranksOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type ranksWhereUniqueInput = {
  id?: number
}

export type stagesWhereInput = {
  AND?: stagesWhereInput | Enumerable<stagesWhereInput>
  OR?: stagesWhereInput | Enumerable<stagesWhereInput>
  NOT?: stagesWhereInput | Enumerable<stagesWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  matches?: MatchesListRelationFilter
}

export type stagesOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type stagesWhereUniqueInput = {
  id?: number
}

export type tournamentsWhereInput = {
  AND?: tournamentsWhereInput | Enumerable<tournamentsWhereInput>
  OR?: tournamentsWhereInput | Enumerable<tournamentsWhereInput>
  NOT?: tournamentsWhereInput | Enumerable<tournamentsWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  description?: StringFilter | string
  startDate?: DateTimeFilter | Date | string
  endDate?: DateTimeNullableFilter | Date | string | null
  createdOn?: DateTimeFilter | Date | string
  matches?: MatchesListRelationFilter
}

export type tournamentsOrderByInput = {
  id?: SortOrder
  name?: SortOrder
  description?: SortOrder
  startDate?: SortOrder
  endDate?: SortOrder
  createdOn?: SortOrder
}

export type tournamentsWhereUniqueInput = {
  id?: number
}

export type waywinsWhereInput = {
  AND?: waywinsWhereInput | Enumerable<waywinsWhereInput>
  OR?: waywinsWhereInput | Enumerable<waywinsWhereInput>
  NOT?: waywinsWhereInput | Enumerable<waywinsWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  games?: GamesListRelationFilter
}

export type waywinsOrderByInput = {
  id?: SortOrder
  name?: SortOrder
}

export type waywinsWhereUniqueInput = {
  id?: number
}

export type championsCreateInput = {
  name?: string
  games_championsTogames_p1ChampionId?: gamesCreateManyWithoutChampions_championsTogames_p1ChampionIdInput
  games_championsTogames_p2ChampionId?: gamesCreateManyWithoutChampions_championsTogames_p2ChampionIdInput
}

export type championsUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  games_championsTogames_p1ChampionId?: gamesUpdateManyWithoutChampions_championsTogames_p1ChampionIdInput
  games_championsTogames_p2ChampionId?: gamesUpdateManyWithoutChampions_championsTogames_p2ChampionIdInput
}

export type championsUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type gamesCreateInput = {
  player1Won: boolean
  blueSideWon: boolean
  p1CS?: number | null
  p2CS?: number | null
  duration?: number | null
  matches?: matchesCreateOneWithoutGamesInput
  champions_championsTogames_p1ChampionId?: championsCreateOneWithoutGames_championsTogames_p1ChampionIdInput
  champions_championsTogames_p2ChampionId?: championsCreateOneWithoutGames_championsTogames_p2ChampionIdInput
  waywins?: waywinsCreateOneWithoutGamesInput
}

export type gamesUpdateInput = {
  player1Won?: boolean | BoolFieldUpdateOperationsInput
  blueSideWon?: boolean | BoolFieldUpdateOperationsInput
  p1CS?: number | NullableIntFieldUpdateOperationsInput | null
  p2CS?: number | NullableIntFieldUpdateOperationsInput | null
  duration?: number | NullableIntFieldUpdateOperationsInput | null
  matches?: matchesUpdateOneWithoutGamesInput
  champions_championsTogames_p1ChampionId?: championsUpdateOneWithoutGames_championsTogames_p1ChampionIdInput
  champions_championsTogames_p2ChampionId?: championsUpdateOneWithoutGames_championsTogames_p2ChampionIdInput
  waywins?: waywinsUpdateOneWithoutGamesInput
}

export type gamesUpdateManyMutationInput = {
  player1Won?: boolean | BoolFieldUpdateOperationsInput
  blueSideWon?: boolean | BoolFieldUpdateOperationsInput
  p1CS?: number | NullableIntFieldUpdateOperationsInput | null
  p2CS?: number | NullableIntFieldUpdateOperationsInput | null
  duration?: number | NullableIntFieldUpdateOperationsInput | null
}

export type matchbanCreateInput = {
  gameId: number
  championId: number
  playerId: number
}

export type matchbanUpdateInput = {
  gameId?: number | IntFieldUpdateOperationsInput
  championId?: number | IntFieldUpdateOperationsInput
  playerId?: number | IntFieldUpdateOperationsInput
}

export type matchbanUpdateManyMutationInput = {
  gameId?: number | IntFieldUpdateOperationsInput
  championId?: number | IntFieldUpdateOperationsInput
  playerId?: number | IntFieldUpdateOperationsInput
}

export type matchesCreateInput = {
  participants_matches_player1IdToparticipants?: participantsCreateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsCreateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesCreateOneWithoutMatchesInput
  tournaments?: tournamentsCreateOneWithoutMatchesInput
  games?: gamesCreateManyWithoutMatchesInput
}

export type matchesUpdateInput = {
  participants_matches_player1IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesUpdateOneWithoutMatchesInput
  tournaments?: tournamentsUpdateOneWithoutMatchesInput
  games?: gamesUpdateManyWithoutMatchesInput
}

export type matchesUpdateManyMutationInput = {

}

export type matchesbansCreateInput = {
  matchId: number
  championId: number
  playerId: number
}

export type matchesbansUpdateInput = {
  matchId?: number | IntFieldUpdateOperationsInput
  championId?: number | IntFieldUpdateOperationsInput
  playerId?: number | IntFieldUpdateOperationsInput
}

export type matchesbansUpdateManyMutationInput = {
  matchId?: number | IntFieldUpdateOperationsInput
  championId?: number | IntFieldUpdateOperationsInput
  playerId?: number | IntFieldUpdateOperationsInput
}

export type participantsCreateInput = {
  name?: string
  signUpDate?: Date | string | null
  resignationDate?: Date | string | null
  ranks?: ranksCreateOneWithoutParticipantsInput
  matches_matches_player1IdToparticipants?: matchesCreateManyWithoutParticipants_matches_player1IdToparticipantsInput
  matches_matches_player2IdToparticipants?: matchesCreateManyWithoutParticipants_matches_player2IdToparticipantsInput
}

export type participantsUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  signUpDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  resignationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  ranks?: ranksUpdateOneWithoutParticipantsInput
  matches_matches_player1IdToparticipants?: matchesUpdateManyWithoutParticipants_matches_player1IdToparticipantsInput
  matches_matches_player2IdToparticipants?: matchesUpdateManyWithoutParticipants_matches_player2IdToparticipantsInput
}

export type participantsUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  signUpDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  resignationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type ranksCreateInput = {
  name?: string
  participants?: participantsCreateManyWithoutRanksInput
}

export type ranksUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  participants?: participantsUpdateManyWithoutRanksInput
}

export type ranksUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type stagesCreateInput = {
  name?: string
  matches?: matchesCreateManyWithoutStagesInput
}

export type stagesUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  matches?: matchesUpdateManyWithoutStagesInput
}

export type stagesUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type tournamentsCreateInput = {
  name?: string
  description?: string
  startDate: Date | string
  endDate?: Date | string | null
  createdOn?: Date | string
  matches?: matchesCreateManyWithoutTournamentsInput
}

export type tournamentsUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  startDate?: Date | string | DateTimeFieldUpdateOperationsInput
  endDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  createdOn?: Date | string | DateTimeFieldUpdateOperationsInput
  matches?: matchesUpdateManyWithoutTournamentsInput
}

export type tournamentsUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  startDate?: Date | string | DateTimeFieldUpdateOperationsInput
  endDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  createdOn?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type waywinsCreateInput = {
  name?: string
  games?: gamesCreateManyWithoutWaywinsInput
}

export type waywinsUpdateInput = {
  name?: string | StringFieldUpdateOperationsInput
  games?: gamesUpdateManyWithoutWaywinsInput
}

export type waywinsUpdateManyMutationInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type IntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type StringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  mode?: QueryMode
  not?: string | NestedStringFilter
}

export type GamesListRelationFilter = {
  every?: gamesWhereInput
  some?: gamesWhereInput
  none?: gamesWhereInput
}

export type BoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type IntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type MatchesRelationFilter = {
  is?: matchesWhereInput | null
  isNot?: matchesWhereInput | null
}

export type ChampionsRelationFilter = {
  is?: championsWhereInput | null
  isNot?: championsWhereInput | null
}

export type WaywinsRelationFilter = {
  is?: waywinsWhereInput | null
  isNot?: waywinsWhereInput | null
}

export type GameIdChampionIdCompoundUniqueInput = {
  gameId: number
  championId: number
}

export type ParticipantsRelationFilter = {
  is?: participantsWhereInput | null
  isNot?: participantsWhereInput | null
}

export type StagesRelationFilter = {
  is?: stagesWhereInput | null
  isNot?: stagesWhereInput | null
}

export type TournamentsRelationFilter = {
  is?: tournamentsWhereInput | null
  isNot?: tournamentsWhereInput | null
}

export type MatchIdChampionIdCompoundUniqueInput = {
  matchId: number
  championId: number
}

export type DateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type RanksRelationFilter = {
  is?: ranksWhereInput | null
  isNot?: ranksWhereInput | null
}

export type MatchesListRelationFilter = {
  every?: matchesWhereInput
  some?: matchesWhereInput
  none?: matchesWhereInput
}

export type ParticipantsListRelationFilter = {
  every?: participantsWhereInput
  some?: participantsWhereInput
  none?: participantsWhereInput
}

export type DateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type gamesCreateManyWithoutChampions_championsTogames_p1ChampionIdInput = {
  create?: gamesCreateWithoutChampions_championsTogames_p1ChampionIdInput | Enumerable<gamesCreateWithoutChampions_championsTogames_p1ChampionIdInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
}

export type gamesCreateManyWithoutChampions_championsTogames_p2ChampionIdInput = {
  create?: gamesCreateWithoutChampions_championsTogames_p2ChampionIdInput | Enumerable<gamesCreateWithoutChampions_championsTogames_p2ChampionIdInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
}

export type StringFieldUpdateOperationsInput = {
  set?: string
}

export type gamesUpdateManyWithoutChampions_championsTogames_p1ChampionIdInput = {
  create?: gamesCreateWithoutChampions_championsTogames_p1ChampionIdInput | Enumerable<gamesCreateWithoutChampions_championsTogames_p1ChampionIdInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  set?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  disconnect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  delete?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  update?: gamesUpdateWithWhereUniqueWithoutChampions_championsTogames_p1ChampionIdInput | Enumerable<gamesUpdateWithWhereUniqueWithoutChampions_championsTogames_p1ChampionIdInput>
  updateMany?: gamesUpdateManyWithWhereNestedInput | Enumerable<gamesUpdateManyWithWhereNestedInput>
  deleteMany?: gamesScalarWhereInput | Enumerable<gamesScalarWhereInput>
  upsert?: gamesUpsertWithWhereUniqueWithoutChampions_championsTogames_p1ChampionIdInput | Enumerable<gamesUpsertWithWhereUniqueWithoutChampions_championsTogames_p1ChampionIdInput>
}

export type gamesUpdateManyWithoutChampions_championsTogames_p2ChampionIdInput = {
  create?: gamesCreateWithoutChampions_championsTogames_p2ChampionIdInput | Enumerable<gamesCreateWithoutChampions_championsTogames_p2ChampionIdInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  set?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  disconnect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  delete?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  update?: gamesUpdateWithWhereUniqueWithoutChampions_championsTogames_p2ChampionIdInput | Enumerable<gamesUpdateWithWhereUniqueWithoutChampions_championsTogames_p2ChampionIdInput>
  updateMany?: gamesUpdateManyWithWhereNestedInput | Enumerable<gamesUpdateManyWithWhereNestedInput>
  deleteMany?: gamesScalarWhereInput | Enumerable<gamesScalarWhereInput>
  upsert?: gamesUpsertWithWhereUniqueWithoutChampions_championsTogames_p2ChampionIdInput | Enumerable<gamesUpsertWithWhereUniqueWithoutChampions_championsTogames_p2ChampionIdInput>
}

export type matchesCreateOneWithoutGamesInput = {
  create?: matchesCreateWithoutGamesInput
  connect?: matchesWhereUniqueInput
}

export type championsCreateOneWithoutGames_championsTogames_p1ChampionIdInput = {
  create?: championsCreateWithoutGames_championsTogames_p1ChampionIdInput
  connect?: championsWhereUniqueInput
}

export type championsCreateOneWithoutGames_championsTogames_p2ChampionIdInput = {
  create?: championsCreateWithoutGames_championsTogames_p2ChampionIdInput
  connect?: championsWhereUniqueInput
}

export type waywinsCreateOneWithoutGamesInput = {
  create?: waywinsCreateWithoutGamesInput
  connect?: waywinsWhereUniqueInput
}

export type BoolFieldUpdateOperationsInput = {
  set?: boolean
}

export type NullableIntFieldUpdateOperationsInput = {
  set?: number | null
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type matchesUpdateOneWithoutGamesInput = {
  create?: matchesCreateWithoutGamesInput
  connect?: matchesWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: matchesUpdateWithoutGamesDataInput
  upsert?: matchesUpsertWithoutGamesInput
}

export type championsUpdateOneWithoutGames_championsTogames_p1ChampionIdInput = {
  create?: championsCreateWithoutGames_championsTogames_p1ChampionIdInput
  connect?: championsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: championsUpdateWithoutGames_championsTogames_p1ChampionIdDataInput
  upsert?: championsUpsertWithoutGames_championsTogames_p1ChampionIdInput
}

export type championsUpdateOneWithoutGames_championsTogames_p2ChampionIdInput = {
  create?: championsCreateWithoutGames_championsTogames_p2ChampionIdInput
  connect?: championsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: championsUpdateWithoutGames_championsTogames_p2ChampionIdDataInput
  upsert?: championsUpsertWithoutGames_championsTogames_p2ChampionIdInput
}

export type waywinsUpdateOneWithoutGamesInput = {
  create?: waywinsCreateWithoutGamesInput
  connect?: waywinsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: waywinsUpdateWithoutGamesDataInput
  upsert?: waywinsUpsertWithoutGamesInput
}

export type IntFieldUpdateOperationsInput = {
  set?: number
  increment?: number
  decrement?: number
  multiply?: number
  divide?: number
}

export type participantsCreateOneWithoutMatches_matches_player1IdToparticipantsInput = {
  create?: participantsCreateWithoutMatches_matches_player1IdToparticipantsInput
  connect?: participantsWhereUniqueInput
}

export type participantsCreateOneWithoutMatches_matches_player2IdToparticipantsInput = {
  create?: participantsCreateWithoutMatches_matches_player2IdToparticipantsInput
  connect?: participantsWhereUniqueInput
}

export type stagesCreateOneWithoutMatchesInput = {
  create?: stagesCreateWithoutMatchesInput
  connect?: stagesWhereUniqueInput
}

export type tournamentsCreateOneWithoutMatchesInput = {
  create?: tournamentsCreateWithoutMatchesInput
  connect?: tournamentsWhereUniqueInput
}

export type gamesCreateManyWithoutMatchesInput = {
  create?: gamesCreateWithoutMatchesInput | Enumerable<gamesCreateWithoutMatchesInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
}

export type participantsUpdateOneWithoutMatches_matches_player1IdToparticipantsInput = {
  create?: participantsCreateWithoutMatches_matches_player1IdToparticipantsInput
  connect?: participantsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: participantsUpdateWithoutMatches_matches_player1IdToparticipantsDataInput
  upsert?: participantsUpsertWithoutMatches_matches_player1IdToparticipantsInput
}

export type participantsUpdateOneWithoutMatches_matches_player2IdToparticipantsInput = {
  create?: participantsCreateWithoutMatches_matches_player2IdToparticipantsInput
  connect?: participantsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: participantsUpdateWithoutMatches_matches_player2IdToparticipantsDataInput
  upsert?: participantsUpsertWithoutMatches_matches_player2IdToparticipantsInput
}

export type stagesUpdateOneWithoutMatchesInput = {
  create?: stagesCreateWithoutMatchesInput
  connect?: stagesWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: stagesUpdateWithoutMatchesDataInput
  upsert?: stagesUpsertWithoutMatchesInput
}

export type tournamentsUpdateOneWithoutMatchesInput = {
  create?: tournamentsCreateWithoutMatchesInput
  connect?: tournamentsWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: tournamentsUpdateWithoutMatchesDataInput
  upsert?: tournamentsUpsertWithoutMatchesInput
}

export type gamesUpdateManyWithoutMatchesInput = {
  create?: gamesCreateWithoutMatchesInput | Enumerable<gamesCreateWithoutMatchesInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  set?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  disconnect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  delete?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  update?: gamesUpdateWithWhereUniqueWithoutMatchesInput | Enumerable<gamesUpdateWithWhereUniqueWithoutMatchesInput>
  updateMany?: gamesUpdateManyWithWhereNestedInput | Enumerable<gamesUpdateManyWithWhereNestedInput>
  deleteMany?: gamesScalarWhereInput | Enumerable<gamesScalarWhereInput>
  upsert?: gamesUpsertWithWhereUniqueWithoutMatchesInput | Enumerable<gamesUpsertWithWhereUniqueWithoutMatchesInput>
}

export type ranksCreateOneWithoutParticipantsInput = {
  create?: ranksCreateWithoutParticipantsInput
  connect?: ranksWhereUniqueInput
}

export type matchesCreateManyWithoutParticipants_matches_player1IdToparticipantsInput = {
  create?: matchesCreateWithoutParticipants_matches_player1IdToparticipantsInput | Enumerable<matchesCreateWithoutParticipants_matches_player1IdToparticipantsInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
}

export type matchesCreateManyWithoutParticipants_matches_player2IdToparticipantsInput = {
  create?: matchesCreateWithoutParticipants_matches_player2IdToparticipantsInput | Enumerable<matchesCreateWithoutParticipants_matches_player2IdToparticipantsInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
}

export type NullableDateTimeFieldUpdateOperationsInput = {
  set?: Date | string | null
}

export type ranksUpdateOneWithoutParticipantsInput = {
  create?: ranksCreateWithoutParticipantsInput
  connect?: ranksWhereUniqueInput
  disconnect?: boolean
  delete?: boolean
  update?: ranksUpdateWithoutParticipantsDataInput
  upsert?: ranksUpsertWithoutParticipantsInput
}

export type matchesUpdateManyWithoutParticipants_matches_player1IdToparticipantsInput = {
  create?: matchesCreateWithoutParticipants_matches_player1IdToparticipantsInput | Enumerable<matchesCreateWithoutParticipants_matches_player1IdToparticipantsInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  set?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  disconnect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  delete?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  update?: matchesUpdateWithWhereUniqueWithoutParticipants_matches_player1IdToparticipantsInput | Enumerable<matchesUpdateWithWhereUniqueWithoutParticipants_matches_player1IdToparticipantsInput>
  updateMany?: matchesUpdateManyWithWhereNestedInput | Enumerable<matchesUpdateManyWithWhereNestedInput>
  deleteMany?: matchesScalarWhereInput | Enumerable<matchesScalarWhereInput>
  upsert?: matchesUpsertWithWhereUniqueWithoutParticipants_matches_player1IdToparticipantsInput | Enumerable<matchesUpsertWithWhereUniqueWithoutParticipants_matches_player1IdToparticipantsInput>
}

export type matchesUpdateManyWithoutParticipants_matches_player2IdToparticipantsInput = {
  create?: matchesCreateWithoutParticipants_matches_player2IdToparticipantsInput | Enumerable<matchesCreateWithoutParticipants_matches_player2IdToparticipantsInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  set?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  disconnect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  delete?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  update?: matchesUpdateWithWhereUniqueWithoutParticipants_matches_player2IdToparticipantsInput | Enumerable<matchesUpdateWithWhereUniqueWithoutParticipants_matches_player2IdToparticipantsInput>
  updateMany?: matchesUpdateManyWithWhereNestedInput | Enumerable<matchesUpdateManyWithWhereNestedInput>
  deleteMany?: matchesScalarWhereInput | Enumerable<matchesScalarWhereInput>
  upsert?: matchesUpsertWithWhereUniqueWithoutParticipants_matches_player2IdToparticipantsInput | Enumerable<matchesUpsertWithWhereUniqueWithoutParticipants_matches_player2IdToparticipantsInput>
}

export type participantsCreateManyWithoutRanksInput = {
  create?: participantsCreateWithoutRanksInput | Enumerable<participantsCreateWithoutRanksInput>
  connect?: participantsWhereUniqueInput | Enumerable<participantsWhereUniqueInput>
}

export type participantsUpdateManyWithoutRanksInput = {
  create?: participantsCreateWithoutRanksInput | Enumerable<participantsCreateWithoutRanksInput>
  connect?: participantsWhereUniqueInput | Enumerable<participantsWhereUniqueInput>
  set?: participantsWhereUniqueInput | Enumerable<participantsWhereUniqueInput>
  disconnect?: participantsWhereUniqueInput | Enumerable<participantsWhereUniqueInput>
  delete?: participantsWhereUniqueInput | Enumerable<participantsWhereUniqueInput>
  update?: participantsUpdateWithWhereUniqueWithoutRanksInput | Enumerable<participantsUpdateWithWhereUniqueWithoutRanksInput>
  updateMany?: participantsUpdateManyWithWhereNestedInput | Enumerable<participantsUpdateManyWithWhereNestedInput>
  deleteMany?: participantsScalarWhereInput | Enumerable<participantsScalarWhereInput>
  upsert?: participantsUpsertWithWhereUniqueWithoutRanksInput | Enumerable<participantsUpsertWithWhereUniqueWithoutRanksInput>
}

export type matchesCreateManyWithoutStagesInput = {
  create?: matchesCreateWithoutStagesInput | Enumerable<matchesCreateWithoutStagesInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
}

export type matchesUpdateManyWithoutStagesInput = {
  create?: matchesCreateWithoutStagesInput | Enumerable<matchesCreateWithoutStagesInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  set?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  disconnect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  delete?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  update?: matchesUpdateWithWhereUniqueWithoutStagesInput | Enumerable<matchesUpdateWithWhereUniqueWithoutStagesInput>
  updateMany?: matchesUpdateManyWithWhereNestedInput | Enumerable<matchesUpdateManyWithWhereNestedInput>
  deleteMany?: matchesScalarWhereInput | Enumerable<matchesScalarWhereInput>
  upsert?: matchesUpsertWithWhereUniqueWithoutStagesInput | Enumerable<matchesUpsertWithWhereUniqueWithoutStagesInput>
}

export type matchesCreateManyWithoutTournamentsInput = {
  create?: matchesCreateWithoutTournamentsInput | Enumerable<matchesCreateWithoutTournamentsInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
}

export type DateTimeFieldUpdateOperationsInput = {
  set?: Date | string
}

export type matchesUpdateManyWithoutTournamentsInput = {
  create?: matchesCreateWithoutTournamentsInput | Enumerable<matchesCreateWithoutTournamentsInput>
  connect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  set?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  disconnect?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  delete?: matchesWhereUniqueInput | Enumerable<matchesWhereUniqueInput>
  update?: matchesUpdateWithWhereUniqueWithoutTournamentsInput | Enumerable<matchesUpdateWithWhereUniqueWithoutTournamentsInput>
  updateMany?: matchesUpdateManyWithWhereNestedInput | Enumerable<matchesUpdateManyWithWhereNestedInput>
  deleteMany?: matchesScalarWhereInput | Enumerable<matchesScalarWhereInput>
  upsert?: matchesUpsertWithWhereUniqueWithoutTournamentsInput | Enumerable<matchesUpsertWithWhereUniqueWithoutTournamentsInput>
}

export type gamesCreateManyWithoutWaywinsInput = {
  create?: gamesCreateWithoutWaywinsInput | Enumerable<gamesCreateWithoutWaywinsInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
}

export type gamesUpdateManyWithoutWaywinsInput = {
  create?: gamesCreateWithoutWaywinsInput | Enumerable<gamesCreateWithoutWaywinsInput>
  connect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  set?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  disconnect?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  delete?: gamesWhereUniqueInput | Enumerable<gamesWhereUniqueInput>
  update?: gamesUpdateWithWhereUniqueWithoutWaywinsInput | Enumerable<gamesUpdateWithWhereUniqueWithoutWaywinsInput>
  updateMany?: gamesUpdateManyWithWhereNestedInput | Enumerable<gamesUpdateManyWithWhereNestedInput>
  deleteMany?: gamesScalarWhereInput | Enumerable<gamesScalarWhereInput>
  upsert?: gamesUpsertWithWhereUniqueWithoutWaywinsInput | Enumerable<gamesUpsertWithWhereUniqueWithoutWaywinsInput>
}

export type NestedIntFilter = {
  equals?: number
  in?: Enumerable<number>
  notIn?: Enumerable<number>
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntFilter
}

export type NestedStringFilter = {
  equals?: string
  in?: Enumerable<string>
  notIn?: Enumerable<string>
  lt?: string
  lte?: string
  gt?: string
  gte?: string
  contains?: string
  startsWith?: string
  endsWith?: string
  not?: string | NestedStringFilter
}

export type NestedBoolFilter = {
  equals?: boolean
  not?: boolean | NestedBoolFilter
}

export type NestedIntNullableFilter = {
  equals?: number | null
  in?: Enumerable<number> | null
  notIn?: Enumerable<number> | null
  lt?: number
  lte?: number
  gt?: number
  gte?: number
  not?: number | NestedIntNullableFilter | null
}

export type NestedDateTimeNullableFilter = {
  equals?: Date | string | null
  in?: Enumerable<Date> | Enumerable<string> | null
  notIn?: Enumerable<Date> | Enumerable<string> | null
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeNullableFilter | null
}

export type NestedDateTimeFilter = {
  equals?: Date | string
  in?: Enumerable<Date> | Enumerable<string>
  notIn?: Enumerable<Date> | Enumerable<string>
  lt?: Date | string
  lte?: Date | string
  gt?: Date | string
  gte?: Date | string
  not?: Date | string | NestedDateTimeFilter
}

export type gamesCreateWithoutChampions_championsTogames_p1ChampionIdInput = {
  player1Won: boolean
  blueSideWon: boolean
  p1CS?: number | null
  p2CS?: number | null
  duration?: number | null
  matches?: matchesCreateOneWithoutGamesInput
  champions_championsTogames_p2ChampionId?: championsCreateOneWithoutGames_championsTogames_p2ChampionIdInput
  waywins?: waywinsCreateOneWithoutGamesInput
}

export type gamesCreateWithoutChampions_championsTogames_p2ChampionIdInput = {
  player1Won: boolean
  blueSideWon: boolean
  p1CS?: number | null
  p2CS?: number | null
  duration?: number | null
  matches?: matchesCreateOneWithoutGamesInput
  champions_championsTogames_p1ChampionId?: championsCreateOneWithoutGames_championsTogames_p1ChampionIdInput
  waywins?: waywinsCreateOneWithoutGamesInput
}

export type gamesUpdateWithWhereUniqueWithoutChampions_championsTogames_p1ChampionIdInput = {
  where: gamesWhereUniqueInput
  data: gamesUpdateWithoutChampions_championsTogames_p1ChampionIdDataInput
}

export type gamesUpdateManyWithWhereNestedInput = {
  where: gamesScalarWhereInput
  data: gamesUpdateManyDataInput
}

export type gamesScalarWhereInput = {
  AND?: gamesScalarWhereInput | Enumerable<gamesScalarWhereInput>
  OR?: gamesScalarWhereInput | Enumerable<gamesScalarWhereInput>
  NOT?: gamesScalarWhereInput | Enumerable<gamesScalarWhereInput>
  id?: IntFilter | number
  player1Won?: BoolFilter | boolean
  blueSideWon?: BoolFilter | boolean
  p1CS?: IntNullableFilter | number | null
  p2CS?: IntNullableFilter | number | null
  duration?: IntNullableFilter | number | null
  matchId?: IntNullableFilter | number | null
  p1ChampionId?: IntNullableFilter | number | null
  p2ChampionId?: IntNullableFilter | number | null
  waywinId?: IntNullableFilter | number | null
}

export type gamesUpsertWithWhereUniqueWithoutChampions_championsTogames_p1ChampionIdInput = {
  where: gamesWhereUniqueInput
  update: gamesUpdateWithoutChampions_championsTogames_p1ChampionIdDataInput
  create: gamesCreateWithoutChampions_championsTogames_p1ChampionIdInput
}

export type gamesUpdateWithWhereUniqueWithoutChampions_championsTogames_p2ChampionIdInput = {
  where: gamesWhereUniqueInput
  data: gamesUpdateWithoutChampions_championsTogames_p2ChampionIdDataInput
}

export type gamesUpsertWithWhereUniqueWithoutChampions_championsTogames_p2ChampionIdInput = {
  where: gamesWhereUniqueInput
  update: gamesUpdateWithoutChampions_championsTogames_p2ChampionIdDataInput
  create: gamesCreateWithoutChampions_championsTogames_p2ChampionIdInput
}

export type matchesCreateWithoutGamesInput = {
  participants_matches_player1IdToparticipants?: participantsCreateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsCreateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesCreateOneWithoutMatchesInput
  tournaments?: tournamentsCreateOneWithoutMatchesInput
}

export type championsCreateWithoutGames_championsTogames_p1ChampionIdInput = {
  name?: string
  games_championsTogames_p2ChampionId?: gamesCreateManyWithoutChampions_championsTogames_p2ChampionIdInput
}

export type championsCreateWithoutGames_championsTogames_p2ChampionIdInput = {
  name?: string
  games_championsTogames_p1ChampionId?: gamesCreateManyWithoutChampions_championsTogames_p1ChampionIdInput
}

export type waywinsCreateWithoutGamesInput = {
  name?: string
}

export type matchesUpdateWithoutGamesDataInput = {
  participants_matches_player1IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesUpdateOneWithoutMatchesInput
  tournaments?: tournamentsUpdateOneWithoutMatchesInput
}

export type matchesUpsertWithoutGamesInput = {
  update: matchesUpdateWithoutGamesDataInput
  create: matchesCreateWithoutGamesInput
}

export type championsUpdateWithoutGames_championsTogames_p1ChampionIdDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  games_championsTogames_p2ChampionId?: gamesUpdateManyWithoutChampions_championsTogames_p2ChampionIdInput
}

export type championsUpsertWithoutGames_championsTogames_p1ChampionIdInput = {
  update: championsUpdateWithoutGames_championsTogames_p1ChampionIdDataInput
  create: championsCreateWithoutGames_championsTogames_p1ChampionIdInput
}

export type championsUpdateWithoutGames_championsTogames_p2ChampionIdDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  games_championsTogames_p1ChampionId?: gamesUpdateManyWithoutChampions_championsTogames_p1ChampionIdInput
}

export type championsUpsertWithoutGames_championsTogames_p2ChampionIdInput = {
  update: championsUpdateWithoutGames_championsTogames_p2ChampionIdDataInput
  create: championsCreateWithoutGames_championsTogames_p2ChampionIdInput
}

export type waywinsUpdateWithoutGamesDataInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type waywinsUpsertWithoutGamesInput = {
  update: waywinsUpdateWithoutGamesDataInput
  create: waywinsCreateWithoutGamesInput
}

export type participantsCreateWithoutMatches_matches_player1IdToparticipantsInput = {
  name?: string
  signUpDate?: Date | string | null
  resignationDate?: Date | string | null
  ranks?: ranksCreateOneWithoutParticipantsInput
  matches_matches_player2IdToparticipants?: matchesCreateManyWithoutParticipants_matches_player2IdToparticipantsInput
}

export type participantsCreateWithoutMatches_matches_player2IdToparticipantsInput = {
  name?: string
  signUpDate?: Date | string | null
  resignationDate?: Date | string | null
  ranks?: ranksCreateOneWithoutParticipantsInput
  matches_matches_player1IdToparticipants?: matchesCreateManyWithoutParticipants_matches_player1IdToparticipantsInput
}

export type stagesCreateWithoutMatchesInput = {
  name?: string
}

export type tournamentsCreateWithoutMatchesInput = {
  name?: string
  description?: string
  startDate: Date | string
  endDate?: Date | string | null
  createdOn?: Date | string
}

export type gamesCreateWithoutMatchesInput = {
  player1Won: boolean
  blueSideWon: boolean
  p1CS?: number | null
  p2CS?: number | null
  duration?: number | null
  champions_championsTogames_p1ChampionId?: championsCreateOneWithoutGames_championsTogames_p1ChampionIdInput
  champions_championsTogames_p2ChampionId?: championsCreateOneWithoutGames_championsTogames_p2ChampionIdInput
  waywins?: waywinsCreateOneWithoutGamesInput
}

export type participantsUpdateWithoutMatches_matches_player1IdToparticipantsDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  signUpDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  resignationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  ranks?: ranksUpdateOneWithoutParticipantsInput
  matches_matches_player2IdToparticipants?: matchesUpdateManyWithoutParticipants_matches_player2IdToparticipantsInput
}

export type participantsUpsertWithoutMatches_matches_player1IdToparticipantsInput = {
  update: participantsUpdateWithoutMatches_matches_player1IdToparticipantsDataInput
  create: participantsCreateWithoutMatches_matches_player1IdToparticipantsInput
}

export type participantsUpdateWithoutMatches_matches_player2IdToparticipantsDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  signUpDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  resignationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  ranks?: ranksUpdateOneWithoutParticipantsInput
  matches_matches_player1IdToparticipants?: matchesUpdateManyWithoutParticipants_matches_player1IdToparticipantsInput
}

export type participantsUpsertWithoutMatches_matches_player2IdToparticipantsInput = {
  update: participantsUpdateWithoutMatches_matches_player2IdToparticipantsDataInput
  create: participantsCreateWithoutMatches_matches_player2IdToparticipantsInput
}

export type stagesUpdateWithoutMatchesDataInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type stagesUpsertWithoutMatchesInput = {
  update: stagesUpdateWithoutMatchesDataInput
  create: stagesCreateWithoutMatchesInput
}

export type tournamentsUpdateWithoutMatchesDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  description?: string | StringFieldUpdateOperationsInput
  startDate?: Date | string | DateTimeFieldUpdateOperationsInput
  endDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  createdOn?: Date | string | DateTimeFieldUpdateOperationsInput
}

export type tournamentsUpsertWithoutMatchesInput = {
  update: tournamentsUpdateWithoutMatchesDataInput
  create: tournamentsCreateWithoutMatchesInput
}

export type gamesUpdateWithWhereUniqueWithoutMatchesInput = {
  where: gamesWhereUniqueInput
  data: gamesUpdateWithoutMatchesDataInput
}

export type gamesUpsertWithWhereUniqueWithoutMatchesInput = {
  where: gamesWhereUniqueInput
  update: gamesUpdateWithoutMatchesDataInput
  create: gamesCreateWithoutMatchesInput
}

export type ranksCreateWithoutParticipantsInput = {
  name?: string
}

export type matchesCreateWithoutParticipants_matches_player1IdToparticipantsInput = {
  participants_matches_player2IdToparticipants?: participantsCreateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesCreateOneWithoutMatchesInput
  tournaments?: tournamentsCreateOneWithoutMatchesInput
  games?: gamesCreateManyWithoutMatchesInput
}

export type matchesCreateWithoutParticipants_matches_player2IdToparticipantsInput = {
  participants_matches_player1IdToparticipants?: participantsCreateOneWithoutMatches_matches_player1IdToparticipantsInput
  stages?: stagesCreateOneWithoutMatchesInput
  tournaments?: tournamentsCreateOneWithoutMatchesInput
  games?: gamesCreateManyWithoutMatchesInput
}

export type ranksUpdateWithoutParticipantsDataInput = {
  name?: string | StringFieldUpdateOperationsInput
}

export type ranksUpsertWithoutParticipantsInput = {
  update: ranksUpdateWithoutParticipantsDataInput
  create: ranksCreateWithoutParticipantsInput
}

export type matchesUpdateWithWhereUniqueWithoutParticipants_matches_player1IdToparticipantsInput = {
  where: matchesWhereUniqueInput
  data: matchesUpdateWithoutParticipants_matches_player1IdToparticipantsDataInput
}

export type matchesUpdateManyWithWhereNestedInput = {
  where: matchesScalarWhereInput
  data: matchesUpdateManyDataInput
}

export type matchesScalarWhereInput = {
  AND?: matchesScalarWhereInput | Enumerable<matchesScalarWhereInput>
  OR?: matchesScalarWhereInput | Enumerable<matchesScalarWhereInput>
  NOT?: matchesScalarWhereInput | Enumerable<matchesScalarWhereInput>
  id?: IntFilter | number
  tournamentId?: IntNullableFilter | number | null
  stageId?: IntNullableFilter | number | null
  player1Id?: IntNullableFilter | number | null
  player2Id?: IntNullableFilter | number | null
}

export type matchesUpsertWithWhereUniqueWithoutParticipants_matches_player1IdToparticipantsInput = {
  where: matchesWhereUniqueInput
  update: matchesUpdateWithoutParticipants_matches_player1IdToparticipantsDataInput
  create: matchesCreateWithoutParticipants_matches_player1IdToparticipantsInput
}

export type matchesUpdateWithWhereUniqueWithoutParticipants_matches_player2IdToparticipantsInput = {
  where: matchesWhereUniqueInput
  data: matchesUpdateWithoutParticipants_matches_player2IdToparticipantsDataInput
}

export type matchesUpsertWithWhereUniqueWithoutParticipants_matches_player2IdToparticipantsInput = {
  where: matchesWhereUniqueInput
  update: matchesUpdateWithoutParticipants_matches_player2IdToparticipantsDataInput
  create: matchesCreateWithoutParticipants_matches_player2IdToparticipantsInput
}

export type participantsCreateWithoutRanksInput = {
  name?: string
  signUpDate?: Date | string | null
  resignationDate?: Date | string | null
  matches_matches_player1IdToparticipants?: matchesCreateManyWithoutParticipants_matches_player1IdToparticipantsInput
  matches_matches_player2IdToparticipants?: matchesCreateManyWithoutParticipants_matches_player2IdToparticipantsInput
}

export type participantsUpdateWithWhereUniqueWithoutRanksInput = {
  where: participantsWhereUniqueInput
  data: participantsUpdateWithoutRanksDataInput
}

export type participantsUpdateManyWithWhereNestedInput = {
  where: participantsScalarWhereInput
  data: participantsUpdateManyDataInput
}

export type participantsScalarWhereInput = {
  AND?: participantsScalarWhereInput | Enumerable<participantsScalarWhereInput>
  OR?: participantsScalarWhereInput | Enumerable<participantsScalarWhereInput>
  NOT?: participantsScalarWhereInput | Enumerable<participantsScalarWhereInput>
  id?: IntFilter | number
  name?: StringFilter | string
  rankId?: IntNullableFilter | number | null
  signUpDate?: DateTimeNullableFilter | Date | string | null
  resignationDate?: DateTimeNullableFilter | Date | string | null
}

export type participantsUpsertWithWhereUniqueWithoutRanksInput = {
  where: participantsWhereUniqueInput
  update: participantsUpdateWithoutRanksDataInput
  create: participantsCreateWithoutRanksInput
}

export type matchesCreateWithoutStagesInput = {
  participants_matches_player1IdToparticipants?: participantsCreateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsCreateOneWithoutMatches_matches_player2IdToparticipantsInput
  tournaments?: tournamentsCreateOneWithoutMatchesInput
  games?: gamesCreateManyWithoutMatchesInput
}

export type matchesUpdateWithWhereUniqueWithoutStagesInput = {
  where: matchesWhereUniqueInput
  data: matchesUpdateWithoutStagesDataInput
}

export type matchesUpsertWithWhereUniqueWithoutStagesInput = {
  where: matchesWhereUniqueInput
  update: matchesUpdateWithoutStagesDataInput
  create: matchesCreateWithoutStagesInput
}

export type matchesCreateWithoutTournamentsInput = {
  participants_matches_player1IdToparticipants?: participantsCreateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsCreateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesCreateOneWithoutMatchesInput
  games?: gamesCreateManyWithoutMatchesInput
}

export type matchesUpdateWithWhereUniqueWithoutTournamentsInput = {
  where: matchesWhereUniqueInput
  data: matchesUpdateWithoutTournamentsDataInput
}

export type matchesUpsertWithWhereUniqueWithoutTournamentsInput = {
  where: matchesWhereUniqueInput
  update: matchesUpdateWithoutTournamentsDataInput
  create: matchesCreateWithoutTournamentsInput
}

export type gamesCreateWithoutWaywinsInput = {
  player1Won: boolean
  blueSideWon: boolean
  p1CS?: number | null
  p2CS?: number | null
  duration?: number | null
  matches?: matchesCreateOneWithoutGamesInput
  champions_championsTogames_p1ChampionId?: championsCreateOneWithoutGames_championsTogames_p1ChampionIdInput
  champions_championsTogames_p2ChampionId?: championsCreateOneWithoutGames_championsTogames_p2ChampionIdInput
}

export type gamesUpdateWithWhereUniqueWithoutWaywinsInput = {
  where: gamesWhereUniqueInput
  data: gamesUpdateWithoutWaywinsDataInput
}

export type gamesUpsertWithWhereUniqueWithoutWaywinsInput = {
  where: gamesWhereUniqueInput
  update: gamesUpdateWithoutWaywinsDataInput
  create: gamesCreateWithoutWaywinsInput
}

export type gamesUpdateWithoutChampions_championsTogames_p1ChampionIdDataInput = {
  player1Won?: boolean | BoolFieldUpdateOperationsInput
  blueSideWon?: boolean | BoolFieldUpdateOperationsInput
  p1CS?: number | NullableIntFieldUpdateOperationsInput | null
  p2CS?: number | NullableIntFieldUpdateOperationsInput | null
  duration?: number | NullableIntFieldUpdateOperationsInput | null
  matches?: matchesUpdateOneWithoutGamesInput
  champions_championsTogames_p2ChampionId?: championsUpdateOneWithoutGames_championsTogames_p2ChampionIdInput
  waywins?: waywinsUpdateOneWithoutGamesInput
}

export type gamesUpdateManyDataInput = {
  player1Won?: boolean | BoolFieldUpdateOperationsInput
  blueSideWon?: boolean | BoolFieldUpdateOperationsInput
  p1CS?: number | NullableIntFieldUpdateOperationsInput | null
  p2CS?: number | NullableIntFieldUpdateOperationsInput | null
  duration?: number | NullableIntFieldUpdateOperationsInput | null
}

export type gamesUpdateWithoutChampions_championsTogames_p2ChampionIdDataInput = {
  player1Won?: boolean | BoolFieldUpdateOperationsInput
  blueSideWon?: boolean | BoolFieldUpdateOperationsInput
  p1CS?: number | NullableIntFieldUpdateOperationsInput | null
  p2CS?: number | NullableIntFieldUpdateOperationsInput | null
  duration?: number | NullableIntFieldUpdateOperationsInput | null
  matches?: matchesUpdateOneWithoutGamesInput
  champions_championsTogames_p1ChampionId?: championsUpdateOneWithoutGames_championsTogames_p1ChampionIdInput
  waywins?: waywinsUpdateOneWithoutGamesInput
}

export type gamesUpdateWithoutMatchesDataInput = {
  player1Won?: boolean | BoolFieldUpdateOperationsInput
  blueSideWon?: boolean | BoolFieldUpdateOperationsInput
  p1CS?: number | NullableIntFieldUpdateOperationsInput | null
  p2CS?: number | NullableIntFieldUpdateOperationsInput | null
  duration?: number | NullableIntFieldUpdateOperationsInput | null
  champions_championsTogames_p1ChampionId?: championsUpdateOneWithoutGames_championsTogames_p1ChampionIdInput
  champions_championsTogames_p2ChampionId?: championsUpdateOneWithoutGames_championsTogames_p2ChampionIdInput
  waywins?: waywinsUpdateOneWithoutGamesInput
}

export type matchesUpdateWithoutParticipants_matches_player1IdToparticipantsDataInput = {
  participants_matches_player2IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesUpdateOneWithoutMatchesInput
  tournaments?: tournamentsUpdateOneWithoutMatchesInput
  games?: gamesUpdateManyWithoutMatchesInput
}

export type matchesUpdateManyDataInput = {

}

export type matchesUpdateWithoutParticipants_matches_player2IdToparticipantsDataInput = {
  participants_matches_player1IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player1IdToparticipantsInput
  stages?: stagesUpdateOneWithoutMatchesInput
  tournaments?: tournamentsUpdateOneWithoutMatchesInput
  games?: gamesUpdateManyWithoutMatchesInput
}

export type participantsUpdateWithoutRanksDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  signUpDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  resignationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  matches_matches_player1IdToparticipants?: matchesUpdateManyWithoutParticipants_matches_player1IdToparticipantsInput
  matches_matches_player2IdToparticipants?: matchesUpdateManyWithoutParticipants_matches_player2IdToparticipantsInput
}

export type participantsUpdateManyDataInput = {
  name?: string | StringFieldUpdateOperationsInput
  signUpDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
  resignationDate?: Date | string | NullableDateTimeFieldUpdateOperationsInput | null
}

export type matchesUpdateWithoutStagesDataInput = {
  participants_matches_player1IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player2IdToparticipantsInput
  tournaments?: tournamentsUpdateOneWithoutMatchesInput
  games?: gamesUpdateManyWithoutMatchesInput
}

export type matchesUpdateWithoutTournamentsDataInput = {
  participants_matches_player1IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player1IdToparticipantsInput
  participants_matches_player2IdToparticipants?: participantsUpdateOneWithoutMatches_matches_player2IdToparticipantsInput
  stages?: stagesUpdateOneWithoutMatchesInput
  games?: gamesUpdateManyWithoutMatchesInput
}

export type gamesUpdateWithoutWaywinsDataInput = {
  player1Won?: boolean | BoolFieldUpdateOperationsInput
  blueSideWon?: boolean | BoolFieldUpdateOperationsInput
  p1CS?: number | NullableIntFieldUpdateOperationsInput | null
  p2CS?: number | NullableIntFieldUpdateOperationsInput | null
  duration?: number | NullableIntFieldUpdateOperationsInput | null
  matches?: matchesUpdateOneWithoutGamesInput
  champions_championsTogames_p1ChampionId?: championsUpdateOneWithoutGames_championsTogames_p1ChampionIdInput
  champions_championsTogames_p2ChampionId?: championsUpdateOneWithoutGames_championsTogames_p2ChampionIdInput
}

/**
 * Batch Payload for updateMany & deleteMany
 */

export type BatchPayload = {
  count: number
}

/**
 * DMMF
 */
export declare const dmmf: DMMF.Document;
export {};

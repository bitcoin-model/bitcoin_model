export abstract class BaseSchema<T> {
  readonly _type!: T;

  parse(value: unknown): T {
    return this._parse(value);
  }

  optional(): BaseSchema<T | undefined> {
    return new OptionalSchema(this);
  }

  nullable(): BaseSchema<T | null> {
    return new NullableSchema(this);
  }

  protected abstract _parse(value: unknown): T;
}

class NumberSchema extends BaseSchema<number> {
  protected _parse(value: unknown): number {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`Expected number, received ${typeof value}`);
    }
    return value;
  }
}

class StringSchema extends BaseSchema<string> {
  protected _parse(value: unknown): string {
    if (typeof value !== 'string') {
      throw new TypeError(`Expected string, received ${typeof value}`);
    }
    return value;
  }
}

class BooleanSchema extends BaseSchema<boolean> {
  protected _parse(value: unknown): boolean {
    if (typeof value !== 'boolean') {
      throw new TypeError(`Expected boolean, received ${typeof value}`);
    }
    return value;
  }
}

class LiteralSchema<T extends string | number | boolean | null> extends BaseSchema<T> {
  constructor(private readonly literal: T) {
    super();
  }

  protected _parse(value: unknown): T {
    if (value !== this.literal) {
      throw new TypeError(`Expected literal ${String(this.literal)}, received ${String(value)}`);
    }
    return this.literal;
  }
}

class EnumSchema<T extends string> extends BaseSchema<T> {
  constructor(private readonly values: readonly T[]) {
    super();
  }

  protected _parse(value: unknown): T {
    if (typeof value !== 'string' || !this.values.includes(value as T)) {
      throw new TypeError(`Expected one of ${this.values.join(', ')}, received ${String(value)}`);
    }
    return value as T;
  }
}

class ArraySchema<T> extends BaseSchema<T[]> {
  constructor(private readonly elementSchema: BaseSchema<T>) {
    super();
  }

  protected _parse(value: unknown): T[] {
    if (!Array.isArray(value)) {
      throw new TypeError(`Expected array, received ${typeof value}`);
    }

    return value.map((item) => this.elementSchema.parse(item));
  }
}

type Shape = Record<string, BaseSchema<unknown>>;

type InferShape<S extends Shape> = {
  [K in keyof S]: Infer<S[K]>;
};

class ObjectSchema<S extends Shape> extends BaseSchema<InferShape<S>> {
  constructor(private readonly shape: S) {
    super();
  }

  protected _parse(value: unknown): InferShape<S> {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      throw new TypeError('Expected object');
    }

    const result: Record<string, unknown> = {};

    for (const key of Object.keys(this.shape)) {
      const schema = this.shape[key];
      const propertyValue = (value as Record<string, unknown>)[key];
      result[key] = schema.parse(propertyValue);
    }

    return result as InferShape<S>;
  }
}

class OptionalSchema<T> extends BaseSchema<T | undefined> {
  constructor(private readonly schema: BaseSchema<T>) {
    super();
  }

  protected _parse(value: unknown): T | undefined {
    if (value === undefined) {
      return undefined;
    }

    return this.schema.parse(value);
  }
}

class NullableSchema<T> extends BaseSchema<T | null> {
  constructor(private readonly schema: BaseSchema<T>) {
    super();
  }

  protected _parse(value: unknown): T | null {
    if (value === null) {
      return null;
    }

    return this.schema.parse(value);
  }
}

export type Infer<T extends BaseSchema<unknown>> = T['_type'];

export const z = {
  number: () => new NumberSchema(),
  string: () => new StringSchema(),
  boolean: () => new BooleanSchema(),
  literal: <T extends string | number | boolean | null>(value: T) => new LiteralSchema(value),
  enum: <T extends string>(values: readonly T[]) => new EnumSchema(values),
  array: <T>(schema: BaseSchema<T>) => new ArraySchema(schema),
  object: <S extends Shape>(shape: S) => new ObjectSchema(shape)
};

export type ZodInfer<T extends BaseSchema<unknown>> = Infer<T>;

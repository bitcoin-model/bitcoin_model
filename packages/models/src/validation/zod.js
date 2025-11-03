class BaseSchema {
  parse(value) {
    return this._parse(value);
  }

  optional() {
    return new OptionalSchema(this);
  }

  nullable() {
    return new NullableSchema(this);
  }
}

class NumberSchema extends BaseSchema {
  _parse(value) {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new TypeError(`Expected number, received ${typeof value}`);
    }
    return value;
  }
}

class StringSchema extends BaseSchema {
  _parse(value) {
    if (typeof value !== 'string') {
      throw new TypeError(`Expected string, received ${typeof value}`);
    }
    return value;
  }
}

class BooleanSchema extends BaseSchema {
  _parse(value) {
    if (typeof value !== 'boolean') {
      throw new TypeError(`Expected boolean, received ${typeof value}`);
    }
    return value;
  }
}

class LiteralSchema extends BaseSchema {
  constructor(literal) {
    super();
    this.literal = literal;
  }

  _parse(value) {
    if (value !== this.literal) {
      throw new TypeError(`Expected literal ${String(this.literal)}, received ${String(value)}`);
    }
    return this.literal;
  }
}

class EnumSchema extends BaseSchema {
  constructor(values) {
    super();
    this.values = values;
  }

  _parse(value) {
    if (typeof value !== 'string' || !this.values.includes(value)) {
      throw new TypeError(`Expected one of ${this.values.join(', ')}, received ${String(value)}`);
    }
    return value;
  }
}

class ArraySchema extends BaseSchema {
  constructor(elementSchema) {
    super();
    this.elementSchema = elementSchema;
  }

  _parse(value) {
    if (!Array.isArray(value)) {
      throw new TypeError(`Expected array, received ${typeof value}`);
    }

    return value.map((item) => this.elementSchema.parse(item));
  }
}

class ObjectSchema extends BaseSchema {
  constructor(shape) {
    super();
    this.shape = shape;
  }

  _parse(value) {
    if (value === null || typeof value !== 'object' || Array.isArray(value)) {
      throw new TypeError('Expected object');
    }

    const result = {};
    for (const key of Object.keys(this.shape)) {
      const schema = this.shape[key];
      const propertyValue = value[key];
      result[key] = schema.parse(propertyValue);
    }

    return result;
  }
}

class OptionalSchema extends BaseSchema {
  constructor(schema) {
    super();
    this.schema = schema;
  }

  _parse(value) {
    if (value === undefined) {
      return undefined;
    }

    return this.schema.parse(value);
  }
}

class NullableSchema extends BaseSchema {
  constructor(schema) {
    super();
    this.schema = schema;
  }

  _parse(value) {
    if (value === null) {
      return null;
    }

    return this.schema.parse(value);
  }
}

export const z = {
  number: () => new NumberSchema(),
  string: () => new StringSchema(),
  boolean: () => new BooleanSchema(),
  literal: (value) => new LiteralSchema(value),
  enum: (values) => new EnumSchema(values),
  array: (schema) => new ArraySchema(schema),
  object: (shape) => new ObjectSchema(shape)
};

export { BaseSchema };

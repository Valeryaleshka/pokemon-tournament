import { HttpEventType, HttpInterceptorFn, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const snakeToCamelCaseInterceptor: HttpInterceptorFn = (req, next) => {
  const modifiedReq = req.clone({
    body: bodyToSnakeCase(req.body),
    params: paramsToSnakeCase(req.params),
  });

  return next(modifiedReq).pipe(
    map((event) => {
      if (event.type === HttpEventType.Response && event.body) {
        const camelCaseBody = convertObjectKeys(event.body, snakeToCamel);
        return event.clone({ body: camelCaseBody });
      }
      return event;
    }),
  );
};

function bodyToSnakeCase(body: any): any {
  if (body) {
    return convertObjectKeys(body, camelToSnake);
  }
  return body;
}

function paramsToSnakeCase(params: HttpParams): HttpParams {
  if (params && params.keys().length > 0) {
    let newParams = params;
    params.keys().forEach((key: string) => {
      const snakeKey = camelToSnake(key);
      const value = params.get(key);
      if (value !== null) {
        newParams = newParams.delete(key).set(snakeKey, value);
      }
    });
    return newParams;
  }
  return params;
}

const snakeToCamel = (str: string): string => {
  return str.replace(/([_][a-z])/g, (group) => group.toUpperCase().replace('_', ''));
};

const camelToSnake = (str: string): string => {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
};

const convertObjectKeys = (obj: unknown, converter: (key: string) => string): any => {
  if (isPrimitive(obj)) {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map((item) => convertObjectKeys(item, converter));
  }

  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj === 'object' && obj !== null) {
    const converted: Record<string, unknown> = {};

    Object.keys(obj).forEach((key) => {
      const convertedKey = converter(key);
      const value = (obj as Record<string, unknown>)[key];

      if (isPrimitive(value)) {
        converted[convertedKey] = value;
      } else if (Array.isArray(value)) {
        converted[convertedKey] = value.map((item) =>
          isPrimitive(item) ? item : convertObjectKeys(item, converter),
        );
      } else if (value instanceof Date) {
        converted[convertedKey] = value;
      } else if (typeof value === 'object' && value !== null) {
        converted[convertedKey] = convertObjectKeys(value, converter);
      } else {
        converted[convertedKey] = value;
      }
    });

    return converted;
  }

  return obj;
};

const isPrimitive = (value: unknown): boolean => {
  return (
    value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean'
  );
};

// snake-to-camel.interceptor.ts
import {HttpInterceptorFn} from '@angular/common/http';
import {map} from 'rxjs/operators';

export const snakeToCamelCaseInterceptor: HttpInterceptorFn = (req, next) => {
  let modifiedReq = req;

  if (req.body) {
    const snakeCaseBody = convertObjectKeys(req.body, camelToSnake);
    modifiedReq = modifiedReq.clone({body: snakeCaseBody});
  }

  // Convert request params from camelCase to snake_case
  if (req.params.keys().length > 0) {
    let newParams = req.params;
    req.params.keys().forEach(key => {
      const snakeKey = camelToSnake(key);
      const value = req.params.get(key);
      if (value !== null) {
        newParams = newParams.delete(key).set(snakeKey, value);
      }
    });
    modifiedReq = modifiedReq.clone({params: newParams});
  }

  return next(modifiedReq).pipe(
    map(event => {
      if (event.type === 4 && event.body) { // HttpResponse
        const camelCaseBody = convertObjectKeys(event.body, snakeToCamel);
        return event.clone({body: camelCaseBody});
      }
      return event;
    })
  );
};

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
    return obj.map(item => convertObjectKeys(item, converter));
  }

  if (obj instanceof Date) {
    return obj;
  }

  if (typeof obj === 'object' && obj !== null) {
    const converted: Record<string, unknown> = {};

    Object.keys(obj).forEach(key => {
      const convertedKey = converter(key);
      const value = (obj as Record<string, unknown>)[key];

      if (isPrimitive(value)) {
        converted[convertedKey] = value;
      } else if (Array.isArray(value)) {
        converted[convertedKey] = value.map(item =>
          isPrimitive(item) ? item : convertObjectKeys(item, converter)
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
  return value === null ||
    value === undefined ||
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'boolean';
};

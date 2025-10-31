import {ISortParams} from '../types/common.types';


function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => {
    return current && current[key] !== undefined ? current[key] : undefined;
  }, obj);
}

export function sortBy<T>(sort: ISortParams, data: T[]): T[] {
  if (!sort || !data || data.length === 0) {
    return data;
  }

  return [...data].sort((a: any, b: any) => {
    const aValue = getNestedValue(a, sort.value);
    const bValue = getNestedValue(b, sort.value);

    if (aValue == null && bValue == null) return 0;
    if (aValue == null) return sort.direction === 'asc' ? -1 : 1;
    if (bValue == null) return sort.direction === 'asc' ? 1 : -1;

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sort.direction === 'asc'
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sort.direction === 'asc' ? aValue - bValue : bValue - aValue;
    }

    if (aValue instanceof Date && bValue instanceof Date) {
      return sort.direction === 'asc'
        ? aValue.getTime() - bValue.getTime()
        : bValue.getTime() - aValue.getTime();
    }

    return sort.direction === 'asc'
      ? String(aValue).localeCompare(String(bValue))
      : String(bValue).localeCompare(String(aValue));
  });
}


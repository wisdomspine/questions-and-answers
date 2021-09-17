import { Pipe, PipeTransform } from '@angular/core';
import {
  camelCase,
  capitalCase,
  constantCase,
  dotCase,
  headerCase,
  noCase,
  paramCase,
  pascalCase,
  pathCase,
  sentenceCase,
  snakeCase,
} from 'change-case';

@Pipe({
  name: 'changeCase',
})
export class ChangeCasePipe implements PipeTransform {
  transform(value: string, to: ChangeCases): string | null {
    return changeCaseTo(value, to);
  }
}

export function changeCaseTo(value: string, to: ChangeCases): string | null {
  if (value == null) {
    return null;
  }
  switch (to) {
    case 'camel':
      value = camelCase(value);
      break;

    case 'capital':
      value = capitalCase(value);
      break;
    case 'constant':
      value = constantCase(value);
      break;
    case 'dot':
      value = dotCase(value);
      break;
    case 'header':
      value = headerCase(value);
      break;
    case 'no':
      value = noCase(value);
      break;
    case 'param':
      value = paramCase(value);
      break;
    case 'pascal':
      value = pascalCase(value);
      break;
    case 'path':
      value = pathCase(value);
      break;
    case 'sentence':
      value = sentenceCase(value);
      break;
    case 'snake':
      value = snakeCase(value);
      break;
  }

  return value;
}

export type ChangeCases =
  | 'camel'
  | 'capital'
  | 'constant'
  | 'dot'
  | 'header'
  | 'no'
  | 'param'
  | 'pascal'
  | 'path'
  | 'sentence'
  | 'snake';

export default class JsonToTypescriptConverter {
  static toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  static parseType(value: any, indentLevel: number): string {
    if (value === null) return 'null';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const arrayType = JsonToTypescriptConverter.parseType(value[0], indentLevel);
      return `${arrayType}[]`;
    }
    if (typeof value === 'object') return JsonToTypescriptConverter.parseObject(value, indentLevel);
    return 'any';
  }

  static parseObject(obj: Record<string, any>, indentLevel: number): string {
    const indent = '  '.repeat(indentLevel);
    const nextIndent = '  '.repeat(indentLevel + 1);
    let result = '{\n';
    for (const key in obj) {
      const camelCaseKey = JsonToTypescriptConverter.toCamelCase(key);
      result += `${nextIndent}${camelCaseKey}: ${JsonToTypescriptConverter.parseType(obj[key], indentLevel + 1)};\n`;
    }
    result += `${indent}}`;
    return result;
  }

  static convert(json: string): string {
    const parsedObject = JsonToTypescriptConverter.parseObject(JSON.parse(json), 0);
    return `export interface Root ${parsedObject}`;
  }
}

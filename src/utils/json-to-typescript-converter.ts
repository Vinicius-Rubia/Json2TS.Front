export default class JsonToTypescriptConverter {
  static toCamelCase(str: string): string {
    return str.replace(/([-_][a-z])/gi, ($1) => {
      return $1.toUpperCase().replace('-', '').replace('_', '');
    });
  }

  static parseType(value: any): string {
    if (value === null) return 'null';
    if (typeof value === 'string') return 'string';
    if (typeof value === 'boolean') return 'boolean';
    if (typeof value === 'number') return 'number';
    if (Array.isArray(value)) {
      if (value.length === 0) return 'any[]';
      const arrayType = JsonToTypescriptConverter.parseType(value[0]);
      return `${arrayType}[]`;
    }
    if (typeof value === 'object') return JsonToTypescriptConverter.parseObject(value);
    return 'any';
  }

  static parseObject(obj: Record<string, any>): string {
    let result = '{\n';
    for (const key in obj) {
      const camelCaseKey = JsonToTypescriptConverter.toCamelCase(key);
      result += `  ${camelCaseKey}: ${JsonToTypescriptConverter.parseType(obj[key])};\n`;
    }
    result += '}';
    return result;
  }

  static convert(json: string): string {
    const parsedObject = JsonToTypescriptConverter.parseObject(JSON.parse(json));
    return `export interface Root ${parsedObject}`;
  }
}
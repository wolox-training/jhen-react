export const camelToSnake = (key: string): string => key.replace(/([A-Z])/g, '_$1').toLowerCase();

export const objectCamelToSnake = (obj: Record<string, any>): Record<string, any> => {
  const newObject: Record<string, any> = {};
  for (const camel in obj) {
    if (camel) {
      newObject[camelToSnake(camel)] = obj[camel];
    }
  }
  return newObject;
};

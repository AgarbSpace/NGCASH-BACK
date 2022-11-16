// eslint-disable-next-line max-len
export default function exclude(entity:any, ...keys: any) {
  const newEntity = JSON.parse(JSON.stringify(entity));
  // eslint-disable-next-line no-restricted-syntax
  for (const key of keys) {
    delete newEntity[key];
  }
  return newEntity;
}

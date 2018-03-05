const PROP_BLOCKLIST = new Set(['children', 'type']);

function typeToTag(type) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

function propsToString(primitive) {
  return Object.keys(primitive)
    .filter(key => !PROP_BLOCKLIST.has(key))
    .map(key => `${key}={${JSON.stringify(primitive[key])}}`)
    .join(' ');
}

function primitiveToString(primitive) {
  if (typeof primitive === 'string') {
    return primitive;
  } else if (primitive.children.length) {
    return `<${typeToTag(primitive.type)} ${propsToString(primitive)}>
  ${primitive.children.map(child => primitiveToString(child))}
</${typeToTag(primitive.type)}>`;
  } else {
    return `<${typeToTag(primitive.type)} ${propsToString(primitive)} />`;
  }
}

export default function generateJSX(json) {
  return primitiveToString(json);
}

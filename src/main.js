import generateJSX from './generateJSX';
import nodeToPrimitive from './nodeToPrimitive';

export { nodeToPrimitive };

export function nodeToJSON(node) {
  const primitive = nodeToPrimitive(node);

  return primitive ? primitive.toJSON() : null;
}

export function nodeToJSX(node) {
  return generateJSX(nodeToJSON(node));
}

import View from './primitives/View';
import Image from './primitives/Image';
import Text from './primitives/Text';

export default function nodeToPrimitive(node, parentStyles = null) {
  if (node instanceof HTMLElement) {
    const primitive = (node.nodeName === 'IMG') ? new Image() : new View();
    const styles = getComputedStyle(node);

    primitive.setStyles(styles);

    primitive.setChildren(Array.from(node.childNodes)
      .map(child => nodeToPrimitive(child, styles))
      .filter(child => child !== null));

    return primitive;
  } else if (node instanceof Text) {
    const primitive = new Text();

    primitive.setStyles(parentStyles || getComputedStyle(node.parentElement));

    return primitive;
  }

  return null;
}

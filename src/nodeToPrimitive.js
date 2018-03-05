import View from './primitives/View';
import Image from './primitives/Image';
import Text from './primitives/Text';

export default function nodeToPrimitive(node, parentStyles = null) {
  if (node instanceof HTMLElement) {
    let primitive;

    if (node.nodeName === 'IMG') {
      primitive = new Image();
      primitive.setSource(node.getAttribute('src'));
    } else {
      primitive = new View();
    }

    const styles = getComputedStyle(node);

    primitive.setStyles(styles);

    primitive.setChildren(Array.from(node.childNodes)
      .map(child => nodeToPrimitive(child, styles))
      .filter(child => child !== null));

    return primitive;
  } else if (node.nodeType === Node.TEXT_NODE) {
    const primitive = new Text();

    primitive.setStyles(parentStyles || getComputedStyle(node.parentElement));
    primitive.setChildren([node.nodeValue]);

    return primitive;
  }

  return null;
}

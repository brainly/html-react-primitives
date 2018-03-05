# html-react-primitives

Generate react primitves from DOM nodes. 

```
npm i @brainly/html-react-primitives
```

### Input
Any static or dynamic page.

```
<div class="box">
    <img src="https://example.com/cat.png" />
    <span class="label">Cat Image</span>
</div>
```

### Code
Runs in the (headless?) browser.

```
import {nodeToJSX, nodeToJSON} from 'html-react-primitives';

const box = document.querySelector('.box');

const jsxOutput = nodeToJSX(box);
const jsonOutput = nodeToJSON(box);
```

### Output

#### JSX
```
<View style={{backgroundColor: 'blue', width: 480, …}}>
  <Image source={"https://example.com/image.png"}/>
  <Text style={{ fontFamily: 'Comic Sans MS', … }}/>Cat Image</Text>
</View>
```

#### JSON
```
{
    type: 'view',
    style: {
        backgroundColor: 'blue',
        width: 480,
        …
    },
    children: [
        {
            type: 'image',
            source: 'https://example.com/image.png',
            …
        },
        {
            type: 'text',
            style: {
                fontFamily: 'Comic Sans MS',
                …
            },
            value: 'Cat Image',
            …
        }
    ]
}
```

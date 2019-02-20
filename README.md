# React Flip Over

A react component for flipping animation.

[Demo](https://byte.weiw.io/react/flipover)

## Usage

### Add to your react app

``` bash
yarn add react-flip-over
```

### Create component

``` js
import React from 'react'
import FlipOver from 'react-flip-over'

export class FlipOverExample extends React.Component {
    render() {
        <FlipOver flipped={flipped} width='100%' height='100%' duration={0.25}>
            <h1>Front</h1>
        	<h1>Back</h1>
        </FlipOver>
    }
}
```




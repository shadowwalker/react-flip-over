# React Flip Over

A react component for flipping animation.

## Usage

### Add to your react app

``` bash
yarn add react-flip-over
```

## Example

[![Edit react-flip-over demo](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/14jm5ljk73?codemirror=1&fontsize=14)

``` javascript
class App extends React.Component {
  state = {
    flipped: false
  }

  flip = () => {
    this.setState(state => ({
      flipped: !state.flipped
    }))
  }

  render() {
    const { flipped } = this.state

    return (
      <div className="App">
        <FlipOver flipped={flipped} duration={0.35}>
          <div onClick={this.flip}>
            <h1>Front Click Me</h1>
          </div>
          <div onClick={this.flip}>
            <h1>Back Click Me</h1>
          </div>
        </FlipOver>
      </div>
    )
  }
}
```

## API

**FlipOver** takes 2 children components, one for front and another one for back.

Optional properties:

- flipped?: boolean
- direction?: 'horizontal' | 'vertical'
- style?: 'default' | 'revolve'
  - Default: flip back and forth
  - Revolve: keep flip to the same direction
- duration?: number
  - Control flip speed
- width?: number | string
  - in px or %
- height?: number | string
  - in px or %
import * as React from 'react'

type Direction = 'horizontal' | 'vertical'

type Rotate = 'default' | 'revolve'

interface IProps {
  flipped?: boolean
  direction?: Direction
  rotate?: Rotate
  duration?: number
  width?: number | string
  height?: number | string
  perspective?: number
  style?: React.CSSProperties
  children: React.ReactNodeArray
}

interface IState {
  rotation: number
}

export default class FlipOver extends React.Component<IProps, IState> {
  state: IState = {
    rotation: this.props.flipped ? 180 : 0
  }

  static getDerivedStateFromProps(props: IProps, state: IState): IState | null {
    const flipped = Boolean(props.flipped)
    const isFlipped = state.rotation % 360 === 180
    if (isFlipped === flipped) { return null }

    const { rotate = 'default' } = props

    if (rotate === 'default') {
      return {
        rotation: isFlipped ? 0 : 180
      }
    } else {
      return {
        rotation: state.rotation + 180
      }
    }
  }

  render() {
    const {
      direction = 'horizontal',
      rotate = 'default',
      duration = 0.5,
      width = 'auto',
      height = 'auto',
      perspective = 5000,
      style = {},
      children
    } = this.props
    const { rotation }: IState = this.state

    const front = children[0]
    const back = children[1]

    const rotateDir = direction === 'horizontal' ?  'rotateY' : 'rotateX'

    const styles = {
      width: '100%',
      height: '100%',
      position: 'absolute',
      transition: `${duration}s`,
      BackfaceVisibility: 'hidden',
      WebkitBackfaceVisibility: 'hidden'
    }

    const styleFront = {
      transform: `${rotateDir}(${rotation}deg)`,
      ...styles
    } as React.CSSProperties

    const styleBack = {
      transform: `${rotateDir}(${rotation + (rotate === 'default' ? -180 : 180)}deg)`,
      ...styles
    } as React.CSSProperties

    return (
      <div
        style={{
          ...style,
          width,
          height,
          perspective: `${perspective}px`
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            position: 'relative',
            transformStyle: 'preserve-3d',
            transition: `${duration}s`
          }}
        >
          <div style={styleFront}>
            {front}
          </div>
          <div style={styleBack}>
            {back}
          </div>
        </div>
      </div>
    )
  }
}

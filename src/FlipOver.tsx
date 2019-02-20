import React, { CSSProperties } from 'react'

enum Direction {
  Horizontal = 'horizontal',
  Vertical = 'vertical'
}

enum Style {
  Normal = 'normal',  // back and forth style
  Revolving = 'revolving'  // revolving door style
}

interface IProps {
  flipped?: boolean
  direction?: Direction
  style?: Style
  duration?: number
  width?: number | string
  height?: number | string
  children: React.ReactNodeArray
}

interface IState {
  rotation: number
}

export default class FlipOver extends React.Component<IProps, IState> {

  static getDerivedStateFromProps(props: IProps, state: IState): IState | null {
    const flipped = Boolean(props.flipped)
    const isFlipped = state.rotation % 360 === 180
    if (isFlipped === flipped) { return null }

    const { style= Style.Normal } = props

    if (style === Style.Normal) {
      return {
        rotation: isFlipped ? 0 : 180
      }
    } else {
      return {
        rotation: state.rotation + 180
      }
    }
  }
  state: IState = {
    rotation: this.props.flipped ? 180 : 0
  }

  render() {
    const {
      direction= Direction.Horizontal,
      style= Style.Normal,
      duration= 0.5,
      width = 'auto',
      height = 'auto',
      children
    } = this.props
    const { rotation }: IState = this.state

    const front = children[0]
    const back = children[1]

    const rotateDir = direction === Direction.Horizontal ?  'rotateY' : 'rotateX'

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
    } as CSSProperties

    const styleBack = {
      transform: `${rotateDir}(${rotation + (style === Style.Normal ? -180 : 180)}deg)`,
      ...styles
    } as CSSProperties

    return (
      <div
        style={{
          width,
          height,
          perspective: '1000px'
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


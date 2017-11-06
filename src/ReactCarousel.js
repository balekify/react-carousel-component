import React from 'react'
import option from './Settings'
import Arrow from './ReactArrow'
import './style.css'

export default class App extends React.Component {
  constructor (props) {
    super(props)

    const currentSlide = this.props.currentSlide || option.currentSlide
    const carouselWidth = 100 * this.props.children.length
    const slideToScroll = this.props.slideToScroll || option.slideToScroll
    const slideToShow = this.props.slideToShow || option.slideToShow
    const slideWidth = this.props.children.length * slideToShow
    const gutter = slideToShow === 1 ? 0 : (this.props.gutter || option.gutter) / 100 * slideWidth * 100 / carouselWidth

    this.state = { slideWidth, carouselWidth, gutter, slideToScroll, currentSlide, slideToShow }

    this.handleClickPrev = this.handleClickPrev.bind(this)
    this.handleClickNext = this.handleClickNext.bind(this)
  }

  handleClickPrev () {
    this.setState(prev => {
      const currentSlide = prev.currentSlide - prev.slideToScroll < 0 ? 0 : prev.currentSlide - prev.slideToScroll
      return { currentSlide }
    })
  }

  handleClickNext () {
    this.setState(prev => {
      const currentSlide = prev.currentSlide + prev.slideToScroll < this.props.children.length ? prev.currentSlide + prev.slideToScroll : this.props.children.length - 1
      return { currentSlide }
    })
  }

  render () {
    const { currentSlide, slideWidth, slideToShow, carouselWidth, gutter } = this.state

    const tile = 100 / slideWidth
    const tileWidth = tile - gutter + gutter / slideToShow

    const CarouselStyle = {
      listStyle: 'none',
      margin: 0,
      padding: 0,
      transition: 'transform .3s ease-in-out',
      width: `${carouselWidth}%`,
      transform: `translateX(-${(tile + gutter / slideToShow) * currentSlide}%)`
    }

    const SlideStyle = {
      float: 'left',
      width: `${tileWidth}%`,
      marginRight: `${gutter}%`
    }

    return (
      <div className='Carousel'>
        <Arrow
          position='left'
          handleClick={this.handleClickPrev}
          fade={this.state.currentSlide === 0}
        />
        <div className='Slider'>
          <ul style={CarouselStyle}>
            {
              this.props.children.map((item, index) => (
                <li className='Slide' style={SlideStyle} key={index}>{item}</li>
              ))
            }
          </ul>
        </div>
        <Arrow
          position='right'
          handleClick={this.handleClickNext}
          fade={this.state.currentSlide + 1 === this.props.children.length}
        />
      </div>
    )
  }
}
import React, { Component } from 'react';
import { Spring } from 'react-spring';
import PropTypes from 'prop-types';
import CardContainerContext from '../shared/card-container-context';
import ResizeObserver from 'resize-observer-polyfill';

const DEFAULT_PREFERRED_GAP = 0.1; //Unit is "card widths"
const DEFAULT_ALIGN = 'center';
const DEFAULT_EMPTY_INDICES = [];
const DEFAULT_CARD_ASPECT_RATIO = 0.7;

function getCardTransform(cardIndex, containerSize, props) {
    const {
        children,
        emptyIndices = DEFAULT_EMPTY_INDICES,
        preferredGap = DEFAULT_PREFERRED_GAP,
        align = DEFAULT_ALIGN,
        cardAspectRatio = DEFAULT_CARD_ASPECT_RATIO,
    } = props;

    const { width, height } = containerSize;

    const cardWidth = height * cardAspectRatio;
    const preferredGapInPixels = preferredGap * cardWidth;
    const nUsedSlots = children.length + emptyIndices.length;

    // Determine the full width of the card row, provided we use the preferred gap between the cards
    const preferredWidth = nUsedSlots * cardWidth + (nUsedSlots - 1) * preferredGapInPixels;

    // If necessecary shrink the gap (can even go negative) to ensure the total card rowwidth if no
    // wider than the row container width
    const actualGap = (preferredWidth <= width) 
        ? preferredGapInPixels
        : (width - (nUsedSlots * cardWidth)) / (nUsedSlots - 1);
    
    // Determine the actual, applied width of the card row
    const totalWidth = (nUsedSlots * cardWidth) + (nUsedSlots - 1) * actualGap;
    
    let alignmentOffset = 0;
    switch (align) {
        case 'center':
        alignmentOffset = (width - totalWidth)/2;
        break;
        case 'right':
        alignmentOffset = (width - totalWidth);
        break;
        default:
        alignmentOffset = 0;
        break;
    }

    const emptySlotsBefore = emptyIndices.filter((index) => index <= cardIndex).length

    return {
        x: alignmentOffset + (cardIndex + emptySlotsBefore) * (cardWidth + actualGap),
    };
}

class CardRow extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0,
        };
    }

    updateMeasureSize() {
        if (!this.el) { // TODO: MAYBE REMOVE THIS CHECK!!!
            // Something this.el is undefined when storybook hot reloads the component. Just ignore these cases.
            return;
        }

        // TODO: MOVE THESE CHECKS TO COMMEN UTIL FOR ALL CARD CONTAINERS!
        const { suppressZeroSizeWarning, aspectRatio = 0 } = this.props;
        const computedStyles = getComputedStyle(this.el);
        let width = parseFloat(computedStyles.width);
        let height = parseFloat(computedStyles.height);

        height = height || (aspectRatio > 0 ? width / aspectRatio : 0);

        if (width === 0 && !suppressZeroSizeWarning) {
            console.warn('Card row had a width of 0. You will probably want to set a width through CSS using either the `style` or `className` attribute');
        }

        if (height === 0 && !suppressZeroSizeWarning) {
            console.warn(
                `Card row had a height of 0. You will probably want to set a height through CSS using either the 'style' or 'className' attribute. 
                Alternatively you can set a CSS width and use the aspectRatio attribute to have the height adapt automatically`
            );
        }

        this.setState({ width, height });
    }

    componentDidMount() {
        const resizeObserver = new ResizeObserver(() => this.updateMeasureSize());
        resizeObserver.observe(this.el);

        this.updateMeasureSize();
    }

    render() {
        const { children = [], cardAspectRatio, aspectRatio, style, className } = this.props;
        const { height } = this.state;
        const cardWidth = height * cardAspectRatio;

        return (
            <CardContainerContext.Provider
                value={{
                    isInCardContainer: true,
                    faceUp: undefined,
                    rotateY: undefined,
                    shadow: undefined,
                    border: undefined,
                    borderRadius: undefined,
                    animateRotation: undefined,
                    animateShadow: undefined,
                    height: '100%',
                    width: '100%',
                    aspectRatio: cardAspectRatio,
                }}
            >
                <div
                    style={{
                        position: 'relative',
                        ...style,
                    }}
                    className={className}
                    ref={el => this.el = el}
                >
                    <div
                        style={{
                            width: '100%',
                            paddingTop: `${aspectRatio > 0 ? 100/aspectRatio : 0}%`
                        }}
                    />
                    {
                        children.map((child, i) => {
                            const { x } = getCardTransform(i, this.state, this.props);

                            return (
                                <Spring to={{x}} key={child.key || i}>
                                    { ({x}) => (
                                        <div
                                            style={{
                                                display: 'inline-block',
                                                position: 'absolute',
                                                top: 0,
                                                left: 0,
                                                height: `${height}px`,
                                                width: `${cardWidth}px`,
                                                transform: `translateX(${x}px)`,
                                            }}
                                        >
                                            {child}
                                        </div>
                                    )}
                                </Spring>
                            );
                        })
                    }
                </div>
            </CardContainerContext.Provider>
        );
    }
}

CardRow.propTypes = {
    emptyIndices: PropTypes.arrayOf(PropTypes.number),
    align: PropTypes.oneOf(['left', 'center', 'right']),
    preferredGap: PropTypes.number, // Unit is "card widths"
    aspectRatio: PropTypes.number, // Used if height is 0 and width is defined
    cardAspectRatio: PropTypes.number,
    style: PropTypes.object,
    className: PropTypes.string,
    suppressZeroSizeWarning: PropTypes.bool,
}

CardRow.defaultProps = {
    emptyIndices: DEFAULT_EMPTY_INDICES,
    align: DEFAULT_ALIGN,
    preferredGap: DEFAULT_PREFERRED_GAP,
    cardAspectRatio: DEFAULT_CARD_ASPECT_RATIO,
    style: {},
    className: '',
    suppressZeroSizeWarning: false,
}

export default CardRow;

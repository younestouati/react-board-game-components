import React from 'react'
import PropTypes from 'prop-types'

let tileId = 0;

const round = (number) => Number(number.toFixed(3));

function rotatePoint(pivot, point, angle) {
	return [
		(Math.cos(angle) * (point[0] - pivot[0])) + (Math.sin(angle) * (point[1] - pivot[1])) + pivot[0],
		(Math.cos(angle) * (point[1] - pivot[1])) - (Math.sin(angle) * (point[0] - pivot[0])) + pivot[1]
    ];
};

function getPoints(radius, borderWidth, n) {
    const vertices = [];
    const angleBorderWidth = borderWidth/Math.sin(Math.PI/3);
    const deltaAngle = 2 * Math.PI / n;

    for (let i = 0; i < n; i++) {
        const angle = Math.PI/2 + i * deltaAngle;
        vertices.push([
            radius + Math.cos(angle) * (radius - angleBorderWidth/2), //half the stroke width seems to detract from the fill, there divide by 2 
            radius - Math.sin(angle) * (radius - angleBorderWidth/2)
        ]);
    }

    return vertices.map(p => p.map(round));
}

function getFlatTopPoints(radius, offset, n) {
    return getPoints(radius, offset, n)
            .map(p => rotatePoint([radius, radius], p, Math.PI/n));
}

function NTile(props) {
    const {backgroundImage, bevel, radius, flatTop, borderWidth, borderColor, backgroundColor, children, shadow, n} = props;
    const ownId = tileId++;
    const bgId = backgroundImage && `bg-${ownId}`;
    const polygonStyle = {
        fill: backgroundImage ? `url(#${bgId})` : backgroundColor,
        stroke: borderColor,
        strokeWidth: borderWidth
    };
    const points = flatTop ? getFlatTopPoints(radius, borderWidth, n) : getPoints(radius, borderWidth, n);
    const polygonPoints = points.map(point => point.join(',')).join(' ');
    const bevelFilter = bevel ? 'url(#bevel)' : 'none'; 

    const shadowStyle = typeof(shadow) === "boolean"
        ? (shadow ? {filter: 'drop-shadow(1px 1px 2px rgba(82,81,82,1))'} : {})
        : {shadow};

    const backgroundSize = {
        height: 2 * (flatTop ? radius/(Math.sqrt(3)/2) : radius),
        width: 2 * (flatTop ? radius : radius/(Math.sqrt(3)/2))
    };
  
    return (
        <svg
            viewBox={`0 0 ${radius * 2} ${radius * 2}`}
            style={{
                width: `${radius * 2}px`,
                height: `${radius * 2}px`,
                position: 'relative',
                ...shadowStyle
            }}
        >
            <defs>
                <filter id="bevel" filterUnits="objectBoundingBox" x="-10%" y="-10%" width="150%" height="150%">
                    <feGaussianBlur
                        in="SourceAlpha"
                        stdDeviation="1.5"
                        result="blur"
                    />
                    <feSpecularLighting
                        in="blur"
                        surfaceScale="5"
                        specularConstant="0.5" 
                        specularExponent="30"
                        result="specOut"
                        lightingColor="lightgrey"
                    >
                        <fePointLight x="-5000" y="-5000" z="8000"/>
                    </feSpecularLighting>
                    <feComposite
                        in="specOut"
                        in2="SourceAlpha"
                        operator="in"
                        result="specOut2"
                    />
                    <feComposite
                        in="SourceGraphic"
                        in2="specOut2"
                        operator="arithmetic"
                        k1="0"
                        k2="1"
                        k3="1"
                        k4="0"
                        result="litPaint"
                    />
                </filter>
                <clipPath id={`tileClip${ownId}`}>
                    <polygon points={polygonPoints}/>
                </clipPath>
                <pattern id={bgId} width={backgroundSize.width} height={backgroundSize.height} patternUnits="userSpaceOnUse">
                    <image
                        width={backgroundSize.width}
                        height={backgroundSize.height}
                        xlinkHref={backgroundImage} 
                        preserveAspectRatio="xMidYMid slice"
                    />
                </pattern>
            </defs>
            <polygon
                style={polygonStyle}
                filter={bevelFilter}
                points={polygonPoints}            
            />
            <foreignObject x="0" y="0" width="100%" height="100%" clipPath={`url(#tileClip${ownId})`}>
                <div
                    style={{
                        width: `${2*radius}px`,
                        height: `${2*radius}px`,
                        position: 'relative',
                        WebkitClipPath: `url(#tileClip${ownId})`,
                        clipPath: `url(#tileClip${ownId})`
                    }}
                >
                    {children}
                </div>
            </foreignObject>
        </svg>
    );
}

NTile.propTypes = {
    n: PropTypes.number.isRequired,
    flatTop: PropTypes.bool,
    shadow: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    backgroundImage: PropTypes.string,
    children: PropTypes.node,
    bevel: PropTypes.bool,
};

NTile.defaultProps = {
    flatTop: false,
    shadow: false,
    borderWidth: 0,
    borderColor: '#efefef',
    backgroundColor: 'white',
    bevel: false
};

export default NTile;
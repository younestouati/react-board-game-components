import React, {Component} from 'react';
import Custom2FrontNoText from '../assets/custom-card-4.png';

class Back extends Component{
    render() {
        return (
            <div 
                style={{
                backgroundImage: `url(${Custom2FrontNoText})`,
                width: '100%',
                height: '100%',
                backgroundSize: 'contain'
            }}>
                <p
                    style={{
                        textShadow: `black 1px 1px 0`,
                        color: 'white',
                        fontFamily: 'papyrus',
                        fontSize: '12px',
                        textAlign: 'center',
                        transform: 'translateY(-100%)',
                        position: 'absolute',
                        top: '50%',
                        margin: '0px 30px'
                    }}
                >
                    And this is the backside (also markup)
                </p>
            </div>
        );
    }
}

export default Back;
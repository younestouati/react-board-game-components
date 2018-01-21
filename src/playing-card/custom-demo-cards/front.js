import React, {Component} from 'react';
import Custom2FrontNoText from '../assets/custom-card-4.png';
import sword from '../assets/sword.png';

class Front extends Component{
    constructor(props) {
        super(props);

        this.state = {
           swordScale: 1
        };

        this.changeSwordScale = this.changeSwordScale.bind(this);
        this.timeout = setTimeout(this.changeSwordScale, 100);
    }
    
    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    changeSwordScale() {
        const {swordScale} = this.state;

        if (swordScale === 1.2) {
            this.setState({swordScale: 1});
            this.timeout = setTimeout(this.changeSwordScale, 1000);    
        } else {
            this.setState({swordScale: 1.2});
            this.timeout = setTimeout(this.changeSwordScale, 600);       
        }
    }

    render() {
        return (
            <div 
                style={{
                backgroundImage: `url(${Custom2FrontNoText})`,
                width: '100%',
                height: '100%',
                backgroundSize: 'contain'
            }}>
                <h1 
                    style={{
                        margin: '0',
                        color: 'white',
                        fontFamily: 'papyrus',
                        fontSize: '25px',
                        textAlign: 'center',
                        paddingTop: '16px'
                    }}
                >
                    Custom Card
                </h1>
                <h2
                    style={{
                        textShadow: `orange 2px 2px 2px`,
                        margin: '0',
                        color: 'orange',
                        fontFamily: 'papyrus',
                        fontSize: '15px',
                        textAlign: 'center'
                    }}
                >
                    markup version
                </h2>
                <img
                    src={sword}
                    style={{
                        width: '50%',
                        margin: '20px 25%',
                        transform: `scale(${this.state.swordScale})`,
                        transition: 'transform 0.3s ease-in-out'
                    }}
                />
                <p
                    style={{
                        textShadow: `black 1px 1px 0`,
                        margin: '0',
                        color: 'white',
                        fontFamily: 'papyrus',
                        fontSize: '12px',
                        textAlign: 'right',
                        padding: '35px 10px 10px 10px'
                    }}
                >
                    ...with CSS effects and animations
                </p>
            </div>
        );
    }
}

export default Front;
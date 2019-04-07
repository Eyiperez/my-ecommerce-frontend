import React from 'react';
import { Media } from 'reactstrap';
import AuthContext from '../contexts/auth';

const ShopHeading = (props) => {
    const description = props.description;
    const image = props.image;
    const sellerName = props.sellerName;

    return (
        <AuthContext.Consumer>
            {
                (user) => {
                    if (user) {
                        if(user.uid === props.sellerID) {
                            return (
                                <>
                                    <Media>
                                        <Media left href="#">
                                            <Media object src={image} alt="Generic placeholder image" style={{ borderRadius: '80px', width: '200px', height: '200px' }} />
                                        </Media>
                                        <Media body >
                                            <Media heading styel={{ marginLeft: '100px' }}>
                                                Welcome back, {sellerName}
                                            </Media>
                                            {description}
                                        </Media>
                                    </Media>
                                </>
                            )
                        } else {
                            return (
                                <>
                                    <Media>
                                        <Media left href="#">
                                            <Media object src={image} alt="Generic placeholder image" style={{ borderRadius: '80px', width: '200px', height: '200px' }} />
                                        </Media>
                                        <Media body >
                                            <Media heading styel={{ marginLeft: '100px' }}>
                                            {sellerName}' shop!
                                            </Media>
                                            {description}
                                        </Media>
                                    </Media>
                                </>
                            )
                        }
                    } else {
                        return <Media>
                            <Media left href="#">
                                <Media object src={image} alt="Generic placeholder image" style={{ borderRadius: '80px', width: '200px', height: '200px' }} />
                            </Media>
                            <Media body >
                                <Media heading styel={{ marginLeft: '100px' }}>
                                    {sellerName}' shop!
                                </Media>
                                {description}
                            </Media>
                        </Media>
                    }
                }
            }
        </AuthContext.Consumer>
    );
};

export default ShopHeading;



import React from 'react';
import { Link }from 'react-router-dom';
import './Header.scss'
import { connect } from 'react-redux';
import { authentication } from '../../services/authentication';
import Typography from '@material-ui/core/Typography';
import Total from "../user/Total";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCog } from '@fortawesome/free-solid-svg-icons'

class Header extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    handleLogout = () => {
        authentication.logout();
        this.props.updateCurrentUser();
    }

    render() {
        return (
            <>
                <div className="container-fluid">
                    <div className="row py-3">
                        <div className="col d-flex align-items-center flex-grow-high">
                            {this.props.currentUser ? (
                                <div className={"d-flex flex-column"}>
                                    <Typography variant="h6" noWrap>
                                        La coloc
                                    </Typography>
                                    <Total {...this.props}/>
                                </div>
                            ) : (
                                <Link to="/">
                                    <Typography variant="h6" noWrap>
                                        La coloc
                                    </Typography>
                                </Link>
                            )}
                        </div>
                        {this.props.currentUser ? (
                            <div className="col d-flex">
                                <div className="d-flex ml-auto">
                                    <div onClick={this.handleLogout}>
                                        <FontAwesomeIcon icon={faCog} />
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="col d-flex">
                                    <div className="d-flex ml-auto">
                                        <Link to="/se-connecter">
                                            <FontAwesomeIcon icon={faCog} />
                                        </Link>
                                    </div>
                                </div>
                            </>
                        )}

                    </div>
                </div>
            </>
        )
    }
}

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Header);

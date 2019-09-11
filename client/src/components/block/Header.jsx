import React from 'react';
import { Link }from 'react-router-dom';
import './Header.scss'
import { connect } from 'react-redux';
import { authentication } from '../../services/authentication';
import Total from "../user/Total";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

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
            <header className="container-fluid pb-3">
                <div className="row pt-3">
                    <div className="col">
                        <div className={"d-flex justify-content-between align-items-center"}>
                            <div className={"font-weight-bold"}>
                                Nom de l'appartement
                            </div>
                            {this.props.currentUser ? (
                                <div className={"d-flex"} onClick={this.handleLogout}>
                                    <FontAwesomeIcon icon={faEllipsisV} color={'#000000'} />
                                </div>
                            ) : (
                                <Link to="/se-connecter">
                                    <div className="d-flex">
                                        <FontAwesomeIcon icon={faEllipsisV} color={'#000000'} />
                                    </div>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Total {...this.props}/>
                    </div>
                </div>
            </header>
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

import React from 'react';
import Header from "./Header.jsx";
import { authentication } from '../../services/authentication';
import { connect } from 'react-redux';
import {AppContext} from '../../utils/AppContext';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/styles';
import AlertTaskDone from '../task/AlertTaskDone'

const theme = createMuiTheme({
    palette: {
        primary: blue,
        secondary: {
            main: '#4885FA',
        },
        disabled: {
            main: "#D6D6D6"
        }
    },
});

class Layout extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            currentUser: false,
            showAlert: false            
        };
    }

    componentDidMount() {
        this.setState({
            currentUser: authentication.currentUserValue
        })
    }

    updateCurrentUser = () => {
        this.setState({
            currentUser: authentication.currentUserValue
        })
    }

    displayTaskDone = () => {
        this.setState({
            showAlert: !this.state.showAlert
        })
    }

    render() {
        return(

            <AppContext.Provider value={{ updateCurrentUser: () => this.updateCurrentUser(), currentUser: this.state.currentUser,  showAlert: () => this.displayTaskDone() }}>
                <ThemeProvider theme={theme}>
                    <AlertTaskDone showAlert={this.state.showAlert} />
                    <Header updateCurrentUser={() => this.updateCurrentUser()} currentUser={this.state.currentUser} {...this.props} />
                    {this.props.children}
                </ThemeProvider>
            </AppContext.Provider>

    );
    }
}
const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
    logout: () => dispatch(authentication.logout()),
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Layout);

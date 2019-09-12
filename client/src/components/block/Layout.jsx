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
            main: '#ffffff',
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
            showAlert: false,
            value: 0
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

    handleChange = ( event, newValue) => {
        this.setState({value: newValue});
    }

    handleChangeIndex = (index) => {
        this.setState({value: index});
    }

    displayTaskDone = () => {
        this.setState({
            showAlert: !this.state.showAlert
        })
    }

    openBalancedTab = () => {
        this.displayTaskDone()
        this.setState({value: 1})
    }

    render() {
        return(

            <AppContext.Provider value={{ updateCurrentUser: () => this.updateCurrentUser(), currentUser: this.state.currentUser,  showAlert: () => this.displayTaskDone(), tabValue: this.state.value, handleChange: this.handleChange, handleChangeIndex: this.handleChangeIndex}}>
                <ThemeProvider theme={theme}>
                    <AlertTaskDone showAlert={this.state.showAlert} displayTaskDone={this.displayTaskDone} openBalancedTab={this.openBalancedTab} />
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

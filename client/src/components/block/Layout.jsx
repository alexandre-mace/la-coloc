import React from 'react';
import Header from "./Header.jsx";
import { authentication } from '../../services/authentication';
import { connect } from 'react-redux';
import {AppContext} from '../../utils/AppContext';
import { createMuiTheme } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import { ThemeProvider } from '@material-ui/styles';

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
            currentUser: false
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

    render() {
        return(

            <AppContext.Provider value={{ updateCurrentUser: () => this.updateCurrentUser(), currentUser: this.state.currentUser }}>
                <ThemeProvider theme={theme}>
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

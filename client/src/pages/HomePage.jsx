import React from 'react';
import Layout from "../components/block/Layout";
import {List} from "../components/task";

export default class HomePage extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        };
    }

    render() {
        return (
            <>
            <Layout>
                <List {...this.props}/>
            </Layout>
            </>
        )
    }
}

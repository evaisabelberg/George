import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Home from './environments/Home';
import Setup from './environments/Setup';
import Loading from './organisms/Loading';
import { connect } from 'react-redux';
import { getDefaultView, getHomeseer, getHomeseerData, setView } from '../actions/actions';
import axios from 'axios';

class Index extends Component {
    checkView = () => {
        axios
            .get('/api/defaultView')
            .then(res => {
                if(res.data.length > 0) {
                    this.props.getDefaultView();
                } else {
                    axios
                        .get('/api/homeseer')
                        .then(res => {
                            if(res.data.length > 0) {
                                this.props.getHomeseer();
                                this.props.setView(2);
                            } else {
                                this.props.getHomeseerData();
                                this.props.setView(1);
                            }
                        })
                        .catch(err => {
                            throw err;
                        });
                }
            })
            .catch(err => {
                throw err;
            });
    }
    componentDidMount() {
        this.checkView();
    }
    render() {
        const { defaultView, loading, view, devices } = this.props.home;
        let element;
        if(view !== 0) {
            switch(view) {
                case 1:
                    return element = <Loading open={loading} />;
                case 2:
                    return element = <Setup />;
                case 3:
                    return element = <Home />;
            }
        }
        return (
            <Fragment key={'view_' + view}>
                { element }
            </Fragment>
        );
    }
}

Index.propTypes = {
    getHomeseer: PropTypes.func.isRequired,
    getDefaultView: PropTypes.func.isRequired,
    getHomeseerData: PropTypes.func.isRequired,
    setView: PropTypes.func.isRequired
}

const mapStateToProps = (state) => ({
    home: state.home
});

export default connect(mapStateToProps, { getHomeseer, getDefaultView, getHomeseerData, setView })(Index);

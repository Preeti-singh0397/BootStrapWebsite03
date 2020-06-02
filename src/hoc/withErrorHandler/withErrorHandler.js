import React, { Component } from "react"
import Modal from "../../components/UI/Modal/Modal";
import Auxiliary from "../../hoc/Auxiliary";

const withErrorHandler = (WrappedComponent, axios) => {

    return class extends Component {
        state = {
            error: false
        }
        componentWillMount() {
            this.reqinterceptors = axios.interceptors.request.use(req => {
                this.setState({ error: null });
                return req;
            })
            this.resinterceptors = axios.interceptors.response.use(res => res, error => { this.setState({ error: error }) })
        }
        componentWillUnmount() {
            axios.interceptors.request.eject(this.reqinterceptors);
            axios.interceptors.response.eject(this.resinterceptors);

        }
        errorConfigHandler = () => {
            this.setState({ error: null })
        }
        render() {
            return <Auxiliary>
                <Modal
                    show={this.state.error}
                    clicked={this.errorConfigHandler}
                >
                    {this.state.error ? this.state.error.message : null}
                </Modal>
                <WrappedComponent {...this.props} />
            </Auxiliary>
        }

    }

}

export default withErrorHandler;
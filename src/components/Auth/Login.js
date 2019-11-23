import React, { Component } from 'react';
import { withRouter } from 'react-router-dom'
import axios from 'axios';

const initialState = {
    email: '',
    password: '',
    emailError: '',
    passwordError: '',
    messageError: '',
}

class Login extends Component {
    state = initialState

    formValidation = () => {
        const { email, password } = this.state
        let emailError = ''
        let passwordError = ''

        if (email === '' || !email.includes('@')) {
          emailError = `Invalid email`
        }

        if (password === '') {
          passwordError = `Please input your Password`
        }

        if (emailError || passwordError) {
          this.setState({ emailError, passwordError })
          return false
        }
        return true
      }

    handleOnChange = e => {
        this.setState({ [e.target.name]: e.target.value})
    }

    handleOnSubmit = e => {
        e.preventDefault()
        const formValidation = this.formValidation()
        if (formValidation) {
            axios.post(`${process.env.REACT_APP_API_URL}/users/login`, this.state, { withCredentials: true })
            .then((res) => {
                console.log(res)
                // this.setState({ })
                this.props.setCurrentUser(res.data.data.id)
                this.setState(initialState)
                this.props.history.push('/profile')
                this.props.handleModelOnClick()
            })
            .catch((err) => console.log(err))
        }
    }

    render () {
        const { emailError, passwordError } = this.state

        return (
        <div className="modal-dialog modal-dialog-centered" role="document">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalCenterTitle">Sign In</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                        <span onClick={this.props.handleModelOnClick}>&times;</span>
                    </button>
                </div>

                <div className="modal-body">
                    <form className="form-signin" onSubmit={ this.handleOnSubmit }>
                        <div className="form-label-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input onChange={ this.handleOnChange } type="text" name='email' id="inputEmail" className="form-control"  value={this.state.email} />
                            <div className="alert">{emailError}</div>
                        </div>
                        <div className="form-label-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input onChange={ this.handleOnChange } type="password" name='password' id="inputPassword" className="form-control" value={ this.state.password } />
                            <div className="alert">{passwordError}</div>
                        </div>
                        <div className="modal-footer">
                            <button type="submit" className="btn btn-primary">Log in</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        )
    }
}

export default withRouter(Login)


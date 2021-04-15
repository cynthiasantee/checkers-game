import React from 'react';
import page from './page';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { useForm } from "react-hook-form";
import styled from 'styled-components/macro';
import { formStyle } from "../styles/formStyle"
//Login fetch
import { SelectLogin } from '../redux/selector/loginSelector';
import { login as loginFetch} from "../redux/thunk/loginThunk";
import { Login as LoginType} from '../redux/api/loginApi';
//Redux
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { NavLink, Redirect } from 'react-router-dom';

interface StateProps {
    //login
    login?: string;
    errorLogin?: MyKnownError;
    fetchStatusLogin: FetchStatus;
}

interface DispatchProps {
    loginFetch: (login: LoginType) => void
}

const Login = (props: StateProps & DispatchProps) => {
    const { register, handleSubmit } = useForm<LoginType>();

    const onSubmit = handleSubmit(({ username, password }) => {
        props.loginFetch({username, password})
    });

    return(
        <Form onSubmit={onSubmit}>
            <h3>Login</h3>
            <ul>
                <li>
                    <label>Email</label>
                    <input name="username" type="text" ref={register} />
                </li>
                <li>
                    <label>Password</label>
                    <input name="password" type="password" ref={register} />
                </li>
                <li className="button">
                    <input type="submit"></input>
                </li>
            </ul>
            <NavLink to="/reset-password">Forgot Password?</NavLink>
        </Form>
    )
}

const Form = styled.form`
    ${formStyle};
`;

const mapStateToProps = (state: RootState): StateProps => ({
    //Login fetch
    login: SelectLogin.data(state),
    errorLogin: SelectLogin.error(state),
    fetchStatusLogin: SelectLogin.status(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    loginFetch: (login) => dispatch(loginFetch(login))

  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Login);

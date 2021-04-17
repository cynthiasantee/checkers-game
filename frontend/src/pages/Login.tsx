import React from 'react';
import page from './page';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { useForm } from "react-hook-form";
import styled from 'styled-components/macro';
import { formStyle } from "../styles/formStyle"
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
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

const schema = yup.object().shape({
    username: yup.string().required().email().min(7).max(50),
    // username: yup.string().required().min(1).max(20).trim(),
    password: yup
      .string()
      .required()
    //   .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)\S*$/)
      .min(7)
      .max(20)
      .trim(),
});
  

const Login = (props: StateProps & DispatchProps) => {
    const { register, handleSubmit, errors } = useForm<LoginType>({
        resolver: yupResolver(schema),
    });

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
            
            {(errors.password || errors.username || props.fetchStatusLogin === "failed") && (
                <p>Incorrect credentials</p>
            )}
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

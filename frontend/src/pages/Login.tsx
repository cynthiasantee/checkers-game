import React from 'react';
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import page from './page';
//Login fetch
import { SelectLogin } from '../redux/selector/loginSelector';
import { login as loginFetch} from "../redux/thunk/loginThunk";
import { useForm } from "react-hook-form";
import { Login as LoginType} from '../redux/api/loginApi';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';

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
    const { register, handleSubmit, errors } = useForm<LoginType>();

    const onSubmit = handleSubmit(({ username, password }) => {
        props.loginFetch({username, password})
    });

    return(
        <form onSubmit={onSubmit}>
            <label>First Name</label>
            <input name="username" ref={register} />
            <label>Password</label>
            <input name="password" ref={register} />
            <input type="submit"></input>
        </form>
    )
}
const mapStateToProps = (state: RootState): StateProps => ({
    //Login fetch
    login: SelectLogin.data(state),
    errorLogin: SelectLogin.error(state),
    fetchStatusLogin: SelectLogin.status(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    loginFetch: (login) => dispatch(loginFetch(login))

  });
  
export default page("login")(connect(mapStateToProps, mapDispatchToProps)(Login));

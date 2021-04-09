import React from 'react';
import page from './page';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { useForm } from "react-hook-form";
//Register fetch
import { SelectRegister } from '../redux/selector/registerSelector';
import { register as registerFetch} from "../redux/thunk/registerThunk";
import { Register as RegisterType} from '../redux/api/registerApi';
//Redux
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

interface StateProps {
    //register
    register?: string;
    errorRegister?: MyKnownError;
    fetchStatusRegister: FetchStatus;
}

interface DispatchProps {
    registerFetch: (register: RegisterType) => void
}

const Register = (props: StateProps & DispatchProps) => {
    const { register, handleSubmit } = useForm<RegisterType>();

    const onSubmit = handleSubmit(({ email, username, password }) => {
        props.registerFetch({email, username, password})
    });

    return(
        <form onSubmit={onSubmit}>
            <label>Username</label>
            <input name="username" ref={register} />
            <label>Email</label>
            <input name="email" ref={register} />
            <label>Password</label>
            <input name="password" ref={register} />
            <input type="submit"></input>
        </form>
    )
}
const mapStateToProps = (state: RootState): StateProps => ({
    //Register fetch
    register: SelectRegister.data(state),
    errorRegister: SelectRegister.error(state),
    fetchStatusRegister: SelectRegister.status(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    registerFetch: (register) => dispatch(registerFetch(register))

  });
  
export default page("register")(connect(mapStateToProps, mapDispatchToProps)(Register));

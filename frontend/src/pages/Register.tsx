import React, { useEffect } from 'react';
import page from './page';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { useForm } from "react-hook-form";
import styled from 'styled-components/macro';
import { formStyle } from "../styles/formStyle"
//Register fetch
import { SelectRegister } from '../redux/selector/registerSelector';
import { register as registerFetch} from "../redux/thunk/registerThunk";
import { Register as RegisterType} from '../redux/api/registerApi';
//Redux
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Link } from 'react-router-dom';

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
    const { fetchStatusRegister } = props;

    const onSubmit = handleSubmit(({ email, username, password }) => {
        props.registerFetch({email, username, password})
    });

    useEffect(() => {
        if (fetchStatusRegister === "success") {
            alert("Account created succesfully")
        }    
      }, [fetchStatusRegister]);

    return(
        <Form onSubmit={onSubmit}>
            <h3>Register</h3>
            <ul>
                <li>
                    <label>Username</label>
                    <input name="username" type="text" ref={register} />
                </li>
                <li>
                    <label>Email</label>
                    <input name="email" type="text" ref={register} />
                </li>
                <li>
                    <label>Password</label>
                    <input name="password" type="password" ref={register} />
                </li>
                <li className="button">
                    <input type="submit"></input>
                </li>
            </ul>
        </Form>
    )
}

const Form = styled.form`
    ${formStyle};
`;

const mapStateToProps = (state: RootState): StateProps => ({
    //Register fetch
    register: SelectRegister.data(state),
    errorRegister: SelectRegister.error(state),
    fetchStatusRegister: SelectRegister.status(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    registerFetch: (register) => dispatch(registerFetch(register))

  });
  
export default connect(mapStateToProps, mapDispatchToProps)(Register);

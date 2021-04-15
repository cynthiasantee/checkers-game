import React, { useEffect } from 'react';
import page from './page';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { useForm } from "react-hook-form";
import styled from 'styled-components/macro';
import { formStyle } from "../styles/formStyle"
import logoTwo from '../logo/logoTwo.png'
//Login fetch
import { SelectResetPassword } from '../redux/selector/resetPasswordSelector';
import { resetPassword as resetPasswordFetch} from "../redux/thunk/resetPasswordThunk";
import { ResetPassword as ResetPasswordType} from '../redux/api/resetPasswordApi';
//Redux
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';
import { Link } from 'react-router-dom';

interface StateProps {
    //reset password
    errorResetPassword?: MyKnownError;
    fetchStatusResetPassword: FetchStatus;
}

interface DispatchProps {
    resetPasswordFetch: (resetPassword: ResetPasswordType) => void
}

const ResetPassword = (props: StateProps & DispatchProps) => {
    const { register, handleSubmit } = useForm<ResetPasswordType>();
    const { fetchStatusResetPassword } = props

    const onSubmit = handleSubmit(({ email, password }) => {
        props.resetPasswordFetch({email, password})
    });

    useEffect(() => {
        if (fetchStatusResetPassword === "success") {
            alert("Password changed succesfully")
        }    
      }, [fetchStatusResetPassword]);
  

    return(
        <Container>
            <img src={logoTwo} alt="logo" />
            <div className="form-container">
                <Form onSubmit={onSubmit}>
                    <h3>Reset Password</h3>
                    <ul>
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
                    <Link to="/">Go back</Link>
                </Form>
            </div>
        </Container>

    )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;

  img {
    height: 200px;
    width: 200px;
    margin-left: 20px;
  }

  .form-container {
    display: inline-block;
    margin: 10px;

    @media (max-width: 500px) {
      width: 90%;
    }
  }
`

const Form = styled.form`
    ${formStyle};
`;

const mapStateToProps = (state: RootState): StateProps => ({
    //ResetPassword fetch
    errorResetPassword: SelectResetPassword.error(state),
    fetchStatusResetPassword: SelectResetPassword.status(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    resetPasswordFetch: (resetPassword) => dispatch(resetPasswordFetch(resetPassword))

  });
  
export default page("reset-password")(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));

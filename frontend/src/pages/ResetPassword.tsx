import React from 'react';
import page from './page';
import { MyKnownError } from '../redux/util/myKnownError';
import { FetchStatus } from '../redux/util/fetchStatus';
import { useForm } from "react-hook-form";
//Login fetch
import { SelectResetPassword } from '../redux/selector/resetPasswordSelector';
import { resetPassword as resetPasswordFetch} from "../redux/thunk/resetPasswordThunk";
import { ResetPassword as ResetPasswordType} from '../redux/api/resetPasswordApi';
//Redux
import { connect } from 'react-redux';
import { AppDispatch, RootState } from '../redux/store';

interface StateProps {
    //reset password
    resetPassword?: string;
    errorResetPassword?: MyKnownError;
    fetchStatusResetPassword: FetchStatus;
}

interface DispatchProps {
    resetPasswordFetch: (resetPassword: ResetPasswordType) => void
}

const ResetPassword = (props: StateProps & DispatchProps) => {
    const { register, handleSubmit } = useForm<ResetPasswordType>();

    const onSubmit = handleSubmit(({ email, password }) => {
        props.resetPasswordFetch({email, password})
    });

    return(
        <form onSubmit={onSubmit}>
            <label>Email</label>
            <input name="email" ref={register} />
            <label>New Password</label>
            <input name="password" ref={register} />
            <input type="submit"></input>
        </form>
    )
}
const mapStateToProps = (state: RootState): StateProps => ({
    //ResetPassword fetch
    resetPassword: SelectResetPassword.data(state),
    errorResetPassword: SelectResetPassword.error(state),
    fetchStatusResetPassword: SelectResetPassword.status(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    resetPasswordFetch: (resetPassword) => dispatch(resetPasswordFetch(resetPassword))

  });
  
export default page("reset-password")(connect(mapStateToProps, mapDispatchToProps)(ResetPassword));

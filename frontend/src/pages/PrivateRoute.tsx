import React, { useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import { SelectPlayer } from "../redux/selector/getPlayerSelector";
import { fetchPlayerInfo } from "../redux/thunk/getPlayerInfoThunk";

interface StateProps {
    isAuth: boolean;
    hasTried: boolean;
  }
  
  interface DispatchProps {
    getPlayerInfo: () => void;
  }

  const PrivateRoute: React.FC<React.ComponentProps<typeof Route> & StateProps & DispatchProps> = ({isAuth, hasTried, getPlayerInfo, ...rest}) => {
    
    useEffect(() => {
      if (!hasTried) {
        //When page loads, it calls get Info
        getPlayerInfo();
      }
      // eslint-disable-next-line
    }, []);
  
    return hasTried ? isAuth ? <Route {...rest} /> : <Redirect to="/login" /> : <></>;
  };
  
  const mapStateToProps = (state: RootState): StateProps => ({
    //checks if redux has the user data
    isAuth: !!SelectPlayer.data(state),
    //checks if user has tried to login
    hasTried: SelectPlayer.hasTried(state),
  });
  
  const mapDispatchToProps = (dispatch: AppDispatch): DispatchProps => ({
    getPlayerInfo: () => dispatch(fetchPlayerInfo()),
  });
  
  export default connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    mapDispatchToProps
  )(PrivateRoute);
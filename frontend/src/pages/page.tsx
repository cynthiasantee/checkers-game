import React, { useEffect } from "react";
import { connect } from "react-redux";
import { RootState } from "../redux/store";
import styled from "styled-components/macro";
import { navBarHeight } from "../util/navBarHeight";
import { changePage as changePageReducer} from "../redux/reducer/page"

export type Page =
  | "home"
  | "entry"
  | "reset-password"
  | "game";

interface StateProps {}

interface DispatchProps {
  changePage: (p: Page) => void;
}

//Component that wraps all pages, being able to perform actions each time a new page loads
//Functionalities that are common to all pages should live here

const page = (page: Page) => (Comp: React.ComponentType) => {
  const NewComponent = (props: StateProps & DispatchProps) => {

    const { changePage } = props;

    useEffect(() => {
      changePage(page);
    }, [changePage]);

    // if the "page" being loaded shows a nav bar, add margin to the page, so the navbar does not overlap the page's content
    return page === "entry"  || page === "reset-password" ? (
      <Comp></Comp>
    ) : (
      <Margin>
        <Comp></Comp>
      </Margin>
    );
  };

  return connect<StateProps, DispatchProps, {}, RootState>(
    (state) => ({ page: state.page }),
    (dispatch) => ({
      changePage: (p: Page) => dispatch(changePageReducer(p)),
    })
  )(NewComponent);
};

export default page;

const Margin = styled.div`
  min-height: calc(100vh - ${navBarHeight});
  margin-top: ${navBarHeight};
`;

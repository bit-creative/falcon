import { withStyles, withTheme } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import compose from "recompose/compose";
import FacultyLoadingPage from "./FacultyLoading";
import styles from "./styles";


export default compose(
    withTheme(),
    withStyles(styles),
    withRouter,
)(FacultyLoadingPage);
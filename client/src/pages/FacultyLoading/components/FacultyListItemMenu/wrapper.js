import compose from "recompose/compose";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import { styles } from "./styles";

export const wrap = compose(
    withStyles(styles),
    withRouter
);

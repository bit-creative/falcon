import React, { Component, Fragment } from "react";
import Divider from "@material-ui/core/Divider";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import { TERM_STATUSES } from "../../../../enums/class.enums";
import { FeedbackDisplay } from "../FeedbackDisplay";
import { wrap } from "./wrapper";
import { RemoveFacultyModal } from "../modals/RemoveFacultyModal";

class BaseFacultyListItemMenu extends Component {
    state = {
        removeFacultyModalIsShowing: false,
    };

    toggleRemoveFacultyModal = shouldShow =>
        this.setState({
            removeFacultyModalIsShowing: shouldShow,
        });

    renderFeedback = () => {
        const {
            facultyResponse: { feedback },
            faculty,
        } = this.props;

        return (
            <Fragment>
                <FeedbackDisplay feedback={feedback} faculty={faculty} />
                <Divider />
            </Fragment>
        );
    };

    renderRemoveFacultyModal = () => {
        const { faculty, termSchedule } = this.props;
        const { removeFacultyModalIsShowing } = this.state;
        return (
            <RemoveFacultyModal
                open={removeFacultyModalIsShowing}
                onClose={() => this.toggleRemoveFacultyModal(false)}
                faculty={faculty}
                termSchedule={termSchedule}
            />
        );
    };

    render() {
        const {
            classes,
            anchorEl,
            facultyResponse,
            termSchedule,
            onClose,
            open,
        } = this.props;

        const canViewTimeAvailability = facultyResponse.availability !== null;
        const canViewIndividualSchedule =
            termSchedule.status !== TERM_STATUSES.INITIALIZING.identifier;

        return (
            <Menu
                anchorEl={anchorEl}
                onClose={onClose}
                open={open}
                classes={{ paper: classes.menuContainer }}
            >
                {facultyResponse.feedback && this.renderFeedback()}

                <MenuItem
                    onClick={this.handleClose}
                    disabled={!canViewTimeAvailability}
                >
                    View time availability
                </MenuItem>
                <MenuItem
                    onClick={this.handleClose}
                    disabled={!canViewIndividualSchedule}
                >
                    View individual schedule
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => this.toggleRemoveFacultyModal(true)}>
                    Remove this faculty from this term
                </MenuItem>
                {this.renderRemoveFacultyModal()}
            </Menu>
        );
    }
}

export const FacultyListItemMenu = wrap(BaseFacultyListItemMenu);

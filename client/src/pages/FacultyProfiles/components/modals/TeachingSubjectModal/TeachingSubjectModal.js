import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import FormControl from "@material-ui/core/FormControl";
import Grid from "@material-ui/core/Grid";
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import React from "react";
import { ModalFormComponent } from "../../../../../components/ModalFormComponent";
import { SubjectChip } from "../../../../../components/SubjectChip";


export class TeachingSubjectModal extends ModalFormComponent {
    get initialForm() {
        return {
            selectedSubjects: [],
        };
    }

    mapPropsToForm = ({ teachingSubjects }) => ({
        selectedSubjects: [...teachingSubjects],
    });

    renderSubjectChips = selectedSubjects => (
        <Grid container spacing={8}>
            {selectedSubjects.map(subject => (
                <Grid item key={subject._id}>
                    <SubjectChip subject={subject} handleDelete={() => this.setState({
                        form: {
                            selectedSubjects: this.state.form.selectedSubjects.filter(id => id !== subject._id),
                        },
                    })}
                    />
                </Grid>
            ))}
        </Grid>
    );

    renderMenuItems = subjects => subjects.map(subject => {
        const selected = this.state.form.selectedSubjects.includes(subject._id);
        const className = selected ? this.props.classes.selectedItem : "";

        return (
            <MenuItem
                key={subject._id}
                value={subject._id}
                className={className}
            >
                {subject.name}
            </MenuItem>
        );
    });

    get submitUpdateAction() {
        const { form: { selectedSubjects: selectedSubjectsId } } = this.state;
        const { faculty, onSubmitForm, allSubjects } = this.props;
        const idToSubject = id => allSubjects.find(subject => subject._id === id);
        const selectedSubjects = selectedSubjectsId.map(idToSubject);
        const oldSubjects = faculty.teachingSubjects.map(idToSubject)

        return () => onSubmitForm(faculty, selectedSubjects, oldSubjects);
    }

    get buttonName() {
        return "Set Expertise";
    }

    render() {
        const { open, classes, allSubjects } = this.props;
        const { isSubmitting, form } = this.state;
        const selectedSubjects = form.selectedSubjects.map(id => allSubjects.find(subject => subject._id === id));

        return (
            <Dialog open={open} onClose={this.closeModal} maxWidth={false}>
                <DialogTitle>Set Subjects of Expertise</DialogTitle>
                <DialogContent className={classes.container}>
                    <Grid
                        container
                        className={classes.form}
                        spacing={24}
                        direction="column"
                    >
                        <Grid item>
                            <FormControl className={classes.formControl} fullWidth>
                                <InputLabel>Subjects of Expertise</InputLabel>
                                <Select
                                    disabled={isSubmitting}
                                    multiple
                                    value={this.state.form.selectedSubjects}
                                    onChange={this.handleFormChange("selectedSubjects")}
                                    input={<Input />}
                                    renderValue={() => this.renderSubjectChips(selectedSubjects)}
                                >
                                    {this.renderMenuItems(allSubjects)}
                                </Select>
                            </FormControl>

                        </Grid>
                    </Grid>
                </DialogContent>

                {this.renderModalFormDialogActions(false)}
            </Dialog>
        );

    }

}
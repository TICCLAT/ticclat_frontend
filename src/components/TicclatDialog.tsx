import React, { ReactNode } from 'react';
import CloseIcon from '@material-ui/icons/CloseRounded';
import FileCopy from '@material-ui/icons/FileCopy';
import {
    DialogActions,
    Dialog,
    DialogTitle,
    DialogContent,
    Button,
} from '@material-ui/core';
import Slide from '@material-ui/core/Slide';


interface IProps {
    title: string;
    children: ReactNode;
    onClose: () => any | undefined;
    copyToClipboard: (event: any) => void
}

// tslint:disable-next-line:no-shadowed-variable
const Transition = React.forwardRef(function Transition(props, ref) {
    // @ts-ignore
    return <Slide direction="up" ref={ref} {...props} />;
});

const TicclatDialog = (props: IProps) => {
    const handleClose = () => {
        if (props.onClose) {
            props.onClose();
        }
    };
    return (
        <Dialog
            fullWidth={true}
            maxWidth={'lg'}
            open={true}
            TransitionComponent={Transition as any}
            keepMounted={true}
            aria-labelledby="alert-dialog-slide-title"
            aria-describedby="alert-dialog-slide-description"
        >
            <div style={{ display: 'flex', height: 50 }}>
                <DialogTitle id="alert-dialog-slide-title" style={{ flex: 5, textAlign: 'center' }}>
                    {props.title}
                </DialogTitle>
                <DialogActions style={{ flex: 1 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<FileCopy />}
                        onClick={props.copyToClipboard}
                    >
                        Copy Text
                    </Button>
                    <CloseIcon
                        onClick={handleClose}
                        color="primary"
                        style={{ cursor: 'pointer' }}
                    />
                </DialogActions>
            </div>
            <DialogContent className="bibTexContainer">
                {props.children}
            </DialogContent>

        </Dialog>
    );
};

export default TicclatDialog;

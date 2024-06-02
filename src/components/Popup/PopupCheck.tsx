import React from 'react';
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
} from '@mui/material';

interface PopupCheckProps {
    content: string;
    titleCancel: string;
    titleAccept: string;
    onCancel: () => void;
    onAccept: () => void;
    open: boolean;
}

const PopupCheck: React.FC<PopupCheckProps> = ({
    content,
    titleCancel,
    titleAccept,
    onCancel,
    onAccept,
    open,
}) => {
    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="text-xl font-bold">
                Thông báo
                <hr className="mt-2 text-black-700" />
            </DialogTitle>
            <DialogContent className="pt-4 pb-2">
                <div className="text-sm">{content}</div>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={onCancel}
                    variant="contained"
                    color="error"
                    sx={{
                        textTransform: 'none',
                    }}
                >
                    {titleCancel}
                </Button>
                <Button
                    onClick={onAccept}
                    variant="contained"
                    color="success"
                    sx={{
                        textTransform: 'none',
                    }}
                >
                    {titleAccept}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default PopupCheck;

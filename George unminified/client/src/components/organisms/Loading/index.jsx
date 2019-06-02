import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { CircleLoader } from 'react-spinners';

const propTypes = {
    open: PropTypes.bool.isRequired
};

const Loading = ({ open }) => (
    <Fragment>
        <Dialog
            open={open}
            id='loading-dialog'
        >
            <DialogContent>
                <CircleLoader
                    size={150}
                    loading={true}
                />
            </DialogContent>
        </Dialog>
    </Fragment>
);

Loading.propTypes = propTypes;

export default Loading;

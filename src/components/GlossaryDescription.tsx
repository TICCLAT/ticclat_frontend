import React from 'react';
import { Typography } from '@material-ui/core'
interface IProps {
    title: string;
    children: React.ReactNode
}
const GlossaryDescription = (props: IProps) => {
    const { title, children } = props;
    return (
        <>
            <Typography variant="h5" display="block" gutterBottom color="primary">{title}</Typography>
            {children}
        </>
    )

}

export default GlossaryDescription;
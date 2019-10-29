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
            <Typography variant="subtitle1" display="block" color="primary">{title}</Typography>
            {children}
        </>
    )

}

export default GlossaryDescription;
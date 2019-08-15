import React from 'react'

interface IProps {
    path: any,
    color: any,
}

const Line = (props: IProps) => {
    return (
        <g><path d={props.path} stroke={props.color} /></g>
    )
}

export default Line;
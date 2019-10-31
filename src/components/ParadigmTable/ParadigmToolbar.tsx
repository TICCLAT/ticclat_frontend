import React from 'react';
import { Toolbar, InputLabel, Select } from '@material-ui/core';
import { Header } from '../OverviewTabs';
interface IProps {
    wordform: string,
    wordTypeCodes: [],
    onFilter: (filterBy: string) => void
}
const ParadigmToolbar = (props: IProps) => {
    const [codeType, setCodeType] = React.useState("None")
    const [codeTypeList, setCodeTypeList] = React.useState([]);
    const inputLabel = React.useRef<HTMLLabelElement>(null);
    const [labelWidth, setLabelWidth] = React.useState(0);
    React.useEffect(() => {
        setLabelWidth(inputLabel.current!.offsetWidth);
        const codeTypes = Array.from(new Set(props.wordTypeCodes));
        setCodeTypeList(codeTypes);
    }, []);
    const handleChange = (name: string) => (
        event: React.ChangeEvent<{ value: unknown }>,
    ) => {
        setCodeType(event.target.value as string)
        props.onFilter(event.target.value as string)
    };
    return (
        <Toolbar>
            <InputLabel ref={inputLabel} htmlFor="word_code_type" style={{ marginRight: 20 }}>Word Type Code</InputLabel>
            <Select
                native
                value={codeType}
                onChange={handleChange("word_type_code")}
                labelWidth={labelWidth}
                inputProps={{
                    name: 'word_code_type',
                    id: 'word_code_type',
                }}
            >
                <option value={"None"}>None</option>
                {codeTypeList.length > 0 && codeTypeList.map((code: string) => <option value={code} key={code}>{code}</option>)}

            </Select>
            <Header title={props.wordform} section="paradigm" />
        </Toolbar>
    );
};

export default ParadigmToolbar;
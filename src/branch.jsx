import ForgeUI, { Code, Fragment, Text, Heading, Image, Table, Row, Cell, Head, useState } from "@forge/ui";
import api from '@forge/api';

export const NoOfBranch = (props) => {
    const [numberOfBranch] = useState(async () => {
        const github = api.asUser().withProvider('github', 'github-apis')
        const response = await github.fetch(`/repos/${props.name}/branches`);
        if (response.ok) {
            return response.json()
        }

        return {
            status: response.status,
            statusText: response.statusText,
            text: await response.text(),
        }
    })
    console.log(numberOfBranch);
    return (
        <Fragment>
            <Text>{numberOfBranch.length}</Text>
        </Fragment>
    )
}
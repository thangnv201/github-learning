import ForgeUI, { Code, Fragment, Text, Heading, Image, Table, Row, Cell, Head, useState } from "@forge/ui";
import api from '@forge/api';

export const RepoList = (props) => {
    const [repositorys] = useState(async () => {
        const github = api.asUser().withProvider('github', 'github-apis')
        const response = await github.fetch(`/users/${props.user}/repos`);
        console.log(response.json());
        if (response.ok) {
            return response.json()
        }

        return {
            status: response.status,
            statusText: response.statusText,
            text: await response.text(),
        }
    })
    console.log(repositorys.length);
    return (<Fragment>
        <Text>
            Repository {props.user}

        </Text>
        <Table>
            <Head>
                <Cell><Text>Repo name</Text></Cell>
                <Cell><Text>No of Branch</Text></Cell>
                <Cell><Text>No of commit</Text></Cell>
            </Head>
            {repositorys.map(repo => (
                <Row>
                    <Cell><Text>{repo.full_name}</Text></Cell>
                    <Cell></Cell>
                    <Cell></Cell>
                </Row>
            ))}

        </Table>
    </Fragment>)
};
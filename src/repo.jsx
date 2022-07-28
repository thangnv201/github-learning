import ForgeUI, { Code, Fragment, Text, Link, Heading, ModalDialog, Table, Row, Cell, Head, useState, Button, Select, Option, Form } from "@forge/ui";
import api from '@forge/api';
import { Details } from "./details";
export const RepoList = (props) => {
    const [isOpen, setOpen] = useState(false);
    const [formState, setFormState] = useState(undefined);

    const [repositorys] = useState(async () => {
        const github = api.asUser().withProvider('github', 'github-apis')
        const response = await github.fetch(`/users/${props.user}/repos`);
        if (response.ok) {
            return response.json()
        }

        return {
            status: response.status,
            statusText: response.statusText,
            text: await response.text(),
        }
    })

    const onSubmit = async (formData) => {
        setFormState(formData);
        setOpen(true)
    };

    return (<Fragment>

        <Text>
            Repository {props.user}
        </Text>
        <Form onSubmit={onSubmit}>
            <Select isRequired label="Choose the repository" name="repository">
                {repositorys.map(repo =>
                    (<Option label={repo.full_name} value={repo.full_name} />)
                )}
            </Select>
        </Form>
        {isOpen && (<Details open={setOpen} repository={formState.repository}></Details>
        )}

    </Fragment>)
};
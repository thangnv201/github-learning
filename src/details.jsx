import ForgeUI, { Fragment, Text, useState, Button, ModalDialog, Form, Select, Option, Table, Head, Cell, Row } from "@forge/ui";
import api from '@forge/api';

export const Details = (props) => {

  const [formState, setFormState] = useState(undefined);
  const [commits, setCommits] = useState(undefined);

  const [branches] = useState(async () => {
    const github = api.asUser().withProvider('github', 'github-apis')
    const response = await github.fetch(`/repos/${props.repository}/branches`);
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
    const github = api.asUser().withProvider('github', 'github-apis')
    const response = await github.fetch(`/repos/${props.repository}/commits?sha=${formData.branch}`);
    if (response.ok) {
      setCommits(response.json())
    } else {
      setCommits({
        status: response.status,
        statusText: response.statusText,
        text: await response.text(),
      })
    }

  };
  return (
    <Fragment>
      <ModalDialog width="x-large" header={props.repository} onClose={() => props.open(false)}>
        <Form onSubmit={onSubmit}>
          <Select isRequired label="Choose the branch" name="branch">
            {branches.map(branch =>
              (<Option label={branch.name} value={branch.name} />)
            )}
          </Select>
        </Form>
        {formState !== undefined && <Text> Brach: {formState.branch}</Text>}
        <Table>
          <Head>
            <Cell>
              <Text>Commit</Text>
            </Cell>
            <Cell>
              <Text>Author</Text>
            </Cell>
            <Cell>
              <Text>Message</Text>
            </Cell>
            <Cell>
              <Text>Date</Text>
            </Cell>
          </Head>
          {commits !== undefined && commits.map(commit => (
            <Row>
              <Cell>
                <Text>{commit.sha}</Text>
              </Cell>
              <Cell>
                <Text>{commit.author.login}</Text>
              </Cell>
              <Cell>
                <Text>{commit.commit.message}</Text>
              </Cell>
              <Cell>
                <Text>{commit.commit.committer.date}</Text>
              </Cell>
            </Row>
          ))}
        </Table>
      </ModalDialog>
    </Fragment>
  );
}
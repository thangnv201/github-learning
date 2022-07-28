import ForgeUI, { render, Fragment, Text, IssuePanel,useState } from '@forge/ui';
import api from '@forge/api';
import { RepoList } from './repo';

const App = () => {
  const [data] = useState(async () => {
    const github = api.asUser().withProvider('github', 'github-apis')
    if (!await github.hasCredentials()) {
      await github.requestCredentials()
    }
    const response = await github.fetch('/user');
    if (response.status === 401)  {
      await github.requestCredentials();
    }
    if (response.ok) {
      return response.json()
    }
    
    return {
      status: response.status,
      statusText: response.statusText,
      text: await response.text(),
    }
  })
  console.log("run index");

  return (
    <Fragment>
      <Text>Hello {data.login}</Text>
      <RepoList user={data.login}></RepoList>
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);

import ForgeUI, { render, Fragment, Text, IssuePanel,useState,Code } from '@forge/ui';
import api from '@forge/api';

const App = () => {
  const [data] = useState(async () => {
    const github = api.asUser().withProvider('github', 'github-apis')
    console.log(github.hasCredentials());
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

  return (
    <Fragment>
      <Text>Hello world!</Text>
      <Code text={JSON.stringify(data, null, 2)} language="json" showLineNumbers />
    </Fragment>
  );
};

export const run = render(
  <IssuePanel>
    <App />
  </IssuePanel>
);
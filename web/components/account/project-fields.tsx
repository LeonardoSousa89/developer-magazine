import { externalUrl } from '../../services/external-urls';
import { TranslatedText } from '../localization/translated-text';

export function readProject(fields: FormData) {
  const projectName = String(fields.get('projectName') ?? '').trim();
  const projectUrl = externalUrl(fields.get('evidence'), true);
  if (!projectName || !projectUrl || projectUrl.username || projectUrl.password)
    return undefined;
  if (
    ['github.com', 'www.github.com'].includes(projectUrl.hostname) &&
    projectUrl.pathname.split('/').filter(Boolean).length < 2
  )
    return undefined;

  return { projectName, evidence: projectUrl.href };
}

export function ProjectFields() {
  return (
    <>
      <label>
        <TranslatedText text="Project name" />
        <input name="projectName" required maxLength={100} />
      </label>
      <label>
        <TranslatedText text="Project URL" />
        <input name="evidence" type="url" required maxLength={250} />
        <small>
          <TranslatedText text="Use the HTTPS link to the GitHub repository or the project website." />
        </small>
      </label>
    </>
  );
}

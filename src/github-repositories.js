const profile = 'https://github.com/mikeholp87/';
const pages = 'https://mikeholp87.github.io/';

export function validGithubRepositories(projects) {
  return Array.isArray(projects) && projects.length > 0
    && projects.every(project => project && typeof project.name === 'string' && /^[\w.-]+$/.test(project.name)
      && typeof project.description === 'string'
      && (project.url === `${profile}${project.name}` || project.url === `${pages}${project.name}/`));
}

const profile = 'https://github.com/mikeholp87/';

export function validGithubRepositories(projects) {
  return Array.isArray(projects) && projects.length > 0
    && projects.every(project => project && typeof project.name === 'string' && /^[\w.-]+$/.test(project.name)
      && typeof project.description === 'string' && project.url === `${profile}${project.name}`);
}

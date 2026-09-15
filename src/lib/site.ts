export const GITHUB_URL = 'https://github.com/abhinavallani02-cyber/mayI'
export const NPM_URL = 'https://www.npmjs.com/package/mayi-mcp'
export const INSTALL_COMMAND =
  'npx mayi-mcp -- npx -y @modelcontextprotocol/server-filesystem ./your-project'
export const CAST_URL = '/demo.cast'

export const POLICY_YAML = `rules:
  - tool: read_*
    action: allow

  - tool: write_*
    path_prefix: /etc
    action: deny

  - tool: write_*
    action: ask

  - tool: "*"
    action: ask`

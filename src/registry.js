const speaking_master = {
  id: 'speaking_master',
  clientSecret: 'sundog_do_great',
  name: 'Speaking Master', // custom field
  scope: 'user_info:read', // a custom scope, indicating that this client is allowed to be authorized to read the user's information
  grants: ['token'],
  redirectUris: ['http://localhost:9528/receive-grant'],
  accessTokenLifetime: 7200, // not required, default is 3600,
  refreshTokenLifetime: 3600 * 24 * 30 // not required, default is 2 weeks
}

const registry = {
  clients: {
    speaking_master
  },
  scopes: {
    'user_info_base:read': {
      desc: 'read user information in account service'
    },
    'user_info_base:write': {
      desc: 'modify user information in account service'
    },
    'user_info_speaking_master:read': {
      desc: 'read user information in speaking master part'
    },
    'user_info_speaking_master:write': {
      desc: 'modify user information in speaking master part'
    }
  }
}

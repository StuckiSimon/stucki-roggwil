import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: '2ahpkiw8',
    dataset: 'production'
  },
  /**
   * Disable auto-updates for studios.
   * Learn more at https://www.sanity.io/docs/cli#auto-updates
   */
  deployment: {autoUpdates: false},
})

import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID || 
               process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 
               process.env.SANITY_API_PROJECT_ID || 
               '11fi8zmy',
    dataset: process.env.SANITY_STUDIO_DATASET || 
             process.env.NEXT_PUBLIC_SANITY_DATASET || 
             process.env.SANITY_API_DATASET || 
             'production',
  },
  studioHost: 'highwinrate-blog',
})


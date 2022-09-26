import { Layer2 } from '@l2beat/config'
import { ApiMain } from '@l2beat/types'

import { getChart } from '../../../utils/project/getChart'
import { getHeader } from '../../../utils/project/getHeader'
import { Wrapped } from '../../Page'
import { ProjectPageProps } from '../view/ProjectPage'
import { getPageMetadata } from './getPageMetadata'
import { getProjectDetails } from './getProjectDetails'

export function getProps(
  project: Layer2,
  apiMain: ApiMain,
): Wrapped<ProjectPageProps> {
  const chart = getChart(project, apiMain)
  return {
    props: {
      header: getHeader(project, apiMain),
      chart,
      projectDetails: getProjectDetails(project),
    },
    wrapper: {
      preloadApi: chart.endpoint,
      metadata: getPageMetadata(project),
    },
  }
}
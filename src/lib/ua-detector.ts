import { isbot as isbotDetect } from 'isbot'

export type UserAgentDetectorMode = 'isbot' | 'aua' | 'no'

const DEFAULT_MODE: UserAgentDetectorMode = 'isbot'

function resolveMode(env: string | undefined): UserAgentDetectorMode {
    if (env === 'isbot' || env === 'aua' || env === 'no') {
          return env
    }
    if (env !== undefined && env !== '') {
          console.warn(`[ua-detector] unrecognized USER_AGENT_DETECTOR "${env}", fallback to "${DEFAULT_MODE}"`)
    }
    return DEFAULT_MODE
}

export const UA_DETECTOR_MODE: UserAgentDetectorMode = resolveMode(process.env.USER_AGENT_DETECTOR)

export function isBot(ua: string): boolean {
    switch (UA_DETECTOR_MODE) {
      case 'isbot':
      case 'aua':
              return isbotDetect(ua)
      case 'no':
              return false
    }
}

import { EthereumAddress } from '@l2beat/types'

import { DiscoveryContract } from '../DiscoveryConfig'
import { ContractParameters } from '../types'
import { diffContracts, FieldDiff } from './diffContracts'

export interface DiscoveryDiff {
  name: string
  address: EthereumAddress
  diff?: FieldDiff[]
  type?: 'created' | 'deleted'
}

export function diffDiscovery(
  committed: ContractParameters[],
  discovered: ContractParameters[],
  overrides: Record<string, DiscoveryContract>,
): DiscoveryDiff[] {
  const modifiedOrDeleted: DiscoveryDiff[] = []

  for (const committedContract of committed) {
    const discoveredContract = discovered.find(
      (d) => d.address === committedContract.address,
    )
    if (discoveredContract === undefined) {
      modifiedOrDeleted.push({
        name: committedContract.name,
        address: committedContract.address,
        type: 'deleted',
      })
      continue
    }
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    const ignored: string[] = overrides[committedContract.address.toString()]
      ? overrides[committedContract.address.toString()].ignoreInWatchMode ?? []
      : []

    const diff = diffContracts(committedContract, discoveredContract, ignored)

    if (diff.length > 0) {
      modifiedOrDeleted.push({
        name: committedContract.name,
        address: committedContract.address,
        diff,
      })
    }
  }

  const created: DiscoveryDiff[] = []

  for (const discoveredContract of discovered) {
    const committedContract = committed.find(
      (c) => c.address === discoveredContract.address,
    )
    if (committedContract === undefined) {
      created.push({
        name: discoveredContract.name,
        address: discoveredContract.address,
        type: 'created',
      })
    }
  }

  return modifiedOrDeleted.concat(created)
}

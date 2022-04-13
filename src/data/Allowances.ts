import { Token, TokenAmount } from 'anyswap-sdk'
import { useEffect, useMemo, useState } from 'react'

import { useTokenContract } from '../hooks/useContract'
import { useSingleCallResult } from '../state/multicall/hooks'
import { useActiveWeb3React } from '../hooks'

import {getErcContract} from '../utils/tools/web3UtilsV2'

export function useTokenAllowance(token?: Token, owner?: string, spender?: string): TokenAmount | undefined {
  const { library } = useActiveWeb3React()
  const tokenAddress = token?.address
  const contract = useTokenContract(tokenAddress, false)

  const [ercAllowance, setErcAllowance] = useState<any>()
  const ercContract = getErcContract(library?.provider)
  
  const inputs = useMemo(() => [owner, spender], [owner, spender])
  const allowance = useSingleCallResult(contract, 'allowance', inputs).result
  

  useEffect(() => {
    if (
      ercContract
      && tokenAddress
      && owner
      && spender
    ) {
      // setErcAllowance('')
      ercContract.options.address = tokenAddress
      ercContract.methods.allowance(owner, spender).call((err:any, res:any) => {
        // console.log(err)
        // console.log(res)
        if (!err) {
          setErcAllowance(res)
        } else {
          setErcAllowance('')
        }
      })
    } else {
      setErcAllowance('')
    }
  }, [ercContract, tokenAddress, owner, spender])

  return useMemo(() => {
    if (token) {
      const a = allowance ? allowance : ercAllowance
      // console.log(allowance)
      // console.log(ercAllowance)
      if (a || a === 0) {
        return new TokenAmount(token, a.toString())
      }
      return undefined
    } else {
      return undefined
    }
    // return (token && allowance ? new TokenAmount(token, allowance.toString()) : undefined)
  }, [
    token,
    allowance,
    ercAllowance
  ])
}

import {formatSwapTokenList, getLocalRPC} from './methods'
import {tokenListUrl, VERSION, USE_VERSION} from '../constant'

export const OKT_MAIN_CHAINID = 66
export const OKT_MAINNET = getLocalRPC(OKT_MAIN_CHAINID, 'https://exchainrpc.okex.org')
export const OKT_MAIN_EXPLORER = 'https://www.oklink.com/eth'

export const tokenList = []
export const testTokenList = []

const symbol = 'OKT'

const bridgeToken = {
  [VERSION.V1]: {
    bridgeInitToken: '',
    bridgeRouterToken: '',
    bridgeInitChain: '',
  },
  [VERSION.V2_2]: {
    bridgeInitToken: '0x0dcb0cb0120d355cde1ce56040be57add0185baa',
    bridgeRouterToken: '0xf390830df829cf22c53c8840554b98eafc5dcbc2',
    bridgeInitChain: '56',
    nativeToken: ''
  },
}

export default {
  [OKT_MAIN_CHAINID]: {
    tokenListUrl: tokenListUrl + OKT_MAIN_CHAINID,
    tokenList: formatSwapTokenList(symbol, tokenList),
    ...bridgeToken[USE_VERSION],
    swapRouterToken: '',
    swapInitToken: '',
    multicalToken: '0xfa9343c3897324496a05fc75abed6bac29f8a40f',
    v1FactoryToken: '',
    v2FactoryToken: '0xc35DADB65012eC5796536bD9864eD8773aBc74C4',
    timelock: '0x9a8541Ddf3a932a9A922B607e9CF7301f1d47bD1',
    nodeRpc: OKT_MAINNET,
    chainID: OKT_MAIN_CHAINID,
    lookHash: OKT_MAIN_EXPLORER + '/tx/',
    lookAddr: OKT_MAIN_EXPLORER + '/address/',
    lookBlock: OKT_MAIN_EXPLORER + '/block/',
    explorer: OKT_MAIN_EXPLORER,
    symbol: symbol,
    name: 'OKExChain',
    networkName: 'OKT mainnet',
    type: 'main',
    label: OKT_MAIN_CHAINID,
    isSwitch: 1,
    underlying: [],
    suffix: 'OKT',
    anyToken: ''
  },
}
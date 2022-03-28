// const { iteratee } = require("lodash")
// const { contracts_build_directory } = require("../truffle-config")

const Token = artifacts.require('/home/bob/code/ethereum_solidity_bootcamp/blockchain-developer-bootcamp/src/contracts/Token.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', (accounts) => {
    const name = 'Pavva Token'
    const symbol = 'PAV'
    const decimals = '18'
    const totalSupply = '1000000000000000000000000'

    let token

    beforeEach(async () => {
        // Fetch token from blockchain
        token = await Token.new()
    })

    describe('deployment', () => {
        it('tracks the name', async () => {
            const result = await token.name()
            result.should.equal(name)
        })

        it('tracks the symbol', async () => {
            const result = await token.symbol()
            result.should.equal(symbol)
        })

        it('tracks the decimals', async () => {
            const result = await token.decimals()
            result.toString().should.equal(decimals)
        })

        it('tracks the totalSupply', async () => {
            const result = await token.totalSupply()
            result.toString().should.equal(totalSupply)
        })
    })

})
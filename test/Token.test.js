import { tokens } from './helpers'

const Token = artifacts.require('./Token.sol')
// const Token = artifacts.require('/home/bob/code/ethereum_solidity_bootcamp/blockchain-developer-bootcamp/src/contracts/Token.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Token', ([deployer,receiver]) => {
    const name = 'Pavva Token'
    const symbol = 'PAV'
    const decimals = '18'
    // const totalSupply = '1000000000000000000000000'
    const totalSupply = tokens(1000000).toString()

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
            result.toString().should.equal(totalSupply.toString())
        })

        it('assigns the total supply to the deployer', async () => {
            const result = await token.balanceOf(deployer)
            result.toString().should.equal(totalSupply.toString())
        })
    })

    describe('sending tokens', () => {
        it('tracks token balances', async () => {
            let balanceOf
            balanceOf = await token.balanceOf(deployer)
            console.log("deployer balance before transfer", balanceOf.toString())
            balanceOf = await token.balanceOf(receiver)
            console.log("receiver balance before transfer", balanceOf.toString())

            await token.transfer(receiver, tokens(100), { from: deployer})
            // await token.transfer(receiver, '100000000000000000000', { from: deployer})

            balanceOf = await token.balanceOf(deployer)
            console.log("deployer balance after transfer", balanceOf.toString())
            balanceOf = await token.balanceOf(receiver)
            console.log("receiver balance after transfer", balanceOf.toString())
        })
    })

})
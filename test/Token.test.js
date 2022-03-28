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
        let result
        let amount
        
        beforeEach(async () => {
            // Transfer Token
            amount = tokens(100)
            result = await token.transfer(receiver, amount, { from: deployer})

        })

        it('tracks token balances', async () => {
            let balanceOf

            balanceOf = await token.balanceOf(deployer)
            balanceOf.toString().should.equal(tokens(999900).toString())

            balanceOf = await token.balanceOf(receiver)
            balanceOf.toString().should.equal(tokens(100).toString())
        })

        it('emits a transfer event', async () => {
            const log = result.logs[0]
            log.event.should.eq('Transfer')
            const event = log.args
            event.from.toString().should.equal(deployer, "from is correct")
            event.to.should.equal(receiver, "to is correct")
            event.value.toString().should.equal(amount.toString(), 'value is correct')
        })
    })

})